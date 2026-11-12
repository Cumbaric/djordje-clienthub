import { db } from "@/db";
import { blogPosts } from "@/db/schema";
import { desc } from "drizzle-orm";
import { createBlogPost } from "./actions";
import BlogListClient from "./BlogListClient";
import "@/styles/dashboard-forms.css";
import "@/styles/blog-dashboard.css";

export const dynamic = "force-dynamic";

export default async function BlogDashboardPage() {
  const posts = await db
    .select()
    .from(blogPosts)
    .orderBy(desc(blogPosts.createdAt));

  const total = posts.length;
  const published = posts.filter((p) => p.status === "published").length;
  const drafts = posts.filter((p) => p.status === "draft").length;

  const stats = [
    { label: "Ukupno postova", value: total, description: "Svi blog postovi" },
    { label: "Objavljeno", value: published, description: "Vidljivo na sajtu" },
    { label: "Nacrti", value: drafts, description: "Nisu još objavljeni" },
  ];

  return (
    <section className="dashboard-page">
      <div className="dashboard-header">
        <p className="dashboard-label">Sadržaj</p>
        <h1>Blog</h1>
        <p>Kreiraj i upravljaj blog postovima na srpskom i engleskom jeziku.</p>
      </div>

      <div className="dashboard-stats-grid">
        {stats.map((item) => (
          <article className="dashboard-stat-card" key={item.label}>
            <span>{item.label}</span>
            <strong>{item.value}</strong>
            <p>{item.description}</p>
          </article>
        ))}
      </div>

      <div className="dashboard-section">
        <div className="dashboard-section-header">
          <div>
            <p className="dashboard-label">Dodaj novo</p>
            <h2>Novi blog post</h2>
          </div>
        </div>

        <form action={createBlogPost} className="dashboard-form">
          <div className="dashboard-form-row">
            <label className="dashboard-field dashboard-field-wide">
              <span>Naslov (SR) *</span>
              <input name="titleSr" type="text" placeholder="Naslov na srpskom" />
            </label>
            <label className="dashboard-field dashboard-field-wide">
              <span>Naslov (EN) *</span>
              <input name="titleEn" type="text" placeholder="Title in English" />
            </label>
          </div>

          <div className="dashboard-form-row">
            <label className="dashboard-field dashboard-field-wide">
              <span>Slug (URL — auto ako je prazno)</span>
              <input name="slug" type="text" placeholder="url-slug-posta" />
            </label>
            <label className="dashboard-field">
              <span>Status</span>
              <select name="status" defaultValue="draft">
                <option value="draft">Nacrt</option>
                <option value="published">Objavljeno</option>
              </select>
            </label>
            <label className="dashboard-field">
              <span>Datum objave</span>
              <input name="publishedAt" type="text" placeholder="13.07.2026." />
            </label>
          </div>

          <div className="dashboard-form-row">
            <label className="dashboard-field dashboard-field-wide">
              <span>Kratak opis (SR)</span>
              <textarea name="excerptSr" rows={2} placeholder="Kratak opis na srpskom" />
            </label>
            <label className="dashboard-field dashboard-field-wide">
              <span>Kratak opis (EN)</span>
              <textarea name="excerptEn" rows={2} placeholder="Short description in English" />
            </label>
          </div>

          <label className="dashboard-field dashboard-field-wide">
            <span>Sadržaj (SR)</span>
            <textarea name="contentSr" rows={8} placeholder="Sadržaj posta na srpskom..." />
          </label>

          <label className="dashboard-field dashboard-field-wide">
            <span>Sadržaj (EN)</span>
            <textarea name="contentEn" rows={8} placeholder="Post content in English..." />
          </label>

          <label className="dashboard-field dashboard-field-wide">
            <span>Cover slika (URL)</span>
            <input name="coverImage" type="text" placeholder="https://..." />
          </label>

          <div className="dashboard-form-actions">
            <button type="submit" className="dashboard-primary-btn">
              Kreiraj post
            </button>
          </div>
        </form>
      </div>

      <div className="dashboard-section">
        <div className="dashboard-section-header">
          <div>
            <p className="dashboard-label">Pregled</p>
            <h2>Svi postovi</h2>
          </div>
        </div>

        <BlogListClient posts={posts} />
      </div>
    </section>
  );
}
