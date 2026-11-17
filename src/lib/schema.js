import { business, contactEmail, socialLinks } from "@/data/contact";

const SITE_URL = "https://dwebsolutions.rs";

const DESCRIPTION = {
  en: "Web development agency building clean, structured and SEO-ready websites for small businesses and service providers.",
  sr: "Agencija za web razvoj koja pravi čiste, strukturirane i SEO-optimizovane sajtove za male biznise i pružaoce usluga.",
};

/** Drops empty values (""/undefined/null/empty arrays) so missing data never reaches the schema. */
function compact(obj) {
  return Object.fromEntries(
    Object.entries(obj).filter(([, v]) => v !== "" && v != null && !(Array.isArray(v) && v.length === 0)),
  );
}

/** Site-wide schema.org @graph: Organization + ProfessionalService (one node) and WebSite. */
export function buildSiteSchema(lang) {
  const sameAs = Object.values(socialLinks).filter(Boolean);
  const logoUrl = business.logo && (business.logo.startsWith("http") ? business.logo : `${SITE_URL}${business.logo}`);
  const logo = logoUrl
    ? compact({
        "@type": "ImageObject",
        "@id": `${SITE_URL}/#logo`,
        url: logoUrl,
        contentUrl: logoUrl,
        width: business.logoSize,
        height: business.logoSize,
        caption: business.name,
      })
    : "";

  const organization = compact({
    "@type": ["Organization", "ProfessionalService"],
    "@id": `${SITE_URL}/#organization`,
    name: business.name,
    url: SITE_URL,
    description: DESCRIPTION[lang] ?? DESCRIPTION.en,
    logo,
    email: contactEmail,
    telephone: business.telephone,
    address: compact({
      "@type": "PostalAddress",
      streetAddress: business.streetAddress,
      postalCode: business.postalCode,
      addressLocality: business.city.en,
      addressCountry: business.country.code,
    }),
    areaServed: business.areaServed,
    openingHours: business.openingHours,
    contactPoint: compact({
      "@type": "ContactPoint",
      contactType: "customer service",
      email: contactEmail,
      telephone: business.telephone,
      areaServed: business.country.code,
      availableLanguage: ["English", "Serbian"],
    }),
    sameAs,
    founder: { "@type": "Person", name: business.founderName },
  });

  return {
    "@context": "https://schema.org",
    "@graph": [
      organization,
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        name: "DWeb Solutions | Web Developer",
        url: SITE_URL,
        publisher: { "@id": `${SITE_URL}/#organization` },
        inLanguage: ["en", "sr"],
      },
    ],
  };
}
