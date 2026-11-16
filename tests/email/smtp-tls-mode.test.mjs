// SMTP encryption modes: port 465 = implicit TLS, port 587 = MANDATORY STARTTLS before AUTH.
// The behavioural tests run the real nodemailer against local fake servers (127.0.0.1, random
// port, nothing leaves the machine, no mail is sent) and inspect the raw bytes the client
// puts on the wire: credentials must never appear in clear text in either mode.
import test from "node:test";
import assert from "node:assert/strict";
import net from "node:net";
import nodemailer from "nodemailer";
import { getEmailConfig } from "../../src/lib/email/config.js";
import { buildSmtpTransportOptions, createSmtpTransport, smtpTlsMode } from "../../src/lib/email/smtp.js";
import { BASE_ENV } from "./helpers.mjs";

const withPort = (port) => getEmailConfig({ ...BASE_ENV, EMAIL_SMTP_PORT: String(port) });
const MAIL = { from: "info@example.test", to: "kupac@klijent.rs", subject: "s", text: "b" };

// ---------- pure option building ----------

test("port 465: implicit TLS (secure:true), no STARTTLS options", () => {
  const options = buildSmtpTransportOptions(withPort(465));
  assert.equal(smtpTlsMode(465), "implicit");
  assert.equal(options.secure, true);
  assert.equal("requireTLS" in options, false);
  assert.equal(options.port, 465);
});

test("port 587: plain connect + REQUIRED STARTTLS (secure:false, requireTLS:true)", () => {
  const options = buildSmtpTransportOptions(withPort(587));
  assert.equal(smtpTlsMode(587), "starttls");
  assert.equal(options.secure, false);
  assert.equal(options.requireTLS, true);
  assert.equal(options.port, 587);
});

test("any other port falls back to implicit TLS (never to plain text)", () => {
  for (const port of [25, 2525, 8465]) {
    const options = buildSmtpTransportOptions(withPort(port));
    assert.equal(options.secure, true, String(port));
    assert.equal(options.ignoreTLS, undefined, String(port));
  }
});

test("both modes keep certificate validation, TLS >= 1.2, and the file/url lockdown", () => {
  for (const port of [465, 587]) {
    const options = buildSmtpTransportOptions(withPort(port));
    assert.equal(options.tls.minVersion, "TLSv1.2", String(port));
    assert.equal("rejectUnauthorized" in options.tls, false, String(port));
    assert.equal(options.ignoreTLS, undefined, String(port));
    assert.equal(options.opportunisticTLS, undefined, String(port));
    assert.equal(options.disableFileAccess, true, String(port));
    assert.equal(options.disableUrlAccess, true, String(port));
    assert.deepEqual(options.auth, { user: "info@example.test", pass: BASE_ENV.EMAIL_PASSWORD });
  }
});

test("createSmtpTransport really uses those options", () => {
  const starttls = createSmtpTransport(withPort(587)).transporter.options;
  assert.equal(starttls.secure, false);
  assert.equal(starttls.requireTLS, true);
  const implicit = createSmtpTransport(withPort(465)).transporter.options;
  assert.equal(implicit.secure, true);
});

// ---------- on-the-wire behaviour (real nodemailer, fake servers) ----------

