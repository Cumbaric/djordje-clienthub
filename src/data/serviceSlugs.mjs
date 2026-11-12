// EN -> SR URL slugs for service detail pages. EN slugs are the canonical ids
// (src/data/services.js `slug`); SR pages live at /sr/usluge/<SR slug>.
// Kept as a tiny standalone module so client components (PublicHeader language
// switcher) can use it without pulling in the whole services dataset.
export const SERVICE_SLUGS_SR = {
  "html-css-js": "html-css-js",
  "react-nextjs": "react-nextjs",
  "seo-optimization": "seo-optimizacija",
  "wordpress-website-development": "izrada-wordpress-sajta",
  "ecommerce-store": "izrada-online-prodavnice",
  "website-maintenance": "odrzavanje-sajta",
};

export const SERVICE_SLUGS_EN = Object.fromEntries(
  Object.entries(SERVICE_SLUGS_SR).map(([en, sr]) => [sr, en]),
);

/** Old (pre-localization) SR slugs that changed and need a permanent redirect. */
export const CHANGED_SR_SERVICE_SLUGS = Object.entries(SERVICE_SLUGS_SR).filter(([en, sr]) => en !== sr);
