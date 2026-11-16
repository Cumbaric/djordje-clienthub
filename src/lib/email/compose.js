/*
  Pure helpers that build Reply / Reply All / Forward drafts from a parsed message.
  No Node-only imports: used by the UI (client) and covered by unit tests.
*/

function formatAddress(entry) {
  if (!entry?.address) return "";
  return entry.name ? `${entry.name} <${entry.address}>` : entry.address;
}

function lower(address) {
  return String(address ?? "").trim().toLowerCase();
}

function dedupe(entries, exclude = []) {
  const skip = new Set(exclude.map(lower));
  const seen = new Set();
  const out = [];
  for (const entry of entries ?? []) {
    const key = lower(entry?.address);
    if (!key || skip.has(key) || seen.has(key)) continue;
    seen.add(key);
    out.push(entry);
  }
  return out;
}

export function prefixSubject(subject, kind) {
  const base = String(subject ?? "").trim();
  if (kind === "forward") return /^(fwd?|prosl):/i.test(base) ? base : `Fwd: ${base}`.trim();
  return /^(re|odg):/i.test(base) ? base : `Re: ${base}`.trim();
}

function formatDate(value) {
  const date = value ? new Date(value) : null;
  if (!date || Number.isNaN(date.getTime())) return "";
  return date.toLocaleString("sr-Latn-RS", { dateStyle: "long", timeStyle: "short" });
}

function quote(text) {
  return String(text ?? "")
    .replace(/\r\n?/g, "\n")
    .split("\n")
    .map((line) => (line ? `> ${line}` : ">"))
    .join("\n");
}

/** mode: "reply" | "replyAll". `ownAddress` is the mailbox address (never added as a recipient). */
export function buildReplyDraft(message, mode, ownAddress) {
  const from = message.from?.[0];
  const fromIsMe = lower(from?.address) === lower(ownAddress);

  // Replying to a message I sent goes back to its recipients, otherwise to Reply-To / From.
  const primary = fromIsMe ? message.to : message.replyTo?.length ? message.replyTo : message.from;
  const to = dedupe(primary, [ownAddress]);
  let cc = [];
  if (mode === "replyAll") {
    cc = dedupe([...(message.to ?? []), ...(message.cc ?? [])], [ownAddress, ...to.map((entry) => entry.address)]);
  }

  const who = formatAddress(from) || "nepoznat pošiljalac";
  const when = formatDate(message.date);
  const header = `${when ? `${when}, ` : ""}${who} je napisao/la:`;

  return {
    to: to.map(formatAddress).filter(Boolean),
    cc: cc.map(formatAddress).filter(Boolean),
    subject: prefixSubject(message.subject, "reply"),
    body: `\n\n${header}\n${quote(message.text)}`,
  };
}

export function buildForwardDraft(message) {
  const lines = [
    "---------- Prosleđena poruka ----------",
    `Od: ${(message.from ?? []).map(formatAddress).join(", ")}`,
    `Datum: ${formatDate(message.date)}`,
    `Naslov: ${message.subject ?? ""}`,
    `Za: ${(message.to ?? []).map(formatAddress).join(", ")}`,
  ];
  if (message.cc?.length) lines.push(`Cc: ${message.cc.map(formatAddress).join(", ")}`);
  return {
    to: [],
    cc: [],
    subject: prefixSubject(message.subject, "forward"),
    body: `\n\n${lines.join("\n")}\n\n${message.text ?? ""}`,
  };
}
