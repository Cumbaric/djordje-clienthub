import Link from "next/link";
import PageHero from "@/components/PageHero";
import ProjectCarousel from "@/components/ProjectCarousel";
import JsonLd from "@/components/JsonLd";

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Početna", "item": "https://djordjepopovic.com/sr" },
    { "@type": "ListItem", "position": 2, "name": "Projekti", "item": "https://djordjepopovic.com/sr/projekti" },
    { "@type": "ListItem", "position": 3, "name": "Iron Pulse", "item": "https://djordjepopovic.com/sr/projekti/iron-pulse" },
  ],
};

const IMAGES = [
  "/Projects/iron_pulse_1.png",
  "/Projects/iron_pulse_2.png",
  "/Projects/iron_pulse_3.png",
  "/Projects/iron_pulse_4.png",
  "/Projects/iron_pulse_5.png",
];

export const metadata = {
  title: "Iron Pulse Case Study",
  description:
    "Landing page za personal trening i strength coaching servis — izrađen u čistom HTML, CSS i JavaScript-u. Mobile-first, SEO optimizovan, hostovan na Vercelu.",
  openGraph: {
    title: "Iron Pulse Case Study",
    description:
      "HTML/CSS/JS landing page za personal trening servis — mobile-first, SEO optimizovan, pristupačan i hostovan na Vercelu.",
  },
  alternates: {
    canonical: "/sr/projekti/iron-pulse",
    languages: {
      en: "/en/projects/iron-pulse",
      sr: "/sr/projekti/iron-pulse",
    },
  },
};

