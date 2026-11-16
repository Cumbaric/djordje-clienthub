// Regression test for release blocker B1: imapflow emits 'error' after the connection is up
// (socket reset, timeout). Without a listener that is an uncaught exception that kills the
// whole Node process. createImapClient must register the listener before connect().
import test from "node:test";
import assert from "node:assert/strict";
import { createImapClient } from "../../src/lib/email/imap.js";
import { getEmailConfig } from "../../src/lib/email/config.js";
import { BASE_ENV } from "./helpers.mjs";

const config = getEmailConfig(BASE_ENV);

function captureConsoleError(fn) {
  const original = console.error;
  const lines = [];
  console.error = (...args) => lines.push(args.map((arg) => (typeof arg === "string" ? arg : JSON.stringify(arg))).join(" "));
  try {
    fn();
  } finally {
    console.error = original;
  }
  return lines.join("\n");
}

test("B1: the IMAP client has an 'error' listener before connect() is ever called", () => {
  const client = createImapClient(config);
  assert.ok(client.listenerCount("error") >= 1, "no 'error' listener registered");
});

test("B1: an 'error' event after connection (ECONNRESET / timeout) does not throw", () => {
  const client = createImapClient(config);
  for (const code of ["ECONNRESET", "ETIMEDOUT", "NoConnection"]) {
    const error = Object.assign(new Error(`socket failure ${code}`), { code });
    assert.doesNotThrow(() => client.emit("error", error), code);
  }
});

test("B1: the logged error carries no password, hostname or message text", () => {
  const client = createImapClient(config);
  const error = Object.assign(new Error(`LOGIN failed for ${config.username} password=${config.password} host=${config.imap.host}`), {
    code: "ECONNRESET",
    response: `A1 NO ${config.password}`,
    responseText: config.password,
  });
  const output = captureConsoleError(() => client.emit("error", error));
  assert.match(output, /imap connection error/);
  assert.match(output, /ECONNRESET/);
  for (const secret of [config.password, config.username, config.imap.host, "LOGIN failed"]) {
    assert.equal(output.includes(secret), false, `log leaked: ${secret}`);
  }
});
