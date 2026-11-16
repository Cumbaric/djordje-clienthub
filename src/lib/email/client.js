/*
  Browser-side helpers for the /api/email/* endpoints. State-changing requests carry
  the x-email-csrf header (checked server-side together with the Origin header).
*/

export class ApiError extends Error {
  constructor(message, status, code, details) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

async function parse(response) {
  let data = null;
  try {
    data = await response.json();
  } catch {
    // non-JSON error body (proxy error page etc.)
  }
  if (!response.ok) {
    throw new ApiError(
      data?.error?.message || "Došlo je do greške. Pokušaj ponovo.",
      response.status,
      data?.error?.code,
      data?.error?.details,
    );
  }
  return data;
}

const BASE = { credentials: "same-origin", cache: "no-store" };

export async function fetchList({ folder, page, query, signal }) {
  const params = new URLSearchParams({ folder, page: String(page) });
  if (query) params.set("q", query);
  return parse(await fetch(`/api/email/messages?${params}`, { ...BASE, signal }));
}

export async function fetchMessage({ folder, uid, uidValidity, signal }) {
  const params = new URLSearchParams({ folder, uidValidity: String(uidValidity) });
  return parse(await fetch(`/api/email/messages/${uid}?${params}`, { ...BASE, signal }));
}

export async function updateSeen({ folder, uid, uidValidity, seen }) {
  return parse(
    await fetch(`/api/email/messages/${uid}/flags`, {
      ...BASE,
      method: "POST",
      headers: { "content-type": "application/json", "x-email-csrf": "1" },
      body: JSON.stringify({ folder, uidValidity: String(uidValidity), seen }),
    }),
  );
}

export async function sendMessage({ payload, files }) {
  const form = new FormData();
  form.set("payload", JSON.stringify(payload));
  for (const file of files) form.append("attachments", file, file.name);
  return parse(
    await fetch("/api/email/send", {
      ...BASE,
      method: "POST",
      headers: { "x-email-csrf": "1" },
      body: form,
    }),
  );
}

export function attachmentUrl({ folder, uid, uidValidity, index }) {
  const params = new URLSearchParams({ folder, uidValidity: String(uidValidity) });
  return `/api/email/messages/${uid}/attachments/${index}?${params}`;
}

export function newRequestId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  return `req-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`;
}

export function formatBytes(bytes) {
  if (!Number.isFinite(bytes) || bytes < 0) return "";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / 1048576).toFixed(1)} MB`;
}

export function formatListDate(value, now = new Date()) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  const sameDay = date.toDateString() === now.toDateString();
  return sameDay
    ? date.toLocaleTimeString("sr-Latn-RS", { hour: "2-digit", minute: "2-digit" })
    : date.toLocaleDateString("sr-Latn-RS", { day: "2-digit", month: "2-digit", year: "numeric" });
}

export function formatFullDate(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleString("sr-Latn-RS", { dateStyle: "long", timeStyle: "short" });
}

export function formatPerson(entry) {
  if (!entry) return "";
  return entry.name ? `${entry.name} <${entry.address}>` : entry.address;
}

export function shortPerson(entry) {
  if (!entry) return "(nepoznato)";
  return entry.name || entry.address;
}
