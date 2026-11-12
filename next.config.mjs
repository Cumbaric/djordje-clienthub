import { CHANGED_SR_SERVICE_SLUGS } from "./src/data/serviceSlugs.mjs";

// Legacy un-prefixed public routes -> their /en equivalents (permanent, 308).
// "/" is intentionally NOT listed: it stays a temporary 307 (src/app/(app)/page.js)
// until the final default-language decision is made.
const legacyRedirects = [
  ["/contact", "/en/contact"],
  ["/projects", "/en/projects"],
  ["/projects/wellness-concept", "/en/projects/wellness-concept"],
  ["/services", "/en/services"],
  ["/process", "/en/process"],
  // SR service slugs that were localized: old /sr/usluge/<EN slug> -> new SR slug.
  ...CHANGED_SR_SERVICE_SLUGS.map(([en, sr]) => [`/sr/usluge/${en}`, `/sr/usluge/${sr}`]),
].map(([source, destination]) => ({ source, destination, permanent: true }));

/** @type {import('next').NextConfig} */
// Baseline security headers (no CSP beyond frame-ancestors, so analytics/inline scripts keep working).
// HSTS is intentionally NOT enabled yet: turn it on only after the Apache http -> https and
// www redirects work in production (see SEO-TODO.md), starting with a short max-age and without
// "preload", e.g. { key: "Strict-Transport-Security", value: "max-age=86400" }.
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Content-Security-Policy", value: "frame-ancestors 'self'" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()" },
];

const nextConfig = {
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  async redirects() {
    return [
      ...legacyRedirects,
      // www -> apex (permanent). http -> https is handled by Apache (.htaccess),
      // see SEO-TODO.md — deliberately not detected via x-forwarded-proto.
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.dwebsolutions.rs" }],
        destination: "https://dwebsolutions.rs/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
