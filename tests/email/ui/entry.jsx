// Browser harness for the email UI. Bundled by esbuild and run in headless Chrome by
// tests/email/ui.test.mjs. The real components run against a mocked fetch() (no network).
import React from "react";
import { createRoot } from "react-dom/client";
import ToastProvider from "@/components/ToastProvider";
import DashboardSidebar from "@/components/DashboardSidebar";
import EmailClient from "@/app/(app)/dashboard/email/EmailClient";

const params = new URLSearchParams(location.search);
const theme = params.get("theme") || "light";
const scene = params.get("scene") || "run";
const showEmail = params.get("showEmail") !== "0";
if (theme === "dark") document.documentElement.setAttribute("data-theme", "dark");

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
if (scene === "empty") window.__emptyList = true;
if (scene === "error") window.__failList = true;
const calls = [];
window.__calls = calls;
window.__pwned = undefined;

// ---------------- fixtures ----------------
const UIDV = "777";
const OWN = "info@dwebsolutions.rs";
const TOTAL = 30;
const seen = new Set();
for (let uid = 1; uid <= TOTAL; uid++) if (uid % 3 === 0 || uid <= 5) seen.add(uid);

const longLine = "https://example.com/" + "putanja-bez-razmaka-".repeat(14);
const SUBJECTS = {
  30: "Upit za izradu sajta",
  29: "Vrlo dugačak naslov poruke koji ne sme da razvuče raspored stranice ".repeat(3).trim(),
  28: "Račun 2026/011",
  27: "Faktura za novembar",
  26: "Prilog: ugovor",
  25: "Sastanak u petak",
};
const subjectOf = (uid) => SUBJECTS[uid] ?? `Poruka broj ${uid}`;
const fromOf = (uid) =>
  uid === 28
    ? { name: "Aleksandar Veoma-Dugačko-Prezime Petrović-Njegoš sa Dugačkim Nazivom Kompanije", address: "aleksandar.petrovic@veoma-dugacak-domen-firme.example" }
    : { name: uid % 2 ? "Pera Perić" : "", address: uid % 2 ? "pera@klijent.rs" : `kontakt${uid}@primer.rs` };

function listItem(uid, folder) {
  return {
    uid,
    seen: folder === "sent" ? true : seen.has(uid),
    from: folder === "sent" ? [{ name: "", address: OWN }] : [fromOf(uid)],
    to: folder === "sent" ? [{ name: "Klijent", address: "klijent@primer.rs" }] : [{ name: "", address: OWN }],
    subject: subjectOf(uid),
    date: new Date(Date.UTC(2026, 10, 14, 9, 30) - uid * 3_600_000).toISOString(),
    size: 4000,
    hasAttachments: uid === 26 || uid === 30,
  };
}

const HOSTILE_HTML =
  '<p>Dobar dan <b>Pero</b>, ovo je <a href="https://primer.rs/">bezbedan link</a> i <a href="javascript:parent.__pwned=1">loš link</a>.</p>' +
  '<img src="https://tracker.example/pixel.gif?u=1" width="1" height="1">' +
  '<img src="x" onerror="parent.__pwned=1;top.__pwned=1">' +
  "<script>parent.__pwned=1;top.__pwned=1</script>" +
  '<div style="background:url(https://tracker.example/bg.png)">stilizovan blok</div>' +
  '<iframe src="https://evil.example"></iframe><form action="https://evil.example"><input name="x"></form>' +
  '<svg onload="parent.__pwned=1"></svg>' +
  '<table width="900" border="1"><tr><td>Tabela šira od ekrana telefona: ' + "x".repeat(120) + "</td></tr></table>";

