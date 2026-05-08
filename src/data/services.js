export const services = [
  {
    title: "WordPress Website Development",
    shortLabel: "WordPress website development",
    category: "WordPress / Elementor / CMS",
    description:
      "Izrada prezentacionih WordPress sajtova za male biznise, usluge, lični brend i lokalne kompanije. Fokus je na jasnoj strukturi, preglednim sekcijama i jednostavnom upravljanju sadržajem.",
    technologies: ["WordPress", "Elementor", "HTML", "CSS", "Responsive design"],
  },
  {
    title: "Elementor Landing Pages",
    shortLabel: "Elementor landing pages",
    category: "Landing pages / Conversion structure",
    description:
      "Kreiranje landing stranica za usluge, kampanje, promocije i pojedinačne ponude. Stranice se prave sa jasnim naslovima, CTA dugmadima, sekcijama poverenja i logičnim korisničkim putem.",
    technologies: ["Elementor", "CSS", "UX structure", "CTA sections"],
  },
  {
    title: "WooCommerce Setup",
    shortLabel: "WooCommerce setup",
    category: "Online store / Product setup",
    description:
      "Postavljanje osnovne WooCommerce prodavnice, unos proizvoda, kategorija, opisa, slika, osnovnih SEO elemenata i podešavanje procesa kupovine prema potrebama klijenta.",
    technologies: ["WooCommerce", "Product SEO", "Checkout setup", "WordPress"],
  },
  {
    title: "SEO Structure & On-page Setup",
    shortLabel: "SEO structure and on-page setup",
    category: "SEO / Content structure",
    description:
      "Osnovna SEO struktura sajta: naslovi, meta opisi, struktura stranica, interna logika sadržaja, organizacija usluga i priprema sajta za Google indeksiranje.",
    technologies: [
      "Yoast SEO",
      "Google Search Console",
      "Site Kit",
      "Content structure",
    ],
  },
  {
    title: "React / Next.js Web Applications",
    shortLabel: "React / Next.js web applications",
    category: "Custom web apps / Internal tools",
    description:
      "Razvoj modernih custom web aplikacija i internih alata u React / Next.js stack-u. Fokus je na dashboard sistemima, organizaciji klijenata, zadataka, projekata i radnih procesa.",
    technologies: ["React", "Next.js", "Node.js", "MySQL", "Prisma"],
  },
  {
    title: "Website Maintenance & Technical Fixes",
    shortLabel: "Website maintenance and technical fixes",
    category: "Maintenance / Troubleshooting",
    description:
      "Održavanje WordPress sajtova, sitne tehničke izmene, rešavanje problema sa prikazom, plugin podešavanjima, kontakt formama, osnovnim performansama i responzivnim prikazom.",
    technologies: ["WordPress", "Plugins", "CSS fixes", "Performance basics"],
  },
];

export const serviceLabels = services.map((service) => service.shortLabel);
