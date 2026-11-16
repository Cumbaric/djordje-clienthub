import test, { after, before } from "node:test";
import assert from "node:assert/strict";
import { authorizeApiRequest } from "../../src/lib/email/authz.js";
import { getEmailConfig } from "../../src/lib/email/config.js";
import { EmailError } from "../../src/lib/email/errors.js";
import { createHandlers, isSameOriginRequest } from "../../src/lib/email/handlers.js";
import { createRateLimiter } from "../../src/lib/email/rateLimit.js";
import { BASE_ENV, CSRF_HEADERS, cookieFor, installSessionEnv, makeRequest } from "./helpers.mjs";

let restore;
let adminCookie;
let userCookie;
before(async () => {
  restore = installSessionEnv(BASE_ENV);
  adminCookie = await cookieFor("owner");
  userCookie = await cookieFor("second-user");
});
after(() => restore());

function makeHarness({ configured = true, serviceOverrides = {}, sendLimit = 10 } = {}) {
  const spy = { getConfig: 0, createService: 0, calls: [] };
  const service = {
    listMessages: async (p) => (spy.calls.push(["list", p]), { items: [], total: 0, page: 1, totalPages: 1, uidValidity: "1", unreadCount: 0 }),
    getMessage: async (p) => (spy.calls.push(["message", p]), { subject: "x", uid: p.uid }),
    setSeen: async (p) => (spy.calls.push(["flags", p]), { uid: p.uid, seen: p.seen }),
    getAttachment: async (p) => (spy.calls.push(["attachment", p]), { filename: 'ra"č\r\nun.pdf', contentType: "text/html", content: Buffer.from("<script>alert(1)</script>") }),
    send: async (p) => (spy.calls.push(["send", p]), { sent: true, savedToSent: true, messageId: "<x@y>" }),
    ...serviceOverrides,
  };
  const handlers = createHandlers({
    authorize: authorizeApiRequest,
    getConfig: () => {
      spy.getConfig += 1;
      return configured ? getEmailConfig(BASE_ENV) : getEmailConfig({});
    },
    createService: () => {
      spy.createService += 1;
      return service;
    },
    limiters: {
      read: createRateLimiter({ windowMs: 60_000, max: 100 }),
      write: createRateLimiter({ windowMs: 60_000, max: 100 }),
      send: createRateLimiter({ windowMs: 60_000, max: sendLimit }),
    },
    env: BASE_ENV,
  });
  return { handlers, spy };
}

const ctx = (params) => ({ params: Promise.resolve(params) });
const flagsBody = JSON.stringify({ folder: "inbox", uidValidity: "777", seen: true });

function jsonPost(url, body, cookie, headers = CSRF_HEADERS) {
  return makeRequest(url, { method: "POST", cookie, headers: { "content-type": "application/json", ...headers }, body });
}

async function sendRequest({ cookie = adminCookie, headers = CSRF_HEADERS, payload, files = [], raw } = {}) {
  const form = new FormData();
  form.set("payload", payload ?? JSON.stringify({ requestId: "request-id-00000001-abcdef", to: "a@b.rs", subject: "s", body: "b" }));
  for (const f of files) form.append("attachments", new File([f.content], f.name, { type: f.type ?? "text/plain" }));
  // cookie === null means "no cookie at all" (anonymous caller)
  const base = { host: "dash.example.test", ...(cookie === null ? {} : { cookie }) };
  return new Request("https://dash.example.test/api/email/send", { method: "POST", body: raw ?? form, headers: { ...base, ...headers } });
}

const ENDPOINTS = [
  ["list", (h, cookie) => h.list(makeRequest("/api/email/messages?folder=inbox", { cookie }))],
  ["message", (h, cookie) => h.message(makeRequest("/api/email/messages/5?folder=inbox&uidValidity=777", { cookie }), ctx({ uid: "5" }))],
  ["flags", (h, cookie) => h.flags(jsonPost("/api/email/messages/5/flags", flagsBody, cookie), ctx({ uid: "5" }))],
  ["attachment", (h, cookie) => h.attachment(makeRequest("/api/email/messages/5/attachments/0?folder=inbox&uidValidity=777", { cookie }), ctx({ uid: "5", index: "0" }))],
  ["send", async (h, cookie) => h.send(await sendRequest({ cookie: cookie ?? null }))],
];

