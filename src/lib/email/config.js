import { domainToASCII } from "node:url";

/*
  Email configuration, read from server-side environment variables only.

    EMAIL_IMAP_HOST / EMAIL_IMAP_PORT   IMAP over SSL/TLS (993)
    EMAIL_SMTP_HOST / EMAIL_SMTP_PORT   SMTP over SSL/TLS (465)
    EMAIL_USERNAME / EMAIL_PASSWORD     mailbox login; EMAIL_USERNAME is also the From address
    EMAIL_FROM_NAME                     optional display name for the From header

  Both connections always use implicit TLS (secure: true) with certificate
  validation. There is deliberately no switch to turn that off.
*/

const REQUIRED = [
  "EMAIL_IMAP_HOST",
  "EMAIL_IMAP_PORT",
  "EMAIL_SMTP_HOST",
  "EMAIL_SMTP_PORT",
  "EMAIL_USERNAME",
  "EMAIL_PASSWORD",
];

const HOST_RE = /^(?=.{1,253}$)([a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)(\.[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i;
const EMAIL_RE = /^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]{1,64}@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

function readPort(value) {
  if (!/^\d{1,5}$/.test(String(value ?? "").trim())) return null;
  const port = Number(value);
  return port >= 1 && port <= 65535 ? port : null;
}

function readHost(value) {
  const host = String(value ?? "").trim();
  return HOST_RE.test(host) ? host : null;
}

/**
 * Returns { configured: true, imap, smtp, username, password, fromName } or
 * { configured: false, problems: [variable names] }. The problems list holds
 * variable NAMES only, never values.
 */
export function getEmailConfig(env = process.env) {
  const problems = [];
  const get = (key) => String(env[key] ?? "").trim();

  for (const key of REQUIRED) if (!get(key)) problems.push(key);

  const imapHost = readHost(env.EMAIL_IMAP_HOST);
  const smtpHost = readHost(env.EMAIL_SMTP_HOST);
  const imapPort = readPort(env.EMAIL_IMAP_PORT);
  const smtpPort = readPort(env.EMAIL_SMTP_PORT);
  const username = get("EMAIL_USERNAME");

  if (get("EMAIL_IMAP_HOST") && !imapHost) problems.push("EMAIL_IMAP_HOST");
  if (get("EMAIL_SMTP_HOST") && !smtpHost) problems.push("EMAIL_SMTP_HOST");
  if (get("EMAIL_IMAP_PORT") && !imapPort) problems.push("EMAIL_IMAP_PORT");
  if (get("EMAIL_SMTP_PORT") && !smtpPort) problems.push("EMAIL_SMTP_PORT");
  if (username && !EMAIL_RE.test(username)) problems.push("EMAIL_USERNAME");

  const unique = [...new Set(problems)];
  if (unique.length > 0) return { configured: false, problems: unique };

  const fromName = get("EMAIL_FROM_NAME").replace(/[\r\n\0"<>]/g, "").slice(0, 80);

  return {
    configured: true,
    imap: { host: imapHost, port: imapPort, secure: true },
    smtp: { host: smtpHost, port: smtpPort, secure: true },
    username,
    // EMAIL_PASSWORD is intentionally not trimmed: spaces can be part of a password.
    password: String(env.EMAIL_PASSWORD),
    fromName,
    fromAddress: username,
    domain: domainToASCII(username.split("@")[1]) || "localhost",
  };
}

/** Public view of the configuration (no credentials, no hostnames). */
export function describeConfig(config) {
  return config.configured
    ? { configured: true, address: config.fromAddress }
    : { configured: false };
}
