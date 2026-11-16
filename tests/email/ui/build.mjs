// Builds the browser harness (esbuild) into node_modules/.cache/email-ui and returns paths.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { existsSync } from "node:fs";
import { build } from "esbuild";

const here = dirname(fileURLToPath(import.meta.url));
export const ROOT = resolve(here, "..", "..", "..");
export const OUT = join(ROOT, "node_modules", ".cache", "email-ui");

export function findBrowser() {
  const candidates = [
    process.env.EMAIL_UI_BROWSER,
    "C:/Program Files/Google/Chrome/Application/chrome.exe",
    "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
    "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
    "/usr/bin/google-chrome",
    "/usr/bin/chromium",
    "/usr/bin/chromium-browser",
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  ].filter(Boolean);
  return candidates.find((path) => existsSync(path)) ?? null;
}

export async function buildHarness() {
  mkdirSync(OUT, { recursive: true });
  const result = await build({
    entryPoints: [join(here, "entry.jsx")],
    outfile: join(OUT, "harness.js"),
    bundle: true,
    write: true,
    format: "iife",
    platform: "browser",
    jsx: "automatic",
    loader: { ".js": "jsx", ".css": "local-css" },
    alias: {
      "@": join(ROOT, "src"),
      "next/link": join(here, "next-link.jsx"),
      "next/navigation": join(here, "next-navigation.js"),
    },
    define: { "process.env.NODE_ENV": '"production"' },
    logLevel: "silent",
    metafile: false,
  });
  if (result.errors.length) throw new Error(result.errors.map((e) => e.text).join("\n"));

  const globals = readFileSync(join(ROOT, "src", "app", "globals.css"), "utf8");
  const dashboard = readFileSync(join(ROOT, "src", "styles", "dashboard.css"), "utf8");
  const component = readFileSync(join(OUT, "harness.css"), "utf8");
  const html = (extra) =>
    `<!doctype html><html lang="sr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">` +
    `<style>${globals}</style><style>${dashboard}</style><style>${component}</style>${extra ?? ""}</head>` +
    `<body><div id="app"></div><script src="harness.js"></script></body></html>`;
  writeFileSync(join(OUT, "harness.html"), html());

  return { out: OUT, page: join(OUT, "harness.html") };
}
