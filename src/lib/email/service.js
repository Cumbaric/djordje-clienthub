import { randomUUID } from "node:crypto";
import { EMAIL_LIMITS } from "./limits.js";
import { EmailError, safeErrorLog } from "./errors.js";
import { validateAttachments, validateCompose } from "./validation.js";

const REQUEST_ID_RE = /^[A-Za-z0-9_-]{16,64}$/;
const CONTEXT_MODES = ["reply", "replyAll", "forward"];

/**
 * Application service: the only place that combines IMAP and SMTP. HTTP handlers call
 * it with already-authorized requests. Dependencies are injected so tests can run it
 * against fakes without any network access.
 */
export function createEmailService({
  config,
  imap,
  smtp,
  idempotency,
  limits = EMAIL_LIMITS,
  now = () => Date.now(),
  randomId = () => randomUUID(),
}) {
  async function loadContext(context) {
    if (!context) return null;
    if (!CONTEXT_MODES.includes(context.mode)) {
      throw new EmailError("validation", 400, "Nepoznat tip odgovora.", { details: { field: "context" } });
    }
    return imap.getMessage({ folder: context.folder, uid: context.uid, uidValidity: context.uidValidity });
  }

  async function forwardedAttachments(context, uploaded) {
    const originals = await imap.getForwardableAttachments({
      folder: context.folder,
      uid: context.uid,
      uidValidity: context.uidValidity,
    });
    const files = originals.map((a) => ({ name: a.filename, type: a.contentType, size: a.size, buffer: a.content }));
    return validateAttachments(files, {
      limits,
      existingCount: uploaded.length,
      existingBytes: uploaded.reduce((sum, a) => sum + (a.content?.length ?? 0), 0),
    });
  }

  return {
    listMessages: (params) => imap.listMessages(params),
    getMessage: (params) => imap.getMessage(params),
    setSeen: (params) => imap.setSeen(params),
    getAttachment: (params) => imap.getAttachment(params),

    /**
     * Validates and sends one message. Never retries automatically.
     *  - SMTP fails before acceptance -> error, nothing stored, same requestId may be retried
     *  - SMTP fails at/after DATA     -> error, requestId stays locked (delivery unknown)
     *  - SMTP ok, Sent append fails   -> { sent: true, savedToSent: false, warning }
     */
    async send({ fields, files = [], context = null, requestId }) {
      if (!REQUEST_ID_RE.test(String(requestId ?? ""))) {
        throw new EmailError("validation", 400, "Nedostaje identifikator zahteva.", { details: { field: "requestId" } });
      }

      // 1. Validate everything that does not need the network.
      const draft = validateCompose(fields, { limits });
      let attachments = validateAttachments(files, { limits });

      // 2. Make sure this logical send runs at most once.
      const state = idempotency.begin(requestId);
      if (state === "pending") {
        throw new EmailError("duplicate-request", 409, "Slanje ove poruke je već u toku.");
      }
      if (state !== "new") {
        if (state.done?.unknown) {
          throw new EmailError(
            "send-unknown",
            409,
            "Prethodni pokušaj slanja nije potvrđen. Proveri folder „Sent” pre ponovnog slanja.",
          );
        }
        return { ...state.done, duplicate: true };
      }

      let original = null;
      try {
        // 3. Threading context (reply / forward) is re-read from the server, never trusted from the client.
        original = await loadContext(context);
        if (context?.mode === "forward" && context.includeAttachments) {
          attachments = [...attachments, ...(await forwardedAttachments(context, attachments))];
        }
      } catch (error) {
        idempotency.release(requestId); // nothing was sent
        throw error;
      }

      const messageId = `<${randomId()}@${config.domain}>`;
      const date = new Date(now());
      const mail = {
        from: { name: config.fromName, address: config.fromAddress },
        to: draft.to,
        cc: draft.cc,
        bcc: draft.bcc,
        subject: draft.subject,
        text: draft.text,
        messageId,
        date,
        attachments,
      };
      if (original && (context.mode === "reply" || context.mode === "replyAll") && original.messageId) {
        mail.inReplyTo = original.messageId;
        mail.references = [...original.references, original.messageId].filter(Boolean).slice(-20);
      }

      // 4. Send exactly once.
      try {
        await smtp.send(mail);
      } catch (error) {
        if (error?.notSent) idempotency.release(requestId);
        else idempotency.complete(requestId, { sent: null, messageId, unknown: true });
        throw error;
      }

      const result = { sent: true, messageId, savedToSent: false };
      idempotency.complete(requestId, result); // from now on a replay can never send again

      // 5. Keep a copy in Sent (SMTP submission does not do that by itself).
      try {
        const raw = await smtp.buildRaw(mail);
        await imap.appendToSent(raw, { date });
        result.savedToSent = true;
      } catch (error) {
        safeErrorLog("append to Sent failed", error);
        result.warning = "Poruka je poslata, ali nije sačuvana u folderu „Sent”.";
      }
      idempotency.complete(requestId, result);
      return result;
    },
  };
}
