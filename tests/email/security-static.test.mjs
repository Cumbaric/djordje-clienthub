// Static guard rails: rules from the security requirements that must never regress silently.
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(fileURLToPath(new URL("../..", import.meta.url)));

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) walk(full, out);
    else if (/\.(js|jsx|mjs|css)$/.test(name)) out.push(full);
  }
  return out;
}

const emailSources = [
  ...walk(join(ROOT, "src", "lib", "email")),
  ...walk(join(ROOT, "src", "app", "(app)", "dashboard", "email")),
  ...walk(join(ROOT, "src", "app", "(app)", "api", "email")),
].map((file) => ({ file: file.replace(ROOT, ""), text: readFileSync(file, "utf8") }));

const lines = (text) => text.split("\n").filter((line) => !/^\s*(\/\/|\*|\/\*)/.test(line)).join("\n");

test("TLS certificate validation is never disabled", () => {
  for (const { file, text } of emailSources) {
    assert.equal(/rejectUnauthorized\s*:\s*false/.test(text), false, file);
    assert.equal(/NODE_TLS_REJECT_UNAUTHORIZED/.test(text), false, file);
  }
});

test("IMAP and SMTP always use implicit TLS; nodemailer cannot read files or URLs", () => {
  const imap = readFileSync(join(ROOT, "src/lib/email/imap.js"), "utf8");
  const smtp = readFileSync(join(ROOT, "src/lib/email/smtp.js"), "utf8");
  assert.match(imap, /secure:\s*true/);
  assert.match(smtp, /secure:\s*true/);
  assert.match(smtp, /disableFileAccess:\s*true/);
  assert.match(smtp, /disableUrlAccess:\s*true/);
  assert.equal(/secure:\s*false|requireTLS|ignoreTLS/.test(imap + smtp), false);
});

test("email UI never injects HTML into the dashboard page itself", () => {
  for (const { file, text } of emailSources.filter((s) => /dashboard\/email|dashboard\\email/.test(s.file))) {
    const code = lines(text);
    assert.equal(/dangerouslySetInnerHTML/.test(code), false, file);
    assert.equal(/\.innerHTML\s*=|insertAdjacentHTML|document\.write|\beval\(|new Function\(/.test(code), false, file);
    assert.equal(/allow-scripts|allow-same-origin/.test(code), false, file);
  }
});

test("email code never uses edge runtime and always opts out of caching", () => {
  for (const { file, text } of emailSources.filter((s) => /api[\\/]email.*route\.js$/.test(s.file))) {
    assert.match(text, /runtime = "nodejs"/, file);
    assert.match(text, /dynamic = "force-dynamic"/, file);
    assert.equal(/runtime = "edge"/.test(text), false, file);
  }
});

test("every API route handler goes through the guarded handlers (no unguarded endpoint)", () => {
  const routeFiles = emailSources.filter((s) => /api[\\/]email.*route\.js$/.test(s.file));
  assert.equal(routeFiles.length, 5);
  for (const { file, text } of routeFiles) assert.match(text, /emailHandlers\.(list|message|flags|attachment|send)/, file);
  const handlers = readFileSync(join(ROOT, "src/lib/email/handlers.js"), "utf8");
  // each exported handler is built with respond() which always runs guard() first
  assert.equal((handlers.match(/=>\s*respond\(request,\s*\{/g) ?? []).length, 5);
  assert.match(handlers, /async function respond[\s\S]*await guard\(/);
});

test("secrets are never logged, hardcoded or exposed to the client bundle", () => {
  for (const { file, text } of emailSources) {
    const code = lines(text);
    assert.equal(/console\.(log|info|debug|warn|error)\([^)]*(password|EMAIL_PASSWORD|config\.password)/i.test(code), false, file);
    assert.equal(/NEXT_PUBLIC_EMAIL|NEXT_PUBLIC_[A-Z_]*PASS/.test(code), false, file);
    assert.equal(/EMAIL_PASSWORD\s*=\s*["'`][^"'`\s]+/.test(code), false, `${file} hardcodes a password`);
  }
  // client components import only the pure/browser-safe modules
  for (const { file, text } of emailSources.filter((s) => /dashboard[\\/]email[\\/].*\.js$/.test(s.file) && /^"use client"/.test(s.text))) {
    for (const forbidden of ["lib/email/config", "lib/email/imap", "lib/email/smtp", "lib/email/authz", "lib/email/service", "lib/email/handlers", "lib/email/routes"]) {
      assert.equal(text.includes(forbidden), false, `${file} imports server-only ${forbidden}`);
    }
  }
});

test(".env.example documents every variable and contains no real values", () => {
  const example = readFileSync(join(ROOT, ".env.example"), "utf8");
  for (const name of ["EMAIL_IMAP_HOST", "EMAIL_IMAP_PORT", "EMAIL_SMTP_HOST", "EMAIL_SMTP_PORT", "EMAIL_USERNAME", "EMAIL_PASSWORD", "CLIENTHUB_EMAIL_ADMIN_USERNAME"]) {
    assert.match(example, new RegExp(`^${name}=`, "m"), name);
  }
  assert.match(example, /^EMAIL_PASSWORD=\s*(#.*)?$/m, "password must be empty in the example");
  assert.match(example, /^CLIENTHUB_EMAIL_ADMIN_USERNAME=\s*(#.*)?$/m, "admin username must be empty in the example");
  assert.equal(/\/\/[^\s/@]+:[^\s/@]+@/.test(example.replace(/^#.*$/gm, "")), false, "no credentials inside URLs");
});

test("the real .env.local is git-ignored and was never committed", async () => {
  const { execFileSync } = await import("node:child_process");
  const ignored = execFileSync("git", ["check-ignore", ".env.local"], { cwd: ROOT, encoding: "utf8" }).trim();
  assert.equal(ignored, ".env.local");
  const history = execFileSync("git", ["log", "--all", "--oneline", "--", ".env.local", ".env"], { cwd: ROOT, encoding: "utf8" }).trim();
  assert.equal(history, "", "no commit ever touched .env.local / .env");
  const tracked = execFileSync("git", ["ls-files", ".env.local", ".env"], { cwd: ROOT, encoding: "utf8" }).trim();
  assert.equal(tracked, "");
});
