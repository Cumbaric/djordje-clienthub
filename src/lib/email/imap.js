import { ImapFlow } from "imapflow";
import { EMAIL_LIMITS } from "./limits.js";
import { EmailError, safeErrorLog } from "./errors.js";
import { createSemaphore } from "./rateLimit.js";
import { extractAttachments, parseMessageSource, summarizeListItem } from "./parse.js";

/*
  IMAP access (imapflow). Design rules:
   - one short-lived connection per operation, always logged out in `finally`;
   - at most 2 connections open at once per process (shared hosting caps per-IP sessions);
   - mailbox locks are always released in `finally`;
   - messages are addressed by UID + UIDVALIDITY, never by sequence number;
   - only the requested page is fetched; message bodies are fetched one at a time and
     refused above EMAIL_LIMITS.maxMessageBytes.
*/

const defaultGate = createSemaphore(2);
const OPERATION_TIMEOUT_MS = 60_000;

export function createImapClient(config) {
  return new ImapFlow({
    host: config.imap.host,
    port: config.imap.port,
    secure: true,
    auth: { user: config.username, pass: config.password },
    logger: false,
    disableAutoIdle: true,
    connectionTimeout: 15_000,
    greetingTimeout: 10_000,
    socketTimeout: 45_000,
    // Certificate validation stays ON (no rejectUnauthorized override anywhere).
    tls: { minVersion: "TLSv1.2" },
  });
}

const TLS_CODES = new Set([
  "CERT_HAS_EXPIRED",
  "DEPTH_ZERO_SELF_SIGNED_CERT",
  "SELF_SIGNED_CERT_IN_CHAIN",
  "UNABLE_TO_VERIFY_LEAF_SIGNATURE",
  "ERR_TLS_CERT_ALTNAME_INVALID",
  "UNABLE_TO_GET_ISSUER_CERT_LOCALLY",
]);
const NETWORK_CODES = new Set([
  "ENOTFOUND", "ECONNREFUSED", "ECONNRESET", "ETIMEDOUT", "EAI_AGAIN", "EHOSTUNREACH", "ENETUNREACH",
  "EPIPE", "NoConnection", "ETIMEOUT", "TIMEOUT", "CONNECTION_TIMEOUT", "GREETING_TIMEOUT",
]);

export function mapImapError(error) {
  if (error instanceof EmailError) return error;
  const code = String(error?.code ?? "");
  if (error?.authenticationFailed || code === "AUTHENTICATIONFAILED" || /AUTH/i.test(String(error?.serverResponseCode ?? ""))) {
    return new EmailError("imap-auth", 502, "Prijava na email server nije uspela. Proveri podešavanja naloga.", { cause: error });
  }
  if (TLS_CODES.has(code)) {
    return new EmailError("imap-tls", 502, "TLS sertifikat email servera nije validan.", { cause: error });
  }
  if (NETWORK_CODES.has(code) || error?.name === "TimeoutError") {
    return new EmailError("imap-connection", 503, "Nije moguće povezati se sa email serverom.", { cause: error });
  }
  if (code === "LockTimeout") {
    return new EmailError("imap-busy", 503, "Email server je zauzet. Pokušaj ponovo.", { cause: error });
  }
  return new EmailError("imap-error", 502, "Greška na email serveru.", { cause: error });
}

const LIST_QUERY = { uid: true, flags: true, envelope: true, internalDate: true, size: true, bodyStructure: true };

