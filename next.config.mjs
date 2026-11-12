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
const nextConfig = {
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
