// Ballpark "from" prices shown on the home page (src/components/HomeInquiry.js).
//
// Prices filter out non-serious inquiries and reassure visitors who wonder whether the budget
// fits. They are NOT invented: an item is shown only when `from` is a number. While every
// `from` is null the whole price block stays hidden. Fill in the numbers to publish it.
//
//   from: 350        ->  "od 350 €"  /  "from €350"
//   per:  "month"    ->  adds "/ mesečno" / "/ month" (maintenance)
export const pricing = {
  currency: "€",
  note: {
    en: "Ballpark prices. The final quote depends on scope — send an inquiry for an exact offer.",
    sr: "Okvirne cene. Konačna ponuda zavisi od obima posla — pošalji upit za tačnu ponudu.",
  },
  items: [
    { key: "wordpress", title: { en: "WordPress website", sr: "WordPress sajt" }, from: null, per: null },
    { key: "custom", title: { en: "Custom website (React / Next.js)", sr: "Sajt po meri (React / Next.js)" }, from: null, per: null },
    { key: "ecommerce", title: { en: "Online store (WooCommerce)", sr: "Online prodavnica (WooCommerce)" }, from: null, per: null },
    { key: "seo", title: { en: "SEO optimization", sr: "SEO optimizacija" }, from: null, per: null },
    { key: "maintenance", title: { en: "Website maintenance", sr: "Održavanje sajta" }, from: null, per: "month" },
  ],
};

/** Items that have a price, ready to render. */
export function visiblePrices() {
  return pricing.items.filter((item) => Number.isFinite(item.from) && item.from > 0);
}
