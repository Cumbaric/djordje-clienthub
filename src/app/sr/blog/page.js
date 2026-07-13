import Link from "next/link";
import { db } from "@/db";
import { blogPosts } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import PageHero from "@/components/PageHero";
import styles from "@/app/en/blog/blog.module.css";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Blog — Web development i SEO saveti",
  description:
    "Članci o web developmentu, SEO vodičima i projektima freelance web developera iz Beograda. WordPress, Next.js i saveti za online marketing.",
  alternates: {
    canonical: "/sr/blog",
    languages: {
      en: "/en/blog",
      sr: "/sr/blog",
    },
  },
};

export default async function BlogSrPage() {
  const posts = await db
    .select()
    .from(blogPosts)
    .where(eq(blogPosts.status, "published"))
    .orderBy(desc(blogPosts.createdAt));

  return (
    <main>
      <PageHero eyebrow="Blog" title="Blog">
        Web development saveti, SEO vodiči i projekti iz Beograda.
      </PageHero>

      <div className={styles.wrapper}>
        {posts.length === 0 ? (
          <p className={styles.empty}>Nema postova još. Uskoro!</p>
        ) : (
          <div className={styles.grid}>
            {posts.map((post) => (
              <article key={post.id} className={styles.card}>
                {post.coverImage && (
                  <img
                    src={post.coverImage}
                    alt={post.titleSr || post.titleEn || ""}
                    className={styles.cardImage}
                  />
                )}
                <div className={styles.cardBody}>
                  <time className={styles.cardDate}>
                    {post.publishedAt ||
                      new Date(post.createdAt).toLocaleDateString("sr-Latn-RS", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                  </time>
                  <h2 className={styles.cardTitle}>
                    <Link href={`/sr/blog/${post.slug}`}>
                      {post.titleSr || post.titleEn}
                    </Link>
                  </h2>
                  {(post.excerptSr || post.excerptEn) && (
                    <p className={styles.excerpt}>
                      {post.excerptSr || post.excerptEn}
                    </p>
                  )}
                  <Link href={`/sr/blog/${post.slug}`} className={styles.readMore}>
                    Čitaj više →
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
