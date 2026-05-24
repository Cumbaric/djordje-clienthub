/**
 * Brand colors and abbreviations for tech stack items.
 * Used to render colored icon badges + hover glows on the home page.
 * Falls back to `_default` for unrecognized items.
 */
export const techBrands = {
  // ── Frontend ──
  "HTML":                    { abbr: "H",   color: "#e34f26", bg: "rgba(227,79,38,0.12)",   border: "rgba(227,79,38,0.25)",   glow: "rgba(227,79,38,0.4)" },
  "CSS":                     { abbr: "C",   color: "#264de4", bg: "rgba(38,77,228,0.12)",   border: "rgba(38,77,228,0.25)",   glow: "rgba(38,77,228,0.4)" },
  "JavaScript":              { abbr: "JS",  color: "#f7df1e", bg: "rgba(247,223,30,0.1)",   border: "rgba(247,223,30,0.22)",  glow: "rgba(247,223,30,0.35)" },
  "React":                   { abbr: "R",   color: "#61dafb", bg: "rgba(97,218,251,0.1)",   border: "rgba(97,218,251,0.22)",  glow: "rgba(97,218,251,0.4)" },
  "Next.js":                 { abbr: "N",   color: "#f1f5f9", bg: "rgba(255,255,255,0.05)", border: "rgba(255,255,255,0.12)", glow: "rgba(255,255,255,0.2)" },
  "Responsive design":       { abbr: "RD",  color: "#38bdf8", bg: "rgba(56,189,248,0.08)",  border: "rgba(56,189,248,0.2)",  glow: "rgba(56,189,248,0.35)" },

  // ── WordPress ──
  "WordPress":               { abbr: "WP",  color: "#0096d6", bg: "rgba(0,115,170,0.12)",   border: "rgba(0,115,170,0.28)",   glow: "rgba(0,115,170,0.45)" },
  "Elementor":               { abbr: "E",   color: "#e2504c", bg: "rgba(226,80,76,0.12)",   border: "rgba(226,80,76,0.25)",   glow: "rgba(226,80,76,0.4)" },
  "Elementor Pro":           { abbr: "E+",  color: "#e2504c", bg: "rgba(226,80,76,0.12)",   border: "rgba(226,80,76,0.25)",   glow: "rgba(226,80,76,0.4)" },
  "WooCommerce":             { abbr: "WC",  color: "#7f54b3", bg: "rgba(127,84,179,0.12)",  border: "rgba(127,84,179,0.25)",  glow: "rgba(127,84,179,0.4)" },
  "Yoast SEO":               { abbr: "YST", color: "#c0392b", bg: "rgba(161,29,45,0.12)",   border: "rgba(161,29,45,0.25)",   glow: "rgba(161,29,45,0.4)" },
  "Theme customization":     { abbr: "TH",  color: "#94a3b8", bg: "rgba(148,163,184,0.08)", border: "rgba(148,163,184,0.18)", glow: "rgba(148,163,184,0.3)" },
  "WordPress maintenance":   { abbr: "WM",  color: "#0096d6", bg: "rgba(0,115,170,0.08)",   border: "rgba(0,115,170,0.2)",   glow: "rgba(0,115,170,0.35)" },
  "Prilagođavanje tema":     { abbr: "TH",  color: "#94a3b8", bg: "rgba(148,163,184,0.08)", border: "rgba(148,163,184,0.18)", glow: "rgba(148,163,184,0.3)" },
  "Održavanje WordPress sajtova": { abbr: "WM", color: "#0096d6", bg: "rgba(0,115,170,0.08)", border: "rgba(0,115,170,0.2)", glow: "rgba(0,115,170,0.35)" },

  // ── Backend / DB ──
  "Node.js":                 { abbr: "NJ",  color: "#6cc24a", bg: "rgba(102,194,58,0.1)",   border: "rgba(102,194,58,0.22)",  glow: "rgba(102,194,58,0.4)" },
  "Node.js osnova":          { abbr: "NJ",  color: "#6cc24a", bg: "rgba(102,194,58,0.1)",   border: "rgba(102,194,58,0.22)",  glow: "rgba(102,194,58,0.4)" },
  "Node.js basics":          { abbr: "NJ",  color: "#6cc24a", bg: "rgba(102,194,58,0.1)",   border: "rgba(102,194,58,0.22)",  glow: "rgba(102,194,58,0.4)" },
  "Next.js App Router":      { abbr: "N",   color: "#f1f5f9", bg: "rgba(255,255,255,0.05)", border: "rgba(255,255,255,0.12)", glow: "rgba(255,255,255,0.2)" },
  "MySQL":                   { abbr: "SQL", color: "#4479a1", bg: "rgba(68,121,161,0.12)",  border: "rgba(68,121,161,0.25)",  glow: "rgba(68,121,161,0.4)" },
  "Prisma ORM":              { abbr: "PR",  color: "#5a67d8", bg: "rgba(90,103,216,0.1)",   border: "rgba(90,103,216,0.22)",  glow: "rgba(90,103,216,0.38)" },
  "API Routes":              { abbr: "API", color: "#94a3b8", bg: "rgba(148,163,184,0.08)", border: "rgba(148,163,184,0.18)", glow: "rgba(148,163,184,0.3)" },
  "Environment variables":   { abbr: "ENV", color: "#94a3b8", bg: "rgba(148,163,184,0.08)", border: "rgba(148,163,184,0.18)", glow: "rgba(148,163,184,0.3)" },
  "Temporary auth protection":{ abbr: "AU", color: "#94a3b8", bg: "rgba(148,163,184,0.08)", border: "rgba(148,163,184,0.18)", glow: "rgba(148,163,184,0.3)" },
  "Privremena auth zaštita": { abbr: "AU",  color: "#94a3b8", bg: "rgba(148,163,184,0.08)", border: "rgba(148,163,184,0.18)", glow: "rgba(148,163,184,0.3)" },

  // ── SEO & Performance ──
  "On-page SEO":             { abbr: "SEO", color: "#22d3ee", bg: "rgba(34,211,238,0.08)",  border: "rgba(34,211,238,0.2)",  glow: "rgba(34,211,238,0.38)" },
  "Technical SEO basics":    { abbr: "SEO", color: "#22d3ee", bg: "rgba(34,211,238,0.08)",  border: "rgba(34,211,238,0.2)",  glow: "rgba(34,211,238,0.38)" },
  "Technical SEO osnova":    { abbr: "SEO", color: "#22d3ee", bg: "rgba(34,211,238,0.08)",  border: "rgba(34,211,238,0.2)",  glow: "rgba(34,211,238,0.38)" },
  "Website speed optimization":{ abbr: "⚡", color: "#fbbf24", bg: "rgba(251,191,36,0.08)", border: "rgba(251,191,36,0.2)",  glow: "rgba(251,191,36,0.35)" },
  "Optimizacija brzine sajta":{ abbr: "⚡",  color: "#fbbf24", bg: "rgba(251,191,36,0.08)", border: "rgba(251,191,36,0.2)",  glow: "rgba(251,191,36,0.35)" },
  "WebP image optimization": { abbr: "IMG", color: "#34d399", bg: "rgba(52,211,153,0.08)",  border: "rgba(52,211,153,0.2)",  glow: "rgba(52,211,153,0.35)" },
  "WebP optimizacija slika": { abbr: "IMG", color: "#34d399", bg: "rgba(52,211,153,0.08)",  border: "rgba(52,211,153,0.2)",  glow: "rgba(52,211,153,0.35)" },
  "Core Web Vitals basics":  { abbr: "CWV", color: "#a78bfa", bg: "rgba(167,139,250,0.08)", border: "rgba(167,139,250,0.2)", glow: "rgba(167,139,250,0.35)" },
  "Core Web Vitals osnova":  { abbr: "CWV", color: "#a78bfa", bg: "rgba(167,139,250,0.08)", border: "rgba(167,139,250,0.2)", glow: "rgba(167,139,250,0.35)" },

  // ── Tools ──
  "VS Code":                 { abbr: "VS",  color: "#007acc", bg: "rgba(0,122,204,0.1)",    border: "rgba(0,122,204,0.25)",   glow: "rgba(0,122,204,0.4)" },
  "Git":                     { abbr: "GIT", color: "#f05032", bg: "rgba(240,80,50,0.1)",    border: "rgba(240,80,50,0.25)",   glow: "rgba(240,80,50,0.4)" },
  "GitHub":                  { abbr: "GH",  color: "#e2e8f0", bg: "rgba(226,232,240,0.05)", border: "rgba(226,232,240,0.15)", glow: "rgba(226,232,240,0.25)" },
  "Vercel":                  { abbr: "▲",   color: "#f1f5f9", bg: "rgba(255,255,255,0.05)", border: "rgba(255,255,255,0.12)", glow: "rgba(255,255,255,0.22)" },
  "Claude Code":             { abbr: "CC",  color: "#d97706", bg: "rgba(217,119,6,0.1)",    border: "rgba(217,119,6,0.25)",   glow: "rgba(217,119,6,0.4)" },
  "ChatGPT":                 { abbr: "AI",  color: "#10a37f", bg: "rgba(16,163,127,0.1)",   border: "rgba(16,163,127,0.25)",  glow: "rgba(16,163,127,0.4)" },
  "AI-assisted development": { abbr: "AI",  color: "#10a37f", bg: "rgba(16,163,127,0.08)",  border: "rgba(16,163,127,0.2)",   glow: "rgba(16,163,127,0.38)" },
  "AI-assisted development (SR)": { abbr: "AI", color: "#10a37f", bg: "rgba(16,163,127,0.08)", border: "rgba(16,163,127,0.2)", glow: "rgba(16,163,127,0.38)" },

  // ── Fallback ──
  _default:                  { abbr: "·",   color: "#64748b", bg: "rgba(100,116,139,0.08)", border: "rgba(100,116,139,0.18)", glow: "rgba(100,116,139,0.3)" },
};
