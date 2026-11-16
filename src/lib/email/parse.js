import { simpleParser } from "mailparser";
import { EMAIL_LIMITS } from "./limits.js";
import { EmailError } from "./errors.js";
import { sanitizeFilename } from "./validation.js";

/*
  Message parsing. Everything returned from here is untrusted DATA: it is rendered
  by the UI as escaped text, or (HTML) only after DOMPurify inside a sandboxed iframe.
  Nothing in this module renders or executes message content.
*/

function addresses(field) {
  const groups = Array.isArray(field) ? field : field ? [field] : [];
  const out = [];
  for (const group of groups) {
    for (const entry of group?.value ?? []) {
      if (!entry?.address) continue;
      out.push({ name: String(entry.name ?? "").slice(0, 200), address: String(entry.address).slice(0, 320) });
    }
  }
  return out;
}

function toArray(value) {
  if (!value) return [];
  return (Array.isArray(value) ? value : String(value).split(/\s+/)).map(String).filter(Boolean).slice(-30);
}

function parseOptions() {
  return { skipTextToHtml: true, skipTextLinks: true };
}

/** Parses a raw RFC 822 message into a plain, size-bounded DTO (no attachment bodies). */
export async function parseMessageSource(source, { limits = EMAIL_LIMITS } = {}) {
  const parsed = await simpleParser(source, parseOptions());

  let text = typeof parsed.text === "string" ? parsed.text : "";
  let textTruncated = false;
  if (text.length > limits.maxTextChars) {
    text = text.slice(0, limits.maxTextChars);
    textTruncated = true;
  }

  // mailparser already inlines cid: images as data: URIs inside parsed.html.
  let html = typeof parsed.html === "string" ? parsed.html : null;
  let htmlTruncated = false;
  if (html && html.length > limits.maxHtmlChars) {
    html = null;
    htmlTruncated = true;
  }

  const attachments = (parsed.attachments ?? []).map((attachment, index) => ({
    index,
    filename: sanitizeFilename(attachment.filename || `attachment-${index + 1}`),
    contentType: String(attachment.contentType || "application/octet-stream").slice(0, 120),
    size: Number(attachment.size ?? attachment.content?.length ?? 0),
    // Images embedded in the HTML body (cid:) are shown inline, not listed as downloads.
    inline: Boolean(attachment.related),
  }));

  return {
    messageId: parsed.messageId ? String(parsed.messageId).slice(0, 998) : null,
    inReplyTo: parsed.inReplyTo ? String(parsed.inReplyTo).slice(0, 998) : null,
    references: toArray(parsed.references),
    subject: String(parsed.subject ?? "").slice(0, 998),
    from: addresses(parsed.from),
    to: addresses(parsed.to),
    cc: addresses(parsed.cc),
    replyTo: addresses(parsed.replyTo),
    date: parsed.date instanceof Date && !Number.isNaN(parsed.date.getTime()) ? parsed.date.toISOString() : null,
    text,
    textTruncated,
    html,
    htmlTruncated,
    attachments,
  };
}

/**
 * Returns the attachments of a raw message WITH content (for download / forwarding).
 * `index` selects a single one; throws 404 when it does not exist.
 */
export async function extractAttachments(source, { index } = {}) {
  const parsed = await simpleParser(source, parseOptions());
  const all = (parsed.attachments ?? []).map((attachment, i) => ({
    index: i,
    filename: sanitizeFilename(attachment.filename || `attachment-${i + 1}`),
    contentType: String(attachment.contentType || "application/octet-stream"),
    size: Number(attachment.size ?? attachment.content?.length ?? 0),
    inline: Boolean(attachment.related),
    content: attachment.content,
  }));
  if (index === undefined) return all;
  const found = all[index];
  if (!found) throw new EmailError("attachment-not-found", 404, "Prilog nije pronađen.");
  return found;
}

/** True when an IMAP BODYSTRUCTURE tree contains a real (non-inline-body) attachment. */
export function hasAttachmentPart(node, insideRelated = false) {
  if (!node || typeof node !== "object") return false;
  const type = String(node.type ?? "").toLowerCase();
  const children = Array.isArray(node.childNodes) ? node.childNodes : [];
  if (children.length > 0) {
    const related = type === "multipart/related";
    return children.some((child) => hasAttachmentPart(child, insideRelated || related));
  }
  const disposition = String(node.disposition ?? "").toLowerCase();
  if (disposition === "attachment") return true;
  if (insideRelated) return false; // inline images/assets of an HTML body
  if (type.startsWith("text/") || type.startsWith("multipart/")) return false;
  if (type === "message/delivery-status" || type === "message/disposition-notification") return false;
  return Boolean(node.parameters?.name || node.dispositionParameters?.filename);
}

/** Maps an imapflow FetchMessageObject to the list-row DTO. */
export function summarizeListItem(msg) {
  const envelope = msg.envelope ?? {};
  const map = (list, max) =>
    (list ?? [])
      .filter((entry) => entry?.address)
      .slice(0, max)
      .map((entry) => ({ name: String(entry.name ?? "").slice(0, 200), address: String(entry.address).slice(0, 320) }));
  const rawDate = envelope.date ?? msg.internalDate;
  const date = rawDate ? new Date(rawDate) : null;
  return {
    uid: msg.uid,
    seen: Boolean(msg.flags?.has?.("\\Seen")),
    from: map(envelope.from, 2),
    to: map(envelope.to, 3),
    subject: String(envelope.subject ?? "").slice(0, 300),
    date: date && !Number.isNaN(date.getTime()) ? date.toISOString() : null,
    size: Number(msg.size ?? 0),
    hasAttachments: hasAttachmentPart(msg.bodyStructure),
  };
}