export default function IronPulseCaseStudyPageSr() {
  return (
    <main>
      <JsonLd data={breadcrumbSchema} />
      <PageHero
        eyebrow="Case Study"
        title="Iron Pulse — Landing Page za Personal Trening"
        actions={
          <>
            <a
              href="https://iron-pulse-iota-dun.vercel.app"
              className="hero-action-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Pogledaj sajt
            </a>
            <Link href="/sr/kontakt" className="hero-action-secondary">
              Pokreni sličan projekat
            </Link>
          </>
        }
      >
        Landing page za personal trening i strength coaching servis, izrađen u
        čistom HTML, CSS i JavaScript-u — bez frameworka i zavisnosti.
        Mobile-first, SEO optimizovan i hostovan na Vercelu.
      </PageHero>

      <div className="public-page">
        <section className="case-study-meta">
          <div>
            <span>Tip projekta</span>
            <strong>Landing Page</strong>
          </div>
          <div>
            <span>Tech stack</span>
            <strong>HTML / CSS / JavaScript</strong>
          </div>
          <div>
            <span>Hosting</span>
            <strong>Vercel</strong>
          </div>
          <div>
            <span>Fokus</span>
            <strong>Performanse, SEO, pristupačnost, konverzije</strong>
          </div>
        </section>

        <section className="case-study-section">
          <h2>Galerija projekta</h2>
          <ProjectCarousel images={IMAGES} alt="Iron Pulse" />
        </section>

        <section className="case-study-section">
          <h2>Pregled projekta</h2>
          <p>
            Iron Pulse je landing page za personal trening i strength coaching
            biznis iz Beograda. Cilj je bio napraviti profesionalan sajt
            fokusiran na konverziju bez JavaScript frameworka — oslanjajući se
            isključivo na čist HTML, CSS i vanilla JS za maksimalne performanse i
            jednostavnost.
          </p>
          <p>
            Sajt pokriva sve ključne konverzijske elemente: usluge, cenovnik,
            besplatan lead magnet (7-dnevni trening plan), preporuke klijenata,
            FAQ i kontakt formu sa real-time validacijom.
          </p>
        </section>

        <section className="case-study-section">
          <h2>Izazov</h2>
          <p>
            Personal trening biznisi moraju brzo da komuniciraju poverenje,
            stručnost i jasnu vrednost. Sajt je morao da:
          </p>
          <ul className="case-study-list">
            <li>Jasno prikaže usluge i cene bez preopterećenja posetilaca</li>
            <li>Savršeno funkcioniše na mobilnim uređajima</li>
            <li>Brzo se učitava bez framework overhead-a</li>
            <li>Ima formu za prikupljanje kontakata sa client-side validacijom</li>
            <li>Ispuni standarde pristupačnosti i SEO-a</li>
          </ul>
        </section>

        <section className="case-study-section">
          <h2>Šta je napravljeno</h2>
          <div className="case-study-grid">
            <article>
              <h3>Mobile-first layout</h3>
              <p>
                Potpuno responzivan dizajn napravljen mobile-first pristupom sa
                semantičkim HTML-om i čistim CSS-om — bez layout frameworka.
              </p>
            </article>
            <article>
              <h3>SEO optimizacija</h3>
              <p>
                Kompletni meta tagovi, Open Graph, pravilna heading hijerarhija i
                semantički elementi za vidljivost u pretraživačima.
              </p>
            </article>
            <article>
              <h3>Pristupačnost</h3>
              <p>
                Skip linkovi, keyboard navigacija, ARIA atributi i kontrast
                usklađen sa standardima — pristupačno za sve korisnike.
              </p>
            </article>
            <article>
              <h3>Validacija forme</h3>
              <p>
                Vanilla JavaScript kontakt forma sa real-time validacijom polja i
                jasnim greškama — bez biblioteka.
              </p>
            </article>
            <article>
              <h3>Animacije</h3>
              <p>
                Scroll-reveal efekti i pulsne animacije napravljene u CSS-u sa
                Intersection Observer API-jem — glatko bez uticaja na performanse.
              </p>
            </article>
            <article>
              <h3>Nula zavisnosti</h3>
              <p>
                Bez npm-a, bez bundlera, bez frameworka. Jedini eksterni resurs
                su Google Fonts — brzo učitavanje, jednostavno deployovanje.
              </p>
            </article>
          </div>
        </section>

        <section className="case-study-section">
          <h2>Alati i tehnologije</h2>
          <div className="tech-stack">
            <span>HTML5</span>
            <span>CSS3</span>
            <span>Vanilla JavaScript</span>
            <span>Intersection Observer API</span>
            <span>CSS Animacije</span>
            <span>Open Graph</span>
            <span>Semantički HTML</span>
            <span>ARIA</span>
            <span>Vercel</span>
            <span>Google Fonts</span>
          </div>
        </section>

        <section className="case-study-section">
          <h2>Rezultat</h2>
          <p>
            Čist, brz i profesionalan landing page hostovan na Vercelu — bez
            build koraka, bez konfiguracije. Sajt je pristupačan, SEO spreman i
            pokriva sve konverzijske tačke koje personal trening biznis treba.
          </p>
          <ul className="case-study-list">
            <li>Nula framework overhead-a — čist HTML, CSS i JS</li>
            <li>Mobile-first, potpuno responzivan layout</li>
            <li>SEO i Open Graph optimizovan</li>
            <li>Pristupačan — keyboard nav, skip linkovi, ARIA</li>
            <li>Live na Vercelu sa instant globalnom CDN distribucijom</li>
          </ul>
        </section>

        <section className="case-study-section">
          <h2>Pogledaj projekat</h2>
          <p>
            Projekat je live na Vercelu i potpuno open source na GitHubu.
          </p>
          <div className="case-study-cta-actions" style={{ marginTop: "16px" }}>
            <a
              href="https://iron-pulse-iota-dun.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
            >
              Live sajt ↗
            </a>
            <a
              href="https://github.com/Cumbaric/Iron-Pulse"
              target="_blank"
              rel="noopener noreferrer"
              className="case-study-cta-secondary"
            >
              GitHub ↗
            </a>
          </div>
        </section>

        <section className="case-study-cta">
          <h2>Trebaš sličan landing page?</h2>
          <p>
            Ako trebaš brz, čist i profesionalan landing page bez framework
            overhead-a, mogu ti ga napraviti od nule.
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
