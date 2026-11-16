import { domainToASCII } from "node:url";
import addressparser from "nodemailer/lib/addressparser/index.js";
import { BLOCKED_ATTACHMENT_EXTENSIONS, EMAIL_FOLDERS, EMAIL_LIMITS } from "./limits.js";
import { EmailError } from "./errors.js";

const LOCAL_PART_RE = /^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]{1,64}$/;
const DOMAIN_LABEL_RE = /^[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?$/i;
const CONTROL_RE = /[\u0000-\u001f\u007f]/;
const NAME_STRIP_RE = /[\u0000-\u001f\u007f"<>\\]/g;
const FILENAME_STRIP_RE = /[\u0000-\u001f\u007f<>:"|?*]/g;

function invalid(field, message) {
  return new EmailError("validation", 400, message, { details: { field } });
}

/** Strict-enough address check. Returns the normalized address or null. */
export function normalizeAddress(raw) {
  const value = String(raw ?? "").trim();
  if (!value || value.length > EMAIL_LIMITS.maxAddressChars || CONTROL_RE.test(value)) return null;
  const at = value.lastIndexOf("@");
  if (at < 1) return null;
  const local = value.slice(0, at);
  const domain = domainToASCII(value.slice(at + 1).toLowerCase());
  if (!LOCAL_PART_RE.test(local) || local.startsWith(".") || local.endsWith(".") || local.includes("..")) return null;
  const labels = domain.split(".");
  if (labels.length < 2 || !labels.every((label) => DOMAIN_LABEL_RE.test(label))) return null;
  return `${local}@${domain}`;
}

function cleanName(name) {
  return String(name ?? "").replace(NAME_STRIP_RE, "").trim().slice(0, 80);
}

/**
 * Parses "a@x.com, Name <b@y.com>" (or an array of such strings) into
 * [{ name, address }]. Throws a 400 EmailError naming the field on any bad entry.
 */
export function parseAddressList(input, field) {
  const parts = Array.isArray(input) ? input : [input];
  const result = [];
  for (const part of parts) {
    const text = String(part ?? "").trim();
    if (!text) continue;
    if (CONTROL_RE.test(text) || text.length > 2000) throw invalid(field, "Neispravna email adresa.");
    for (const entry of addressparser(text, { flatten: true })) {
      const address = normalizeAddress(entry.address);
      if (!address) {
        throw invalid(field, `Neispravna email adresa: ${String(entry.address || text).slice(0, 80)}`);
      }
      result.push({ name: cleanName(entry.name), address });
    }
  }
  return result;
}

export function sanitizeSubject(value) {
  const subject = String(value ?? "").replace(/[\r\n\t]+/g, " ").trim();
  if (CONTROL_RE.test(subject)) throw invalid("subject", "Naslov sadrži nedozvoljene karaktere.");
  if (subject.length > EMAIL_LIMITS.maxSubjectChars) {
    throw invalid("subject", `Naslov može imati najviše ${EMAIL_LIMITS.maxSubjectChars} karaktera.`);
  }
  return subject;
}

/** Validates the compose form fields (not the attachments). */
export function validateCompose(input, { limits = EMAIL_LIMITS } = {}) {
  const to = parseAddressList(input?.to, "to");
  const cc = parseAddressList(input?.cc, "cc");
  const bcc = parseAddressList(input?.bcc, "bcc");

  if (to.length + cc.length + bcc.length === 0) throw invalid("to", "Dodaj bar jednog primaoca.");
  if (to.length === 0 && cc.length === 0) throw invalid("to", "Dodaj bar jednog primaoca u polje „Za”.");
  if (to.length + cc.length + bcc.length > limits.maxRecipients) {
    throw invalid("to", `Najviše ${limits.maxRecipients} primalaca po poruci.`);
  }

  const subject = sanitizeSubject(input?.subject);
  const text = String(input?.body ?? "").replace(/\r\n?/g, "\n");
  if (text.includes("\0")) throw invalid("body", "Poruka sadrži nedozvoljene karaktere.");
  if (text.length > limits.maxBodyChars) {
    throw invalid("body", `Poruka može imati najviše ${limits.maxBodyChars} karaktera.`);
  }
  if (!subject && !text.trim()) throw invalid("body", "Poruka je prazna.");

  return { to, cc, bcc, subject, text };
}

/** Last path segment only, no control/special characters, bounded length. */
export function sanitizeFilename(name, { max = EMAIL_LIMITS.maxFilenameChars } = {}) {
  let base = String(name ?? "").split(/[\\/]/).pop() ?? "";
  base = base.replace(FILENAME_STRIP_RE, "").replace(/\s+/g, " ").replace(/^\.+/, "").trim();
  if (!base) return "attachment";
  if (base.length > max) {
    const dot = base.lastIndexOf(".");
    const ext = dot > 0 && base.length - dot <= 10 ? base.slice(dot) : "";
    base = base.slice(0, max - ext.length) + ext;
  }
  return base;
}

export function getExtension(filename) {
  const dot = filename.lastIndexOf(".");
  return dot > 0 ? filename.slice(dot + 1).toLowerCase() : "";
}

export function safeContentType(type) {
  const value = String(type ?? "").toLowerCase().trim();
  return /^[a-z0-9][a-z0-9.+-]{0,60}\/[a-z0-9][a-z0-9.+-]{0,100}$/.test(value)
    ? value
    : "application/octet-stream";
}

/**
 * Validates uploaded files ({ name, type, size, buffer }) against count / size /
 * extension rules. `existingCount` / `existingBytes` account for forwarded files that
 * are already attached. Returns the shape nodemailer expects ({ filename, content,
 * contentType }): only in-memory buffers, never file paths or URLs.
 */
export function validateAttachments(files, { limits = EMAIL_LIMITS, existingCount = 0, existingBytes = 0 } = {}) {
  if (files.length + existingCount > limits.maxAttachments) {
    throw invalid("attachments", `Najviše ${limits.maxAttachments} priloga po poruci.`);
  }
  let total = existingBytes;
  const out = [];
  for (const file of files) {
    const filename = sanitizeFilename(file.name);
    if (BLOCKED_ATTACHMENT_EXTENSIONS.includes(getExtension(filename))) {
      throw invalid("attachments", `Tip priloga nije dozvoljen: ${filename}`);
    }
    if (file.size > limits.maxAttachmentBytes) {
      throw invalid("attachments", `Prilog „${filename}” je veći od ${Math.round(limits.maxAttachmentBytes / 1048576)} MB.`);
    }
    total += file.size;
    if (total > limits.maxTotalAttachmentBytes) {
      throw invalid("attachments", `Ukupna veličina priloga je veća od ${Math.round(limits.maxTotalAttachmentBytes / 1048576)} MB.`);
    }
    out.push({ filename, content: file.buffer, contentType: safeContentType(file.type) });
  }
  return out;
}

export function parseFolder(value) {
  const folder = String(value ?? "");
  if (!EMAIL_FOLDERS.includes(folder)) throw invalid("folder", "Nepoznat folder.");
  return folder;
}

export function parseUid(value) {
  const text = String(value ?? "");
  if (!/^\d{1,10}$/.test(text) || Number(text) < 1) throw invalid("uid", "Neispravan identifikator poruke.");
  return Number(text);
}

export function parseUidValidity(value) {
  const text = String(value ?? "");
  if (!/^\d{1,20}$/.test(text)) throw invalid("uidValidity", "Neispravan identifikator foldera.");
  return text;
}

export function parsePage(value, fallback = 1) {
  if (value === null || value === undefined || value === "") return fallback;
  const text = String(value);
  if (!/^\d{1,5}$/.test(text) || Number(text) < 1) throw invalid("page", "Neispravan broj strane.");
  return Number(text);
}

export function parseSearchQuery(value, { max = EMAIL_LIMITS.maxSearchChars } = {}) {
  const query = String(value ?? "").replace(/[\u0000-\u001f\u007f]/g, " ").replace(/\s+/g, " ").trim();
  if (query.length > max) throw invalid("q", `Pretraga može imati najviše ${max} karaktera.`);
  return query;
}
