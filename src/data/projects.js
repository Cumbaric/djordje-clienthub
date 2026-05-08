export const projects = [
  {
    title: "Wellness Concept",
    type: "WordPress / Elementor / SEO",
    category: "WordPress / Elementor / SEO",
    status: "Active project",
    url: "/projects/wellness-concept",
    featured: true,
    description:
      "Redizajn i unapređenje prezentacionog sajta za salon masaže, sa fokusom na strukturu stranica, tretmane, SEO i korisničko iskustvo.",
  },
  {
    title: "Olivera Popović Edu",
    type: "WordPress / Education Website / Content Structure",
    category: "WordPress / Education Website",
    status: "Portfolio project",
    url: "/projects",
    featured: true,
    description:
      "Edukativni WordPress sajt za predstavljanje rada, programa i obrazovnog sadržaja, sa fokusom na jasnu strukturu stranica i profesionalnu prezentaciju.",
  },
  {
    title: "Boommil",
    type: "WooCommerce / Elementor / Product SEO",
    category: "WooCommerce / Product SEO",
    status: "Completed project",
    url: "/projects",
    featured: true,
    description:
      "WooCommerce prodavnica za kućnu hemiju, sa podešenim proizvodima, opisima, SEO osnovama i prilagođenim checkout procesom.",
  },
  {
    title: "Mirkotopalovic Tips",
    type: "WordPress / ACF / Custom Content",
    category: "WordPress / ACF / Custom Content",
    status: "Content-based project",
    url: "/projects",
    featured: true,
    description:
      "Tipserski WordPress sajt sa prilagođenim poljima, organizacijom sadržaja i radom na strukturi objava.",
  },
];

export const featuredProjects = projects.filter((project) => project.featured);