test("every endpoint: anonymous -> 401, other dashboard user -> 403, nothing is created or read", async () => {
  for (const [name, call] of ENDPOINTS) {
    const { handlers, spy } = makeHarness();
    for (const [cookie, status] of [[undefined, 401], [userCookie, 403]]) {
      const response = await call(handlers, cookie);
      assert.equal(response.status, status, `${name} ${status}`);
      const text = await response.text();
      assert.equal(/subject|from|body|attachment/i.test(text.replace(/"message":"[^"]*"/, "")), false, `${name} leaked data in ${status}`);
    }
    assert.equal(spy.createService, 0, `${name}: service must not be created for unauthorized callers`);
    assert.equal(spy.getConfig, 0, `${name}: config must not be read for unauthorized callers`);
    assert.equal(spy.calls.length, 0);
  }
});

test("every response is private/no-store (success and every error)", async () => {
  const { handlers } = makeHarness();
  const responses = [];
  for (const [, call] of ENDPOINTS) {
    responses.push(await call(handlers, adminCookie));
    responses.push(await call(handlers, undefined));
    responses.push(await call(handlers, userCookie));
  }
  responses.push(await handlers.list(makeRequest("/api/email/messages?folder=trash", { cookie: adminCookie })));
  responses.push(await makeHarness({ configured: false }).handlers.list(makeRequest("/api/email/messages", { cookie: adminCookie })));
  responses.push(await makeHarness({ serviceOverrides: { listMessages: async () => { throw new Error("boom"); } } }).handlers.list(makeRequest("/api/email/messages", { cookie: adminCookie })));
  assert.ok(responses.length > 15);
  for (const response of responses) {
    const cache = response.headers.get("cache-control") ?? "";
    assert.match(cache, /private/);
    assert.match(cache, /no-store/);
    assert.equal(response.headers.get("x-content-type-options"), "nosniff");
    assert.match(response.headers.get("vary") ?? "", /Cookie/i);
  }
});

test("admin gets data; validated params reach the service", async () => {
  const { handlers, spy } = makeHarness();
  const list = await handlers.list(makeRequest("/api/email/messages?folder=sent&page=2&q=  ra%C4%8Dun ", { cookie: adminCookie }));
  assert.equal(list.status, 200);
  assert.deepEqual(spy.calls[0], ["list", { folder: "sent", page: 2, query: "račun" }]);

  const message = await handlers.message(makeRequest("/api/email/messages/42?folder=inbox&uidValidity=777", { cookie: adminCookie }), ctx({ uid: "42" }));
  assert.equal((await message.json()).uid, 42);
});

test("invalid parameters are 400 and never reach the service", async () => {
  const { handlers, spy } = makeHarness();
  const bad = [
    ["list", () => handlers.list(makeRequest("/api/email/messages?folder=../../etc", { cookie: adminCookie }))],
    ["list", () => handlers.list(makeRequest("/api/email/messages?page=-1", { cookie: adminCookie }))],
    ["list", () => handlers.list(makeRequest(`/api/email/messages?q=${"x".repeat(200)}`, { cookie: adminCookie }))],
    ["message", () => handlers.message(makeRequest("/api/email/messages/abc?folder=inbox&uidValidity=1", { cookie: adminCookie }), ctx({ uid: "abc" }))],
    ["message", () => handlers.message(makeRequest("/api/email/messages/1?folder=inbox", { cookie: adminCookie }), ctx({ uid: "1" }))],
    ["attachment", () => handlers.attachment(makeRequest("/x?folder=inbox&uidValidity=1", { cookie: adminCookie }), ctx({ uid: "1", index: "../x" }))],
  ];
  for (const [name, call] of bad) assert.equal((await call()).status, 400, name);
  assert.equal(spy.calls.length, 0);
});

test("CSRF: state-changing requests need same-origin + custom header", async () => {
  const { handlers, spy } = makeHarness();
  const cases = [
    ["no custom header", { origin: "https://dash.example.test" }],
    ["cross-site origin", { origin: "https://evil.example", "x-email-csrf": "1" }],
    ["no origin and no fetch-metadata", { "x-email-csrf": "1" }],
    ["cross-site fetch-metadata", { "x-email-csrf": "1", "sec-fetch-site": "cross-site" }],
    ["lookalike origin", { origin: "https://dash.example.test.evil.example", "x-email-csrf": "1" }],
    ["http scheme mismatch ignored but host must match", { origin: "https://other.example.test", "x-email-csrf": "1" }],
  ];
  for (const [name, headers] of cases) {
    const flags = await handlers.flags(jsonPost("/api/email/messages/5/flags", flagsBody, adminCookie, headers), ctx({ uid: "5" }));
    assert.equal(flags.status, 403, `flags: ${name}`);
    assert.equal((await flags.json()).error.code, "csrf");
    const send = await handlers.send(await sendRequest({ headers }));
    assert.equal(send.status, 403, `send: ${name}`);
  }
  assert.equal(spy.calls.length, 0);

  const ok = await handlers.flags(jsonPost("/api/email/messages/5/flags", flagsBody, adminCookie, CSRF_HEADERS), ctx({ uid: "5" }));
  assert.equal(ok.status, 200);
  const sameSite = await handlers.flags(jsonPost("/api/email/messages/5/flags", flagsBody, adminCookie, { "x-email-csrf": "1", "sec-fetch-site": "same-origin" }), ctx({ uid: "5" }));
  assert.equal(sameSite.status, 200);

  assert.equal(isSameOriginRequest(makeRequest("/x", { headers: { origin: "https://dwebsolutions.rs", "x-email-csrf": "1", "x-forwarded-host": "dwebsolutions.rs" } })), true);
  assert.equal(isSameOriginRequest(makeRequest("/x", { headers: { origin: "https://dwebsolutions.rs", "x-email-csrf": "1" } }), { EMAIL_ALLOWED_ORIGIN: "https://dwebsolutions.rs" }), true);
});

test("CSRF check does not apply to reads, but reads still need the session", async () => {
  const { handlers } = makeHarness();
  assert.equal((await handlers.list(makeRequest("/api/email/messages", { cookie: adminCookie }))).status, 200);
});

test("send: rate limit returns 429 with Retry-After", async () => {
  const { handlers, spy } = makeHarness({ sendLimit: 2 });
  assert.equal((await handlers.send(await sendRequest())).status, 200);
  assert.equal((await handlers.send(await sendRequest())).status, 200);
  const third = await handlers.send(await sendRequest());
  assert.equal(third.status, 429);
  assert.ok(Number(third.headers.get("retry-after")) >= 1);
  assert.equal(spy.calls.filter(([n]) => n === "send").length, 2);
});

test("not configured: generic 503 without variable names, hosts or secrets", async () => {
  const { handlers } = makeHarness({ configured: false });
  const response = await handlers.list(makeRequest("/api/email/messages", { cookie: adminCookie }));
  assert.equal(response.status, 503);
  const text = await response.text();
  assert.match(text, /nije podešen/);
  for (const leak of ["EMAIL_", "PASSWORD", "super-secret", "mail.example.test", "info@example.test"]) assert.equal(text.includes(leak), false, leak);
});

test("errors: EmailError keeps its status, unexpected errors become a generic 500", async () => {
  const typed = makeHarness({ serviceOverrides: { listMessages: async () => { throw new EmailError("imap-connection", 503, "Nije moguće povezati se sa email serverom."); } } });
  const r1 = await typed.handlers.list(makeRequest("/api/email/messages", { cookie: adminCookie }));
  assert.equal(r1.status, 503);
  assert.equal((await r1.json()).error.code, "imap-connection");

  const original = console.error;
  console.error = () => {};
  try {
    const raw = makeHarness({ serviceOverrides: { listMessages: async () => { throw new Error("secret detail super-secret-password-DO-NOT-LEAK at /srv/app"); } } });
    const r2 = await raw.handlers.list(makeRequest("/api/email/messages", { cookie: adminCookie }));
    assert.equal(r2.status, 500);
    const text = await r2.text();
    assert.equal(text.includes("super-secret"), false);
    assert.equal(text.includes("/srv/app"), false);
  } finally {
    console.error = original;
  }
});

test("attachment download is forced to a harmless download (no inline rendering)", async () => {
  const { handlers } = makeHarness();
  const response = await handlers.attachment(makeRequest("/api/email/messages/5/attachments/0?folder=inbox&uidValidity=777", { cookie: adminCookie }), ctx({ uid: "5", index: "0" }));
  assert.equal(response.status, 200);
  assert.equal(response.headers.get("content-type"), "application/octet-stream", "stored content-type (text/html) is ignored");
  const disposition = response.headers.get("content-disposition");
  assert.match(disposition, /^attachment; filename="/);
  assert.equal(/[\r\n]/.test(disposition), false);
  assert.equal(disposition.includes('"ra"'), false, "quotes in the filename can not break out of the header");
  assert.equal(response.headers.get("x-content-type-options"), "nosniff");
  assert.match(response.headers.get("content-security-policy"), /sandbox/);
  assert.equal(await response.text(), "<script>alert(1)</script>");
});

test("send: multipart is parsed, files become buffers, context is validated", async () => {
  const { handlers, spy } = makeHarness();
  const payload = JSON.stringify({
    requestId: "request-id-00000001-abcdef",
    to: "kupac@klijent.rs",
    subject: "Ponuda",
    body: "tekst",
    context: { mode: "reply", folder: "inbox", uid: 9, uidValidity: "777" },
  });
  const response = await handlers.send(await sendRequest({ payload, files: [{ name: "a.txt", content: "AAA" }] }));
  assert.equal(response.status, 200);
  const [, params] = spy.calls.find(([n]) => n === "send");
  assert.equal(params.requestId, "request-id-00000001-abcdef");
  assert.equal(params.files[0].name, "a.txt");
  assert.equal(params.files[0].buffer.toString(), "AAA");
  assert.deepEqual(params.context, { mode: "reply", folder: "inbox", uid: 9, uidValidity: "777", includeAttachments: false });

  const badContext = JSON.stringify({ requestId: "request-id-00000002-abcdef", to: "a@b.rs", body: "x", context: { mode: "reply", folder: "../../x", uid: 1, uidValidity: "1" } });
  assert.equal((await handlers.send(await sendRequest({ payload: badContext }))).status, 400);
  assert.equal((await handlers.send(await sendRequest({ payload: "{not json" }))).status, 400);
});

test("send: wrong content type is 415, oversized body is 413 before parsing", async () => {
  const { handlers, spy } = makeHarness();
  const json = new Request("https://dash.example.test/api/email/send", { method: "POST", body: "{}", headers: { host: "dash.example.test", cookie: adminCookie, "content-type": "application/json", ...CSRF_HEADERS } });
  assert.equal((await handlers.send(json)).status, 415);

  const form = new FormData();
  form.set("payload", "{}");
  form.append("attachments", new File([Buffer.alloc(13 * 1024 * 1024)], "huge.bin"));
  const huge = new Request("https://dash.example.test/api/email/send", { method: "POST", body: form, headers: { host: "dash.example.test", cookie: adminCookie, ...CSRF_HEADERS } });
  const response = await handlers.send(huge);
  assert.equal(response.status, 413);
  assert.equal(spy.calls.length, 0);
});

test("flags: body must be JSON with a boolean `seen`", async () => {
  const { handlers, spy } = makeHarness();
  const call = (body, type = "application/json") => handlers.flags(makeRequest("/api/email/messages/5/flags", { method: "POST", cookie: adminCookie, headers: { "content-type": type, ...CSRF_HEADERS }, body }), ctx({ uid: "5" }));
  assert.equal((await call(JSON.stringify({ folder: "inbox", uidValidity: "1", seen: "yes" }))).status, 400);
  assert.equal((await call("not json")).status, 400);
  assert.equal((await call(flagsBody, "text/plain")).status, 415);
  assert.equal(spy.calls.length, 0);
});
