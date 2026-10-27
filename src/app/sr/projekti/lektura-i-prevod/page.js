import Link from "next/link";
import PageHero from "@/components/PageHero";
import ProjectCarousel from "@/components/ProjectCarousel";
import JsonLd from "@/components/JsonLd";

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Početna", "item": "https://dwebsolutions.rs/sr" },
    { "@type": "ListItem", "position": 2, "name": "Projekti", "item": "https://dwebsolutions.rs/sr/projekti" },
    { "@type": "ListItem", "position": 3, "name": "Lektura i prevod", "item": "https://dwebsolutions.rs/sr/projekti/lektura-i-prevod" },
  ],
};

const IMAGES = [
  "/Projects/lekturaiprevod.png",
  "/Projects/lekturaiprevod1.png",
  "/Projects/lekturaiprevod2-clean.png",
  "/Projects/lekturaiprevod3.png",
  "/Projects/lekturaiprevod4-clean.png",
];

// ProjectCarousel numbers a single alt per slide, so this describes the set:
// naslov, kartice lekture, pristup radu, prevod i česta pitanja, zahtev za ponudu i podnožje.
const IMAGES_ALT =
  "Sajt Lektura i prevod u uredničkom dizajnu u tamnoplavoj i krem boji: naslovni deo, kartice usluge lekture, pristup radu, prevod i česta pitanja, zahtev za ponudu i podnožje, snimak ekrana";

export const metadata = {
  title: "Lektura i prevod — WordPress sajt i namenski plugin",
  description:
    "Case study WordPress sajta za usluge lekture, korekture i prevoda, sa namenskim pluginom za zahteve za ponudu i bezbedno slanje dokumenata. Projekat je u izradi.",
  openGraph: {
    title: "Lektura i prevod — WordPress sajt i namenski plugin",
    description:
      "WordPress i Elementor sajt za uslugu lekture i prevoda, uz namenski plugin za zahteve za ponudu. Projekat je u izradi.",
  },
  alternates: {
    canonical: "/sr/projekti/lektura-i-prevod",
    languages: {
      en: "/en/projects/lektura-i-prevod",
      sr: "/sr/projekti/lektura-i-prevod",
    },
  },
};

