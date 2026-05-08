import Link from "next/link";
import PageHero from "@/components/PageHero";
import { projects } from "@/data/projects";

export default function ProjectsPage() {
  return (
    <main className="public-page">
      <PageHero eyebrow="Portfolio" title="Projects">
        Izabrani WordPress, WooCommerce i custom content projekti koji
        prikazuju moj rad sa strukturom sajta, Elementorom, SEO osnovama,
        sadržajem i tehničkim podešavanjima.
      </PageHero>

      <section className="projects-list">
        {projects.map((project) => (
          <Link
            key={project.title}
            href={project.url}
            className="project-list-card"
          >
            <div>
              <p className="project-category">{project.category}</p>
              <h2>{project.title}</h2>
              <p>{project.description}</p>
            </div>

            <span>{project.status}</span>
          </Link>
        ))}
      </section>
    </main>
  );
}
