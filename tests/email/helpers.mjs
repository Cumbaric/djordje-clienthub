// Shared test helpers: environment, signed sessions, a fake IMAP server and fake SMTP
// transports. Nothing here opens a network connection.
import nodemailer from "nodemailer";
import { createSessionToken } from "../../src/lib/auth.js";

export const SECRET = "test-session-secret-0123456789abcdef0123456789";
export const COOKIE = "test_session";

export const BASE_ENV = {
  EMAIL_IMAP_HOST: "mail.example.test",
  EMAIL_IMAP_PORT: "993",
  EMAIL_SMTP_HOST: "mail.example.test",
  EMAIL_SMTP_PORT: "465",
  EMAIL_USERNAME: "info@example.test",
  EMAIL_PASSWORD: "super-secret-password-DO-NOT-LEAK",
  CLIENTHUB_EMAIL_ADMIN_USERNAME: "owner",
  CLIENTHUB_LOGIN_USERNAME: "owner",
  CLIENTHUB_LOGIN_USERNAME_2: "second-user",
};

/** Installs the session env into process.env (auth.js reads it there). Returns a restore fn. */
export function installSessionEnv(extra = {}) {
  const keys = ["CLIENTHUB_SESSION_SECRET", "CLIENTHUB_AUTH_COOKIE", ...Object.keys(extra)];
  const saved = Object.fromEntries(keys.map((k) => [k, process.env[k]]));
  process.env.CLIENTHUB_SESSION_SECRET = SECRET;
  process.env.CLIENTHUB_AUTH_COOKIE = COOKIE;
  Object.assign(process.env, extra);
  return () => {
    for (const [k, v] of Object.entries(saved)) {
      if (v === undefined) delete process.env[k];
      else process.env[k] = v;
    }
  };
}

export async function cookieFor(username, options) {
  return `${COOKIE}=${await createSessionToken(username, options)}`;
}

export function makeRequest(url, { method = "GET", cookie, headers = {}, body } = {}) {
  const h = new Headers(headers);
  if (cookie) h.set("cookie", cookie);
  if (!h.has("host")) h.set("host", "dash.example.test");
  return new Request(`https://dash.example.test${url}`, { method, headers: h, body });
}

export const CSRF_HEADERS = { origin: "https://dash.example.test", "x-email-csrf": "1" };

/** Builds a realistic RFC 822 buffer using nodemailer's offline stream transport. */
export async function buildMime(options) {
  const transport = nodemailer.createTransport({ streamTransport: true, buffer: true, newline: "unix" });
  const info = await transport.sendMail({
    from: "Pera <pera@client.test>",
    to: "info@example.test",
    subject: "Zdravo",
    text: "Telo poruke",
    date: new Date("2026-11-10T10:00:00Z"),
    messageId: "<orig-1@client.test>",
    ...options,
  });
  return info.message;
}

function structureFor(source) {
  // Cheap stand-in for IMAP BODYSTRUCTURE built from the MIME text.
  const text = source.toString("utf8");
  const hasAttachment = /Content-Disposition: attachment/i.test(text);
  return hasAttachment
    ? { type: "multipart/mixed", childNodes: [{ type: "text/plain" }, { type: "application/pdf", disposition: "attachment" }] }
    : { type: "text/plain" };
}

/**
 * Fake IMAP server + client factory. `server.log` records every call, `server.locks`
 * tracks open mailbox locks and `server.clients` every created client, so tests can
 * assert that locks are released and connections are closed.
 */
