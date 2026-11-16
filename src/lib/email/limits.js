// Shared limits for the email module. Pure constants: safe to import from both the
// server code and the client UI (no Node-only imports here).

export const EMAIL_LIMITS = {
  // listing
  pageSize: 25,
  maxPageSize: 50,
  maxSearchChars: 100,
  // reading
  maxMessageBytes: 25 * 1024 * 1024, // refuse to download/parse bigger messages
  maxTextChars: 200_000,
  maxHtmlChars: 1_000_000,
  // composing / sending
  maxRecipients: 25, // To + Cc + Bcc together
  maxAddressChars: 254,
  maxSubjectChars: 200,
  maxBodyChars: 100_000,
  maxAttachments: 5,
  maxAttachmentBytes: 5 * 1024 * 1024,
  maxTotalAttachmentBytes: 10 * 1024 * 1024,
  maxRequestBytes: 12 * 1024 * 1024, // multipart body incl. overhead
  maxFilenameChars: 150,
};

export const EMAIL_FOLDERS = ["inbox", "sent"];

// Extensions that are almost always malware vectors; refuse to send them.
export const BLOCKED_ATTACHMENT_EXTENSIONS = [
  "exe", "bat", "cmd", "com", "scr", "pif", "msi", "vbs", "vbe", "js", "jse",
  "wsf", "wsh", "jar", "ps1", "lnk", "hta", "cpl", "reg",
];
