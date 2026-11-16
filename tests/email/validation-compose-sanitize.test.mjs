import test from "node:test";
import assert from "node:assert/strict";
import createDOMPurify from "dompurify";
import { JSDOM } from "jsdom";
import { buildForwardDraft, buildReplyDraft, prefixSubject } from "../../src/lib/email/compose.js";
import { EMAIL_LIMITS } from "../../src/lib/email/limits.js";
import { buildEmailSrcdoc, EMAIL_FRAME_CSP, EMAIL_FRAME_SANDBOX, sanitizeEmailHtml } from "../../src/lib/email/sanitizeHtml.js";
import {
  normalizeAddress,
  parseAddressList,
  parseFolder,
  parsePage,
  parseSearchQuery,
  parseUid,
  parseUidValidity,
  sanitizeFilename,
  validateAttachments,
  validateCompose,
} from "../../src/lib/email/validation.js";

const field = (fn) => {
  try {
    fn();
  } catch (error) {
    return { code: error.code, status: error.status, field: error.details?.field };
  }
  return null;
};

// ---------- addresses / compose validation ----------

test("addresses: valid forms are normalized, bad ones rejected", () => {
  assert.equal(normalizeAddress("Info@Example.COM"), "Info@example.com");
  assert.equal(normalizeAddress("a@b"), null);
  assert.equal(normalizeAddress("a b@example.com"), null);
  assert.equal(normalizeAddress("a@exa mple.com"), null);
  assert.equal(normalizeAddress(".a@example.com"), null);
  assert.equal(normalizeAddress("a..b@example.com"), null);
  assert.equal(normalizeAddress("a@example.com\r\nBcc: x@y.com"), null);
  assert.equal(normalizeAddress(`${"a".repeat(250)}@example.com`), null);
  const list = parseAddressList(["Pera Perić <pera@primer.rs>, mika@primer.rs"], "to");
  assert.deepEqual(list.map((a) => a.address), ["pera@primer.rs", "mika@primer.rs"]);
  assert.equal(list[0].name, "Pera Perić");
});

test("compose: header injection and bad recipients are rejected", () => {
  assert.equal(field(() => validateCompose({ to: "a@b.rs\r\nBcc: evil@x.com", subject: "s", body: "b" })).code, "validation");
  assert.equal(field(() => validateCompose({ to: "nije-adresa", subject: "s", body: "b" })).field, "to");
  assert.equal(field(() => validateCompose({ to: "", subject: "s", body: "b" })).field, "to");
  assert.equal(field(() => validateCompose({ to: "a@b.rs", subject: "x".repeat(300), body: "b" })).field, "subject");
  assert.equal(field(() => validateCompose({ to: "a@b.rs", subject: "", body: "   " })).field, "body");
  assert.equal(field(() => validateCompose({ to: "a@b.rs", subject: "s", body: "x".repeat(EMAIL_LIMITS.maxBodyChars + 1) })).field, "body");
  const many = Array.from({ length: EMAIL_LIMITS.maxRecipients + 1 }, (_, i) => `u${i}@primer.rs`);
  assert.equal(field(() => validateCompose({ to: many, subject: "s", body: "b" })).field, "to");
});

test("compose: valid input is normalized (newlines in subject collapsed)", () => {
  const out = validateCompose({ to: "A@Primer.rs", cc: "b@primer.rs", bcc: "c@primer.rs", subject: "Line1\nLine2", body: "x\r\ny" });
  assert.equal(out.subject, "Line1 Line2");
  assert.equal(out.text, "x\ny");
  assert.equal(out.to[0].address, "A@primer.rs");
  assert.equal(out.bcc.length, 1);
});

test("identifiers and query params are strictly validated", () => {
  assert.equal(parseFolder("inbox"), "inbox");
  assert.equal(field(() => parseFolder("../etc")).field, "folder");
  assert.equal(field(() => parseFolder("INBOX.Trash")).field, "folder");
  assert.equal(parseUid("42"), 42);
  for (const bad of ["0", "-1", "1.5", "abc", "1e3", "99999999999", ""]) assert.ok(field(() => parseUid(bad)), bad);
  assert.equal(parseUidValidity("1700000000"), "1700000000");
  assert.ok(field(() => parseUidValidity("12;DROP")));
  assert.equal(parsePage(null), 1);
  assert.ok(field(() => parsePage("0")));
  assert.equal(parseSearchQuery("  račun \n\t 2026 "), "račun 2026");
  assert.ok(field(() => parseSearchQuery("x".repeat(101))));
});

// ---------- attachments ----------

test("attachments: filenames are sanitized (no path traversal, no control chars)", () => {
  assert.equal(sanitizeFilename("../../etc/passwd"), "passwd");
  assert.equal(sanitizeFilename("C:\\Windows\\system32\\evil.txt"), "evil.txt");
  assert.equal(sanitizeFilename("a\u0000b\r\n<script>.pdf"), "abscript.pdf");
  assert.equal(sanitizeFilename("...hidden"), "hidden");
  assert.equal(sanitizeFilename(""), "attachment");
  assert.ok(sanitizeFilename(`${"a".repeat(400)}.pdf`).length <= EMAIL_LIMITS.maxFilenameChars);
  assert.ok(sanitizeFilename(`${"a".repeat(400)}.pdf`).endsWith(".pdf"));
});

