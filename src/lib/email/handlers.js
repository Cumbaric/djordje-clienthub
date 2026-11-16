import { EMAIL_LIMITS } from "./limits.js";
import { EmailError, isEmailError, safeErrorLog } from "./errors.js";
import {
  parseFolder,
  parsePage,
  parseSearchQuery,
  parseUid,
  parseUidValidity,
} from "./validation.js";

/*
  HTTP layer for /api/email/*. Every handler runs the same guard, in this order:
    1. authorization (signed session + designated email admin)   401 / 403
    2. CSRF / same-origin check for state-changing requests      403
    3. rate limit                                                429
    4. email configuration present                               503
  and every response is `private, no-store`. Dependencies are injected for tests.
*/

const NO_STORE = {
  "cache-control": "private, no-store, max-age=0",
  pragma: "no-cache",
  vary: "Cookie",
  "x-content-type-options": "nosniff",
};

export function jsonResponse(data, status = 200, headers = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", ...NO_STORE, ...headers },
  });
}

function errorResponse(error, extraHeaders = {}) {
  return jsonResponse(
    { error: { code: error.code, message: error.message, ...(error.details ? { details: error.details } : {}) } },
    error.status,
    extraHeaders,
  );
}

const ERROR_TEXT = {
  401: "Potrebna je prijava.",
  403: "Pristup nije dozvoljen.",
};

/** Same-origin check for requests that change state. */
export function isSameOriginRequest(request, env = process.env) {
  if (request.headers.get("x-email-csrf") !== "1") return false;
  const host = (request.headers.get("x-forwarded-host") || request.headers.get("host") || "").split(",")[0].trim();
  const origin = request.headers.get("origin");
  if (origin) {
    const allowed = String(env.EMAIL_ALLOWED_ORIGIN ?? "").split(",").map((o) => o.trim()).filter(Boolean);
    if (allowed.includes(origin)) return true;
    try {
      return Boolean(host) && new URL(origin).host === host;
    } catch {
      return false;
    }
  }
  return request.headers.get("sec-fetch-site") === "same-origin";
}

async function readBodyLimited(request, max) {
  const declared = Number(request.headers.get("content-length"));
  if (Number.isFinite(declared) && declared > max) {
    throw new EmailError("too-large", 413, "Zahtev je prevelik.");
  }
  const reader = request.body?.getReader();
  if (!reader) return Buffer.alloc(0);
  const chunks = [];
  let total = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    total += value.byteLength;
    if (total > max) {
      await reader.cancel();
      throw new EmailError("too-large", 413, "Zahtev je prevelik.");
    }
    chunks.push(value);
  }
  return Buffer.concat(chunks);
}

async function readJson(request, max = 16 * 1024) {
  if (!/^application\/json\b/i.test(request.headers.get("content-type") ?? "")) {
    throw new EmailError("unsupported-media-type", 415, "Neispravan tip zahteva.");
  }
  const body = await readBodyLimited(request, max);
  try {
    return JSON.parse(body.toString("utf8"));
  } catch {
    throw new EmailError("validation", 400, "Neispravan zahtev.");
  }
}

