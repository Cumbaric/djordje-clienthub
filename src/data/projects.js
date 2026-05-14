export const projects = [
  {
    title: "Wellness Concept",
    slug: "wellness-concept",
    type: "WordPress / Elementor / SEO",
    category: "WordPress / Elementor / SEO",
    status: "Active project",
    url: "/projects/wellness-concept",
    featured: true,
    description:
      "Redizajn i unapređenje prezentacionog sajta za salon masaže, sa fokusom na strukturu stranica, tretmane, SEO i korisničko iskustvo.",
    descriptionEn:
      "Redesign and improvement of a massage salon presentation website, focusing on page structure, treatments, SEO, and user experience.",
  },
  {
    title: "Olivera Popović Edu",
    slug: null,
    type: "WordPress / Education Website / Content Structure",
    category: "WordPress / Education Website",
    status: "Portfolio project",
    url: "/projects",
    featured: true,
    description:
      "Edukativni WordPress sajt za predstavljanje rada, programa i obrazovnog sadržaja, sa fokusom na jasnu strukturu stranica i profesionalnu prezentaciju.",
    descriptionEn:
      "Educational WordPress website for presenting work, programs, and educational content, with a focus on clear page structure and professional presentation.",
  },
  {
    title: "Boommil",
    slug: null,
    type: "WooCommerce / Elementor / Product SEO",
    category: "WooCommerce / Product SEO",
    status: "Completed project",
    url: "/projects",
    featured: true,
    description:
      "WooCommerce prodavnica za kućnu hemiju, sa podešenim proizvodima, opisima, SEO osnovama i prilagođenim checkout procesom.",
    descriptionEn:
      "WooCommerce store for household cleaning products, with configured products, descriptions, SEO basics, and a customized checkout process.",
  },
  {
    title: "Mirkotopalovic Tips",
    slug: null,
    type: "WordPress / ACF / Custom Content",
    category: "WordPress / ACF / Custom Content",
    status: "Content-based project",
    url: "/projects",
    featured: true,
    description:
      "Tipserski WordPress sajt sa prilagođenim poljima, organizacijom sadržaja i radom na strukturi objava.",
    descriptionEn:
      "Tipster WordPress website with custom fields, content organization, and structured post management.",
  },
];

export const featuredProjects = projects.filter((project) => project.featured);
