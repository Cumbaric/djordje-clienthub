import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { projects } from "@/data/projects";

// Open Graph / Twitter card renderer (1200x630). Fonts are Geist (OFL) committed in
// src/assets/fonts — latin + latin-ext, so Serbian č ć š ž đ render correctly. No runtime fetch.

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

const FONT_DIR = join(process.cwd(), "src", "assets", "fonts");
let fontsPromise;

function loadFonts() {
  fontsPromise ??= Promise.all([
    ["geist-latin-400-normal.woff", 400],
    ["geist-latin-ext-400-normal.woff", 400],
    ["geist-latin-700-normal.woff", 700],
    ["geist-latin-ext-700-normal.woff", 700],
  ].map(async ([file, weight]) => ({
    name: "Geist",
    data: await readFile(join(FONT_DIR, file)),
    weight,
    style: "normal",
  })));
  return fontsPromise;
}

const COPY = {
  en: {
    siteEyebrow: "Web Development Agency · Belgrade",
    siteSubtitle: "WordPress · Next.js · WooCommerce · SEO",
    caseStudy: "Case study",
  },
  sr: {
    siteEyebrow: "Web development agencija · Beograd",
    siteSubtitle: "WordPress · Next.js · WooCommerce · SEO",
    caseStudy: "Studija slučaja",
  },
};

async function card({ eyebrow, title, subtitle }) {
  const fonts = await loadFonts();
  const titleSize = title.length > 34 ? 64 : title.length > 20 ? 78 : 96;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "linear-gradient(135deg, #111827 0%, #1e3a8a 100%)",
          color: "#ffffff",
          fontFamily: "Geist",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 30, color: "#93c5fd" }}>
          <div style={{ width: 14, height: 14, borderRadius: 7, background: "#2563eb", display: "flex" }} />
          {eyebrow}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ display: "flex", fontSize: titleSize, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2 }}>
            {title}
          </div>
          {subtitle ? (
            <div style={{ display: "flex", fontSize: 34, color: "#cbd5e1", lineHeight: 1.3 }}>{subtitle}</div>
          ) : null}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 28, color: "#93c5fd" }}>
          <div style={{ display: "flex", fontWeight: 700, color: "#ffffff" }}>DWeb Solutions</div>
          <div style={{ display: "flex" }}>dwebsolutions.rs</div>
        </div>
      </div>
    ),
    { ...OG_SIZE, fonts },
  );
}

/** Site-wide card, one per language. */
export function siteOgImage(lang) {
  const c = COPY[lang] ?? COPY.en;
  return card({ eyebrow: c.siteEyebrow, title: "DWeb Solutions", subtitle: c.siteSubtitle });
}

/** Per-project card carrying the project name. */
export function projectOgImage(slug, lang) {
  const c = COPY[lang] ?? COPY.en;
  const project = projects.find((p) => p.slug === slug);
  return card({
    eyebrow: `${c.caseStudy} · DWeb Solutions`,
    title: project?.title ?? slug,
    subtitle: project?.type?.replace(/\s*\/\s*/g, " · "),
  });
}
