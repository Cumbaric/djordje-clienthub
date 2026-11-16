import test from "node:test";
import assert from "node:assert/strict";
import { getEmailConfig } from "../../src/lib/email/config.js";
import { createImapService, mapImapError } from "../../src/lib/email/imap.js";
import { extractAttachments, hasAttachmentPart, parseMessageSource } from "../../src/lib/email/parse.js";
import { createSemaphore } from "../../src/lib/email/rateLimit.js";
import { EmailError } from "../../src/lib/email/errors.js";
import { BASE_ENV, buildMime, createFakeImapServer } from "./helpers.mjs";

const config = getEmailConfig(BASE_ENV);

async function message(uid, overrides = {}) {
  const subject = overrides.subject ?? `Poruka ${uid}`;
  const source = await buildMime({ subject, messageId: `<m${uid}@client.test>`, ...(overrides.mime ?? {}) });
  return {
    uid,
    subject,
    from: [{ name: "Pera", address: "pera@client.test" }],
    to: [{ name: "", address: "info@example.test" }],
    date: new Date(Date.UTC(2026, 10, 1, 8, uid % 60)),
    source,
    ...(overrides.box ?? {}),
  };
}

async function inboxOf(count) {
  const out = [];
  for (let uid = 1; uid <= count; uid++) out.push(await message(uid, { box: uid % 2 === 0 ? { flags: new Set(["\\Seen"]) } : {} }));
  return out;
}

function serviceFor(server) {
  return createImapService({ config, createClient: server.createClient, gate: createSemaphore(2) });
}

const code = async (promise) => {
  try {
    await promise;
  } catch (error) {
    return error;
  }
  return null;
};

// ---------- listing ----------

test("list: newest first, paginated by 25, unread counter from STATUS", async () => {
  const server = createFakeImapServer({ inbox: await inboxOf(60) });
  const imap = serviceFor(server);

  const p1 = await imap.listMessages({ folder: "inbox", page: 1 });
  assert.equal(p1.total, 60);
  assert.equal(p1.totalPages, 3);
  assert.equal(p1.items.length, 25);
  assert.deepEqual(p1.items.map((i) => i.uid).slice(0, 3), [60, 59, 58]);
  assert.equal(p1.items.at(-1).uid, 36);
  assert.equal(p1.unreadCount, 30);
  assert.equal(p1.uidValidity, "777");
  assert.equal(p1.items.find((i) => i.uid === 60).seen, true);
  assert.equal(p1.items.find((i) => i.uid === 59).seen, false);

  const p3 = await imap.listMessages({ folder: "inbox", page: 3 });
  assert.deepEqual(p3.items.map((i) => i.uid), [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]);

  const beyond = await imap.listMessages({ folder: "inbox", page: 99 });
  assert.equal(beyond.page, 3, "page is clamped to the last one");

  // only the requested range is fetched, never the whole mailbox
  assert.ok(server.log.includes("fetch:36:60:seq"));
  assert.ok(server.log.includes("fetch:1:10:seq"));
});

test("list: every connection is logged out and every lock released", async () => {
  const server = createFakeImapServer({ inbox: await inboxOf(3) });
  await serviceFor(server).listMessages({ folder: "inbox" });
  assert.equal(server.locks.open, 0);
  assert.ok(server.clients.every((c) => c.loggedOut));
});

test("list: empty inbox returns an empty page", async () => {
  const server = createFakeImapServer({ inbox: [] });
  const page = await serviceFor(server).listMessages({ folder: "inbox" });
  assert.deepEqual({ total: page.total, items: page.items, totalPages: page.totalPages }, { total: 0, items: [], totalPages: 1 });
  assert.equal(server.log.some((l) => l.startsWith("fetch")), false);
});

test("list: STATUS failure only drops the counter (best effort)", async () => {
  const server = createFakeImapServer({ inbox: await inboxOf(4), failStatus: true });
  const page = await serviceFor(server).listMessages({ folder: "inbox" });
  assert.equal(page.unreadCount, null);
  assert.equal(page.items.length, 4);
});

test("list: sent folder is found through the \\Sent special-use flag; inbox counter not computed", async () => {
  const server = createFakeImapServer({ sent: [await message(5, { subject: "Poslato" })] });
  const page = await serviceFor(server).listMessages({ folder: "sent" });
  assert.equal(page.items[0].subject, "Poslato");
  assert.equal(page.unreadCount, null);
  assert.ok(server.log.includes("lock:INBOX.Sent:ro"));
});

test("search: server-side, UID based, paginated", async () => {
  const inbox = [];
  for (let uid = 1; uid <= 40; uid++) inbox.push(await message(uid, { subject: uid % 2 ? `Faktura ${uid}` : `Ostalo ${uid}` }));
  const server = createFakeImapServer({ inbox });
  const page = await serviceFor(server).listMessages({ folder: "inbox", query: "faktura", pageSize: 10 });
  assert.equal(page.total, 20);
  assert.equal(page.totalPages, 2);
  assert.deepEqual(page.items.map((i) => i.uid), [39, 37, 35, 33, 31, 29, 27, 25, 23, 21]);
  assert.ok(server.log.some((l) => l.startsWith("search:") && l.includes('"or"')));
  const second = await serviceFor(server).listMessages({ folder: "inbox", query: "faktura", pageSize: 10, page: 2 });
  assert.equal(second.items.at(-1).uid, 1);
  const none = await serviceFor(server).listMessages({ folder: "inbox", query: "ništa-ne-postoji" });
  assert.equal(none.total, 0);
  assert.equal(none.items.length, 0);
});

