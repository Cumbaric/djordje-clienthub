// Browser-level UI tests for the email module (real components, mocked fetch, headless Chrome
// via puppeteer-core). Covers: interactions, loading/empty/error states, sandboxed HTML body,
// double-submit protection, light/dark themes and 5 viewport widths without horizontal overflow.
// Skipped (reported as PENDING) when no Chrome/Edge/Chromium is installed.
import test, { after, before } from "node:test";
import assert from "node:assert/strict";
import { mkdirSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import puppeteer from "puppeteer-core";
import { buildHarness, findBrowser, OUT } from "./ui/build.mjs";

const browserPath = findBrowser();
const SHOTS = process.env.EMAIL_UI_SHOTS || "";
const VIEWPORTS = [
  { name: "desktop-1440", width: 1440, height: 900 },
  { name: "laptop-1024", width: 1024, height: 800 },
  { name: "tablet-768", width: 768, height: 1024 },
  { name: "mobile-390", width: 390, height: 844, mobile: true },
  { name: "small-320", width: 320, height: 640, mobile: true },
];
const THEMES = ["light", "dark"];

let browser;
let page;

before(async () => {
  if (!browserPath) return;
  page = (await buildHarness()).page;
  browser = await puppeteer.launch({ executablePath: browserPath, headless: true, args: ["--no-sandbox", "--disable-gpu", "--allow-file-access-from-files"] });
  if (SHOTS) mkdirSync(SHOTS, { recursive: true });
});
after(async () => {
  await browser?.close();
});

async function openScene({ theme, viewport, scene, extra = "" }) {
  const tab = await browser.newPage();
  await tab.setViewport({ width: viewport.width, height: viewport.height, deviceScaleFactor: 1, isMobile: Boolean(viewport.mobile), hasTouch: Boolean(viewport.mobile) });
  const errors = [];
  tab.on("pageerror", (error) => errors.push(String(error)));
  await tab.goto(`${pathToFileURL(page).href}?theme=${theme}&scene=${scene}${extra}`);
  await tab.waitForFunction(() => document.title === "DONE", { timeout: 90_000 });
  return { tab, errors };
}

for (const theme of THEMES) {
  for (const viewport of VIEWPORTS) {
    test(`UI flow @${viewport.name} (${theme}): interactions, states, sandbox, no overflow`, { skip: !browserPath && "PENDING: no Chrome/Edge/Chromium found (set EMAIL_UI_BROWSER)", timeout: 120_000 }, async () => {
      const { tab, errors } = await openScene({ theme, viewport, scene: "run" });
      try {
        const data = await tab.evaluate(() => window.__results);
        const failed = data.results.filter((r) => !r.pass);
        assert.ok(data.results.length >= 45, `expected a full scenario, got ${data.results.length} checks`);
        assert.deepEqual(failed.map((f) => `${f.name} :: ${f.detail}`), []);
        assert.deepEqual(errors, [], "no uncaught page errors");
      } finally {
        await tab.close();
      }
    });
  }
}

test("screenshots of the key scenes (kept only when EMAIL_UI_SHOTS is set)", { skip: !browserPath && "PENDING: no browser", timeout: 300_000 }, async () => {
  const scenes = ["list", "message", "hostile", "compose", "empty", "error"];
  let taken = 0;
  for (const theme of THEMES) {
    for (const viewport of VIEWPORTS.filter((v) => ["desktop-1440", "tablet-768", "mobile-390"].includes(v.name))) {
      for (const scene of scenes) {
        const { tab } = await openScene({ theme, viewport, scene });
        try {
          const bad = (await tab.evaluate(() => window.__results)).results.filter((r) => !r.pass);
          assert.deepEqual(bad.map((b) => b.name), [], `${scene} ${viewport.name} ${theme}`);
          if (SHOTS) await tab.screenshot({ path: join(SHOTS, `${scene}-${viewport.name}-${theme}.png`), fullPage: false });
          taken += 1;
        } finally {
          await tab.close();
        }
      }
    }
  }
  assert.equal(taken, THEMES.length * 3 * scenes.length);
});

test("sidebar: the Email item exists only when the layout says the user is the email admin", { skip: !browserPath && "PENDING: no browser" }, async () => {
  for (const [extra, expected] of [["", true], ["&showEmail=0", false]]) {
    const { tab } = await openScene({ theme: "light", viewport: VIEWPORTS[0], scene: "list", extra });
    try {
      const present = await tab.evaluate(() => Boolean(document.querySelector('nav a[href="/dashboard/email"]')));
      const other = await tab.evaluate(() => Boolean(document.querySelector('nav a[href="/dashboard/notes"]')));
      assert.equal(present, expected, `showEmail=${expected}`);
      assert.equal(other, true, "other dashboard items stay visible");
    } finally {
      await tab.close();
    }
  }
});

test("keyboard: folders and message rows are reachable with Tab, activate with Enter, and show a focus ring", { skip: !browserPath && "PENDING: no browser", timeout: 60_000 }, async () => {
  const { tab } = await openScene({ theme: "light", viewport: VIEWPORTS[0], scene: "list" });
  try {
    await tab.focus("#email-search");
    let landed = false;
    for (let i = 0; i < 14 && !landed; i += 1) {
      await tab.keyboard.press("Tab");
      landed = await tab.evaluate(() => Boolean(document.activeElement?.closest('ul[aria-label="Primljene poruke"]')));
    }
    assert.equal(landed, true, "a message row received keyboard focus");
    const ring = await tab.evaluate(() => {
      const style = getComputedStyle(document.activeElement);
      return { width: style.outlineWidth, style: style.outlineStyle };
    });
    assert.ok(ring.style !== "none" && parseFloat(ring.width) >= 2, `visible focus ring, got ${JSON.stringify(ring)}`);
    await tab.keyboard.press("Enter");
    await tab.waitForSelector("article h2", { timeout: 5000 });
    const subject = await tab.$eval("article h2", (el) => el.textContent);
    assert.ok(subject.length > 0);
    // every interactive control in the message toolbar is a real button reachable by keyboard
    const toolbar = await tab.$$eval("article button", (buttons) => buttons.map((b) => b.tabIndex));
    assert.ok(toolbar.length >= 4 && toolbar.every((index) => index >= 0));
  } finally {
    await tab.close();
  }
});
