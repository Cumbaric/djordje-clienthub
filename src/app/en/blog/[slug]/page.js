import { notFound } from "next/navigation";
import Link from "next/link";
import { db } from "@/db";
import { blogPosts } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import PageHero from "@/components/PageHero";
import styles from "./post.module.css";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await db
    .select()
    .from(blogPosts)
    .where(and(eq(blogPosts.slug, slug), eq(blogPosts.status, "published")))
    .limit(1)
    .then((r) => r[0]);

  if (!post) return {};

  return {
    title: post.titleEn || post.titleSr,
    description: post.excerptEn || post.excerptSr || undefined,
    alternates: {
      canonical: `/en/blog/${slug}`,
      languages: {
        en: `/en/blog/${slug}`,
        sr: `/sr/blog/${slug}`,
      },
    },
    ...(post.coverImage && {
      openGraph: { images: [{ url: post.coverImage }] },
    }),
  };
}

export default async function BlogPostEnPage({ params }) {
  const { slug } = await params;
  const post = await db
    .select()
    .from(blogPosts)
    .where(and(eq(blogPosts.slug, slug), eq(blogPosts.status, "published")))
    .limit(1)
    .then((r) => r[0]);

  if (!post) notFound();

  const title = post.titleEn || post.titleSr;
  const content = post.contentEn || post.contentSr;

  return (
    <main>
      <PageHero eyebrow="Blog" title={title} />

      <div className={styles.wrapper}>
        {post.coverImage && (
          <img
            src={post.coverImage}
            alt={title}
            className={styles.coverImage}
          />
        )}

        <time className={styles.date}>
          {post.publishedAt ||
            new Date(post.createdAt).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
        </time>

        {content && (
          <div className={styles.content}>
            {content.split(/\n\n+/).filter(Boolean).map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        )}

        <Link href="/en/blog" className={styles.backLink}>
          ← All posts
        </Link>
      </div>
    </main>
  );
}
