import Link from "next/link";
import PageHero from "@/components/PageHero";
import ProjectCarousel from "@/components/ProjectCarousel";

const IMAGES = [
  "/Projects/mirko_topalovic_1.png",
  "/Projects/mirko_topalovic_2.png",
  "/Projects/mirko_topalovic_3.png",
  "/Projects/mirko_topalovic_4.png",
];

export const metadata = {
  title: "MirkoTopalovićTips Case Study | Đorđe Popović",
  description:
    "WordPress platforma za sportske tipove fokusirana na organizaciju sadržaja, strukturu objava i pripremu za buduće automatizovane workflow-e.",
  openGraph: {
    title: "MirkoTopalovićTips Case Study",
    description:
      "WordPress projekat za platformu sportskih tipova za unapređenje strukture sadržaja, organizacije objava i navigacije.",
  },
  alternates: {
    languages: {
      en: "/en/projects/mirko-topalovic-tips",
      sr: "/sr/projekti/mirko-topalovic-tips",
    },
  },
};

export default function MirkoTopalovicTipsPage() {
  return (
    <main>
      <PageHero
        eyebrow="Case Study"
        title="MirkoTopalovićTips — Platforma za sportske tipove i struktura sadržaja"
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
        Content-driven WordPress projekat za platformu sportskih tipova,
        fokusiran na organizaciju objava, unapređenje strukture sadržaja,
        kreiranje jasne navigacije i pripremu sajta za lakše upravljanje i
        buduće automatizovane workflow-e.
      </PageHero>

      <div className="public-page">
      <section className="case-study-meta">
        <div>
          <span>Tip projekta</span>
          <strong>WordPress / Struktura sadržaja / Sportski tipovi</strong>
        </div>
        <div>
          <span>Industrija</span>
          <strong>Sport / Sadržaj za tipove</strong>
        </div>
        <div>
          <span>Fokus</span>
          <strong>Organizacija sadržaja, navigacija, planiranje automatizacije</strong>
        </div>
        <div>
          <span>Uloga</span>
          <strong>WordPress razvoj, struktura sadržaja, organizacija objava, planiranje workflow-a</strong>
        </div>
      </section>

      <section className="case-study-section">
        <h2>Galerija projekta</h2>
        <ProjectCarousel images={IMAGES} alt="MirkoTopalovićTips" />
      </section>

      <section className="case-study-section">
        <h2>Pregled projekta</h2>
        <p>
          Content platforma koja redovno objavljuje sportske tipove gde čitaoci
          treba brzo da pronađu najnovije tipove, pretražuju po sportu ili
          kategoriji i lako se snalaze na sajtu. Cilj je bila organizovana
          platforma za konzistentno objavljivanje i buduće skaliranje.
        </p>
      </section>

      <section className="case-study-section">
        <h2>Izazov</h2>
        <ul className="case-study-list">
          <li>Objavljeni tipovi nisu imali jasnu organizaciju po kategoriji ili sportu</li>
          <li>Navigacija nije bila prilagođena za pronalazak specifičnog sadržaja</li>
          <li>Struktura objava bila je nekonzistentna</li>
          <li>Sajt je zahtevao osnovu za redovno objavljivanje sadržaja</li>
          <li>Buduće automatizovane funkcionalnosti zahtevale su čistu strukturnu osnovu</li>
        </ul>
      </section>

      <section className="case-study-section">
        <h2>Ciljevi projekta</h2>
        <ul className="case-study-list">
          <li>Jasno organizovati postojeći i budući sadržaj tipova</li>
          <li>Kreirati konzistentnu strukturu objava i kategorija</li>
          <li>Unaprediti navigaciju za različite tipove sadržaja</li>
          <li>Izgraditi osnovu za buduću automatizaciju</li>
          <li>Olakšati upravljanje sajtom za administratora</li>
        </ul>
      </section>

      <section className="case-study-section">
        <h2>Šta je unapređeno</h2>
        <div className="case-study-grid">
          <article>
            <h3>Organizacija sadržaja</h3>
            <p>
              Tipovi su organizovani u jasne kategorije po sportu i tipu, što
              čitaocima olakšava pronalazak relevantnog sadržaja.
            </p>
          </article>
          <article>
            <h3>Struktura objava</h3>
            <p>
              Uspostavljen je konzistentan format objave za tipove, što ubrzava
              objavljivanje i poboljšava konzistentnost čitalačkog iskustva.
            </p>
          </article>
          <article>
            <h3>Navigacija</h3>
            <p>
              Navigacija sajta unapređena je kako bi čitaoci brzo pronašli
              sadržaj koji traže.
            </p>
          </article>
          <article>
            <h3>Priprema za automatizaciju</h3>
            <p>
              Struktura sajta pripremljena je sa fokusom na buduće automatizovane
              workflow-e, što olakšava skaliranje objavljenog sadržaja.
            </p>
          </article>
        </div>
      </section>

      <section className="case-study-section">
        <h2>Alati i tehnologije</h2>
        <div className="tech-stack">
          <span>WordPress</span>
          <span>Planiranje strukture sadržaja</span>
          <span>Organizacija kategorija</span>
          <span>Standardizacija formata objava</span>
          <span>Unapređenje navigacije</span>
          <span>Planiranje automatizovanih workflow-a</span>
          <span>SEO osnova</span>
          <span>Responsive design</span>
        </div>
      </section>

      <section className="case-study-section">
        <h2>Rezultat</h2>
        <p>
          Projekat je rezultovao organizovanijom i preglednom platformom za
          sportske tipove gde je sadržaj lakše objaviti, pregledati i upravljati
          njime.
        </p>
        <ul className="case-study-list">
          <li>Jasnija organizacija sadržaja po kategoriji</li>
          <li>Konzistentna struktura objava</li>
          <li>Unapređena navigacija čitalaca</li>
          <li>Bolja osnova za redovno objavljivanje</li>
          <li>Priprema za buduće automatizovane workflow-e</li>
        </ul>
      </section>

      <section className="case-study-section">
        <h2>Mogući sledeći koraci</h2>
        <ul className="case-study-list">
          <li>Implementirati automatizaciju za objavljivanje tipova</li>
          <li>Dodati filtriranje po sportu, ligi ili datumu</li>
          <li>Kreirati SEO-optimizovane kategorije</li>
          <li>Pratiti ponašanje čitalaca kroz analitiku</li>
          <li>Istražiti newsletter ili notifikacije za pratioce</li>
        </ul>
      </section>

      <section className="case-study-cta">
        <h2>Trebaš content platformu ili unapređenje WordPress strukture?</h2>
        <p>
          Ako imaš sajt sa puno sadržaja i trebaš bolju organizaciju, jasniju
          strukturu ili osnovu za automatizaciju, mogu da pomognem u planiranju
          pravog pristupa.
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
