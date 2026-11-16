import test, { after, before } from "node:test";
import assert from "node:assert/strict";
import { authorizeApiRequest, authorizeEmailAdmin } from "../../src/lib/email/authz.js";
import { describeConfig, getEmailConfig } from "../../src/lib/email/config.js";
import { BASE_ENV, cookieFor, installSessionEnv, makeRequest } from "./helpers.mjs";

let restore;
before(() => {
  restore = installSessionEnv(BASE_ENV);
});
after(() => restore());

// ---------- authorizeEmailAdmin (pure decision) ----------

test("admin session is authorized", () => {
  assert.deepEqual(authorizeEmailAdmin({ sub: "owner" }, BASE_ENV), { ok: true, username: "owner" });
});

test("no session -> 401, other dashboard user -> 403", () => {
  assert.equal(authorizeEmailAdmin(null, BASE_ENV).status, 401);
  assert.equal(authorizeEmailAdmin({ sub: "" }, BASE_ENV).status, 401);
  assert.equal(authorizeEmailAdmin({}, BASE_ENV).status, 401);
  const other = authorizeEmailAdmin({ sub: "second-user" }, BASE_ENV);
  assert.equal(other.ok, false);
  assert.equal(other.status, 403);
});

test("comparison is exact: case, whitespace and prefixes do not match", () => {
  for (const sub of ["Owner", "owner ", " owner", "own", "owner2", "OWNER"]) {
    assert.equal(authorizeEmailAdmin({ sub }, BASE_ENV).ok, false, sub);
  }
});

test("denied when admin variable is missing or blank", () => {
  for (const value of [undefined, "", "   "]) {
    const env = { ...BASE_ENV, CLIENTHUB_EMAIL_ADMIN_USERNAME: value };
    assert.equal(authorizeEmailAdmin({ sub: "owner" }, env).status, 403);
    assert.equal(authorizeEmailAdmin({ sub: "" }, env).status, 401);
  }
});

test("denied when the admin username matches no configured login or both logins", () => {
  const unknown = { ...BASE_ENV, CLIENTHUB_EMAIL_ADMIN_USERNAME: "ghost" };
  assert.equal(authorizeEmailAdmin({ sub: "ghost" }, unknown).code, "ambiguous-admin");
  const duplicated = { ...BASE_ENV, CLIENTHUB_LOGIN_USERNAME_2: "owner" };
  assert.equal(authorizeEmailAdmin({ sub: "owner" }, duplicated).code, "ambiguous-admin");
});

// ---------- authorizeApiRequest (signed cookie) ----------

test("API: valid admin cookie ok; second user 403; anonymous 401", async () => {
  assert.equal((await authorizeApiRequest(makeRequest("/api/email/messages", { cookie: await cookieFor("owner") }))).ok, true);
  const second = await authorizeApiRequest(makeRequest("/api/email/messages", { cookie: await cookieFor("second-user") }));
  assert.equal(second.status, 403);
  assert.equal((await authorizeApiRequest(makeRequest("/api/email/messages"))).status, 401);
});

test("API: forged, tampered and expired tokens are 401", async () => {
  const good = await cookieFor("owner");
  const [name, token] = good.split("=");
  const [payload] = token.split(".");
  const forged = `${name}=${payload}.AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA`;
  assert.equal((await authorizeApiRequest(makeRequest("/x", { cookie: forged }))).status, 401);

  // token for another user with the admin's signature swapped in
  const otherPayload = (await cookieFor("second-user")).split("=")[1].split(".")[0];
  const swapped = `${name}=${otherPayload}.${token.split(".")[1]}`;
  assert.equal((await authorizeApiRequest(makeRequest("/x", { cookie: swapped }))).status, 401);

  const old = await cookieFor("owner", { now: Date.now() - 9 * 60 * 60 * 1000 });
  assert.equal((await authorizeApiRequest(makeRequest("/x", { cookie: old }))).status, 401);
});

test("API: identity can not come from query string, body or headers", async () => {
  const user = await cookieFor("second-user");
  const attempts = [
    "/api/email/messages?sub=owner&admin=true&username=owner",
    "/api/email/messages?CLIENTHUB_EMAIL_ADMIN_USERNAME=second-user",
  ];
  for (const url of attempts) {
    const request = makeRequest(url, { cookie: user, headers: { "x-user": "owner", "x-admin": "1", authorization: "Bearer owner" } });
    assert.equal((await authorizeApiRequest(request)).status, 403, url);
  }
});

// ---------- config ----------

test("config: complete env is configured with TLS forced on", () => {
  const config = getEmailConfig(BASE_ENV);
  assert.equal(config.configured, true);
  assert.equal(config.imap.secure, true);
  assert.equal(config.smtp.secure, true);
  assert.equal(config.imap.port, 993);
  assert.equal(config.smtp.port, 465);
  assert.equal(config.fromAddress, "info@example.test");
});

test("config: missing/invalid values are reported by NAME only and never leak the password", () => {
  const broken = { ...BASE_ENV, EMAIL_PASSWORD: "", EMAIL_IMAP_PORT: "99999", EMAIL_SMTP_HOST: "bad host!", EMAIL_USERNAME: "not-an-email" };
  const config = getEmailConfig(broken);
  assert.equal(config.configured, false);
  assert.deepEqual(config.problems.sort(), ["EMAIL_IMAP_PORT", "EMAIL_PASSWORD", "EMAIL_SMTP_HOST", "EMAIL_USERNAME"]);
  assert.equal(JSON.stringify(config).includes("super-secret"), false);

  const withPassword = getEmailConfig({ ...BASE_ENV, EMAIL_IMAP_PORT: "abc" });
  assert.equal(JSON.stringify(withPassword).includes("super-secret"), false);
  assert.equal(getEmailConfig({}).configured, false);
});

test("config: public description holds no credentials or hosts", () => {
  const description = JSON.stringify(describeConfig(getEmailConfig(BASE_ENV)));
  assert.ok(description.includes("info@example.test"));
  assert.equal(description.includes("super-secret"), false);
  assert.equal(description.includes("mail.example.test"), false);
  assert.deepEqual(describeConfig({ configured: false, problems: ["EMAIL_PASSWORD"] }), { configured: false });
});
