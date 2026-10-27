// Detects mojibake: UTF-8 text that was decoded as Windows-1252 and saved again,
// e.g. an em dash turning into three odd characters. Detect-only; it never edits files.
//
//   npm run check:encoding
//
// Exit code 1 when anything is found. A match is only reported when the suspicious
// sequence decodes back to valid UTF-8, so ordinary accented text is left alone.
// No literal mojibake appears in this file (everything is built from \u escapes),
// so the scanner cannot flag itself.

import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { extname } from "node:path";
import { fileURLToPath } from "node:url";

const TEXT_EXTENSIONS = new Set([
  ".js", ".jsx", ".mjs", ".cjs", ".ts", ".tsx", ".json", ".css", ".scss",
  ".html", ".htm", ".md", ".mdx", ".txt", ".xml", ".svg", ".yml", ".yaml", ".sql", ".csv",
]);

// Windows-1252 maps bytes 0x80-0x9F to these characters; the five undefined
// bytes (81, 8D, 8F, 90, 9D) come through as the matching C1 control character.
const CP1252_SPECIALS = {
  0x80: 0x20ac, 0x82: 0x201a, 0x83: 0x0192, 0x84: 0x201e, 0x85: 0x2026,
  0x86: 0x2020, 0x87: 0x2021, 0x88: 0x02c6, 0x89: 0x2030, 0x8a: 0x0160,
  0x8b: 0x2039, 0x8c: 0x0152, 0x8e: 0x017d, 0x91: 0x2018, 0x92: 0x2019,
  0x93: 0x201c, 0x94: 0x201d, 0x95: 0x2022, 0x96: 0x2013, 0x97: 0x2014,
  0x98: 0x02dc, 0x99: 0x2122, 0x9a: 0x0161, 0x9b: 0x203a, 0x9c: 0x0153,
  0x9e: 0x017e, 0x9f: 0x0178,
};

const charToByte = new Map();
for (let byte = 0x80; byte <= 0xff; byte++) {
  charToByte.set(String.fromCodePoint(CP1252_SPECIALS[byte] ?? byte), byte);
}

// U+FFFD, built from its code point so this file holds no literal damage character
const REPLACEMENT = String.fromCharCode(0xfffd);

const strictUtf8 = new TextDecoder("utf-8", { fatal: true });

/**
 * Finds sequences that are UTF-8 read as Windows-1252.
 * Returns [{ index, length, found, fixed }] for the given text.
 */
export function findMojibake(text) {
  const chars = [...text];
  const found = [];
  let offset = 0; // UTF-16 offset of chars[i]
  for (let i = 0; i < chars.length; i++) {
    const lead = charToByte.get(chars[i]);
    const width = chars[i].length;
    if (lead >= 0xc2 && lead <= 0xf4) {
      const need = lead < 0xe0 ? 1 : lead < 0xf0 ? 2 : 3;
      const bytes = [lead];
      for (let k = 1; k <= need; k++) {
        const b = charToByte.get(chars[i + k]);
        if (b === undefined || b < 0x80 || b > 0xbf) break;
        bytes.push(b);
      }
      if (bytes.length === need + 1) {
        try {
          const fixed = strictUtf8.decode(Uint8Array.from(bytes));
          const original = chars.slice(i, i + need + 1).join("");
          found.push({ index: offset, length: original.length, found: original, fixed });
          i += need;
          offset += original.length;
          continue;
        } catch {
          // not valid UTF-8 once re-encoded, so it is ordinary text
        }
      }
    }
    offset += width;
  }
  return found;
}

/** Other signs of damage: U+FFFD, or stray C1 control characters. */
export function findStrayDamage(text, covered = []) {
  const out = [];
  const inMojibake = (idx) => covered.some((m) => idx >= m.index && idx < m.index + m.length);
  const pattern = new RegExp("[\u0080-\u009f" + REPLACEMENT + "]", "g");
  let m;
  while ((m = pattern.exec(text))) {
    if (inMojibake(m.index)) continue;
    out.push({
      index: m.index,
      length: 1,
      found: m[0],
      fixed: null,
      kind: m[0] === REPLACEMENT ? "replacement character" : "C1 control character",
    });
  }
  return out;
}

function lineAndColumn(text, index) {
  const before = text.slice(0, index);
  const line = before.split("\n").length;
  const column = index - before.lastIndexOf("\n");
  return { line, column };
}

function listFiles() {
  const out = execFileSync(
    "git",
    ["ls-files", "-z", "--cached", "--others", "--exclude-standard"],
    { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 }
  );
  return out
    .split("\0")
    .filter(Boolean)
    .filter((file) => TEXT_EXTENSIONS.has(extname(file).toLowerCase()));
}

const hex = (s) =>
  [...s].map((c) => "U+" + c.codePointAt(0).toString(16).toUpperCase().padStart(4, "0")).join(" ");

export function scanFile(file) {
  const buffer = readFileSync(file);
  let text;
  try {
    text = strictUtf8.decode(buffer);
  } catch {
    return [{ file, line: 1, column: 1, kind: "file is not valid UTF-8", found: "", fixed: null }];
  }
  const mojibake = findMojibake(text);
  const stray = findStrayDamage(text, mojibake);
  return [
    ...mojibake.map((m) => ({ ...m, kind: "mojibake" })),
    ...stray,
  ]
    .sort((a, b) => a.index - b.index)
    .map((f) => ({ file, ...lineAndColumn(text, f.index), ...f }));
}

function main() {
  const files = listFiles();
  const findings = files.flatMap(scanFile);
  if (findings.length === 0) {
    console.log(`check:encoding ok (${files.length} text files scanned, no broken characters)`);
    return;
  }
  for (const f of findings) {
    const fix = f.fixed != null ? ` -> ${JSON.stringify(f.fixed)} (${hex(f.fixed)})` : "";
    console.error(`${f.file}:${f.line}:${f.column}  ${f.kind}  ${hex(f.found)}${fix}`);
  }
  console.error(`\ncheck:encoding failed: ${findings.length} problem(s) in ${new Set(findings.map((f) => f.file)).size} file(s)`);
  process.exitCode = 1;
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) main();