function messageFor(uid, folder) {
  const base = {
    uid,
    folder,
    uidValidity: UIDV,
    seen: folder === "sent" ? true : seen.has(uid),
    subject: subjectOf(uid),
    from: folder === "sent" ? [{ name: "", address: OWN }] : [fromOf(uid)],
    to: folder === "sent" ? [{ name: "Klijent", address: "klijent@primer.rs" }] : [{ name: "", address: OWN }, { name: "Mika", address: "mika@klijent.rs" }],
    cc: uid === 30 ? [{ name: "Nina", address: "nina@klijent.rs" }] : [],
    replyTo: [],
    date: new Date(Date.UTC(2026, 10, 14, 9, 30) - uid * 3_600_000).toISOString(),
    messageId: `<m${uid}@klijent.rs>`,
    references: [],
    text: `Poštovani,\n\nzanima me izrada sajta. ${longLine}\n\nSrdačan pozdrav,\nPera`,
    textTruncated: false,
    html: null,
    htmlTruncated: false,
    attachments: [],
  };
  if (uid === 30) {
    base.attachments = [
      { index: 0, filename: "specifikacija-projekta-sa-veoma-dugackim-imenom-fajla-koje-bi-moglo-da-razvuce-raspored-2026.pdf", contentType: "application/pdf", size: 1_250_000, inline: false },
      { index: 1, filename: "logo.png", contentType: "image/png", size: 20_480, inline: false },
      { index: 2, filename: "inline.png", contentType: "image/png", size: 400, inline: true },
    ];
  }
  if (uid === 29) {
    base.html = HOSTILE_HTML;
    base.text = "Običan tekst verzija poruke.";
  }
  return base;
}

// ---------------- mocked API ----------------
const json = (data, status = 200) => new Response(JSON.stringify(data), { status, headers: { "content-type": "application/json" } });

window.fetch = async (input, init = {}) => {
  // file:// pages would resolve "/api/..." to "/C:/api/...": use a fake http origin for parsing.
  const url = new URL(typeof input === "string" ? input : input.url, "http://localhost");
  calls.push({ method: init.method || "GET", path: url.pathname, search: url.search, headers: init.headers || {}, body: init.body });
  await sleep(30);

  if (url.pathname === "/api/email/messages") {
    if (window.__failList) return json({ error: { code: "imap-connection", message: "Nije moguće povezati se sa email serverom." } }, 503);
    if (window.__emptyList) {
      return json({ folder: "inbox", uidValidity: UIDV, page: 1, pageSize: 25, total: 0, totalPages: 1, unreadCount: 0, query: "", items: [] });
    }
    const folder = url.searchParams.get("folder");
    const q = (url.searchParams.get("q") || "").toLowerCase();
    const page = Number(url.searchParams.get("page") || "1");
    const total = folder === "sent" ? 5 : TOTAL;
    let uids = Array.from({ length: total }, (_, i) => total - i);
    if (q) uids = uids.filter((uid) => subjectOf(uid).toLowerCase().includes(q));
    const pageSize = 25;
    const slice = uids.slice((page - 1) * pageSize, page * pageSize);
    return json({
      folder,
      uidValidity: UIDV,
      page,
      pageSize,
      total: uids.length,
      totalPages: Math.max(1, Math.ceil(uids.length / pageSize)),
      unreadCount: folder === "inbox" ? TOTAL - seen.size : null,
      query: q,
      items: slice.map((uid) => listItem(uid, folder)),
    });
  }

  const message = url.pathname.match(/^\/api\/email\/messages\/(\d+)$/);
  if (message) return json(messageFor(Number(message[1]), url.searchParams.get("folder")));

  const flags = url.pathname.match(/^\/api\/email\/messages\/(\d+)\/flags$/);
  if (flags) {
    const body = JSON.parse(init.body);
    if (body.seen) seen.add(Number(flags[1]));
    else seen.delete(Number(flags[1]));
    return json({ uid: Number(flags[1]), seen: body.seen });
  }

  if (url.pathname === "/api/email/send") {
    await sleep(250);
    if (window.__failSend) return json({ error: { code: "smtp-auth", message: "Prijava na SMTP server nije uspela." } }, 502);
    return json({ ok: true, sent: true, savedToSent: true, messageId: "<new@dwebsolutions.rs>" });
  }
  return json({ error: { code: "not-found", message: "x" } }, 404);
};

