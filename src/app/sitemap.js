import { services } from "@/data/services";
import { projects } from "@/data/projects";

const BASE_URL = "https://djordjepopovic.com";

function bilingualEntries(
  enPath,
  srPath,
  { priority = 0.7, changeFrequency = "monthly" } = {},
) {
  const lastModified = new Date();

  const languages = {
    "x-default": `${BASE_URL}${enPath}`,
    en: `${BASE_URL}${enPath}`,
    sr: `${BASE_URL}${srPath}`,
  };

  return [
    {
      url: `${BASE_URL}${enPath}`,
      lastModified,
      changeFrequency,
      priority,
      alternates: {
        languages,
      },
    },
    {
      url: `${BASE_URL}${srPath}`,
      lastModified,
      changeFrequency,
      priority,
      alternates: {
        languages,
      },
    },
  ];
}

export default function sitemap() {
  const staticPages = [
    ...bilingualEntries("/en", "/sr", {
      priority: 1,
      changeFrequency: "weekly",
    }),
    ...bilingualEntries("/en/projects", "/sr/projekti", {
      priority: 0.9,
    }),
    ...bilingualEntries("/en/services", "/sr/usluge", {
      priority: 0.9,
    }),
    ...bilingualEntries("/en/process", "/sr/proces", {
      priority: 0.7,
    }),
    ...bilingualEntries("/en/contact", "/sr/kontakt", {
      priority: 0.7,
    }),
  ];

  const projectPages = projects.flatMap((project) =>
    bilingualEntries(`/en/projects/${project.slug}`, `/sr/projekti/${project.slug}`, {
      priority: 0.8,
    }),
  );

  const servicePages = services.flatMap((service) =>
    bilingualEntries(`/en/services/${service.slug}`, `/sr/usluge/${service.slug}`, {
      priority: 0.6,
    }),
  );

  return [...staticPages, ...projectPages, ...servicePages];
}