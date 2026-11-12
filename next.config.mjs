/** @type {import('next').NextConfig} */
// Legacy un-prefixed public routes -> their /en equivalents (permanent, 308).
// "/" is intentionally NOT listed: it stays a temporary 307 (src/app/(app)/page.js)
// until the final default-language decision is made.
const legacyRedirects = [
  ["/contact", "/en/contact"],
  ["/projects", "/en/projects"],
  ["/projects/wellness-concept", "/en/projects/wellness-concept"],
  ["/services", "/en/services"],
  ["/process", "/en/process"],
].map(([source, destination]) => ({ source, destination, permanent: true }));

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
