// Shared SEO metadata helper: canonical, hreflang (incl. x-default), Open Graph extras
// and Twitter card. Pages keep their own title/description/openGraph.title/description and
// spread the result of seoMeta() into their metadata.
//
//   const seo = seoMeta({ lang: "en", en: "/en/services", sr: "/sr/usluge" });
//   export const metadata = {
//     title, description,
//     openGraph: { ...seo.openGraph, title, description },
//     twitter: seo.twitter,
//     alternates: seo.alternates,
//   };
//
// Paths are relative; metadataBase (src/lib/siteMetadata.js) makes them absolute.
// og:image: by default the site-wide card (/en/og-image.png, /sr/og-image.png). Pass
// image: null to emit none (project pages use their own opengraph-image.js file), or
// image: "<url>" to use a specific image (e.g. a blog post cover).
// Note: a page that sets its own `openGraph` object does NOT inherit opengraph-image
// files from parent segments, which is why the site card is added explicitly here.

export const SITE_NAME = "DWeb Solutions";

const OG_LOCALE = { en: "en_US", sr: "sr_RS" };

const SITE_IMAGE = {
  en: { url: "/en/og-image.png", width: 1200, height: 630, alt: "DWeb Solutions — Web Developer Belgrade" },
  sr: { url: "/sr/og-image.png", width: 1200, height: 630, alt: "DWeb Solutions — Web developer Beograd" },
};

export function seoMeta({ lang, en, sr, type = "website", image }) {
  const canonical = lang === "sr" ? sr : en;
  const otherLang = lang === "sr" ? "en" : "sr";
  const images =
    image === null ? undefined : typeof image === "string" ? [{ url: image }] : [SITE_IMAGE[lang]];

  return {
    alternates: {
      canonical,
      languages: { en, sr, "x-default": en },
    },
    openGraph: {
      url: canonical,
      type,
      siteName: SITE_NAME,
      locale: OG_LOCALE[lang],
      alternateLocale: [OG_LOCALE[otherLang]],
      ...(images && { images }),
    },
    twitter: { card: "summary_large_image", ...(images && { images }) },
  };
}