export function createHandlers({
  authorize,
  getConfig,
  createService,
  limiters,
  limits = EMAIL_LIMITS,
  env = process.env,
}) {
  async function guard(request, { mutating = false, limiter }) {
    const auth = await authorize(request);
    if (!auth.ok) {
      return {
        response: jsonResponse(
          { error: { code: auth.code === "unauthenticated" ? "unauthenticated" : "forbidden", message: ERROR_TEXT[auth.status] } },
          auth.status,
        ),
      };
    }
    if (mutating && !isSameOriginRequest(request, env)) {
      return { response: jsonResponse({ error: { code: "csrf", message: "Zahtev nije dozvoljen." } }, 403) };
    }
    const limit = limiters[limiter].consume(auth.username);
    if (!limit.allowed) {
      return {
        response: jsonResponse(
          { error: { code: "rate-limited", message: "Previše zahteva. Pokušaj ponovo za nekoliko trenutaka." } },
          429,
          { "retry-after": String(Math.max(1, Math.ceil(limit.retryAfterMs / 1000))) },
        ),
      };
    }
    const config = getConfig();
    if (!config.configured) {
      // Variable NAMES are logged for the operator; nothing about them is sent to the client.
      console.error("[email] not configured; problem variables:", config.problems);
      return {
        response: jsonResponse({ error: { code: "not-configured", message: "Email servis nije podešen." } }, 503),
      };
    }
    return { ok: true, auth, service: createService(config) };
  }

  async function respond(request, options, work) {
    try {
      const guarded = await guard(request, options);
      if (guarded.response) return guarded.response;
      return await work(guarded);
    } catch (error) {
      if (isEmailError(error)) return errorResponse(error);
      safeErrorLog("unexpected handler error", error);
      return jsonResponse({ error: { code: "internal", message: "Došlo je do neočekivane greške." } }, 500);
    }
  }

  return {
    list: (request) =>
      respond(request, { limiter: "read" }, async ({ service }) => {
        const params = new URL(request.url).searchParams;
        const result = await service.listMessages({
          folder: parseFolder(params.get("folder") ?? "inbox"),
          page: parsePage(params.get("page")),
          query: parseSearchQuery(params.get("q")),
        });
        return jsonResponse(result);
      }),

    message: (request, context) =>
      respond(request, { limiter: "read" }, async ({ service }) => {
        const params = new URL(request.url).searchParams;
        const { uid } = await context.params;
        const message = await service.getMessage({
          folder: parseFolder(params.get("folder")),
          uid: parseUid(uid),
          uidValidity: parseUidValidity(params.get("uidValidity")),
        });
        return jsonResponse(message);
      }),

    flags: (request, context) =>
      respond(request, { limiter: "write", mutating: true }, async ({ service }) => {
        const body = await readJson(request);
        const { uid } = await context.params;
        if (typeof body?.seen !== "boolean") throw new EmailError("validation", 400, "Neispravan zahtev.");
        const result = await service.setSeen({
          folder: parseFolder(body.folder),
          uid: parseUid(uid),
          uidValidity: parseUidValidity(body.uidValidity),
          seen: body.seen,
        });
        return jsonResponse(result);
      }),

    attachment: (request, context) =>
      respond(request, { limiter: "read" }, async ({ service }) => {
        const params = new URL(request.url).searchParams;
        const { uid, index } = await context.params;
        if (!/^\d{1,3}$/.test(String(index))) throw new EmailError("validation", 400, "Neispravan prilog.");
        const file = await service.getAttachment({
          folder: parseFolder(params.get("folder")),
          uid: parseUid(uid),
          uidValidity: parseUidValidity(params.get("uidValidity")),
          index: Number(index),
        });
        const ascii = file.filename.replace(/[^\x20-\x7e]/g, "_").replace(/["\\;]/g, "_");
        return new Response(file.content, {
          status: 200,
          headers: {
            ...NO_STORE,
            // Never let the browser render attachments inline (HTML/SVG would run in our origin).
            "content-type": "application/octet-stream",
            "content-disposition": `attachment; filename="${ascii}"; filename*=UTF-8''${encodeURIComponent(file.filename)}`,
            "content-length": String(file.content.length),
            "content-security-policy": "default-src 'none'; sandbox",
          },
        });
      }),

    send: (request) =>
      respond(request, { limiter: "send", mutating: true }, async ({ service }) => {
        if (!/^multipart\/form-data\b/i.test(request.headers.get("content-type") ?? "")) {
          throw new EmailError("unsupported-media-type", 415, "Neispravan tip zahteva.");
        }
        const body = await readBodyLimited(request, limits.maxRequestBytes);
        const form = await new Response(body, {
          headers: { "content-type": request.headers.get("content-type") },
        }).formData();

        const rawPayload = form.get("payload");
        if (typeof rawPayload !== "string" || rawPayload.length > 400_000) {
          throw new EmailError("validation", 400, "Neispravan zahtev.");
        }
        let payload;
        try {
          payload = JSON.parse(rawPayload);
        } catch {
          throw new EmailError("validation", 400, "Neispravan zahtev.");
        }

        const uploads = form.getAll("attachments").filter((entry) => typeof entry !== "string");
        const files = [];
        for (const upload of uploads) {
          files.push({
            name: upload.name,
            type: upload.type,
            size: upload.size,
            buffer: Buffer.from(await upload.arrayBuffer()),
          });
        }

        let context = null;
        if (payload.context) {
          context = {
            mode: String(payload.context.mode ?? ""),
            folder: parseFolder(payload.context.folder),
            uid: parseUid(payload.context.uid),
            uidValidity: parseUidValidity(payload.context.uidValidity),
            includeAttachments: payload.context.includeAttachments === true,
          };
        }

        const result = await service.send({
          requestId: payload.requestId,
          fields: {
            to: payload.to,
            cc: payload.cc,
            bcc: payload.bcc,
            subject: payload.subject,
            body: payload.body,
          },
          files,
          context,
        });
        return jsonResponse({ ok: true, ...result });
      }),
  };
}
