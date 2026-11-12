// Converts public/Projects/*.png|jpg|jpeg to WebP (max 2000px wide) next to the originals.
// Originals are NOT deleted or modified. Usage: node scripts/optimize-images.mjs
import { readdir, stat } from "node:fs/promises";
import { join, parse } from "node:path";
import sharp from "sharp";

const DIR = join(process.cwd(), "public", "Projects");
const MAX_WIDTH = 2000;
const QUALITY = 85; // screenshots with small text: keep quality high

let before = 0;
let after = 0;
const rows = [];

for (const file of (await readdir(DIR)).sort()) {
  const { name, ext } = parse(file);
  if (![".png", ".jpg", ".jpeg"].includes(ext.toLowerCase())) continue;
  const src = join(DIR, file);
  const dest = join(DIR, `${name}.webp`);
  const info = await sharp(src)
    .rotate()
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .webp({ quality: QUALITY, effort: 5 })
    .toFile(dest);
  const srcSize = (await stat(src)).size;
  before += srcSize;
  after += info.size;
  rows.push(`${file.padEnd(40)} ${(srcSize / 1024).toFixed(0).padStart(6)} KB -> ${(info.size / 1024).toFixed(0).padStart(5)} KB  (${info.width}x${info.height})`);
}

console.log(rows.join("\n"));
console.log(`\nTotal: ${(before / 1048576).toFixed(1)} MB -> ${(after / 1048576).toFixed(1)} MB (saved ${((1 - after / before) * 100).toFixed(0)}%)`);