async function fakeServer({ greet, supportsStarttls = false }) {
  const log = { plain: "", afterUpgrade: Buffer.alloc(0), upgraded: false, firstByte: null, connections: 0 };
  const server = net.createServer((socket) => {
    log.connections += 1;
    socket.on("error", () => {});
    if (greet) socket.write("220 fake.test ESMTP\r\n");
    let buffer = "";
    socket.on("data", (chunk) => {
      if (log.firstByte === null) log.firstByte = chunk[0];
      if (log.upgraded) {
        log.afterUpgrade = Buffer.concat([log.afterUpgrade, chunk]);
        socket.destroy(); // we never complete a TLS handshake: nothing can be sent
        return;
      }
      if (!greet) {
        // implicit-TLS client: we only look at the first bytes, then hang up
        log.plain += chunk.toString("latin1");
        socket.destroy();
        return;
      }
      log.plain += chunk.toString("latin1");
      buffer += chunk.toString("latin1");
      let index;
      while ((index = buffer.indexOf("\r\n")) >= 0) {
        const line = buffer.slice(0, index);
        buffer = buffer.slice(index + 2);
        if (/^(EHLO|LHLO)/i.test(line)) {
          socket.write(`250-fake.test\r\n${supportsStarttls ? "250-STARTTLS\r\n" : ""}250 AUTH PLAIN LOGIN\r\n`);
        } else if (/^STARTTLS/i.test(line)) {
          if (supportsStarttls) {
            socket.write("220 Ready to start TLS\r\n");
            log.upgraded = true;
          } else {
            socket.write("502 STARTTLS not supported\r\n");
          }
        } else {
          socket.write("250 ok\r\n"); // would also answer AUTH: the assertions make sure it never arrives
        }
      }
    });
  });
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  return { log, port: server.address().port, close: () => new Promise((resolve) => server.close(resolve)) };
}

/** Real transport built from OUR options for `port`, but pointed at the fake server. */
function transportFor(configuredPort, fake) {
  const options = { ...buildSmtpTransportOptions(withPort(configuredPort)), host: "127.0.0.1", port: fake.port, connectionTimeout: 3000, greetingTimeout: 3000, socketTimeout: 3000 };
  return nodemailer.createTransport(options);
}

const password = BASE_ENV.EMAIL_PASSWORD;
const assertNoClearTextSecrets = (log) => {
  assert.equal(/\bAUTH\b/i.test(log.plain), false, "AUTH was sent in clear text");
  assert.equal(log.plain.includes(password), false, "password leaked in clear text");
  assert.equal(log.plain.includes(Buffer.from(`\0info@example.test\0${password}`).toString("base64")), false, "AUTH PLAIN token leaked");
  assert.equal(/MAIL FROM|RCPT TO|DATA/i.test(log.plain), false, "message commands were sent unencrypted");
};

test("587 + server WITHOUT STARTTLS: connection fails, no AUTH / password / mail in clear text", async () => {
  const fake = await fakeServer({ greet: true, supportsStarttls: false });
  try {
    await assert.rejects(transportFor(587, fake).sendMail(MAIL), (error) => {
      assert.equal(error.code, "ETLS");
      assert.equal(error.command, "STARTTLS");
      return true;
    });
    assert.match(fake.log.plain, /^EHLO/im, "client should have said EHLO");
    assert.match(fake.log.plain, /^STARTTLS/im, "client must demand STARTTLS even when it is not advertised");
    assertNoClearTextSecrets(fake.log);
  } finally {
    await fake.close();
  }
});

test("587 + server WITH STARTTLS: client upgrades with a TLS handshake before anything else (no clear-text AUTH)", async () => {
  const fake = await fakeServer({ greet: true, supportsStarttls: true });
  try {
    await assert.rejects(transportFor(587, fake).sendMail(MAIL)); // fake server never finishes the handshake
    assert.equal(fake.log.upgraded, true, "STARTTLS was accepted");
    assert.ok(fake.log.afterUpgrade.length > 0, "client did not start TLS after STARTTLS");
    assert.equal(fake.log.afterUpgrade[0], 0x16, "first bytes after STARTTLS must be a TLS handshake record");
    assert.equal(fake.log.afterUpgrade[1], 0x03);
    assertNoClearTextSecrets(fake.log);
  } finally {
    await fake.close();
  }
});

test("465: the very first bytes are a TLS ClientHello (implicit TLS), nothing readable in clear text", async () => {
  const fake = await fakeServer({ greet: false });
  try {
    await assert.rejects(transportFor(465, fake).sendMail(MAIL));
    assert.equal(fake.log.firstByte, 0x16, "client did not open with a TLS handshake");
    assert.equal(/EHLO|AUTH|STARTTLS/i.test(fake.log.plain.replace(/[^\x20-\x7e\r\n]/g, "")), false);
    assert.equal(fake.log.plain.includes(password), false);
  } finally {
    await fake.close();
  }
});
