import Link from "next/link";
import PageHero from "@/components/PageHero";
import ProjectCarousel from "@/components/ProjectCarousel";

const IMAGES = [
  "/Projects/djordje_clienthub_1.png",
  "/Projects/djordje_clienthub_2.png",
  "/Projects/djordje_clienthub_3.png",
  "/Projects/djordje_clienthub_4.png",
  "/Projects/djordje_clienthub_5.png",
  "/Projects/djordje_clienthub_6.png",
];

export const metadata = {
  title: "Djordje ClientHub Case Study",
  description:
    "Next.js bilingvalna portfolio i privatna dashboard aplikacija izrađena sa React, App Router, zaštitom ruta i AI-assisted razvojnim workflow-om.",
  openGraph: {
    title: "Djordje ClientHub Case Study",
    description:
      "Full-stack Next.js projekat koji kombinuje javni bilingvalni portfolio sa zaštićenim internim dashboard-om za klijente, projekte, zadatke i beleške.",
  },
  alternates: {
    canonical: "/sr/projekti/djordje-clienthub",
    languages: {
      en: "/en/projects/djordje-clienthub",
      sr: "/sr/projekti/djordje-clienthub",
    },
  },
};

export default function DjordjeClientHubPage() {
  return (
    <main>
      <PageHero
        eyebrow="Case Study"
        title="Djordje ClientHub — Bilingvalni portfolio i privatni dashboard"
        actions={
          <>
            <Link href="/sr/kontakt" className="hero-action-primary">
              Pokreni sličan projekat
            </Link>
            <Link href="/sr/usluge" className="hero-action-secondary">
              Pogledaj usluge
            </Link>
          </>
        }
      >
        Full-stack Next.js aplikacija koja kombinuje javni bilingvalni portfolio
        (EN/SR) sa zaštićenim internim dashboard-om za upravljanje klijentima,
        projektima, zadacima i radnim beleškama — izgrađena kroz AI-assisted
        razvojni workflow.
      </PageHero>

      <div className="public-page">
      <section className="case-study-meta">
        <div>
          <span>Tip projekta</span>
          <strong>Next.js / React / App Router / Dashboard</strong>
        </div>
        <div>
          <span>Industrija</span>
          <strong>Web razvoj / Lični alat</strong>
        </div>
        <div>
          <span>Fokus</span>
          <strong>Full-stack arhitektura, zaštita ruta, bilingvalni sadržaj, interni alat</strong>
        </div>
        <div>
          <span>Uloga</span>
          <strong>Full-stack razvoj, arhitektura, dizajn, deployment</strong>
        </div>
      </section>

      <section className="case-study-section">
        <h2>Galerija projekta</h2>
        <ProjectCarousel images={IMAGES} alt="Djordje ClientHub" />
      </section>

      <section className="case-study-section">
        <h2>Pregled projekta</h2>
        <p>
          Lični projekat koji kombinuje dva dela — javni bilingvalni portfolio i
          privatni dashboard zaštićen lozinkom za interno upravljanje projektima
          i klijentima. Izgrađen sa Next.js App Router-om i deployovan na
          Vercel.
        </p>
      </section>

      <section className="case-study-section">
        <h2>Izazov</h2>
        <ul className="case-study-list">
          <li>Trebalo je kombinovati profesionalni javni portfolio i privatni alat za upravljanje u jednom codebase-u</li>
          <li>Bilingvalni sadržaj (EN/SR) zahtevao je čistu routing arhitekturu</li>
          <li>Zaštita ruta morala je raditi pouzdano bez posebnog backend servisa</li>
          <li>Dashboard je trebao upravljati klijentima, projektima, zadacima i beleškama</li>
          <li>AI-assisted workflow morao je biti prirodno integrisan u razvojni proces</li>
        </ul>
      </section>

      <section className="case-study-section">
        <h2>Ciljevi projekta</h2>
        <ul className="case-study-list">
          <li>Izgraditi poliran bilingvalni javni portfolio</li>
          <li>Kreirati zaštićeni privatni dashboard</li>
          <li>Implementirati pouzdanu zaštitu ruta bez posebnog backenda</li>
          <li>Zadržati čist i održiv codebase</li>
          <li>Pouzdano deployovati na Vercel bez produkcijskih problema</li>
        </ul>
      </section>

      <section className="case-study-section">
        <h2>Šta je izgrađeno</h2>
        <div className="case-study-grid">
          <article>
            <h3>Javni portfolio</h3>
            <p>
              Bilingvalni (EN/SR) portfolio sa home, projekti, usluge, proces i
              kontakt stranicama, sa premium vizuelnim detaljima i animacijama.
            </p>
          </article>
          <article>
            <h3>Zaštićeni dashboard</h3>
            <p>
              Privatni dashboard dostupan samo nakon prijave, sa sekcijama za
              klijente, projekte, zadatke i radne beleške.
            </p>
          </article>
          <article>
            <h3>Zaštita ruta</h3>
            <p>
              Middleware-based zaštita ruta koristeći JWT tokene u HTTP-only
              kolačićima, pouzdano funkcioniše u razvoju i produkciji.
            </p>
          </article>
          <article>
            <h3>AI-assisted workflow</h3>
            <p>
              Kompletan projekat izgrađen kroz AI-assisted razvojni workflow,
              kombinujući Claude sa manuelnim pregledom koda za brži i čistiji
              output.
            </p>
          </article>
        </div>
      </section>

      <section className="case-study-section">
        <h2>Alati i tehnologije</h2>
        <div className="tech-stack">
          <span>Next.js 16</span>
          <span>React</span>
          <span>App Router</span>
          <span>CSS Modules</span>
          <span>JWT autentikacija</span>
          <span>HTTP-only kolačići</span>
          <span>Middleware zaštita ruta</span>
          <span>Vercel deployment</span>
          <span>AI-assisted workflow</span>
          <span>Bilingvalni routing</span>
          <span>Server i client komponente</span>
        </div>
      </section>

      <section className="case-study-section">
        <h2>Rezultat</h2>
        <p>
          Produkcijska full-stack aplikacija koja kombinuje premium javni
          portfolio sa funkcionalnim privatnim dashboard-om. Projekat
          demonstrira modernu Next.js arhitekturu, čistu organizaciju koda i
          pouzdani deployment na Vercel.
        </p>
        <ul className="case-study-list">
          <li>Live bilingvalni portfolio na djordje-clienthub.vercel.app</li>
          <li>Zaštićeni dashboard sa upravljanjem klijentima i projektima</li>
          <li>Pouzdana JWT-based zaštita ruta</li>
          <li>Čista App Router arhitektura</li>
          <li>Izgrađen sa AI-assisted razvojnim workflow-om</li>
        </ul>
      </section>

      <section className="case-study-section">
        <h2>Mogući sledeći koraci</h2>
        <ul className="case-study-list">
          <li>Dodati više dashboard funkcionalnosti (fakturisanje, praćenje vremena)</li>
          <li>Proširiti case study stranice sa više detalja</li>
          <li>Unaprediti dashboard analitiku i izveštavanje</li>
          <li>Dodati email notifikacije za ažuriranja klijenata</li>
          <li>Nastaviti unapređivanje javnog portfolio sadržaja i vizuala</li>
        </ul>
      </section>

      <section className="case-study-cta">
        <h2>Zainteresovan za Next.js portfolio ili dashboard?</h2>
        <p>
          Ako ti treba moderan portfolio, prilagođeni interni alat ili full-stack
          Next.js aplikacija, mogu da ti pomognem u planiranju i izgradnji.
        </p>
        <div className="case-study-cta-actions">
          <Link href="/sr/kontakt">Kontaktiraj me</Link>
          <Link href="/sr/usluge" className="case-study-cta-secondary">
            Pogledaj usluge
          </Link>
        </div>
      </section>
      </div>
    </main>
  );
}
