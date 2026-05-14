export const projects = [
  {
    title: "Wellness Concept",
    slug: "wellness-concept",
    type: "WordPress / Elementor / SEO / Performance",
    category: "WordPress / Elementor / SEO / Performance",
    status: "Active project",
    url: "/en/projects/wellness-concept",
    featured: true,
    tags: ["WordPress", "Elementor", "SEO", "Performance", "UX"],
    description:
      "WordPress i SEO projekat za salon masaže i wellness usluga, sa fokusom na strukturu usluga, korisnički tok, zakazivanje i optimizaciju performansi.",
    descriptionEn:
      "Website and SEO-focused improvement project for a massage and wellness business, with attention to service structure, user flow, booking path and performance optimization.",
  },
  {
    title: "Olivera Popović Edu",
    slug: null,
    type: "WordPress / Education / SEO structure",
    category: "WordPress / Education Website",
    status: "Portfolio project",
    url: "/en/projects",
    featured: true,
    tags: ["WordPress", "Education", "Content Structure", "SEO"],
    description:
      "Edukativni WordPress projekat fokusiran na jasnu strukturu sadržaja, organizaciju stranica i SEO osnovu za bolju vidljivost i lakšu navigaciju.",
    descriptionEn:
      "Educational website project focused on clear content structure, page organization and SEO foundations for better visibility and easier navigation.",
  },
  {
    title: "BoomMil",
    slug: null,
    type: "WooCommerce / WordPress / Product structure",
    category: "WooCommerce / Product SEO",
    status: "Completed project",
    url: "/en/projects",
    featured: true,
    tags: ["WooCommerce", "WordPress", "Product Pages", "SEO"],
    description:
      "WooCommerce projekat fokusiran na unos proizvoda, strukturu prodavnice, osnovnu SEO pripremu i organizaciju sadržaja za online katalog proizvoda.",
    descriptionEn:
      "WooCommerce project focused on product setup, store structure, basic SEO preparation and content organization for an online product catalog.",
  },
  {
    title: "Djordje ClientHub",
    slug: null,
    type: "Next.js / React / Dashboard / Internal Tool",
    category: "Next.js / React / Dashboard",
    status: "In development",
    url: "/en/projects",
    featured: true,
    tags: ["Next.js", "React", "App Router", "Dashboard", "Auth Protection", "AI-assisted workflow"],
    description:
      "Bilingual portfolio i privatna dashboard aplikacija izrađena kroz Next.js, React, App Router, zaštitu ruta i AI-assisted razvojni workflow. Projekat kombinuje javni portfolio deo i zaštićeni interni dashboard za klijente, projekte, zadatke i radne beleške.",
    descriptionEn:
      "A bilingual portfolio and private dashboard application built with Next.js, React, App Router, route protection and AI-assisted development workflow. The project combines public portfolio pages with a protected internal dashboard for clients, projects, tasks and work notes.",
  },
];

export const featuredProjects = projects.filter((project) => project.featured);
