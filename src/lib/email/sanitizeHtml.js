/*
  Browser-side sanitizing of untrusted email HTML. Defence in depth, outermost first:
    1. the HTML is shown ONLY inside a sandboxed iframe (no allow-scripts, no
       allow-same-origin, no allow-forms), so even a sanitizer bypass cannot run script
       or touch the dashboard origin;
    2. the iframe document carries a CSP that allows no network requests at all
       (images only as data: URIs) -> no tracking pixels, no remote CSS/fonts;
    3. DOMPurify (this file) strips scripts, event handlers, styles, forms, frames,
       SVG/MathML and every URL scheme except http(s)/mailto/tel on links;
    4. remote <img> are replaced by a text placeholder (only embedded data:image/*
       raster images are kept).

  `purify` is injected (DOMPurify instance) so the same code runs in the browser and
  in unit tests (with jsdom).
*/

const FORBID_TAGS = [
  "script", "noscript", "style", "link", "meta", "base", "iframe", "frame", "frameset",
  "object", "embed", "applet", "form", "input", "button", "textarea", "select", "option",
  "template", "video", "audio", "source", "track", "svg", "math", "canvas", "dialog",
];
const FORBID_ATTR = [
  "style", "srcset", "background", "poster", "action", "formaction", "ping", "xlink:href",
  "autofocus", "contenteditable", "draggable",
];

const SAFE_IMAGE_SRC = /^data:image\/(png|jpe?g|gif|webp);base64,[a-z0-9+/=\s]+$/i;
const SAFE_LINK = /^(https?:|mailto:|tel:)/i;

export const EMAIL_FRAME_CSP =
  "default-src 'none'; img-src data:; style-src 'unsafe-inline'; base-uri 'none'; form-action 'none'";

/** Attributes for the <iframe> that displays the sanitized document. */
export const EMAIL_FRAME_SANDBOX = "allow-popups allow-popups-to-escape-sandbox";

/**
 * Returns { supported, html, blockedImages }. When DOMPurify has no DOM to work with
 * (server render) `supported` is false and `html` is null: callers must then fall back
 * to plain text and never render the raw HTML.
 */
export function sanitizeEmailHtml(rawHtml, purify) {
  if (!purify || purify.isSupported !== true || typeof purify.sanitize !== "function") {
    return { supported: false, html: null, blockedImages: 0 };
  }

  let blockedImages = 0;
  const hook = (node) => {
    if (node.nodeName === "IMG") {
      const src = (node.getAttribute("src") || "").trim();
      if (SAFE_IMAGE_SRC.test(src)) return;
      blockedImages += 1;
      const placeholder = node.ownerDocument.createElement("span");
      placeholder.textContent = "[slika blokirana]";
      placeholder.setAttribute("data-blocked-image", "true");
      node.replaceWith(placeholder);
      return;
    }
    if (node.nodeName === "A") {
      const href = (node.getAttribute("href") || "").trim();
      if (!SAFE_LINK.test(href)) {
        node.removeAttribute("href");
      } else {
        node.setAttribute("target", "_blank");
        node.setAttribute("rel", "noopener noreferrer nofollow");
      }
    }
  };

  purify.addHook("afterSanitizeAttributes", hook);
  try {
    const html = purify.sanitize(String(rawHtml ?? ""), {
      USE_PROFILES: { html: true },
      FORBID_TAGS,
      FORBID_ATTR,
      ALLOW_DATA_ATTR: false,
      ALLOW_ARIA_ATTR: false,
    });
    return { supported: true, html, blockedImages };
  } finally {
    purify.removeHook("afterSanitizeAttributes", hook);
  }
}

/** Complete document for the iframe `srcdoc` (content must already be sanitized). */
export function buildEmailSrcdoc(sanitizedHtml) {
  return [
    "<!doctype html><html><head><meta charset=\"utf-8\">",
    `<meta http-equiv="Content-Security-Policy" content="${EMAIL_FRAME_CSP}">`,
    "<style>",
    "html,body{margin:0;padding:0}",
    "body{padding:16px;background:#fff;color:#111827;font:14px/1.6 system-ui,-apple-system,Segoe UI,Roboto,sans-serif;overflow-wrap:anywhere;word-break:break-word}",
    "img{max-width:100%;height:auto}table{max-width:100%}pre{white-space:pre-wrap}a{color:#2563eb}",
    "blockquote{margin:0 0 0 4px;padding-left:12px;border-left:3px solid #d1d5db;color:#4b5563}",
    "</style></head><body>",
    sanitizedHtml,
    "</body></html>",
  ].join("");
}
