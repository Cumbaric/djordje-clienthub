// Grouping keys used to categorize projects on the projects pages.
export const PROJECT_CATEGORIES = {
  wordpress: "WordPress",
  nextjs: "Next.js",
  landing: "Landing Pages",
};

export const projects = [
  {
    title: "Musical Duo Studio",
    slug: "musical-duo-studio",
    coverImage: "/Projects/musical_duo_studio_1.png",
    type: "WordPress / Elementor / Music Studio / Contact Form",
    category: "wordpress",
    status: "Completed project",
    url: "/en/projects/musical-duo-studio",
    featured: true,
    tags: ["WordPress", "Elementor", "Fluent Forms", "Fluent SMTP", "Yoast SEO", "W3 Total Cache", "Music"],
    description:
      "WordPress sajt za profesionalni studio gitare i basa, fokusiran na premium estetiku, prezentaciju rada kroz video, internacionalne klijente i kontakt formu za novo angažovanje.",
    descriptionEn:
      "WordPress website for a professional guitar and bass recording studio, focused on premium aesthetics, showcasing work through video, reaching international clients and a contact form for new project inquiries.",
  },
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
    title: "Iron Pulse",
    slug: "iron-pulse",
    coverImage: "/Projects/iron_pulse_1.png",
    type: "HTML / CSS / JavaScript / Landing Page",
    category: "landing",
    status: "Completed project",
    url: "/en/projects/iron-pulse",
    featured: true,
    tags: ["HTML", "CSS", "JavaScript", "Landing Page", "SEO", "Responsive", "Vercel"],
    description:
      "Landing page za personal trening i strength coaching servis, izrađena u čistom HTML, CSS i JavaScript-u bez frameworka. Mobile-first dizajn, SEO optimizacija, pristupačnost i validacija forme.",
    descriptionEn:
      "Landing page for a personal training and strength coaching service, built with pure HTML, CSS and JavaScript — no frameworks. Mobile-first design, SEO optimization, accessibility and form validation.",
  },
  {
    title: "Luma Dental",
    slug: "luma-dental",
    coverImage: "/Projects/luma_dental_1.png",
    type: "Next.js / React / Dental Clinic / Landing Page",
    category: "nextjs",
    status: "Portfolio project",
    url: "/en/projects/luma-dental",
    featured: true,
    tags: ["Next.js", "React", "Landing Page", "Healthcare", "Booking Form", "Responsive"],
    description:
      "Next.js landing page za stomatološku ordinaciju sa jasnom prezentacijom usluga, timom doktora, galerijm ordinacije, FAQ sekcijom i formom za zakazivanje termina.",
    descriptionEn:
      "Next.js landing page for a dental clinic with clear service presentation, team section, practice gallery, FAQ accordion and an appointment booking form.",
  },
  {
    title: "Lumera Wellness",
    slug: "lumera-wellness",
    coverImage: "/Projects/LumeraWellness1.png",
    type: "Next.js / React / Wellness Booking Template",
    category: "nextjs",
    status: "In development",
    url: "/en/projects/lumera-wellness",
    featured: false,
    tags: ["Next.js", "React", "App Router", "Booking System", "Admin Dashboard", "Template"],
    description:
      "Next.js template za zakazivanje namenjen wellness i masažnim salonima. Spaja uglađen, prilagodljiv javni sajt sa zaštićenim admin dashboard-om za obradu zahteva za termin, upravljanje rezervacijama i klijentima i praćenje rezervacija i prihoda. Napravljen kao proizvod koji se brendira i prodaje različitim salonima — prikazani sadržaj je generički demo.",
    descriptionEn:
      "A Next.js booking template for wellness and massage studios. It pairs a polished, customizable public site with a protected admin dashboard for handling appointment requests, managing reservations and clients, and tracking bookings and revenue. Built as a reusable product that can be branded and sold to different salons — the content shown is a generic demo.",
  },
];

export const featuredProjects = projects.filter((project) => project.featured);

// Projects shown in the homepage "Recent Work" section, in display order.
const RECENT_PROJECT_SLUGS = [
  "wellness-concept",
  "djordje-clienthub",
  "ben-akiba-dashboard",
  "lumera-wellness",
];

export const recentProjects = RECENT_PROJECT_SLUGS.map((slug) =>
  projects.find((project) => project.slug === slug)
).filter(Boolean);

// Returns an object keyed by PROJECT_CATEGORIES with an array of projects for each.
export function getProjectsByCategory() {
  return Object.keys(PROJECT_CATEGORIES).reduce((grouped, key) => {
    grouped[key] = projects.filter((project) => project.category === key);
    return grouped;
  }, {});
}
