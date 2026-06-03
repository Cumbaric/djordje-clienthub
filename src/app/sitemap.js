import { services } from "@/data/services";
import { projects } from "@/data/projects";

const BASE_URL = "https://djordjepopovic.com";

// Helper: build an entry with EN/SR hreflang alternates.
function entry(enPath, srPath, { priority = 0.7, changeFrequency = "monthly" } = {}) {
  return {
    url: `${BASE_URL}${enPath}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
    alternates: {
      languages: {
        en: `${BASE_URL}${enPath}`,
        sr: `${BASE_URL}${srPath}`,
      },
    },
  };
}

export default function sitemap() {
  // Static public pages (EN path, SR path)
  const staticPages = [
    entry("/en", "/sr", { priority: 1, changeFrequency: "weekly" }),
    entry("/en/projects", "/sr/projekti", { priority: 0.9 }),
    entry("/en/services", "/sr/usluge", { priority: 0.9 }),
    entry("/en/process", "/sr/proces", { priority: 0.7 }),
    entry("/en/contact", "/sr/kontakt", { priority: 0.7 }),
  ];

  // Project case studies (same slug on both languages)
  const projectPages = projects.map((p) =>
    entry(`/en/projects/${p.slug}`, `/sr/projekti/${p.slug}`, { priority: 0.8 }),
  );

  // Service detail pages (same slug on both languages)
  const servicePages = services.map((s) =>
    entry(`/en/services/${s.slug}`, `/sr/usluge/${s.slug}`, { priority: 0.6 }),
  );

  return [...staticPages, ...projectPages, ...servicePages];
}