test("attachments: count, size, type and executable rules", () => {
  const file = (name, size, type = "application/pdf") => ({ name, size, type, buffer: Buffer.alloc(Math.min(size, 10)) });
  const ok = validateAttachments([file("a.pdf", 1000), file("../b.png", 2000, "image/png")]);
  assert.deepEqual(ok.map((a) => a.filename), ["a.pdf", "b.png"]);
  assert.ok(Buffer.isBuffer(ok[0].content));
  assert.equal("path" in ok[0], false);
  assert.equal("href" in ok[0], false);
  assert.ok(field(() => validateAttachments([file("setup.exe", 10)])));
  assert.ok(field(() => validateAttachments([file("a.PDF.BAT", 10)])));
  assert.ok(field(() => validateAttachments([file("big.pdf", EMAIL_LIMITS.maxAttachmentBytes + 1)])));
  const six = Array.from({ length: EMAIL_LIMITS.maxAttachments + 1 }, (_, i) => file(`f${i}.txt`, 10));
  assert.ok(field(() => validateAttachments(six)));
  const three = [file("1.bin", 4_000_000), file("2.bin", 4_000_000), file("3.bin", 4_000_000)];
  assert.ok(field(() => validateAttachments(three)), "total size limit");
  assert.ok(field(() => validateAttachments([file("1.txt", 10)], { existingCount: EMAIL_LIMITS.maxAttachments })));
  assert.equal(validateAttachments([file("x.bin", 10, "text/html\r\nX-Evil: 1")])[0].contentType, "application/octet-stream");
});

// ---------- reply / forward drafts ----------

const original = {
  subject: "Ponuda za sajt",
  from: [{ name: "Pera Perić", address: "pera@klijent.rs" }],
  replyTo: [],
  to: [{ name: "", address: "info@dwebsolutions.rs" }, { name: "Mika", address: "mika@klijent.rs" }],
  cc: [{ name: "", address: "Nina@klijent.rs" }],
  date: "2026-11-10T10:00:00Z",
  text: "Prva linija\n\nDruga linija",
};

test("reply goes to sender, reply all adds others but never the own address", () => {
  const reply = buildReplyDraft(original, "reply", "info@dwebsolutions.rs");
  assert.deepEqual(reply.to, ["Pera Perić <pera@klijent.rs>"]);
  assert.deepEqual(reply.cc, []);
  assert.equal(reply.subject, "Re: Ponuda za sajt");
  assert.ok(reply.body.includes("> Prva linija"));
  assert.ok(reply.body.includes("pera@klijent.rs"));

  const all = buildReplyDraft(original, "replyAll", "INFO@dwebsolutions.rs");
  assert.deepEqual(all.to, ["Pera Perić <pera@klijent.rs>"]);
  assert.deepEqual(all.cc, ["Mika <mika@klijent.rs>", "Nina@klijent.rs"]);
});

test("reply honours Reply-To and replying to a sent message goes to its recipients", () => {
  const withReplyTo = buildReplyDraft({ ...original, replyTo: [{ name: "", address: "office@klijent.rs" }] }, "reply", "info@dwebsolutions.rs");
  assert.deepEqual(withReplyTo.to, ["office@klijent.rs"]);
  const mine = { ...original, from: [{ name: "", address: "info@dwebsolutions.rs" }], to: [{ name: "", address: "kupac@x.rs" }] };
  assert.deepEqual(buildReplyDraft(mine, "reply", "info@dwebsolutions.rs").to, ["kupac@x.rs"]);
});

test("subject prefixes are not stacked; forward keeps the original context", () => {
  assert.equal(prefixSubject("Re: Re: x", "reply"), "Re: Re: x");
  assert.equal(prefixSubject("ODG: x", "reply"), "ODG: x");
  assert.equal(prefixSubject("Fwd: x", "forward"), "Fwd: x");
  const forward = buildForwardDraft(original);
  assert.equal(forward.subject, "Fwd: Ponuda za sajt");
  assert.deepEqual(forward.to, []);
  for (const needle of ["Prosleđena poruka", "pera@klijent.rs", "Ponuda za sajt", "Prva linija", "Cc:"]) {
    assert.ok(forward.body.includes(needle), needle);
  }
});

// ---------- HTML sanitization (real DOMPurify on jsdom) ----------

const { window } = new JSDOM("");
const purify = createDOMPurify(window);

function run(html) {
  return sanitizeEmailHtml(html, purify);
}

