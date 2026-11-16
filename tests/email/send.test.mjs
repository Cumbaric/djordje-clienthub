import test from "node:test";
import assert from "node:assert/strict";
import { getEmailConfig } from "../../src/lib/email/config.js";
import { createIdempotencyStore, createRateLimiter, createSemaphore } from "../../src/lib/email/rateLimit.js";
import { createEmailService } from "../../src/lib/email/service.js";
import { classifySmtpError, createSmtpService } from "../../src/lib/email/smtp.js";
import { EmailError } from "../../src/lib/email/errors.js";
import { BASE_ENV, buildMime, createFakeTransport, smtpError, sleep } from "./helpers.mjs";

const config = getEmailConfig(BASE_ENV);
const FIELDS = { to: "kupac@klijent.rs", cc: "", bcc: "skriveni@klijent.rs", subject: "Ponuda", body: "Poštovani,\nšaljem ponudu." };
let counter = 0;
const rid = () => `request-id-${String(++counter).padStart(8, "0")}-abcdef`;

function build({ transport = createFakeTransport(), imap = {}, now } = {}) {
  const calls = { appended: [], getMessage: 0 };
  const imapStub = {
    async getMessage() {
      calls.getMessage += 1;
      return { messageId: "<orig-1@klijent.rs>", references: ["<root@klijent.rs>"], subject: "Upit" };
    },
    async getForwardableAttachments() {
      return [{ index: 0, filename: "../dokument.pdf", contentType: "application/pdf", size: 5, content: Buffer.from("PDF!!") }];
    },
    async appendToSent(raw, options) {
      calls.appended.push({ raw, options });
      return true;
    },
    ...imap,
  };
  const smtp = createSmtpService({ config, createTransport: () => transport });
  const service = createEmailService({
    config,
    imap: imapStub,
    smtp,
    idempotency: createIdempotencyStore(),
    now: now ?? (() => Date.parse("2026-11-16T09:00:00Z")),
    randomId: () => "fixed-id",
  });
  return { service, transport, calls };
}

const file = (name, text) => ({ name, type: "text/plain", size: text.length, buffer: Buffer.from(text) });
const fail = async (promise) => {
  try {
    await promise;
  } catch (error) {
    return error;
  }
  return null;
};

test("send: fixed From, recipients, message-id on our domain, nothing but buffers as attachments", async () => {
  const { service, transport, calls } = build();
  const result = await service.send({ requestId: rid(), fields: FIELDS, files: [file("../../tajna.txt", "sadržaj")] });

  assert.equal(transport.sentMail.length, 1);
  const mail = transport.sentMail[0];
  assert.equal(mail.from.address, "info@example.test");
  assert.deepEqual(mail.to.map((a) => a.address), ["kupac@klijent.rs"]);
  assert.deepEqual(mail.bcc.map((a) => a.address), ["skriveni@klijent.rs"]);
  assert.equal(mail.subject, "Ponuda");
  assert.equal(mail.messageId, "<fixed-id@example.test>");
  assert.equal(mail.attachments[0].filename, "tajna.txt");
  assert.ok(Buffer.isBuffer(mail.attachments[0].content));
  for (const key of ["path", "href", "raw", "encoding"]) assert.equal(key in mail.attachments[0], false, key);
  assert.equal(mail.inReplyTo, undefined);

  assert.equal(result.sent, true);
  assert.equal(result.savedToSent, true);
  assert.equal(calls.appended.length, 1);
  const raw = calls.appended[0].raw.toString("utf8");
  assert.match(raw, /^Bcc: skriveni@klijent\.rs/im, "Sent copy keeps Bcc");
  assert.match(raw, /Message-ID: <fixed-id@example\.test>/i);
  assert.match(raw, /From: .*info@example\.test/i);
});

test("send: attachment validation happens before any network call", async () => {
  const { service, transport, calls } = build();
  const err = await fail(service.send({ requestId: rid(), fields: FIELDS, files: [file("virus.exe", "x")] }));
  assert.equal(err.code, "validation");
  assert.equal(transport.sentMail.length, 0);
  assert.equal(calls.appended.length, 0);
  assert.equal((await fail(service.send({ requestId: "short", fields: FIELDS }))).code, "validation");
  assert.equal((await fail(service.send({ requestId: rid(), fields: { ...FIELDS, to: "pogresno" } }))).status, 400);
  assert.equal(transport.sentMail.length, 0);
});