export default function LekturaIPrevodCaseStudyPage() {
  return (
    <main>
      <JsonLd data={breadcrumbSchema} />
      <PageHero
        eyebrow="Case Study"
        title="Lektura i prevod — WordPress sajt i namenski plugin"
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
        WordPress i Elementor sajt za uslugu lekture, korekture i prevoda,
        izgrađen oko jasne strukture usluga i namenskog plugina koji obrađuje
        zahteve za ponudu i bezbedno slanje dokumenata. Projekat je trenutno u
        izradi.
      </PageHero>

      <div className="public-page">
        <Link href="/sr/projekti" className="case-study-back">
          ← Nazad na projekte
        </Link>

        <section className="case-study-meta">
          <div>
            <span>Tip projekta</span>
            <strong>WordPress / Elementor / Namenski plugin</strong>
          </div>
          <div>
            <span>Oblast</span>
            <strong>Lektura, korektura i prevod</strong>
          </div>
          <div>
            <span>Status</span>
            <strong>U razvoju</strong>
          </div>
          <div>
            <span>Uloga</span>
            <strong>WordPress razvoj, izrada u Elementoru, razvoj namenskog plugina (PHP)</strong>
          </div>
        </section>

        <section className="case-study-section">
          <h2>Galerija projekta</h2>
          <ProjectCarousel images={IMAGES} alt={IMAGES_ALT} />
        </section>

        <section className="case-study-section">
          <h2>Pregled projekta</h2>
          <p>
            Lektura i prevod je sajt za profesionalnu uslugu lekture, korekture
            i prevoda. Njegov zadatak je da jasno predstavi usluge, pomogne
            posetiocu da razume šta svaka od njih obuhvata i da mu olakša
            traženje ponude, uključujući slanje dokumenta koji treba pregledati.
          </p>
          <p>
            Projekat spaja WordPress sajt izrađen u Elementoru sa namenski
            razvijenim pluginom, tako da zahtev za ponudu postaje deo samog sajta,
            a ne običan kontakt formular.
          </p>
        </section>

        <section className="case-study-section">
          <h2>Struktura sajta i dizajn</h2>
          <p>
            Dizajn prati uredničku estetiku koja odgovara usluzi vezanoj za jezik
            i tekst: mirna tipografija, dovoljno prostora i dosledan vizuelni
            sistem kroz sve stranice. Usluge su raspoređene u strukturisan skup
            stranica, tako da svaka vrsta posla ima jasno mesto na sajtu.
          </p>
          <ul className="case-study-list">
            <li>Namenski dizajn sistem u uredničkom stilu</li>
            <li>Strukturisana arhitektura stranica usluga</li>
            <li>Jasan put od svake stranice usluge do zahteva za ponudu</li>
            <li>Rasporedi prilagođeni računarima i mobilnim uređajima</li>
          </ul>
        </section>

        <section className="case-study-section">
          <h2>WordPress i Elementor implementacija</h2>
          <p>
            Sajt je izgrađen na WordPress-u sa laganom Hello Elementor temom i
            Elementor Free alatom uz Flexbox kontejnere, a prilagođeni HTML i CSS
            se koriste tamo gde je dizajnu bila potrebna veća kontrola nego što
            je nudi page builder. Yoast SEO služi za SEO podešavanja na nivou
            stranica, a WP Mail SMTP obezbeđuje pouzdanu isporuku e-pošte.
          </p>
        </section>

        <section className="case-study-section">
          <h2>Namenski plugin: Lektura Kontakt Forma</h2>
          <p>
            Lektura Kontakt Forma (LKF) je namenski WordPress plugin napisan u
            PHP-u koji vodi zahtev za ponudu od slanja do obrade. Razvijan je uz
            opsežno automatsko testiranje i testiranje na staging okruženju.
          </p>
          <div className="case-study-grid">
            <article>
              <h3>Zahtevi za ponudu</h3>
              <p>
                Posetilac šalje zahtev za ponudu kroz formular ugrađen u sajt i
                opisuje posao koji mu je potreban.
              </p>
            </article>
            <article>
              <h3>Bezbedno slanje dokumenata</h3>
              <p>
                Uz zahtev se mogu priložiti dokumenti. Otpremanje je zaštićeno
                bezbednosnim kontrolama, a ne prihvata fajlove bez provere.
              </p>
            </article>
            <article>
              <h3>Upravljanje zahtevima</h3>
              <p>
                Zahtevi se čuvaju i obrađuju u WordPress administraciji, a svaki
                ima status, pa je jasno šta još čeka obradu.
              </p>
            </article>
            <article>
              <h3>Obaveštenja e-poštom</h3>
              <p>
                E-mail obaveštenja informišu i vlasnika sajta i osobu koja je
                poslala zahtev.
              </p>
            </article>
            <article>
              <h3>Čuvanje dokumenata</h3>
              <p>
                Poseban proces određuje koliko dugo se otpremljeni fajlovi
                zadržavaju.
              </p>
            </article>
          </div>
        </section>

        <section className="case-study-section">
          <h2>Trenutni status</h2>
          <p>
            Projekat je trenutno u izradi. Plugin je prošao opsežno automatsko
            testiranje i testiranje na staging okruženju, ali sajt i njegove
            procese ne treba smatrati završenim. Ovaj case study biće ažuriran
            kako projekat napreduje.
          </p>
        </section>

        <section className="case-study-section">
          <h2>Pogledajte sajt</h2>
          <p>
            Sajt je javno dostupan dok razvoj traje, pa se ono što tamo vidite
            može menjati.
          </p>
          <div className="case-study-cta-actions" style={{ marginTop: "16px" }}>
            <a
              href="https://lekturaiprevod.rs"
              target="_blank"
              rel="noopener noreferrer"
            >
              lekturaiprevod.rs ↗
            </a>
          </div>
        </section>

        <section className="case-study-section">
          <h2>Alati i tehnologije</h2>
          <div className="tech-stack">
            <span>WordPress</span>
            <span>Hello Elementor</span>
            <span>Elementor Free</span>
            <span>Flexbox kontejneri</span>
            <span>HTML / CSS</span>
            <span>Namenski WordPress plugin (PHP)</span>
            <span>Yoast SEO</span>
            <span>WP Mail SMTP</span>
          </div>
        </section>

        <section className="case-study-cta">
          <h2>Treba vam WordPress sajt sa namenskom funkcijom?</h2>
          <p>
            Ako vašem sajtu trebaju jasna struktura i funkcija koju gotovi
            plugini ne pokrivaju, možemo zajedno da definišemo sledeći praktičan
            korak.
          </p>
          <div className="case-study-cta-actions">
            <Link href="/sr/kontakt">Kontaktirajte nas</Link>
            <Link href="/sr/usluge" className="case-study-cta-secondary">
              Pogledaj usluge
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