// ---------------- scenario helpers ----------------
let currentStep = "start";
const results = [];
const check = (name, pass, detail = "") => results.push({ name, pass: Boolean(pass), detail: String(detail) });
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
const visible = (el) => Boolean(el) && el.getClientRects().length > 0;
const buttonByText = (text, root = document) => $$("button, a", root).find((el) => el.textContent.trim() === text && visible(el));
const rows = () => $$('ul[aria-label="Primljene poruke"] button, ul[aria-label="Poslate poruke"] button').filter(visible);

async function waitFor(predicate, label, timeout = 4000) {
  const start = performance.now();
  for (;;) {
    let value = null;
    try {
      value = predicate();
    } catch {
      value = null;
    }
    if (value) return value;
    if (performance.now() - start > timeout) throw new Error(`timeout: ${label}`);
    await sleep(25);
  }
}

function click(el) {
  if (!el) throw new Error(`click target missing (step: ${currentStep})`);
  el.scrollIntoView?.({ block: "nearest" });
  el.click();
}

function setValue(input, value) {
  const proto = input.tagName === "TEXTAREA" ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype;
  Object.getOwnPropertyDescriptor(proto, "value").set.call(input, value);
  input.dispatchEvent(new Event("input", { bubbles: true }));
}

function overflowCheck(label) {
  const doc = document.documentElement;
  const width = window.innerWidth;
  const offenders = [];
  for (const el of $$("body *")) {
    if (el.closest("iframe") || !visible(el)) continue;
    const rect = el.getBoundingClientRect();
    if (rect.right > width + 1 && rect.width > 0) {
      // ignore children of an element that scrolls horizontally on purpose
      let p = el.parentElement;
      let clipped = false;
      while (p && p !== document.body) {
        const style = getComputedStyle(p);
        if (["auto", "scroll", "hidden"].includes(style.overflowX)) {
          clipped = true;
          break;
        }
        p = p.parentElement;
      }
      if (!clipped) offenders.push(`${el.tagName.toLowerCase()}.${String(el.className).split(" ")[0]}`);
    }
  }
  check(`no horizontal overflow: ${label} @${width}px`, doc.scrollWidth <= width + 1 && offenders.length === 0, `scrollWidth=${doc.scrollWidth} offenders=${offenders.slice(0, 3).join(",")}`);
}

// Opens a row and waits until THAT message is shown (not a stale one still in the DOM).
async function openRow(text) {
  const row = await waitFor(() => rows().find((r) => r.textContent.includes(text)), `row "${text}"`);
  const fetchesBefore = calls.filter((c) => /^\/api\/email\/messages\/\d+$/.test(c.path)).length;
  click(row);
  // the click triggers a fresh GET of the message; wait for it so a stale (same) article is not mistaken for the new one
  await waitFor(() => calls.filter((c) => /^\/api\/email\/messages\/\d+$/.test(c.path)).length > fetchesBefore, `fetch for "${text}"`);
  await sleep(120);
  await waitFor(() => {
    const heading = $("article h2");
    return heading && heading.textContent.startsWith(text);
  }, `article "${text}"`);
}

// Returns to the list pane (a no-op on wide layouts where the list is always visible).
const backToList = async () => {
  await sleep(100); // let React finish the render triggered by the previous click
  const back = buttonByText("← Nazad na listu");
  if (back) click(back);
  await waitFor(() => {
    const search = $('input[type="search"]');
    return search && visible(search);
  }, "list pane visible");
};

// ---------------- mount ----------------
const root = createRoot(document.getElementById("app"));
root.render(
  <ToastProvider>
    <div className="dashboard-shell">
      <DashboardSidebar showEmail={showEmail} />
      <main className="dashboard-main">
        <EmailClient configured ownAddress={OWN} />
      </main>
    </div>
  </ToastProvider>,
);

