import { services } from "@/data/services";
import { projects } from "@/data/projects";
import { getPublishedBlogSlugs } from "@/lib/blog";

const BASE_URL = "https://dwebsolutions.rs";

// Regenerate hourly so newly published blog posts appear without a rebuild. If a
// regeneration throws (see getBlogSlugs), Next keeps serving the last good sitemap.
export const revalidate = 3600;

async function getBlogSlugs() {
  try {
    return await getPublishedBlogSlugs();
  } catch (error) {
    console.error("[sitemap] Could not load published blog posts:", error);
    // Build time: do not fail the build when the database is unreachable; the sitemap
    // is rebuilt on the first revalidation (<= 1h) once the database answers.
    if (process.env.NEXT_PHASE === "phase-production-build") {
      console.error("[sitemap] Blog URLs are OMITTED from the build-time sitemap; they are added on the next revalidation.");
      return [];
    }
    // Runtime: never silently publish a sitemap without blog URLs.
    throw error;
  }
}

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

export default async function sitemap() {
  const blogSlugs = await getBlogSlugs();

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
    // Blog index is noindex while there are no published posts (see blogIndexRobots),
    // so it only belongs in the sitemap once at least one post exists.
    ...(blogSlugs.length > 0
      ? bilingualEntries("/en/blog", "/sr/blog", {
          priority: 0.8,
          changeFrequency: "weekly",
        })
      : []),
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

  const blogPostPages = blogSlugs.flatMap((slug) =>
    bilingualEntries(`/en/blog/${slug}`, `/sr/blog/${slug}`, {
      priority: 0.7,
      changeFrequency: "monthly",
    }),
  );

  return [...staticPages, ...projectPages, ...servicePages, ...blogPostPages];
}