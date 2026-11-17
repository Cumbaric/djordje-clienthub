import { db } from "@/db";
import { blogPosts } from "@/db/schema";
import { eq } from "drizzle-orm";
import { BLOG_ENABLED } from "@/data/features";

/** All published blog posts as { slug, updatedAt }. Throws if the query fails. */
export async function getPublishedBlogPosts() {
  return db
    .select({ slug: blogPosts.slug, updatedAt: blogPosts.updatedAt })
    .from(blogPosts)
    .where(eq(blogPosts.status, "published"));
}

/**
 * Robots metadata for the blog index pages: noindex (but follow) while there are no
 * published posts, so an empty "No posts yet" page is not indexed. Fails open — if the
 * database is unavailable the page stays indexable and the error is logged.
 */
export async function blogIndexRobots() {
  if (!BLOG_ENABLED) return { index: false, follow: true }; // blog switched off in src/data/features.js
  try {
    const posts = await getPublishedBlogPosts();
    return posts.length === 0 ? { index: false, follow: true } : undefined;
  } catch (err) {
    console.error("[blog] Could not check published posts for robots meta:", err);
    return undefined;
  }
}
