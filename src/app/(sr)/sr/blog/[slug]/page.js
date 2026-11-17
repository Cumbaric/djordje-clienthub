import { notFound } from "next/navigation";
import Link from "next/link";
import { db } from "@/db";
import { blogPosts } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import PageHero from "@/components/PageHero";
import styles from "@/app/(en)/en/blog/[slug]/post.module.css";
import { seoMeta } from "@/lib/seo";
import { BLOG_ENABLED } from "@/data/features";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  if (!BLOG_ENABLED) return { robots: { index: false, follow: false } }; // blog switched off (src/data/features.js)
  const { slug } = await params;
  const post = await db
    .select()
    .from(blogPosts)
    .where(and(eq(blogPosts.slug, slug), eq(blogPosts.status, "published")))
    .limit(1)
    .then((r) => r[0]);

  if (!post) return {};

  const seo = seoMeta({
    lang: "sr",
    en: `/en/blog/${slug}`,
    sr: `/sr/blog/${slug}`,
    type: "article",
    image: post.coverImage || undefined,
  });

  return {
    title: post.titleSr || post.titleEn,
    description: post.excerptSr || post.excerptEn || undefined,
    alternates: seo.alternates,
    twitter: seo.twitter,
    openGraph: seo.openGraph,
  };
}

export default async function BlogPostSrPage({ params }) {
  const { slug } = await params;
  const post = await db
    .select()
    .from(blogPosts)
    .where(and(eq(blogPosts.slug, slug), eq(blogPosts.status, "published")))
    .limit(1)
    .then((r) => r[0]);

  if (!post) notFound();

  const title = post.titleSr || post.titleEn;
  const content = post.contentSr || post.contentEn;

  return (
    <main>
      <PageHero eyebrow="Blog" title={title} />

      <div className={styles.wrapper}>
        {post.coverImage && (
          // Arbitrary external URL (cannot use next/image). Declared 16:9 size + CSS aspect-ratio avoid layout shift;
          // it is the LCP image of the article, so it loads eagerly with high priority.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={post.coverImage}
            alt={title}
            className={styles.coverImage}
            width={1200}
            height={675}
            fetchPriority="high"
            decoding="async"
          />
        )}

        <time className={styles.date}>
          {post.publishedAt ||
            new Date(post.createdAt).toLocaleDateString("sr-Latn-RS", {
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

        <Link href="/sr/blog" className={styles.backLink}>
          ← Svi postovi
        </Link>
      </div>
    </main>
  );
}
