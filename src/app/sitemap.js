import { services } from "@/data/services";
import { projects } from "@/data/projects";
import { PAGE_LASTMOD } from "@/data/pageDates";
import { getPublishedBlogPosts } from "@/lib/blog";
import { BLOG_ENABLED } from "@/data/features";

const BASE_URL = "https://dwebsolutions.rs";

// Regenerate hourly so newly published blog posts appear without a rebuild. If a
// regeneration throws (see getBlogPosts), Next keeps serving the last good sitemap.
export const revalidate = 3600;

async function getBlogPosts() {
  try {
    return await getPublishedBlogPosts();
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

/** Latest of several YYYY-MM-DD strings / Dates; undefined if none is valid. */
function latest(...dates) {
  const valid = dates.map((d) => (d ? new Date(d) : null)).filter((d) => d && !Number.isNaN(d.getTime()));
  return valid.length ? new Date(Math.max(...valid)) : undefined;
}

// Google ignores <changefreq>/<priority>, so only <lastmod> (a real modification date)
// and the hreflang alternates are emitted.
function bilingualEntries(enPath, srPath, lastModified) {
  const languages = {
    "x-default": `${BASE_URL}${enPath}`,
    en: `${BASE_URL}${enPath}`,
    sr: `${BASE_URL}${srPath}`,
  };

  return [enPath, srPath].map((path) => ({
    url: `${BASE_URL}${path}`,
    ...(lastModified && { lastModified }),
    alternates: { languages },
  }));
}

export default async function sitemap() {
  // While the blog is switched off (src/data/features.js) no blog URL is listed.
  const blogPosts = BLOG_ENABLED ? await getBlogPosts() : [];

  const staticPages = [
    ...bilingualEntries("/en", "/sr", latest(PAGE_LASTMOD.home)),
    ...bilingualEntries("/en/projects", "/sr/projekti", latest(PAGE_LASTMOD.projects, ...projects.map((p) => p.updatedAt))),
    ...bilingualEntries("/en/services", "/sr/usluge", latest(PAGE_LASTMOD.services, ...services.map((s) => s.updatedAt))),
    ...bilingualEntries("/en/process", "/sr/proces", latest(PAGE_LASTMOD.process)),
    ...bilingualEntries("/en/contact", "/sr/kontakt", latest(PAGE_LASTMOD.contact)),
    // Blog index is noindex while there are no published posts (see blogIndexRobots),
    // so it only belongs in the sitemap once at least one post exists.
    ...(blogPosts.length > 0
      ? bilingualEntries("/en/blog", "/sr/blog", latest(...blogPosts.map((p) => p.updatedAt)))
      : []),
  ];

  const projectPages = projects.flatMap((project) =>
    bilingualEntries(`/en/projects/${project.slug}`, `/sr/projekti/${project.slug}`, latest(project.updatedAt)),
  );

  const servicePages = services.flatMap((service) =>
    bilingualEntries(`/en/services/${service.slug}`, `/sr/usluge/${service.slugSr}`, latest(service.updatedAt)),
  );

  const blogPostPages = blogPosts.flatMap((post) =>
    bilingualEntries(`/en/blog/${post.slug}`, `/sr/blog/${post.slug}`, latest(post.updatedAt)),
  );

  return [...staticPages, ...projectPages, ...servicePages, ...blogPostPages];
}
