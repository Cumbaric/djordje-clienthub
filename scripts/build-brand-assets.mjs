// Builds every brand image from the single source logo (navy + blue on an off-white background).
//   node scripts/build-brand-assets.mjs
//
// The source is a flat two-colour logo, so the background is removed by "unmixing" every pixel
// into (alpha, navy|blue): clean transparent edges, no white fringes. Outputs:
//
//   src/assets/brand/logo-dark-bg.png    horizontal logo, navy -> near-white (dark header / footer)
//   src/assets/brand/logo-light-bg.png   horizontal logo, original colours (white OG card pill)
//   src/app/icon.png                     512x512 favicon tile (Google / browser tabs)
//   src/app/apple-icon.png               180x180 apple-touch-icon
//   src/app/favicon.ico                  16/32/48 px (PNG-in-ICO)
//   public/brand/dweb-logo.png           512x512 square logo for schema.org / Google (white background)
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const SOURCE = join(ROOT, "src", "assets", "brand", "dweb-logo-source.png");

const BG = [254, 254, 254];
const NAVY = [9, 25, 60];
const BLUE = [0, 79, 242];
const ON_DARK_TEXT = [241, 245, 249]; // navy becomes this on dark backgrounds (matches site text colour)

// Where the monogram ends and the separator + wordmark begin (measured on the source image).
const MONOGRAM_MAX_X = 1050;

const dist2 = (a, b) => (a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2 + (a[2] - b[2]) ** 2;

/** Unmix one pixel: returns { alpha 0..1, kind: "navy" | "blue" }. */
function unmix(p) {
  let best = null;
  for (const [kind, fg] of [["navy", NAVY], ["blue", BLUE]]) {
    const span = [BG[0] - fg[0], BG[1] - fg[1], BG[2] - fg[2]];
    const len2 = span[0] ** 2 + span[1] ** 2 + span[2] ** 2;
    const diff = [BG[0] - p[0], BG[1] - p[1], BG[2] - p[2]];
    const alpha = Math.min(1, Math.max(0, (diff[0] * span[0] + diff[1] * span[1] + diff[2] * span[2]) / len2));
    const model = [BG[0] + (fg[0] - BG[0]) * alpha, BG[1] + (fg[1] - BG[1]) * alpha, BG[2] + (fg[2] - BG[2]) * alpha];
    const error = dist2(p, model);
    if (!best || error < best.error) best = { kind, alpha, error };
  }
  return best;
}

const { data, info } = await sharp(SOURCE).removeAlpha().raw().toBuffer({ resolveWithObject: true });
const { width, height } = info;

/** RGBA buffer of the logo (optionally only x < maxX) painted with the given colours. */
function paint({ navy, blue, maxX = width }) {
  const out = Buffer.alloc(width * height * 4);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 3;
      const o = (y * width + x) * 4;
      if (x >= maxX) continue;
      const { kind, alpha } = unmix([data[i], data[i + 1], data[i + 2]]);
      if (alpha < 0.02) continue;
      const color = kind === "navy" ? navy : blue;
      out[o] = color[0];
      out[o + 1] = color[1];
      out[o + 2] = color[2];
      out[o + 3] = Math.round(alpha * 255);
    }
  }
  return sharp(out, { raw: { width, height, channels: 4 } });
}

async function trimmed(image, pad = 0) {
  const { data: buf, info: i } = await image.png().toBuffer({ resolveWithObject: true });
  const t = await sharp(buf).trim({ threshold: 1 }).toBuffer({ resolveWithObject: true });
  const out = pad
    ? await sharp(t.data).extend({ top: pad, bottom: pad, left: pad, right: pad, background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer()
    : t.data;
  return { buffer: out, source: i };
}

async function writePng(path, buffer) {
  await mkdir(join(path, ".."), { recursive: true });
  await writeFile(path, buffer);
  const meta = await sharp(buffer).metadata();
  console.log(`${path.replace(ROOT, "").replace(/\\/g, "/").padEnd(44)} ${meta.width}x${meta.height}  ${(buffer.length / 1024).toFixed(1)} KB`);
}

// ---- horizontal logos (trimmed, transparent) ----
const horizontalWidth = 900;
async function horizontal(colors) {
  const { buffer } = await trimmed(paint(colors));
  return sharp(buffer).resize({ width: horizontalWidth }).png({ compressionLevel: 9 }).toBuffer();
}
await writePng(join(ROOT, "src", "assets", "brand", "logo-dark-bg.png"), await horizontal({ navy: ON_DARK_TEXT, blue: BLUE }));
await writePng(join(ROOT, "src", "assets", "brand", "logo-light-bg.png"), await horizontal({ navy: NAVY, blue: BLUE }));

// ---- monogram variants ----
const monoOnTile = (await trimmed(paint({ navy: [255, 255, 255], blue: [41, 121, 255], maxX: MONOGRAM_MAX_X }))).buffer;
const monoBrand = (await trimmed(paint({ navy: NAVY, blue: BLUE, maxX: MONOGRAM_MAX_X }))).buffer;

/** Square tile with the monogram centred (padding = share of the side). */
async function tile(size, { background, mono, padding, radius = 0 }) {
  const inner = Math.round(size * (1 - 2 * padding));
  const glyph = await sharp(mono).resize({ width: inner, height: inner, fit: "inside" }).png().toBuffer();
  const rounded = radius
    ? Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}"><rect width="${size}" height="${size}" rx="${Math.round(size * radius)}" fill="white"/></svg>`)
    : null;
  let base = sharp({ create: { width: size, height: size, channels: 4, background } }).composite([{ input: glyph, gravity: "centre" }]);
  let out = await base.png().toBuffer();
  if (rounded) out = await sharp(out).composite([{ input: rounded, blend: "dest-in" }]).png().toBuffer();
  return out;
}

const tileBg = { r: NAVY[0], g: NAVY[1], b: NAVY[2], alpha: 1 };
await writePng(join(ROOT, "src", "app", "icon.png"), await tile(512, { background: tileBg, mono: monoOnTile, padding: 0.12, radius: 0.22 }));
await writePng(join(ROOT, "src", "app", "apple-icon.png"), await tile(180, { background: tileBg, mono: monoOnTile, padding: 0.12 }));
await writePng(
  join(ROOT, "public", "brand", "dweb-logo.png"),
  await tile(512, { background: { r: 255, g: 255, b: 255, alpha: 1 }, mono: monoBrand, padding: 0.16 }),
);

// ---- favicon.ico (PNG-in-ICO: 16, 32, 48) ----
const icoSizes = [16, 32, 48];
const icoImages = [];
for (const size of icoSizes) icoImages.push(await tile(size, { background: tileBg, mono: monoOnTile, padding: 0.12, radius: 0.2 }));
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(icoImages.length, 4);
let offset = 6 + 16 * icoImages.length;
const entries = icoImages.map((png, index) => {
  const entry = Buffer.alloc(16);
  entry[0] = icoSizes[index];
  entry[1] = icoSizes[index];
  entry.writeUInt16LE(1, 4); // planes
  entry.writeUInt16LE(32, 6); // bits per pixel
  entry.writeUInt32LE(png.length, 8);
  entry.writeUInt32LE(offset, 12);
  offset += png.length;
  return entry;
});
await writeFile(join(ROOT, "src", "app", "favicon.ico"), Buffer.concat([header, ...entries, ...icoImages]));
console.log(`/src/app/favicon.ico                         ${icoSizes.join("/")} px`);
