"use client";

import { useState } from "react";
import { updateBlogPost, deleteBlogPost, toggleBlogPostStatus } from "./actions";
import "@/styles/blog-dashboard.css";

export default function BlogListClient({ posts }) {
  const [editingId, setEditingId] = useState(null);

  if (!posts.length) {
    return <p className="blog-empty">Nema blog postova. Kreiraj prvi!</p>;
  }

  return (
    <div className="blog-list">
      {posts.map((post) => (
        <div key={post.id} className="blog-item">
          <div className="blog-item-row">
            <div className="blog-item-info">
              <span className={`blog-tag ${post.status === "published" ? "blog-tag-published" : "blog-tag-draft"}`}>
                {post.status === "published" ? "Objavljeno" : "Nacrt"}
              </span>
              <div className="blog-item-titles">
                <strong>{post.titleSr || post.titleEn || "(bez naslova)"}</strong>
                {post.titleEn && post.titleSr && <small>{post.titleEn}</small>}
              </div>
              <code className="blog-item-slug">/{post.slug}</code>
            </div>

            <div className="blog-item-actions">
              <button
                type="button"
                className="blog-action-btn"
                onClick={() => setEditingId(editingId === post.id ? null : post.id)}
              >
                {editingId === post.id ? "Zatvori" : "Izmeni"}
              </button>

              <form action={toggleBlogPostStatus} className="blog-action-form">
                <input type="hidden" name="id" value={post.id} />
                <input type="hidden" name="currentStatus" value={post.status} />
                <button type="submit" className="blog-action-btn">
                  {post.status === "published" ? "Na nacrt" : "Objavi"}
                </button>
              </form>

              <form
                action={deleteBlogPost}
                className="blog-action-form"
                onSubmit={(e) => {
                  if (!window.confirm("Obriši blog post?")) e.preventDefault();
                }}
              >
                <input type="hidden" name="id" value={post.id} />
                <button type="submit" className="blog-action-btn blog-action-btn-danger">
                  Obriši
                </button>
              </form>
            </div>
          </div>

          {editingId === post.id && (
            <form action={updateBlogPost} className="dashboard-form blog-edit-form">
              <input type="hidden" name="id" value={post.id} />

              <div className="dashboard-form-row">
                <label className="dashboard-field dashboard-field-wide">
                  <span>Naslov (SR)</span>
                  <input
                    name="titleSr"
                    type="text"
                    defaultValue={post.titleSr ?? ""}
                    placeholder="Naslov na srpskom"
                  />
                </label>
                <label className="dashboard-field dashboard-field-wide">
                  <span>Naslov (EN)</span>
                  <input
                    name="titleEn"
                    type="text"
                    defaultValue={post.titleEn ?? ""}
                    placeholder="Title in English"
                  />
                </label>
              </div>

              <div className="dashboard-form-row">
                <label className="dashboard-field dashboard-field-wide">
                  <span>Slug (URL)</span>
                  <input
                    name="slug"
                    type="text"
                    defaultValue={post.slug}
                    placeholder="url-slug"
                  />
                </label>
                <label className="dashboard-field">
                  <span>Status</span>
                  <select name="status" defaultValue={post.status}>
                    <option value="draft">Nacrt</option>
                    <option value="published">Objavljeno</option>
                  </select>
                </label>
                <label className="dashboard-field">
                  <span>Datum objave</span>
                  <input
                    name="publishedAt"
                    type="text"
                    defaultValue={post.publishedAt ?? ""}
                    placeholder="13.07.2026."
                  />
                </label>
              </div>

              <div className="dashboard-form-row">
                <label className="dashboard-field dashboard-field-wide">
                  <span>Kratak opis (SR)</span>
                  <textarea
                    name="excerptSr"
                    rows={2}
                    defaultValue={post.excerptSr ?? ""}
                    placeholder="Kratak opis na srpskom"
                  />
                </label>
                <label className="dashboard-field dashboard-field-wide">
                  <span>Kratak opis (EN)</span>
                  <textarea
                    name="excerptEn"
                    rows={2}
                    defaultValue={post.excerptEn ?? ""}
                    placeholder="Short description in English"
                  />
                </label>
              </div>

              <label className="dashboard-field dashboard-field-wide">
                <span>Sadržaj (SR)</span>
                <textarea
                  name="contentSr"
                  rows={8}
                  defaultValue={post.contentSr ?? ""}
                  placeholder="Sadržaj posta na srpskom..."
                />
              </label>

              <label className="dashboard-field dashboard-field-wide">
                <span>Sadržaj (EN)</span>
                <textarea
                  name="contentEn"
                  rows={8}
                  defaultValue={post.contentEn ?? ""}
                  placeholder="Post content in English..."
                />
              </label>

              <label className="dashboard-field dashboard-field-wide">
                <span>Cover slika (URL)</span>
                <input
                  name="coverImage"
                  type="text"
                  defaultValue={post.coverImage ?? ""}
                  placeholder="https://..."
                />
              </label>

              <div className="dashboard-form-actions">
                <button type="submit" className="dashboard-primary-btn">
                  Sačuvaj izmene
                </button>
                <button
                  type="button"
                  className="blog-action-btn"
                  onClick={() => setEditingId(null)}
                >
                  Otkaži
                </button>
              </div>
            </form>
          )}
        </div>
      ))}
    </div>
  );
}