test("list: attachment indicator comes from BODYSTRUCTURE", async () => {
  const withFile = await message(1, { mime: { attachments: [{ filename: "a.pdf", content: "x", contentType: "application/pdf" }] } });
  const server = createFakeImapServer({ inbox: [withFile, await message(2)] });
  const page = await serviceFor(server).listMessages({ folder: "inbox" });
  assert.equal(page.items.find((i) => i.uid === 1).hasAttachments, true);
  assert.equal(page.items.find((i) => i.uid === 2).hasAttachments, false);
});

test("bodystructure helper ignores inline images and plain text parts", () => {
  assert.equal(hasAttachmentPart({ type: "text/plain" }), false);
  assert.equal(hasAttachmentPart({ type: "multipart/alternative", childNodes: [{ type: "text/plain" }, { type: "text/html" }] }), false);
  assert.equal(
    hasAttachmentPart({ type: "multipart/related", childNodes: [{ type: "text/html" }, { type: "image/png", disposition: "inline", parameters: { name: "logo.png" } }] }),
    false,
  );
  assert.equal(hasAttachmentPart({ type: "multipart/mixed", childNodes: [{ type: "text/plain" }, { type: "application/zip", disposition: "attachment" }] }), true);
});

// ---------- reading ----------

test("getMessage: parsed DTO, no flag changes, UIDVALIDITY checked, locks released", async () => {
  const server = createFakeImapServer({ inbox: [await message(7, { mime: { html: "<p>Zdravo <b>svete</b></p>" } })] });
  const imap = serviceFor(server);

  const msg = await imap.getMessage({ folder: "inbox", uid: 7, uidValidity: "777" });
  assert.equal(msg.subject, "Poruka 7");
  assert.equal(msg.from[0].address, "pera@client.test");
  assert.equal(msg.messageId, "<m7@client.test>");
  assert.ok(msg.html.includes("<b>svete</b>"));
  assert.equal(msg.seen, false);
  assert.equal(server.log.some((l) => l.startsWith("flagsAdd")), false, "reading must not mark as read");
  assert.equal(server.locks.open, 0);

  const err = await code(imap.getMessage({ folder: "inbox", uid: 7, uidValidity: "1" }));
  assert.equal(err.code, "mailbox-changed");
  assert.equal(err.status, 409);
  assert.equal(server.locks.open, 0, "lock released even on error");
  assert.ok(server.clients.every((c) => c.loggedOut));
});

test("getMessage: unknown uid -> 404, oversized -> 413 (nothing downloaded)", async () => {
  const big = { ...(await message(1)), size: 30 * 1024 * 1024 };
  const server = createFakeImapServer({ inbox: [big] });
  const imap = serviceFor(server);
  assert.equal((await code(imap.getMessage({ folder: "inbox", uid: 99, uidValidity: "777" }))).status, 404);
  const tooBig = await code(imap.getMessage({ folder: "inbox", uid: 1, uidValidity: "777" }));
  assert.equal(tooBig.status, 413);
  assert.equal(server.log.filter((l) => l.startsWith("fetchOne")).length, 2, "only the size probes ran, no source download");
});

test("setSeen: add/remove \\Seen by UID with validity check", async () => {
  const server = createFakeImapServer({ inbox: [await message(3)] });
  const imap = serviceFor(server);
  await imap.setSeen({ folder: "inbox", uid: 3, uidValidity: "777", seen: true });
  assert.ok(server.boxes.INBOX[0].flags.has("\\Seen"));
  await imap.setSeen({ folder: "inbox", uid: 3, uidValidity: "777", seen: false });
  assert.equal(server.boxes.INBOX[0].flags.has("\\Seen"), false);
  assert.ok(server.log.includes("lock:INBOX:rw"));
  assert.equal((await code(imap.setSeen({ folder: "inbox", uid: 3, uidValidity: "5", seen: true }))).status, 409);
  assert.equal(server.locks.open, 0);
});

test("a failure in the middle of an operation still releases lock and connection", async () => {
  const server = createFakeImapServer({ inbox: await inboxOf(3), failFetch: Object.assign(new Error("boom"), { code: "ECONNRESET" }) });
  const err = await code(serviceFor(server).listMessages({ folder: "inbox" }));
  assert.equal(err.code, "imap-connection");
  assert.equal(server.locks.open, 0);
  assert.ok(server.clients.every((c) => c.loggedOut));
});

// ---------- connection errors ----------

