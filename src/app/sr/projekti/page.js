import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { PROJECT_CATEGORIES, getProjectsByCategory } from "@/data/projects";

export const metadata = {
  title: "WordPress, Next.js i WooCommerce projekti",
  description:
    "Odabrani web projekti — WordPress sajtovi, WooCommerce prodavnice, Next.js aplikacije i custom landing stranice. Freelance web developer iz Beograda, Srbija.",
  openGraph: {
    title: "Portfolio projekata | Đorđe Popović",
    description:
      "WordPress, WooCommerce, Next.js i HTML/CSS projekti freelance web developera iz Beograda.",
  },
  alternates: {
    canonical: "/sr/projekti",
    languages: { en: "/en/projects", sr: "/sr/projekti" },
  },
};

const statusMap = {
  "Active project":    { label: "Aktivan projekat", status: "active" },
  "Portfolio project": { label: "Portfolio",         status: "done"   },
  "Completed project": { label: "Završen projekat",  status: "done"   },
  "In development":    { label: "U razvoju",          status: "dev"    },
};

function ProjectCard({ project }) {
  const href = `/sr/projekti/${project.slug}`;
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
        <p className="proj-overlay-desc">{project.description}</p>
        <div className="proj-overlay-tags">
          {project.tags.slice(0, 4).map((tag) => (
            <span key={tag} className="proj-overlay-tag">{tag}</span>
          ))}
        </div>
        {project.slug ? (
          <span className="proj-overlay-cta">Pogledaj →</span>
        ) : (
          <span className="proj-overlay-soon">Case study uskoro</span>
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

export default function ProjektiPage() {
  const projectsByCategory = getProjectsByCategory();

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
                <p className="projects-category-empty">Uskoro</p>
              )}
            </section>
          );
        })}

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
