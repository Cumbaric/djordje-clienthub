"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { blogPosts } from "@/db/schema";

function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[čć]/g, "c")
    .replace(/š/g, "s")
    .replace(/đ/g, "dj")
    .replace(/ž/g, "z")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function refresh() {
  revalidatePath("/dashboard/blog");
  revalidatePath("/en/blog");
  revalidatePath("/sr/blog");
}

export async function createBlogPost(formData) {
  const titleEn = formData.get("titleEn")?.toString().trim() || null;
  const titleSr = formData.get("titleSr")?.toString().trim() || null;
  if (!titleEn && !titleSr) return;

  const rawSlug = formData.get("slug")?.toString().trim();
  const slug = rawSlug || slugify(titleEn || titleSr);

  await db.insert(blogPosts).values({
    slug,
    titleEn,
    titleSr,
    excerptEn: formData.get("excerptEn")?.toString().trim() || null,
    excerptSr: formData.get("excerptSr")?.toString().trim() || null,
    contentEn: formData.get("contentEn")?.toString().trim() || null,
    contentSr: formData.get("contentSr")?.toString().trim() || null,
    coverImage: formData.get("coverImage")?.toString().trim() || null,
    status: formData.get("status")?.toString() || "draft",
    publishedAt: formData.get("publishedAt")?.toString().trim() || null,
  });

  refresh();
}

export async function updateBlogPost(formData) {
  const id = Number(formData.get("id"));
  if (!id) return;

  const rawSlug = formData.get("slug")?.toString().trim();

  await db
    .update(blogPosts)
    .set({
      ...(rawSlug && { slug: rawSlug }),
      titleEn: formData.get("titleEn")?.toString().trim() || null,
      titleSr: formData.get("titleSr")?.toString().trim() || null,
      excerptEn: formData.get("excerptEn")?.toString().trim() || null,
      excerptSr: formData.get("excerptSr")?.toString().trim() || null,
      contentEn: formData.get("contentEn")?.toString().trim() || null,
      contentSr: formData.get("contentSr")?.toString().trim() || null,
      coverImage: formData.get("coverImage")?.toString().trim() || null,
      status: formData.get("status")?.toString() || "draft",
      publishedAt: formData.get("publishedAt")?.toString().trim() || null,
    })
    .where(eq(blogPosts.id, id));

  refresh();
}

export async function deleteBlogPost(formData) {
  const id = Number(formData.get("id"));
  if (!id) return;

  await db.delete(blogPosts).where(eq(blogPosts.id, id));
  refresh();
}

export async function toggleBlogPostStatus(formData) {
  const id = Number(formData.get("id"));
  const currentStatus = formData.get("currentStatus")?.toString();
  if (!id) return;

  const newStatus = currentStatus === "published" ? "draft" : "published";
  await db
    .update(blogPosts)
    .set({ status: newStatus })
    .where(eq(blogPosts.id, id));

  refresh();
}
