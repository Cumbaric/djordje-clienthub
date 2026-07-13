import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { PROJECT_CATEGORIES, getProjectsByCategory } from "@/data/projects";

export const metadata = {
  title: "Projects",
  description:
    "Selected WordPress, SEO, WooCommerce and web app projects, including Wellness Concept and Djordje ClientHub.",
  openGraph: {
    title: "Projects | Đorđe Popović",
    description:
      "A focused overview of WordPress, SEO, WooCommerce and Next.js portfolio projects.",
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

  const cardInner = (
    <>
      {/* Cover image area */}
      <div className="project-card-img">
        {project.coverImage ? (
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            sizes="(max-width: 700px) 100vw, 50vw"
            style={{ objectFit: "cover" }}
          />
        ) : (
          <div className="project-card-img-placeholder">
            <span>{project.title}</span>
          </div>
        )}
        <span className="project-card-status" data-status={statusKey}>
          {statusLabel}
        </span>
      </div>

      {/* Text content */}
      <div className="project-card-body">
        <p className="project-card-type">{project.type}</p>
        <h2>{project.title}</h2>
        <p>{project.descriptionEn}</p>
        <div className="project-tags">
          {project.tags.map((tag) => (
            <span key={tag} className="project-tag">
              {tag}
            </span>
          ))}
        </div>
        {project.slug ? (
          <div className="project-card-cta">
            View project <span>→</span>
          </div>
        ) : (
          <p className="project-coming-soon">Case study coming soon</p>
        )}
      </div>
    </>
  );

  return project.slug ? (
    <Link href={href} className="project-card-link">
      {cardInner}
    </Link>
  ) : (
    <div className="project-card">{cardInner}</div>
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
                <div className="projects-grid">
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