test("reply: threading headers are read from the server, not from the client", async () => {
  const { service, transport, calls } = build();
  await service.send({
    requestId: rid(),
    fields: { ...FIELDS, subject: "Re: Upit" },
    context: { mode: "reply", folder: "inbox", uid: 5, uidValidity: "777" },
  });
  const mail = transport.sentMail[0];
  assert.equal(mail.inReplyTo, "<orig-1@klijent.rs>");
  assert.deepEqual(mail.references, ["<root@klijent.rs>", "<orig-1@klijent.rs>"]);
  assert.equal(calls.getMessage, 1);
});

test("forward: original attachments are re-attached and count against the limits", async () => {
  const { service, transport } = build();
  await service.send({
    requestId: rid(),
    fields: { ...FIELDS, subject: "Fwd: Upit" },
    files: [file("moj.txt", "a")],
    context: { mode: "forward", folder: "inbox", uid: 5, uidValidity: "777", includeAttachments: true },
  });
  assert.deepEqual(transport.sentMail[0].attachments.map((a) => a.filename), ["moj.txt", "dokument.pdf"]);
  assert.equal(transport.sentMail[0].inReplyTo, undefined, "forward is not threaded as a reply");

  const crowded = build();
  const five = Array.from({ length: 5 }, (_, i) => file(`f${i}.txt`, "x"));
  const err = await fail(
    crowded.service.send({
      requestId: rid(),
      fields: FIELDS,
      files: five,
      context: { mode: "forward", folder: "inbox", uid: 5, uidValidity: "777", includeAttachments: true },
    }),
  );
  assert.equal(err.code, "validation");
  assert.equal(crowded.transport.sentMail.length, 0);
});

test("reply: stale mailbox / failing lookup aborts BEFORE sending and frees the request id", async () => {
  const requestId = rid();
  let stale = true;
  const { service, transport } = build({
    imap: {
      async getMessage() {
        if (stale) throw new EmailError("mailbox-changed", 409, "Folder se promenio.");
        return { messageId: "<x@y>", references: [] };
      },
    },
  });
  const context = { mode: "reply", folder: "inbox", uid: 5, uidValidity: "1" };
  assert.equal((await fail(service.send({ requestId, fields: FIELDS, context }))).code, "mailbox-changed");
  assert.equal(transport.sentMail.length, 0);
  stale = false;
  await service.send({ requestId, fields: FIELDS, context });
  assert.equal(transport.sentMail.length, 1);
  assert.equal((await fail(service.send({ requestId: rid(), fields: FIELDS, context: { mode: "wat", folder: "inbox", uid: 1, uidValidity: "1" } }))).code, "validation");
});

test("SMTP failure before the message is accepted: error, no Sent copy, same request id may retry", async () => {
  const failing = createFakeTransport({ error: smtpError("EAUTH", "AUTH PLAIN", { message: "535 bad login super-secret-password-DO-NOT-LEAK" }) });
  const { service, calls } = build({ transport: failing });
  const requestId = rid();
  const err = await fail(service.send({ requestId, fields: FIELDS }));
  assert.equal(err.code, "smtp-auth");
  assert.equal(err.message.includes("super-secret"), false);
  assert.equal(calls.appended.length, 0);

  // credentials fixed -> a retry with the same id is allowed and goes out exactly once
  const ok = createFakeTransport();
  const retry = build({ transport: ok });
  await retry.service.send({ requestId, fields: FIELDS });
  assert.equal(ok.sentMail.length, 1);
});

test("SMTP failure at/after DATA: delivery unknown, no automatic retry, id stays locked", async () => {
  const transport = createFakeTransport({ error: smtpError("ETIMEDOUT", "DATA") });
  const { service, calls } = build({ transport });
  const requestId = rid();
  const first = await fail(service.send({ requestId, fields: FIELDS }));
  assert.equal(first.code, "smtp-connection");
  assert.match(first.message, /Sent/);
  assert.equal(calls.appended.length, 0);

  const second = await fail(service.send({ requestId, fields: FIELDS }));
  assert.equal(second.code, "send-unknown");
  assert.equal(second.status, 409);
});

test("Sent append failure: warning, message counted as sent, never sent twice", async () => {
  const { service, transport } = build({
    imap: {
      async appendToSent() {
        throw new EmailError("imap-connection", 503, "x");
      },
    },
  });
  const requestId = rid();
  const result = await service.send({ requestId, fields: FIELDS });
  assert.equal(result.sent, true);
  assert.equal(result.savedToSent, false);
  assert.match(result.warning, /Sent/);

  const replay = await service.send({ requestId, fields: FIELDS });
  assert.equal(replay.duplicate, true);
  assert.equal(replay.sent, true);
  assert.equal(transport.sentMail.length, 1, "replay does not send again");
});

