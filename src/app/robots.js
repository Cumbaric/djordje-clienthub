const BASE_URL = "https://djordjepopovic.com";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Keep private and non-content routes out of search engines.
      disallow: ["/dashboard", "/login", "/api"],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