test("connection / auth / TLS failures map to safe messages without secrets", async () => {
  const cases = [
    [Object.assign(new Error("ECONNREFUSED mail.example.test:993 user=info@example.test pass=super-secret-password-DO-NOT-LEAK"), { code: "ECONNREFUSED" }), "imap-connection", 503],
    [Object.assign(new Error("Invalid credentials"), { authenticationFailed: true }), "imap-auth", 502],
    [Object.assign(new Error("cert"), { code: "CERT_HAS_EXPIRED" }), "imap-tls", 502],
    [Object.assign(new Error("weird"), { code: "SOMETHING" }), "imap-error", 502],
  ];
  for (const [failure, expectedCode, status] of cases) {
    const server = createFakeImapServer({ failConnect: failure });
    const err = await code(serviceFor(server).listMessages({ folder: "inbox" }));
    assert.equal(err.code, expectedCode);
    assert.equal(err.status, status);
    assert.ok(err instanceof EmailError);
    for (const secret of ["super-secret", "mail.example.test", "info@example.test"]) {
      assert.equal(err.message.includes(secret), false, `${expectedCode} message leaks ${secret}`);
    }
    assert.ok(server.clients.every((c) => c.loggedOut || c.closed));
  }
  assert.equal(mapImapError(new EmailError("x", 418, "m")).status, 418);
});

test("a failed operation frees its slot: the next call still runs", async () => {
  const gate = createSemaphore(1);
  const failing = createFakeImapServer({ failConnect: Object.assign(new Error("x"), { code: "ETIMEDOUT" }) });
  await code(createImapService({ config, createClient: failing.createClient, gate }).listMessages({ folder: "inbox" }));
  const working = createFakeImapServer({ inbox: await inboxOf(1) });
  const page = await createImapService({ config, createClient: working.createClient, gate }).listMessages({ folder: "inbox" });
  assert.equal(page.items.length, 1);
});

test("appendToSent: stores in the Sent folder flagged \\Seen; missing folder is an error", async () => {
  const server = createFakeImapServer({});
  await serviceFor(server).appendToSent(Buffer.from("raw"), { date: new Date() });
  assert.equal(server.appended[0].path, "INBOX.Sent");
  assert.deepEqual(server.appended[0].flags, ["\\Seen"]);

  const noSent = createFakeImapServer({ noSentFolder: true });
  assert.equal((await code(serviceFor(noSent).appendToSent(Buffer.from("raw")))).code, "sent-folder-missing");
});

// ---------- parsing ----------

test("parse: text, html with inline cid image, references and attachments", async () => {
  const png = Buffer.from("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==", "base64");
  const source = await buildMime({
    subject: "=?UTF-8?B?xI1lxaFrYSBwb3J1a2E=?=",
    text: "Običan tekst",
    html: '<p>HTML <img src="cid:logo@x"></p>',
    references: ["<a@x>", "<b@x>"],
    inReplyTo: "<b@x>",
    attachments: [
      { filename: "logo.png", content: png, cid: "logo@x", contentType: "image/png" },
      { filename: "../../račun.pdf", content: Buffer.from("PDFDATA"), contentType: "application/pdf" },
    ],
  });
  const msg = await parseMessageSource(source);
  assert.equal(msg.text.trim(), "Običan tekst");
  assert.ok(msg.html.includes("data:image/png;base64"), "cid image inlined as data URI");
  assert.deepEqual(msg.references, ["<a@x>", "<b@x>"]);
  assert.equal(msg.inReplyTo, "<b@x>");
  const downloads = msg.attachments.filter((a) => !a.inline);
  assert.equal(downloads.length, 1);
  assert.equal(downloads[0].filename, "račun.pdf", "path segments stripped from attachment names");
  assert.equal(downloads[0].size, 7);
  assert.ok(!JSON.stringify(msg).includes("PDFDATA"), "attachment bytes are not part of the DTO");

  const file = await extractAttachments(source, { index: downloads[0].index });
  assert.equal(file.content.toString(), "PDFDATA");
  await assert.rejects(() => extractAttachments(source, { index: 99 }), (e) => e.status === 404);
});

test("parse: oversized html/text is dropped or truncated, not returned", async () => {
  const source = await buildMime({ text: "t".repeat(500), html: `<p>${"h".repeat(500)}</p>` });
  const msg = await parseMessageSource(source, { limits: { maxTextChars: 100, maxHtmlChars: 100 } });
  assert.equal(msg.html, null);
  assert.equal(msg.htmlTruncated, true);
  assert.equal(msg.text.length, 100);
  assert.equal(msg.textTruncated, true);
});

test("getAttachment via IMAP: index lookup and unknown index", async () => {
  const source = await buildMime({ attachments: [{ filename: "a.txt", content: "AAA" }, { filename: "b.txt", content: "BBB" }] });
  const server = createFakeImapServer({ inbox: [{ uid: 1, subject: "x", source, from: [], to: [] }] });
  const imap = serviceFor(server);
  assert.equal((await imap.getAttachment({ folder: "inbox", uid: 1, uidValidity: "777", index: 1 })).content.toString(), "BBB");
  assert.equal((await code(imap.getAttachment({ folder: "inbox", uid: 1, uidValidity: "777", index: 5 }))).status, 404);
  assert.equal(server.locks.open, 0);
});