test("double submit: a parallel second request is refused while the first is running", async () => {
  const slow = createFakeTransport();
  const original = slow.sendMail;
  slow.sendMail = async (mail) => {
    await sleep(40);
    return original(mail);
  };
  const { service } = build({ transport: slow });
  const requestId = rid();
  const [a, b] = await Promise.allSettled([service.send({ requestId, fields: FIELDS }), service.send({ requestId, fields: FIELDS })]);
  const outcomes = [a, b].map((r) => (r.status === "fulfilled" ? "ok" : r.reason.code));
  assert.deepEqual(outcomes.sort(), ["duplicate-request", "ok"]);
  assert.equal(slow.sentMail.length, 1);
});

test("smtp error classification: what is certainly not sent vs unknown", () => {
  for (const [err, certain] of [
    [smtpError("EAUTH", "AUTH PLAIN"), true],
    [smtpError("ECONNECTION", "CONN"), true],
    [smtpError("EENVELOPE", "RCPT TO"), true],
    [smtpError("ETIMEDOUT", "DATA"), false],
    [smtpError("ESOCKET", "DATA"), false],
    [smtpError("EPROTOCOL", "DATA", { responseCode: 554 }), false],
    [smtpError("ETIMEDOUT", undefined), false],
  ]) {
    assert.equal(classifySmtpError(err).certain, certain, `${err.code}/${err.command}`);
  }
  assert.equal(classifySmtpError(smtpError("ECONNECTION", "CONN", { code: "ERR_TLS_CERT_ALTNAME_INVALID" })).mapped.code, "smtp-tls");
});

test("logs never contain credentials or message content", async () => {
  const lines = [];
  const original = console.error;
  console.error = (...args) => lines.push(JSON.stringify(args));
  try {
    const failing = createFakeTransport({ error: smtpError("EAUTH", "AUTH PLAIN", { message: "535 super-secret-password-DO-NOT-LEAK" }) });
    const { service } = build({ transport: failing });
    await fail(service.send({ requestId: rid(), fields: { ...FIELDS, body: "TAJNI-SADRZAJ-PORUKE" } }));
  } finally {
    console.error = original;
  }
  const logged = lines.join("\n");
  assert.ok(logged.length > 0, "something was logged");
  for (const secret of ["super-secret", "TAJNI-SADRZAJ", "skriveni@klijent.rs", "mail.example.test"]) {
    assert.equal(logged.includes(secret), false, `log leaks ${secret}`);
  }
});

// ---------- small building blocks ----------

test("rate limiter: sliding window, per key", () => {
  let now = 0;
  const limiter = createRateLimiter({ windowMs: 1000, max: 2, now: () => now });
  assert.equal(limiter.consume("a").allowed, true);
  assert.equal(limiter.consume("a").allowed, true);
  const blocked = limiter.consume("a");
  assert.equal(blocked.allowed, false);
  assert.ok(blocked.retryAfterMs > 0);
  assert.equal(limiter.consume("b").allowed, true);
  now = 1500;
  assert.equal(limiter.consume("a").allowed, true);
});

test("semaphore: never more than N concurrent holders", async () => {
  const gate = createSemaphore(2);
  let active = 0;
  let peak = 0;
  await Promise.all(
    Array.from({ length: 6 }, async () => {
      await gate.acquire();
      active += 1;
      peak = Math.max(peak, active);
      await sleep(5);
      active -= 1;
      gate.release();
    }),
  );
  assert.equal(peak, 2);
});

test("idempotency store: begin / pending / done / release / expiry", () => {
  let now = 0;
  const store = createIdempotencyStore({ ttlMs: 100, now: () => now });
  assert.equal(store.begin("k"), "new");
  assert.equal(store.begin("k"), "pending");
  store.complete("k", { ok: 1 });
  assert.deepEqual(store.begin("k"), { done: { ok: 1 } });
  store.release("k");
  assert.equal(store.begin("k"), "new");
  store.complete("k", { ok: 2 });
  now = 500;
  assert.equal(store.begin("k"), "new", "expired entries are forgotten");
});

test("mime sanity: the helper really builds parseable messages", async () => {
  const source = await buildMime({ subject: "x" });
  assert.match(source.toString(), /Subject: x/);
});
