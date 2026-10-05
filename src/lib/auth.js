/*
  Signed dashboard session.

  Token format: base64url(JSON payload) + "." + base64url(HMAC-SHA256(payload part))
  Payload:      { sub: username, iat: unix seconds, exp: unix seconds }

  Uses Web Crypto only, so the same code runs in proxy.js and in Node route
  handlers / server actions. No secret ever leaves the server.

  Required env:
    CLIENTHUB_SESSION_SECRET  signing key, at least 32 characters (no fallback)
    CLIENTHUB_AUTH_COOKIE     canonical cookie name (single source of truth)
*/

export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 8;

const MIN_SECRET_LENGTH = 32;
const encoder = new TextEncoder();
const decoder = new TextDecoder();

export function getAuthCookieName() {
  return process.env.CLIENTHUB_AUTH_COOKIE || null;
}

function getSecret() {
  const secret = process.env.CLIENTHUB_SESSION_SECRET;
  if (!secret || secret.length < MIN_SECRET_LENGTH) return null;
  return secret;
}

function toBase64Url(bytes) {
  let binary = "";
  for (const b of bytes) binary += String.fromCharCode(b);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(str) {
  if (!/^[A-Za-z0-9_-]*$/.test(str)) throw new Error("bad base64url");
  const padded = str.replace(/-/g, "+").replace(/_/g, "/") + "===".slice((str.length + 3) % 4);
  const binary = atob(padded);
  return Uint8Array.from(binary, (c) => c.charCodeAt(0));
}

function importKey(secret, usages) {
  return crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    usages,
  );
}

/** Create a signed token for `username`. Throws if the secret is not configured. */
export async function createSessionToken(username, { now = Date.now() } = {}) {
  const secret = getSecret();
  if (!secret) throw new Error("CLIENTHUB_SESSION_SECRET is missing or too short.");

  const iat = Math.floor(now / 1000);
  const payload = { sub: String(username), iat, exp: iat + SESSION_MAX_AGE_SECONDS };
  const payloadPart = toBase64Url(encoder.encode(JSON.stringify(payload)));

  const key = await importKey(secret, ["sign"]);
  const sig = await crypto.subtle.sign("HMAC", key, encoder.encode(payloadPart));
  return `${payloadPart}.${toBase64Url(new Uint8Array(sig))}`;
}

/**
 * Verify a token. Returns the payload ({ sub, iat, exp }) or null for anything
 * invalid: missing secret, malformed, bad signature, missing/expired exp.
 */
export async function verifySessionToken(token, { now = Date.now() } = {}) {
  try {
    const secret = getSecret();
    if (!secret || typeof token !== "string") return null;

    const parts = token.split(".");
    if (parts.length !== 2 || !parts[0] || !parts[1]) return null;
    const [payloadPart, sigPart] = parts;

    // crypto.subtle.verify compares the MAC in constant time.
    const key = await importKey(secret, ["verify"]);
    const valid = await crypto.subtle.verify(
      "HMAC",
      key,
      fromBase64Url(sigPart),
      encoder.encode(payloadPart),
    );
    if (!valid) return null;

    const payload = JSON.parse(decoder.decode(fromBase64Url(payloadPart)));
    if (
      !payload ||
      typeof payload.sub !== "string" ||
      !payload.sub ||
      !Number.isFinite(payload.iat) ||
      !Number.isFinite(payload.exp)
    ) {
      return null;
    }
    if (payload.exp <= Math.floor(now / 1000)) return null;

    return payload;
  } catch {
    return null;
  }
}

/** Current session from the request cookies, or null. Server-side only. */
export async function getSession() {
  const cookieName = getAuthCookieName();
  if (!cookieName) return null;

  const { cookies } = await import("next/headers");
  const cookieStore = await cookies();
  return verifySessionToken(cookieStore.get(cookieName)?.value);
}

/**
 * Guard for server actions. Call it first, before any database access.
 * Without a valid session it redirects to /login (throws), so nothing after it runs.
 */
export async function requireAuth() {
  const session = await getSession();
  if (!session) {
    const { redirect } = await import("next/navigation");
    redirect("/login");
  }
  return session;
}
