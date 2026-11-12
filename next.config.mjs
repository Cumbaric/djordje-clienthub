/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
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