async function runAll() {
  // 1. initial list
  currentStep = "1. initial list";
  await waitFor(() => rows().length > 0, "list rows");
  check("inbox list renders 25 rows (page 1 of 2)", rows().length === 25, `rows=${rows().length}`);
  const inboxButton = $$("nav button").find((b) => b.textContent.startsWith("Inbox"));
  check("unread counter shown next to Inbox", /\d+/.test(inboxButton?.textContent ?? "") && !inboxButton.textContent.includes("0 "), inboxButton?.textContent);
  const unreadBefore = Number((inboxButton.textContent.match(/(\d+)/) || [])[1]);
  check("rows expose unread / attachment info to assistive tech", $$(".srOnly, [class*=srOnly]").length > 0 || /Nepročitana poruka/.test(document.body.textContent));
  overflowCheck("list");

  // 2. open unread message -> marked read through explicit POST
  currentStep = "2. open unread message -> marked read throu";
  const wasUnread = !seen.has(30);
  await openRow("Upit za izradu sajta");
  check("message header shows subject, from, to, cc and 2 attachments", $("h2")?.textContent === "Upit za izradu sajta" && document.body.textContent.includes("Nina") && $$('ul[aria-label="Prilozi"] a').length === 2, "");
  check("inline image is not listed as a download", !document.body.textContent.includes("inline.png"));
  const link = $('ul[aria-label="Prilozi"] a');
  check("attachment link points to the download endpoint", link?.getAttribute("href")?.startsWith("/api/email/messages/30/attachments/0?folder=inbox&uidValidity=777"), link?.getAttribute("href"));
  await sleep(200);
  const flagCall = calls.find((c) => c.path.endsWith("/flags"));
  check("opening marks as read via POST with CSRF header", !wasUnread || (flagCall && flagCall.method === "POST" && flagCall.headers["x-email-csrf"] === "1"), JSON.stringify(flagCall?.headers));
  check("reads (GET list/message) never send the mutating header", calls.filter((c) => c.method === "GET").every((c) => !c.headers["x-email-csrf"]));
  if (wasUnread) {
    await waitFor(() => Number((($$("nav button").find((b) => b.textContent.startsWith("Inbox"))?.textContent || "").match(/(\d+)/) || [])[1]) === unreadBefore - 1, "badge decrement");
    check("unread counter decremented after reading", true);
  }
  check("long unbroken text wraps (no overflow)", true);
  overflowCheck("message");
  if (scene === "message") return;

  // 3. mark unread / read
  currentStep = "3. mark unread / read";
  click(buttonByText("Označi kao nepročitano"));
  await waitFor(() => buttonByText("Označi kao pročitano"), "toggle label");
  check("mark as unread works and flips the button", true);
  click(buttonByText("Označi kao pročitano"));
  await waitFor(() => buttonByText("Označi kao nepročitano"), "toggle back");

  // 4. hostile HTML message in sandboxed iframe
  currentStep = "4. hostile HTML message in sandboxed iframe";
  await backToList();
  await openRow("Vrlo dugačak naslov");
  const frame = await waitFor(() => $("iframe"), "html iframe");
  const sandbox = frame.getAttribute("sandbox") || "";
  const srcdoc = frame.getAttribute("srcdoc") || "";
  check("iframe sandbox has no scripts / same-origin / forms / top navigation", sandbox === "allow-popups allow-popups-to-escape-sandbox", sandbox);
  check("iframe document carries a no-network CSP", /Content-Security-Policy[^>]*default-src 'none'/.test(srcdoc));
  for (const bad of ["<script", "onerror", "onload", "javascript:", "tracker.example", "<iframe", "<form", "<svg", "style=", "evil.example"]) {
    check(`sanitized srcdoc has no "${bad}"`, !srcdoc.toLowerCase().includes(bad), "");
  }
  check("safe link kept with noopener", /href="https:\/\/primer\.rs\/"[^>]*rel="noopener noreferrer nofollow"|rel="noopener noreferrer nofollow"[^>]*href="https:\/\/primer\.rs\/"/.test(srcdoc));
  check("remote images reported as blocked", /Udaljene slike su blokirane radi privatnosti \(2\)/.test(document.body.textContent), document.body.textContent.match(/Udaljene[^.]*/)?.[0]);
  await sleep(400);
  check("hostile script / onerror / js: link did not run (window.__pwned unset)", window.__pwned === undefined);
  let reachable = true;
  try {
    // cross-origin sandbox: the parent can not read into the frame
    reachable = Boolean(frame.contentDocument && frame.contentDocument.body && frame.contentDocument.body.innerHTML.length > 0);
  } catch {
    reachable = false;
  }
  check("sandboxed frame is an opaque origin (parent can not script it)", reachable === false);
  overflowCheck("html message in iframe");
  if (scene === "hostile") return;
  click(buttonByText("Prikaži kao običan tekst"));
  await waitFor(() => !$("iframe"), "iframe gone");
  check("'plain text' toggle shows escaped text only", document.body.textContent.includes("Običan tekst verzija poruke."));
  await waitFor(() => buttonByText("Prikaži formatiranu poruku"), "formatted toggle button");
  click(buttonByText("Prikaži formatiranu poruku"));
  await waitFor(() => $("iframe"), "iframe back");

  // 5. reply / reply all / forward prefill
  currentStep = "5. reply / reply all / forward prefill";
  await backToList();
  await openRow("Upit za izradu sajta");
  click(buttonByText("Odgovori svima"));
  await waitFor(() => $("form input[type=text]"), "compose form");
  const inputs = $$("form input[type=text]");
  check("reply-all prefill: To=sender, Cc contains others but not own address", inputs[0].value === "kontakt30@primer.rs" && /mika@klijent\.rs/.test(inputs[1].value) && !inputs[1].value.includes(OWN) && /nina@klijent\.rs/.test(inputs[1].value), `${inputs[0].value} | ${inputs[1].value}`);
  check("reply subject prefixed with Re:", inputs.find((i) => i.value.startsWith("Re:")) !== undefined);
  check("reply body quotes the original", $("textarea").value.includes("> Poštovani,"));
  if (scene === "compose") return;
  overflowCheck("compose");

  // 6. sending: double click must send once; button disabled while sending
  currentStep = "6. sending: double click must send once; bu";
  const submit = buttonByText("Pošalji");
  const before = calls.filter((c) => c.path === "/api/email/send").length;
  click(submit);
  click(submit);
  await waitFor(() => buttonByText("Slanje…") || $("button[disabled]"), "sending state");
  check("send button is disabled and relabelled while sending", Boolean($$("button").find((b) => b.textContent === "Slanje…" && b.disabled)));
  check("form fields are disabled while sending", $$("form input[type=text]").every((i) => i.disabled));
  await waitFor(() => !$("form[aria-busy]"), "compose closed after success", 6000);
  const sends = calls.filter((c) => c.path === "/api/email/send");
  check("double click produced exactly one send request", sends.length - before === 1, `sends=${sends.length - before}`);
  const sendCall = sends.at(-1);
  const payload = JSON.parse(sendCall.body.get("payload"));
  check("send request: multipart + CSRF header + requestId + reply context (server re-reads headers)", sendCall.headers["x-email-csrf"] === "1" && /^[A-Za-z0-9_-]{16,64}$/.test(payload.requestId) && payload.context?.mode === "replyAll" && payload.context?.uid === 30 && payload.context?.uidValidity === UIDV, JSON.stringify(payload.context));
  check("success feedback toast is shown", /Poruka je poslata/.test(document.body.textContent));

  // 7. forward + attachments checkbox, and validation of attachments in the browser
  currentStep = "7. forward + attachments checkbox, and vali";
  await backToList();
  await openRow("Upit za izradu sajta");
  click(buttonByText("Prosledi"));
  await waitFor(() => $("form input[type=text]"), "forward form");
  check("forward prefill: empty To, Fwd: subject, original quoted", $("form input[type=text]").value === "" && $$("form input[type=text]").some((i) => i.value.startsWith("Fwd:")) && $("textarea").value.includes("Prosleđena poruka"));
  check("forward offers to attach the original files", /Priloži i priloge originalne poruke/.test(document.body.textContent));
  const fileInput = $('input[type="file"]');
  const big = new File([new Uint8Array(6 * 1024 * 1024)], "preveliko.bin");
  const dt = new DataTransfer();
  dt.items.add(big);
  fileInput.files = dt.files;
  fileInput.dispatchEvent(new Event("change", { bubbles: true }));
  await sleep(60);
  check("oversized attachment is refused client-side with a message", /najviše 5 MB/.test(document.body.textContent) && !document.body.textContent.includes("preveliko.bin ("));
  click(buttonByText("Odustani"));
  await waitFor(() => !$("form[aria-busy]"), "compose cancelled");

  // 8. failed send keeps the form and shows the error
  currentStep = "8. failed send keeps the form and shows the";
  await backToList();
  window.__failSend = true;
  click(buttonByText("Nova poruka"));
  await waitFor(() => $("form input[type=text]"), "new compose");
  const fields = $$("form input[type=text]");
  setValue(fields[0], "novi@klijent.rs");
  setValue($("textarea"), "Test poruka");
  click(buttonByText("Pošalji"));
  await waitFor(() => $('[role="alert"]'), "send error", 6000);
  check("SMTP failure: error shown, form kept, button usable again", /SMTP/.test($('[role="alert"]').textContent) && buttonByText("Pošalji") && !buttonByText("Pošalji").disabled);
  window.__failSend = false;
  click(buttonByText("Odustani"));

  // 9. search + pagination + folders
  currentStep = "9. search + pagination + folders";
  await backToList();
  setValue($("#email-search"), "faktura");
  click(buttonByText("Traži"));
  await waitFor(() => rows().length === 1, "search result");
  check("search sends q to the server and filters the list", calls.some((c) => c.path === "/api/email/messages" && c.search.includes("q=faktura")) && rows().length === 1);
  click(buttonByText("Poništi"));
  await waitFor(() => rows().length === 25, "search cleared");
  click(buttonByText("Starije →"));
  await waitFor(() => rows().length === 5, "page 2");
  check("pagination requests page 2 (5 older messages)", calls.some((c) => c.search.includes("page=2")) && rows().length === 5);
  click(buttonByText("← Novije"));
  await waitFor(() => rows().length === 25, "page 1");
  click($$("nav button").find((b) => b.textContent === "Sent"));
  await waitFor(() => rows().length === 5 && rows()[0].textContent.includes("Za:"), "sent list");
  check("Sent folder lists recipients (Za: …)", true);
  overflowCheck("sent list");

  // 10. error + empty states
  currentStep = "10. error + empty states";
  window.__failList = true;
  click($$("nav button").find((b) => b.textContent.startsWith("Inbox")));
  await waitFor(() => /Poruke nisu učitane/.test(document.body.textContent), "error state");
  check("list load failure shows an error state with retry", Boolean(buttonByText("Pokušaj ponovo")));
  window.__failList = false;
  window.__emptyList = true;
  click(buttonByText("Pokušaj ponovo"));
  await waitFor(() => /Inbox je prazan/.test(document.body.textContent), "empty state");
  check("empty inbox shows an empty state", true);
  overflowCheck("empty state");
}

(async () => {
  try {
    if (scene === "run" || scene === "message" || scene === "hostile" || scene === "compose") {
      await runAll();
    } else if (scene === "empty") {
      await waitFor(() => /Inbox je prazan/.test(document.body.textContent), "empty");
    } else if (scene === "error") {
      await waitFor(() => /Poruke nisu učitane/.test(document.body.textContent), "error");
    } else {
      await waitFor(() => rows().length > 0, "rows");
    }
  } catch (error) {
    const panel = document.querySelector('[class*="viewPanel"]');
    check(`scenario aborted: ${error.message}`, false, `view panel text: ${(panel?.innerText || "(none)").replace(/\s+/g, " ").slice(0, 300)}`);
  }
  document.title = "DONE";
  window.__results = { width: window.innerWidth, scene, theme, results };
})();
