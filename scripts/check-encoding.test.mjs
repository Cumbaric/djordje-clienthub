// node --test scripts/check-encoding.test.mjs   (or: npm run test:encoding)
//
// Fixtures are generated at run time by decoding real UTF-8 bytes as Windows-1252,
// which is exactly how the original corruption happened. Nothing damaged is stored
// in this file, so the scanner never flags it.

import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import { findMojibake, findStrayDamage, scanFile } from "./check-encoding.mjs";

const corrupt = (text) => new TextDecoder("windows-1252").decode(Buffer.from(text, "utf8"));

function repair(text) {
  let out = text;
  for (const m of [...findMojibake(text)].reverse()) {
    out = out.slice(0, m.index) + m.fixed + out.slice(m.index + m.length);
  }
  return out;
}

const INTENDED = [
  "—", // em dash
  "·", // middle dot
  "✓", // check mark
  "▸", // small right triangle
  "⏱", // stopwatch
  "←", // left arrow
  "€250", // euro price
  "£300", // pound price
  "Šta je uključeno", // Serbian: sta je ukljuceno
  "Pošalji nam poruku, javićemo ti se", // Serbian: s, c-acute
  "Održavanje i đak", // Serbian: z-caron, d-stroke
  "Četvrtak, Ćir, Đorđe, Život", // Serbian capitals
];

test("every damaged sample is detected and restores to the original text", () => {
  for (const intended of INTENDED) {
    const damaged = corrupt(intended);
    assert.notEqual(damaged, intended, `fixture for ${JSON.stringify(intended)} should differ`);
    assert.ok(findMojibake(damaged).length > 0, `not detected: ${JSON.stringify(intended)}`);
    assert.equal(repair(damaged), intended);
  }
});

test("damage is found inside surrounding clean text, with the right position", () => {
  const damaged = "Brzo, lagano " + corrupt("—") + " bez frameworka";
  const [hit] = findMojibake(damaged);
  assert.equal(hit.index, "Brzo, lagano ".length);
  assert.equal(hit.fixed, "—");
});

test("correct text is never flagged", () => {
  for (const intended of INTENDED) {
    assert.deepEqual(findMojibake(intended), [], JSON.stringify(intended));
    assert.deepEqual(findStrayDamage(intended), [], JSON.stringify(intended));
  }
  const plain = "café naïve über Ångström, plain ASCII, 100% - ok";
  assert.deepEqual(findMojibake(plain), []);
});

test("U+FFFD and stray C1 control characters are reported", () => {
  const replacement = String.fromCharCode(0xfffd);
  assert.equal(findStrayDamage("a" + replacement + "b")[0].kind, "replacement character");
  assert.equal(findStrayDamage("a\u0085b")[0].kind, "C1 control character");
});

test("the scanner and this test file hold no broken characters themselves", () => {
  for (const file of ["scripts/check-encoding.mjs", "scripts/check-encoding.test.mjs"]) {
    assert.deepEqual(scanFile(file), [], file);
  }
});

test("the command exits 1 on a damaged file and 0 on a clean one", () => {
  const dir = mkdtempSync(join(tmpdir(), "enc-check-"));
  const cli = fileURLToPath(new URL("./check-encoding.mjs", import.meta.url));
  const run = () => spawnSync(process.execPath, [cli], { cwd: dir, encoding: "utf8" });
  try {
    spawnSync("git", ["init", "-q"], { cwd: dir });
    writeFileSync(join(dir, "page.js"), "const title = 'Brzo — lagano';\n", "utf8");
    const clean = run();
    assert.equal(clean.status, 0, clean.stderr);

    writeFileSync(join(dir, "page.js"), `const title = 'Brzo ${corrupt("—")} lagano';\n`, "utf8");
    const broken = run();
    assert.equal(broken.status, 1);
    assert.match(broken.stderr, /page\.js:1:/);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test("service detail pages and data are free of broken characters", () => {
  const files = [
    "src/app/en/services/[slug]/page.js",
    "src/app/sr/usluge/[slug]/page.js",
    "src/data/services.js",
  ];
  for (const file of files) {
    assert.deepEqual(scanFile(file), [], file);
  }
});
