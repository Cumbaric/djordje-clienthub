import { db } from "@/db";
import { blogPosts } from "@/db/schema";
import { eq } from "drizzle-orm";

/** Slugs of all published blog posts. Throws if the query fails. */
export async function getPublishedBlogSlugs() {
  const rows = await db
    .select({ slug: blogPosts.slug })
    .from(blogPosts)
    .where(eq(blogPosts.status, "published"));
  return rows.map((r) => r.slug);
}

/**
 * Robots metadata for the blog index pages: noindex (but follow) while there are no
 * published posts, so an empty "No posts yet" page is not indexed. Fails open — if the
 * database is unavailable the page stays indexable and the error is logged.
 */
export async function blogIndexRobots() {
  try {
    const slugs = await getPublishedBlogSlugs();
    return slugs.length === 0 ? { index: false, follow: true } : undefined;
  } catch (err) {
    console.error("[blog] Could not check published posts for robots meta:", err);
    return undefined;
  }
}
