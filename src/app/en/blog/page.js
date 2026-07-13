import Link from "next/link";
import { db } from "@/db";
import { blogPosts } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import PageHero from "@/components/PageHero";
import styles from "./blog.module.css";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Blog — Web Development & SEO Tips",
  description:
    "Web development articles, SEO guides and project updates from a freelance developer in Belgrade. WordPress, Next.js and online marketing tips.",
  alternates: {
    canonical: "/en/blog",
    languages: {
      en: "/en/blog",
      sr: "/sr/blog",
    },
  },
};

export default async function BlogEnPage() {
  const posts = await db
    .select()
    .from(blogPosts)
    .where(eq(blogPosts.status, "published"))
    .orderBy(desc(blogPosts.createdAt));

  return (
    <main>
      <PageHero eyebrow="Blog" title="Blog">
        Web development tips, SEO guides and project updates from Belgrade.
      </PageHero>

      <div className={styles.wrapper}>
        {posts.length === 0 ? (
          <p className={styles.empty}>No posts yet — check back soon.</p>
        ) : (
          <div className={styles.grid}>
            {posts.map((post) => (
              <article key={post.id} className={styles.card}>
                {post.coverImage && (
                  <img
                    src={post.coverImage}
                    alt={post.titleEn || post.titleSr || ""}
                    className={styles.cardImage}
                  />
                )}
                <div className={styles.cardBody}>
                  <time className={styles.cardDate}>
                    {post.publishedAt ||
                      new Date(post.createdAt).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                  </time>
                  <h2 className={styles.cardTitle}>
                    <Link href={`/en/blog/${post.slug}`}>
                      {post.titleEn || post.titleSr}
                    </Link>
                  </h2>
                  {(post.excerptEn || post.excerptSr) && (
                    <p className={styles.excerpt}>
                      {post.excerptEn || post.excerptSr}
                    </p>
                  )}
                  <Link href={`/en/blog/${post.slug}`} className={styles.readMore}>
                    Read more →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
