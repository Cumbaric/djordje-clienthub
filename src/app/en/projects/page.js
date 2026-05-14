import Link from "next/link";
import PageHero from "@/components/PageHero";
import { projects } from "@/data/projects";

export default function ProjectsPage() {
  return (
    <main className="public-page">
      <PageHero eyebrow="Portfolio" title="Projects">
        Selected WordPress, WooCommerce, and custom content projects showcasing
        my work with site structure, Elementor, SEO basics, content, and
        technical setup.
      </PageHero>

      <section className="projects-list">
        {projects.map((project) => (
          <Link
            key={project.title}
            href={project.slug ? `/en/projects/${project.slug}` : "/en/projects"}
            className="project-list-card"
          >
            <div>
              <p className="project-category">{project.category}</p>
              <h2>{project.title}</h2>
              <p>{project.descriptionEn || project.description}</p>
            </div>

            <span>{project.status}</span>
          </Link>
        ))}
      </section>
    </main>
  );
}