test("sanitizer: scripts, event handlers and javascript: URLs are removed", () => {
  const payloads = [
    "<script>alert(1)</script><p>ok</p>",
    '<img src=x onerror="alert(1)">',
    '<a href="javascript:alert(1)">klik</a>',
    '<a href="JaVaScRiPt:alert(1)">klik</a>',
    '<a href="  javascript:alert(1)">klik</a>',
    '<a href="data:text/html;base64,PHNjcmlwdD5hbGVydCgxKTwvc2NyaXB0Pg==">d</a>',
    '<p onclick="alert(1)" onmouseover="alert(2)">x</p>',
    '<svg onload="alert(1)"><script>alert(2)</script></svg>',
    '<math><mi xlink:href="javascript:alert(1)">x</mi></math>',
    '<iframe src="https://evil.example"></iframe><object data="x"></object><embed src="x">',
    '<form action="https://evil.example"><input name=p><button>go</button></form>',
    '<meta http-equiv="refresh" content="0;url=https://evil.example"><base href="https://evil.example/">',
    "<style>@import url(https://evil.example/x.css); body{background:url(https://evil.example/p.png)}</style>",
    '<div style="background:url(https://evil.example/p.png)">x</div>',
    "<noscript><p title=\"</noscript><img src=x onerror=alert(1)>\"></noscript>",
    "<textarea></textarea><script>alert(1)</script>",
  ];
  for (const payload of payloads) {
    const { html } = run(payload);
    assert.ok(!/<script/i.test(html), `script survived: ${payload}`);
    assert.ok(!/\son\w+\s*=/i.test(html), `handler survived: ${payload}`);
    assert.ok(!/javascript:/i.test(html), `js url survived: ${payload}`);
    assert.ok(!/<(iframe|object|embed|form|input|button|meta|base|style|svg|math|link)\b/i.test(html), `forbidden tag survived: ${payload}`);
    assert.ok(!/style\s*=|https?:\/\/evil/i.test(html.replace(/href="[^"]*"/g, "")), `style/remote survived: ${payload}`);
  }
});

test("sanitizer: remote images are blocked and counted, embedded raster images kept", () => {
  const remote = run('<p>a</p><img src="https://tracker.example/pixel.gif" width="1" height="1"><img src="//t.example/x.png"><img src="cid:abc">');
  assert.ok(!/<img/i.test(remote.html));
  assert.equal(remote.blockedImages, 3);
  assert.ok(remote.html.includes("[slika blokirana]"));

  const inline = run('<img src="data:image/png;base64,iVBORw0KGgo=" alt="logo">');
  assert.ok(/<img[^>]+src="data:image\/png;base64/.test(inline.html));
  assert.equal(inline.blockedImages, 0);

  const svg = run('<img src="data:image/svg+xml;base64,PHN2Zy8+">');
  assert.ok(!/<img/i.test(svg.html), "svg data URIs are not allowed");
  assert.equal(svg.blockedImages, 1);
});

test("sanitizer: safe links get noopener and open in a new tab; unsafe schemes lose the href", () => {
  const { html } = run('<a href="https://primer.rs/x">web</a> <a href="mailto:a@b.rs">mail</a> <a href="tel:+381601234567">tel</a> <a href="ftp://x">ftp</a> <a href="/relative">rel</a>');
  assert.ok(/href="https:\/\/primer\.rs\/x"[^>]*rel="noopener noreferrer nofollow"/.test(html) || /rel="noopener noreferrer nofollow"[^>]*href="https:\/\/primer\.rs\/x"/.test(html));
  assert.ok(/target="_blank"/.test(html));
  assert.ok(html.includes("mailto:a@b.rs"));
  assert.ok(!/href="ftp:/.test(html));
  assert.ok(!/href="\/relative"/.test(html));
});

test("sanitizer: ordinary formatting survives", () => {
  const { html } = run("<h1>Naslov</h1><p><b>bold</b> <i>it</i></p><ul><li>a</li></ul><table><tr><td>c</td></tr></table><blockquote>q</blockquote>");
  for (const tag of ["h1", "b", "i", "ul", "li", "table", "td", "blockquote"]) assert.ok(html.includes(`<${tag}`), tag);
});

test("sanitizer: without a DOM it refuses to return raw HTML", () => {
  const result = sanitizeEmailHtml("<script>alert(1)</script>", { isSupported: false, sanitize: () => "RAW" });
  assert.deepEqual(result, { supported: false, html: null, blockedImages: 0 });
  assert.equal(sanitizeEmailHtml("<p>x</p>", null).supported, false);
});

test("iframe document: no-network CSP and a script-free sandbox", () => {
  const doc = buildEmailSrcdoc("<p>hi</p>");
  assert.ok(doc.includes(`content="${EMAIL_FRAME_CSP}"`));
  assert.ok(EMAIL_FRAME_CSP.includes("default-src 'none'"));
  assert.ok(!/allow-scripts|allow-same-origin|allow-forms|allow-top-navigation/.test(EMAIL_FRAME_SANDBOX));
  // the sandboxed document itself must not execute anything, even with a hostile body:
  const hostile = run('<img src=x onerror=alert(1)><script>top.location="https://evil"</script>').html;
  const dom = new JSDOM(buildEmailSrcdoc(hostile), { runScripts: "dangerously" });
  assert.equal(dom.window.document.querySelectorAll("script").length, 0);
});
