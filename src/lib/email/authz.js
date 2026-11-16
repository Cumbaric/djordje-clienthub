import { createHash, timingSafeEqual } from "node:crypto";
import { getAuthCookieName, verifySessionToken } from "../auth.js";

/*
  Email module authorization.

  The email module may be used by exactly one dashboard account: the one whose
  username equals CLIENTHUB_EMAIL_ADMIN_USERNAME. Identity comes ONLY from the
  signed session cookie (payload.sub, verified in src/lib/auth.js). Nothing the
  client sends (query string, body, headers other than the cookie) can grant access.

  Access is denied unless ALL of these hold:
    1. the session cookie is valid (signature, expiry)           -> otherwise 401
    2. CLIENTHUB_EMAIL_ADMIN_USERNAME is set and not blank
    3. session.sub equals it exactly (constant-time comparison)
    4. exactly ONE configured dashboard login has that username   -> unambiguous match
  Failures of 2-4 are 403.
*/

const LOGIN_USERNAME_KEYS = ["CLIENTHUB_LOGIN_USERNAME", "CLIENTHUB_LOGIN_USERNAME_2"];

function digest(value) {
  return createHash("sha256").update(String(value)).digest();
}

function safeEqual(a, b) {
  return timingSafeEqual(digest(a), digest(b));
}

/** Pure decision: is `session` the designated email admin? */
export function authorizeEmailAdmin(session, env = process.env) {
  if (!session || typeof session.sub !== "string" || session.sub === "") {
    return { ok: false, status: 401, code: "unauthenticated" };
  }

  const admin = String(env.CLIENTHUB_EMAIL_ADMIN_USERNAME ?? "").trim();
  if (!admin) return { ok: false, status: 403, code: "admin-not-configured" };

  if (!safeEqual(session.sub, admin)) return { ok: false, status: 403, code: "forbidden" };

  const matches = LOGIN_USERNAME_KEYS.filter((key) => {
    const configured = String(env[key] ?? "");
    return configured !== "" && safeEqual(configured, admin);
  });
  if (matches.length !== 1) return { ok: false, status: 403, code: "ambiguous-admin" };

  return { ok: true, username: session.sub };
}

function parseCookies(header) {
  const out = {};
  if (typeof header !== "string") return out;
  for (const part of header.split(";")) {
    const index = part.indexOf("=");
    if (index < 0) continue;
    const name = part.slice(0, index).trim();
    if (!name || name in out) continue;
    try {
      out[name] = decodeURIComponent(part.slice(index + 1).trim());
    } catch {
      out[name] = part.slice(index + 1).trim();
    }
  }
  return out;
}

/** Verified session from a Request's cookie header, or null. */
export async function getSessionFromRequest(request, { now } = {}) {
  const cookieName = getAuthCookieName();
  if (!cookieName) return null;
  const token = parseCookies(request.headers.get("cookie"))[cookieName];
  return verifySessionToken(token, now === undefined ? undefined : { now });
}

/** For route handlers: { ok: true, username } or { ok: false, status, code }. */
export async function authorizeApiRequest(request, options = {}) {
  const env = options.env ?? process.env;
  const session = await getSessionFromRequest(request, { now: options.now });
  return authorizeEmailAdmin(session, env);
}

/**
 * For server components / layouts. Unauthenticated users are redirected to /login;
 * otherwise returns { ok, username } / { ok: false, status, code }.
 */
export async function requireEmailAdmin() {
  const { getSession } = await import("../auth.js");
  const session = await getSession();
  if (!session) {
    const { redirect } = await import("next/navigation");
    redirect("/login");
  }
  return authorizeEmailAdmin(session);
}

/** Non-redirecting variant for the layout (decides whether to show the sidebar item). */
export async function isEmailAdmin() {
  const { getSession } = await import("../auth.js");
  const session = await getSession();
  return authorizeEmailAdmin(session).ok;
}
