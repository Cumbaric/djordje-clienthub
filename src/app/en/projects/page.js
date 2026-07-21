import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { PROJECT_CATEGORIES, getProjectsByCategory } from "@/data/projects";

export const metadata = {
  title: "WordPress, Next.js & WooCommerce Projects",
  description:
    "Selected web development projects — WordPress websites, WooCommerce stores, Next.js applications and custom landing pages. Freelance web developer based in Belgrade, Serbia.",
  openGraph: {
    title: "Web Development Portfolio | Đorđe Popović",
    description:
      "WordPress, WooCommerce, Next.js and HTML/CSS projects by a freelance web developer in Belgrade.",
  },
  alternates: {
    canonical: "/en/projects",
    languages: { en: "/en/projects", sr: "/sr/projekti" },
  },
};

const statusMap = {
  "Active project":    { label: "Active project",    status: "active" },
  "Portfolio project": { label: "Portfolio",          status: "done"   },
  "Completed project": { label: "Completed",          status: "done"   },
  "In development":    { label: "In development",     status: "dev"    },
};

function ProjectCard({ project }) {
  const href = `/en/projects/${project.slug}`;
  const { label: statusLabel, status: statusKey } =
    statusMap[project.status] ?? { label: project.status, status: "done" };

  const inner = (
    <>
      <div className="proj-img">
        {project.coverImage ? (
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            sizes="(max-width: 560px) 100vw, (max-width: 900px) 50vw, 33vw"
            style={{ objectFit: "cover" }}
          />
        ) : (
          <div className="proj-img-placeholder"><span>{project.title}</span></div>
        )}
      </div>

      <span className="proj-status" data-status={statusKey}>{statusLabel}</span>

      <div className="proj-title-bar">
        <p className="proj-card-type-label">{project.type.split(" / ")[0]}</p>
        <h2>{project.title}</h2>
      </div>

      <div className="proj-overlay" aria-hidden="true">
        <p className="proj-overlay-type">{project.type}</p>
        <h2 className="proj-overlay-title">{project.title}</h2>
        <p className="proj-overlay-desc">{project.descriptionEn}</p>
        <div className="proj-overlay-tags">
          {project.tags.slice(0, 4).map((tag) => (
            <span key={tag} className="proj-overlay-tag">{tag}</span>
          ))}
        </div>
        {project.slug ? (
          <span className="proj-overlay-cta">View project →</span>
        ) : (
          <span className="proj-overlay-soon">Case study coming soon</span>
        )}
      </div>
    </>
  );

  return project.slug ? (
    <Link href={href} className="proj-card">{inner}</Link>
  ) : (
    <div className="proj-card">{inner}</div>
  );
}

export default function ProjectsPage() {
  const projectsByCategory = getProjectsByCategory();

  return (
    <main>
      <PageHero
        eyebrow="Projects"
        title="Selected WordPress, SEO and web app projects"
      >
        A focused overview of real WordPress work, SEO improvements, WooCommerce
        structure and the Djordje ClientHub internal application built with
        Next.js and React.
      </PageHero>

      <div className="public-page">
        {Object.entries(PROJECT_CATEGORIES).map(([key, label]) => {
          const categoryProjects = projectsByCategory[key] ?? [];

          return (
            <section key={key} className="projects-category">
              <h2 className="projects-category-title">{label}</h2>
              {categoryProjects.length > 0 ? (
                <div className="proj-grid">
                  {categoryProjects.map((project) => (
                    <ProjectCard key={project.title} project={project} />
                  ))}
                </div>
              ) : (
                <p className="projects-category-empty">Coming soon</p>
              )}
            </section>
          );
        })}

        <section className="projects-cta">
          <h2>Want to build something similar?</h2>
          <p>
            If you need a cleaner WordPress website, better structure or a
            practical internal workflow, send me a short project description.
          </p>
          <div className="projects-cta-actions">
            <Link href="/en/contact">Contact me</Link>
            <Link href="/en/services" className="projects-cta-secondary">
              View services
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
