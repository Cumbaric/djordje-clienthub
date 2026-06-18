// Grouping keys used to categorize projects on the projects pages.
export const PROJECT_CATEGORIES = {
  wordpress: "WordPress",
  nextjs: "Next.js",
  landing: "Landing Pages",
};

export const projects = [
  {
    title: "Wellness Concept",
    slug: "wellness-concept",
    coverImage: "/Projects/Wellness_Concept_1.png",
    type: "WordPress / Elementor / SEO / Performance",
    category: "wordpress",
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
    slug: "olivera-popovic-edu",
    coverImage: "/Projects/Olvera_Popovic_1.png",
    type: "WordPress / Education / SEO structure",
    category: "wordpress",
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
    slug: "boommil",
    coverImage: "/Projects/boommil_1.png",
    type: "WooCommerce / WordPress / Product structure",
    category: "wordpress",
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
    title: "MirkoTopalovićTips",
    slug: "mirko-topalovic-tips",
    coverImage: "/Projects/mirko_topalovic_1.png",
    type: "WordPress / Content structure / Sports tips platform",
    category: "wordpress",
    status: "Portfolio project",
    url: "/en/projects",
    featured: true,
    tags: ["WordPress", "Content Structure", "SEO", "Automation Planning"],
    description:
      "Content WordPress projekat fokusiran na organizaciju tipserskog sadržaja, bolju strukturu objava i pripremu sajta za lakšu navigaciju i buduće automatizovane workflow-e.",
    descriptionEn:
      "Content-driven WordPress project focused on organizing sports tips, improving content structure and preparing the site for easier navigation and future automation workflows.",
  },
  {
    title: "Djordje ClientHub",
    slug: "djordje-clienthub",
    coverImage: "/Projects/djordje_clienthub_1.png",
    type: "Next.js / React / Dashboard / Internal Tool",
    category: "nextjs",
    status: "In development",
    url: "/en/projects",
    featured: true,
    tags: ["Next.js", "React", "App Router", "Dashboard", "Auth Protection", "AI-assisted workflow"],
    description:
      "Bilingual portfolio i privatna dashboard aplikacija izrađena kroz Next.js, React, App Router, zaštitu ruta i AI-assisted razvojni workflow. Projekat kombinuje javni portfolio deo i zaštićeni interni dashboard za klijente, projekte, zadatke i radne beleške.",
    descriptionEn:
      "A bilingual portfolio and private dashboard application built with Next.js, React, App Router, route protection and AI-assisted development workflow. The project combines public portfolio pages with a protected internal dashboard for clients, projects, tasks and work notes.",
  },
  {
    title: "Ben Akiba Dashboard",
    slug: "ben-akiba-dashboard",
    coverImage: "/Projects/ben-akiba-dashboard_1.png",
    type: "Next.js / React / Supabase / Admin Dashboard",
    category: "nextjs",
    status: "Portfolio project",
    url: "/en/projects/ben-akiba-dashboard",
    featured: true,
    tags: ["Next.js", "React", "JavaScript", "CSS", "Supabase", "Vercel", "Admin Dashboard"],
    description:
      "Admin dashboard aplikacija za Ben Akiba dogadjaje, sa javnim front page prikazom stand up i zurka repertoara, izvodjaca, cena i broja rezervisanih gostiju. Projekat kombinuje javni pregled dogadjaja sa internim panelom za upravljanje rezervacijama i unos novih dogadjaja.",
    descriptionEn:
      "Admin dashboard application for Ben Akiba events, with a public front page for stand-up and party listings, performers, prices and reservation counts. The project combines a public event overview with an internal panel for managing reservations and creating new events.",
  },
  {
    title: "Lumera Wellness",
    slug: "lumera-wellness",
    coverImage: null,
    type: "Next.js / React / Wellness Website",
    category: "nextjs",
    status: "In development",
    url: "/en/projects/lumera-wellness",
    featured: false,
    tags: ["Next.js", "React", "App Router", "Wellness", "Performance", "SEO"],
    description:
      "Moderan wellness sajt izrađen u Next.js-u, fokusiran na brz prikaz, jasnu strukturu usluga i SEO-friendly stranice za spa i wellness ponudu. Trenutno u razvoju.",
    descriptionEn:
      "A modern wellness website built with Next.js, focused on fast rendering, a clear service structure and SEO-friendly pages for spa and wellness offerings. Currently in development.",
  },
];

export const featuredProjects = projects.filter((project) => project.featured);

// Returns an object keyed by PROJECT_CATEGORIES with an array of projects for each.
export function getProjectsByCategory() {
  return Object.keys(PROJECT_CATEGORIES).reduce((grouped, key) => {
    grouped[key] = projects.filter((project) => project.category === key);
    return grouped;
  }, {});
}
