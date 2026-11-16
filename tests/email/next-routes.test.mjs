// Integration test against the REAL Next.js production server (`next start`), covering the
// route wiring (dynamic params, proxy, runtime) that the unit tests bypass. The mail server
// is deliberately unreachable (127.0.0.1:9), so no mail is read or sent and nothing leaves
// the machine. Requires a previous `npm run build`; otherwise it is skipped.
import test, { after, before } from "node:test";
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { createServer } from "node:net";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { BASE_ENV, COOKIE, SECRET, cookieFor, installSessionEnv } from "./helpers.mjs";

const ROOT = resolve(fileURLToPath(new URL("../..", import.meta.url)));
const built = existsSync(join(ROOT, ".next", "BUILD_ID"));
const skip = !built && "PENDING: run `npm run build` first";

let server;
let base;
let restore;
let admin;
let other;

function freePort() {
  return new Promise((resolvePort, reject) => {
    const probe = createServer();
    probe.listen(0, "127.0.0.1", () => {
      const { port } = probe.address();
      probe.close(() => resolvePort(port));
    });
    probe.on("error", reject);
  });
}

before(async () => {
  if (!built) return;
  restore = installSessionEnv();
  admin = await cookieFor("owner");
  other = await cookieFor("second-user");
  const port = await freePort();
  base = `http://127.0.0.1:${port}`;
  server = spawn(process.execPath, [join(ROOT, "node_modules", "next", "dist", "bin", "next"), "start", "-p", String(port), "-H", "127.0.0.1"], {
    cwd: ROOT,
    stdio: "ignore",
    env: {
      ...process.env,
      ...BASE_ENV,
      EMAIL_IMAP_HOST: "127.0.0.1",
      EMAIL_IMAP_PORT: "9",
      EMAIL_SMTP_HOST: "127.0.0.1",
      EMAIL_SMTP_PORT: "9",
      CLIENTHUB_SESSION_SECRET: SECRET,
      CLIENTHUB_AUTH_COOKIE: COOKIE,
      NODE_ENV: "production",
    },
  });
  for (let i = 0; i < 60; i += 1) {
    try {
      await fetch(`${base}/robots.txt`);
      return;
    } catch {
      await new Promise((r) => setTimeout(r, 500));
    }
  }
  throw new Error("next start did not become ready");
});

after(() => {
  server?.kill();
  restore?.();
});

const get = (path, cookie, headers = {}) => fetch(base + path, { redirect: "manual", headers: { ...(cookie ? { cookie } : {}), ...headers } });
const csrf = { origin: "", "x-email-csrf": "1" };

test("real server: anonymous -> 401 and other dashboard user -> 403, private/no-store", { skip }, async () => {
  for (const path of ["/api/email/messages", "/api/email/messages/5?folder=inbox&uidValidity=1", "/api/email/messages/5/attachments/0?folder=inbox&uidValidity=1"]) {
    const anonymous = await get(path);
    assert.equal(anonymous.status, 401, path);
    assert.match(anonymous.headers.get("cache-control"), /no-store/);
    const user = await get(path, other);
    assert.equal(user.status, 403, path);
    assert.match(await user.text(), /Pristup nije dozvoljen/);
  }
});

test("real server: admin reaches the service; unreachable mail server -> safe 503 (no secrets)", { skip }, async () => {
  const response = await get("/api/email/messages?folder=inbox", admin);
  assert.equal(response.status, 503);
  const text = await response.text();
  assert.equal(JSON.parse(text).error.code, "imap-connection");
  for (const leak of ["super-secret", "127.0.0.1", "ECONNREFUSED", "info@example.test"]) assert.equal(text.includes(leak), false, leak);
  assert.match(response.headers.get("cache-control"), /private/);
});

test("real server: dynamic route params are parsed and validated", { skip }, async () => {
  assert.equal((await get("/api/email/messages/abc?folder=inbox&uidValidity=1", admin)).status, 400);
  assert.equal((await get("/api/email/messages/5?folder=inbox&uidValidity=1", admin)).status, 503, "valid params reach the (unreachable) mail server");
  assert.equal((await get("/api/email/messages/5/attachments/xyz?folder=inbox&uidValidity=1", admin)).status, 400);
  assert.equal((await get("/api/email/messages?folder=trash", admin)).status, 400);
});

test("real server: state-changing requests need CSRF protection even for the admin", { skip }, async () => {
  const url = `${base}/api/email/messages/5/flags`;
  const body = JSON.stringify({ folder: "inbox", uidValidity: "1", seen: true });
  const send = (headers) => fetch(url, { method: "POST", body, headers: { cookie: admin, "content-type": "application/json", ...headers } });
  assert.equal((await send({})).status, 403);
  assert.equal((await send({ origin: "https://evil.example", "x-email-csrf": "1" })).status, 403);
  assert.equal((await send({ origin: base, "x-email-csrf": "1" })).status, 503, "same-origin request passes the guard and reaches IMAP (unreachable)");
  assert.equal((await fetch(url, { method: "POST", body, headers: { "content-type": "application/json", origin: base, "x-email-csrf": "1" } })).status, 401, "no session -> 401 before anything else");
});

test("real server: send validates first, then fails safely when SMTP is unreachable (nothing is sent)", { skip }, async () => {
  const post = (payload, headers = { origin: base, "x-email-csrf": "1" }) => {
    const form = new FormData();
    form.set("payload", JSON.stringify(payload));
    return fetch(`${base}/api/email/send`, { method: "POST", body: form, headers: { cookie: admin, ...headers } });
  };
  const bad = await post({ requestId: "request-id-00000001-abcdef", to: "not-an-address", subject: "s", body: "b" });
  assert.equal(bad.status, 400);
  const unreachable = await post({ requestId: "request-id-00000002-abcdef", to: "kupac@klijent.rs", subject: "s", body: "b" });
  assert.equal(unreachable.status, 503);
  const body = await unreachable.json();
  assert.equal(body.error.code, "smtp-connection");
  assert.match(body.error.message, /nije poslata/i);
  assert.equal((await post({ requestId: "x", to: "a@b.rs", body: "b" })).status, 400);
  assert.equal((await post({ requestId: "request-id-00000003-abcdef", to: "a@b.rs", body: "b" }, {})).status, 403);
});

test("real server: wrong methods and the dashboard proxy", { skip }, async () => {
  assert.equal((await fetch(`${base}/api/email/messages`, { method: "POST", headers: { cookie: admin } })).status, 405);
  const page = await get("/dashboard/email");
  assert.equal(page.status, 307);
  assert.match(page.headers.get("location"), /\/login$/);
});