export function createImapService({ config, createClient = createImapClient, gate = defaultGate, limits = EMAIL_LIMITS, timeoutMs = OPERATION_TIMEOUT_MS }) {
  async function run(operation) {
    await gate.acquire();
    const client = createClient(config);
    let timer;
    try {
      await client.connect();
      const timeout = new Promise((_, reject) => {
        timer = setTimeout(() => reject(Object.assign(new Error("operation timeout"), { name: "TimeoutError" })), timeoutMs);
      });
      return await Promise.race([operation(client), timeout]);
    } catch (error) {
      const mapped = mapImapError(error);
      if (!(error instanceof EmailError)) safeErrorLog("imap operation failed", error);
      throw mapped;
    } finally {
      clearTimeout(timer);
      try {
        await client.logout();
      } catch {
        try {
          client.close();
        } catch {
          // connection already gone
        }
      }
      gate.release();
    }
  }

  async function resolvePath(client, folder) {
    if (folder === "inbox") return "INBOX";
    const boxes = await client.list();
    const bySpecialUse = boxes.find((box) => box.specialUse === "\\Sent");
    const byName = boxes.find((box) => /^(inbox[./])?(sent|sent items|sent messages|poslato)$/i.test(box.path));
    const found = bySpecialUse ?? byName;
    if (!found) throw new EmailError("sent-folder-missing", 502, "Folder „Sent” nije pronađen na email serveru.");
    return found.path;
  }

  async function withMailbox(client, path, { readOnly }, fn) {
    const lock = await client.getMailboxLock(path, { readOnly });
    try {
      return await fn(client.mailbox);
    } finally {
      lock.release();
    }
  }

  function assertUidValidity(mailbox, expected) {
    if (String(mailbox.uidValidity) !== String(expected)) {
      throw new EmailError("mailbox-changed", 409, "Folder se promenio na serveru. Osveži listu poruka.");
    }
  }

  async function fetchSource(client, uid) {
    const meta = await client.fetchOne(String(uid), { uid: true, flags: true, size: true }, { uid: true });
    if (!meta) throw new EmailError("message-not-found", 404, "Poruka nije pronađena.");
    if (Number(meta.size) > limits.maxMessageBytes) {
      throw new EmailError("message-too-large", 413, "Poruka je prevelika za prikaz u ovoj aplikaciji.");
    }
    const full = await client.fetchOne(String(uid), { uid: true, source: true }, { uid: true });
    if (!full?.source) throw new EmailError("message-not-found", 404, "Poruka nije pronađena.");
    return { source: full.source, seen: Boolean(meta.flags?.has?.("\\Seen")) };
  }

  return {
    /** Newest-first page of a folder, optionally filtered by a server-side search. */
    listMessages({ folder, page = 1, pageSize = limits.pageSize, query = "" }) {
      const size = Math.min(Math.max(1, pageSize), limits.maxPageSize);
      return run(async (client) => {
        const path = await resolvePath(client, folder);

        let unreadCount = null;
        if (folder === "inbox") {
          try {
            const status = await client.status(path, { unseen: true });
            unreadCount = status && Number.isInteger(status.unseen) ? status.unseen : null;
          } catch {
            unreadCount = null; // counter is best-effort
          }
        }

        return withMailbox(client, path, { readOnly: true }, async (mailbox) => {
          let uids = null;
          let total = Number(mailbox.exists ?? 0);
          if (query) {
            const q = String(query);
            const found = await client.search({ or: [{ subject: q }, { from: q }, { to: q }, { body: q }] }, { uid: true });
            uids = (Array.isArray(found) ? found : []).sort((a, b) => a - b);
            total = uids.length;
          }

          const totalPages = Math.max(1, Math.ceil(total / size));
          const current = Math.min(Math.max(1, page), totalPages);
          const base = { folder, uidValidity: String(mailbox.uidValidity), page: current, pageSize: size, total, totalPages, unreadCount, query };
          if (total === 0) return { ...base, items: [] };

          const end = total - (current - 1) * size;
          const items = [];
          if (uids) {
            const slice = uids.slice(Math.max(0, end - size), end);
            for await (const msg of client.fetch(slice.join(","), LIST_QUERY, { uid: true })) items.push(summarizeListItem(msg));
          } else {
            const start = Math.max(1, end - size + 1);
            for await (const msg of client.fetch(`${start}:${end}`, LIST_QUERY)) items.push(summarizeListItem(msg));
          }
          items.sort((a, b) => b.uid - a.uid);
          return { ...base, items };
        });
      });
    },

    /** One parsed message. Does NOT change flags (use setSeen). */
    getMessage({ folder, uid, uidValidity }) {
      return run(async (client) => {
        const path = await resolvePath(client, folder);
        const { source, seen } = await withMailbox(client, path, { readOnly: true }, async (box) => {
          assertUidValidity(box, uidValidity);
          return fetchSource(client, uid);
        });
        const message = await parseMessageSource(source, { limits });
        return { ...message, uid, seen, folder, uidValidity: String(uidValidity) };
      });
    },

    setSeen({ folder, uid, uidValidity, seen }) {
      return run(async (client) => {
        const path = await resolvePath(client, folder);
        return withMailbox(client, path, { readOnly: false }, async (box) => {
          assertUidValidity(box, uidValidity);
          if (seen) await client.messageFlagsAdd(String(uid), ["\\Seen"], { uid: true });
          else await client.messageFlagsRemove(String(uid), ["\\Seen"], { uid: true });
          return { uid, seen: Boolean(seen) };
        });
      });
    },

    /** One attachment with its content, for download. */
    getAttachment({ folder, uid, uidValidity, index }) {
      return run(async (client) => {
        const path = await resolvePath(client, folder);
        const { source } = await withMailbox(client, path, { readOnly: true }, async (box) => {
          assertUidValidity(box, uidValidity);
          return fetchSource(client, uid);
        });
        return extractAttachments(source, { index });
      });
    },

    /** All non-inline attachments with content (used when forwarding). */
    getForwardableAttachments({ folder, uid, uidValidity }) {
      return run(async (client) => {
        const path = await resolvePath(client, folder);
        const { source } = await withMailbox(client, path, { readOnly: true }, async (box) => {
          assertUidValidity(box, uidValidity);
          return fetchSource(client, uid);
        });
        return (await extractAttachments(source)).filter((attachment) => !attachment.inline);
      });
    },

    /** Stores a copy of a sent message in the Sent folder, flagged as read. */
    appendToSent(raw, { date } = {}) {
      return run(async (client) => {
        const path = await resolvePath(client, "sent");
        const result = await client.append(path, raw, ["\\Seen"], date);
        if (!result) throw new EmailError("sent-append-failed", 502, "Poruka nije sačuvana u folderu „Sent”.");
        return true;
      });
    },
  };
}