export function createFakeImapServer({
  inbox = [],
  sent = [],
  uidValidity = 777n,
  failConnect = null,
  failFetch = null,
  failAppend = false,
  failStatus = false,
  noSentFolder = false,
} = {}) {
  const boxes = {
    INBOX: inbox.map((m) => ({ flags: new Set(), ...m })),
    "INBOX.Sent": sent.map((m) => ({ flags: new Set(["\\Seen"]), ...m })),
  };
  const server = { log: [], locks: { open: 0, total: 0 }, clients: [], boxes, appended: [], uidValidity };

  function messageObject(m, query) {
    const out = { uid: m.uid };
    if (query.flags) out.flags = new Set(m.flags);
    if (query.size) out.size = m.size ?? m.source.length;
    if (query.source) out.source = m.source;
    if (query.envelope) out.envelope = m.envelope ?? { subject: m.subject ?? "", from: m.from ?? [], to: m.to ?? [], date: m.date };
    if (query.internalDate) out.internalDate = m.date ?? new Date("2026-11-10T10:00:00Z");
    if (query.bodyStructure) out.bodyStructure = m.bodyStructure ?? structureFor(m.source ?? Buffer.alloc(0));
    return out;
  }

  server.createClient = () => {
    const client = {
      mailbox: null,
      closed: false,
      loggedOut: false,
      async connect() {
        server.log.push("connect");
        if (failConnect) throw failConnect;
      },
      async logout() {
        server.log.push("logout");
        client.loggedOut = true;
      },
      close() {
        client.closed = true;
      },
      async list() {
        return noSentFolder
          ? [{ path: "INBOX", specialUse: "\\Inbox" }]
          : [{ path: "INBOX" }, { path: "INBOX.Sent", specialUse: "\\Sent" }, { path: "INBOX.Trash", specialUse: "\\Trash" }];
      },
      async status(path, query) {
        server.log.push(`status:${path}`);
        if (failStatus) throw new Error("status unsupported");
        const unseen = boxes[path].filter((m) => !m.flags.has("\\Seen")).length;
        return query.unseen ? { path, unseen } : { path };
      },
      async getMailboxLock(path, options) {
        server.log.push(`lock:${path}:${options?.readOnly ? "ro" : "rw"}`);
        server.locks.open += 1;
        server.locks.total += 1;
        client.mailbox = { path, exists: boxes[path].length, uidValidity };
        return {
          release() {
            server.locks.open -= 1;
            server.log.push(`release:${path}`);
          },
        };
      },
      async search(query, options) {
        server.log.push(`search:${JSON.stringify(query)}`);
        const box = boxes[client.mailbox.path];
        const terms = (query.or ?? [query]).map((q) => String(Object.values(q)[0]).toLowerCase());
        const hits = box.filter((m) => {
          const hay = `${m.subject ?? ""} ${(m.from ?? []).map((a) => a.address).join(" ")} ${m.source?.toString("utf8") ?? ""}`.toLowerCase();
          return terms.some((t) => hay.includes(t));
        });
        return options?.uid ? hits.map((m) => m.uid) : hits.map((m) => box.indexOf(m) + 1);
      },
      async *fetch(range, query, options) {
        server.log.push(`fetch:${range}:${options?.uid ? "uid" : "seq"}`);
        if (failFetch) throw failFetch;
        const box = boxes[client.mailbox.path];
        if (options?.uid) {
          for (const uid of String(range).split(",").map(Number)) {
            const m = box.find((x) => x.uid === uid);
            if (m) yield messageObject(m, query);
          }
        } else {
          const [start, end] = String(range).split(":").map(Number);
          for (let seq = start; seq <= end; seq++) if (box[seq - 1]) yield messageObject(box[seq - 1], query);
        }
      },
      async fetchOne(uid, query) {
        server.log.push(`fetchOne:${uid}`);
        if (failFetch) throw failFetch;
        const m = boxes[client.mailbox.path].find((x) => x.uid === Number(uid));
        return m ? messageObject(m, query) : false;
      },
      async messageFlagsAdd(uid, flags) {
        server.log.push(`flagsAdd:${uid}:${flags.join(",")}`);
        const m = boxes[client.mailbox.path].find((x) => x.uid === Number(uid));
        flags.forEach((f) => m?.flags.add(f));
        return Boolean(m);
      },
      async messageFlagsRemove(uid, flags) {
        server.log.push(`flagsRemove:${uid}:${flags.join(",")}`);
        const m = boxes[client.mailbox.path].find((x) => x.uid === Number(uid));
        flags.forEach((f) => m?.flags.delete(f));
        return Boolean(m);
      },
      async append(path, content, flags) {
        server.log.push(`append:${path}`);
        if (failAppend) throw new Error("append failed");
        server.appended.push({ path, content, flags });
        return { path, uid: 1 };
      },
    };
    server.clients.push(client);
    return client;
  };
  return server;
}

/** Fake nodemailer transport: records mail, optionally fails with a given error. */
export function createFakeTransport({ error = null } = {}) {
  const sentMail = [];
  const transport = {
    sentMail,
    closed: 0,
    async sendMail(mail) {
      if (error) throw error;
      sentMail.push(mail);
      return { messageId: mail.messageId, accepted: [] };
    },
    close() {
      transport.closed += 1;
    },
  };
  return transport;
}

export function smtpError(code, command, extra = {}) {
  return Object.assign(new Error(`${code} ${command}`), { code, command, ...extra });
}

export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
