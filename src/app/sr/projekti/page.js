import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { projects } from "@/data/projects";

export const metadata = {
  title: "Projekti",
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

const statusMap = {
  "Active project":    { label: "Aktivan projekat", status: "active" },
  "Portfolio project": { label: "Portfolio",         status: "done"   },
  "Completed project": { label: "Završen projekat",  status: "done"   },
  "In development":    { label: "U razvoju",          status: "dev"    },
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
                  <p>{project.description}</p>
                  <div className="project-tags">
                    {project.tags.map((tag) => (
                      <span key={tag} className="project-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                  {project.slug ? (
                    <div className="project-card-cta">
                      Pogledaj <span>→</span>
                    </div>
                  ) : (
                    <p className="project-coming-soon">Case study uskoro</p>
                  )}
                </div>
              </>
            );

            return project.slug ? (
              <Link key={project.title} href={href} className="project-card-link">
                {cardInner}
              </Link>
            ) : (
              <div key={project.title} className="project-card">
                {cardInner}
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
