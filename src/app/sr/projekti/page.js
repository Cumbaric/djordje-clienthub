import Link from "next/link";
import PageHero from "@/components/PageHero";
import { projects } from "@/data/projects";

export const metadata = {
  title: "Projekti | Đorđe Popović",
  description:
    "Odabrani WordPress, SEO, WooCommerce i web app projekti, uključujući Wellness Concept i Djordje ClientHub.",
  openGraph: {
    title: "Projekti | Đorđe Popović",
    description:
      "Pregled WordPress, SEO, WooCommerce i Next.js portfolio projekata.",
  },
  alternates: {
    languages: { en: "/en/projects", sr: "/sr/projekti" },
  },
};

export default function ProjektiPage() {
  return (
    <main>
      <PageHero
        eyebrow="Projekti"
        title="Odabrani WordPress, SEO i web app projekti"
      >
        Pregled realnih WordPress projekata, SEO unapređenja, WooCommerce
        strukture i interne Djordje ClientHub aplikacije izrađene kroz Next.js i
        React.
      </PageHero>

      <div className="public-page">
      <section className="projects-grid">
        {projects.map((project) => {
          const href = `/sr/projekti/${project.slug}`;
          const content = (
            <>
              <p className="project-card-type">{project.type}</p>
              <h2>{project.title}</h2>
              <p>{project.description}</p>
              <div className="project-tags">
                {project.tags.map((tag) => (
                  <span key={tag} className="project-tag">
                    {tag}
                  </span>
                ))}
              </div>
              {!project.slug && (
                <p className="project-coming-soon">Case study uskoro</p>
              )}
            </>
          );

          return project.slug ? (
            <Link key={project.title} href={href} className="project-card-link">
              {content}
            </Link>
          ) : (
            <div key={project.title} className="project-card">
              {content}
            </div>
          );
        })}
      </section>

      <section className="projects-cta">
        <h2>Želiš sličan projekat?</h2>
        <p>
          Ako ti treba pregledniji WordPress sajt, bolja struktura ili praktičan
          interni workflow, pošalji mi kratak opis projekta.
        </p>
        <div className="projects-cta-actions">
          <Link href="/sr/kontakt">Kontakt</Link>
          <Link href="/sr/usluge" className="projects-cta-secondary">
            Pogledaj usluge
          </Link>
        </div>
      </section>
      </div>
    </main>
  );
}
