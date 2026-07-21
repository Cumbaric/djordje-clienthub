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
    { "@type": "ListItem", "position": 3, "name": "Musical Duo Studio", "item": "https://djordjepopovic.com/sr/projekti/musical-duo-studio" },
  ],
};

const IMAGES = [
  "/Projects/musical_duo_studio_1.png",
  "/Projects/musical_duo_studio_2.png",
  "/Projects/musical_duo_studio_3.png",
  "/Projects/musical_duo_studio_4.png",
  "/Projects/musical_duo_studio_5.png",
];

export const metadata = {
  title: "Musical Duo Studio Case Study",
  description:
    "WordPress sajt za profesionalni studio gitare i basa — Elementor, Fluent Forms, Yoast SEO i W3 Total Cache.",
  openGraph: {
    title: "Musical Duo Studio Case Study",
    description:
      "WordPress projekat za internacionalni muzički studio sa video prikazom, testimonijali klijenata i formom za upite.",
  },
  alternates: {
    canonical: "/sr/projekti/musical-duo-studio",
    languages: {
      en: "/en/projects/musical-duo-studio",
      sr: "/sr/projekti/musical-duo-studio",
    },
  },
};

export default function MusicalDuoStudioCaseStudyPage() {
  return (
    <main>
      <JsonLd data={breadcrumbSchema} />
      <PageHero
        eyebrow="Case Study"
        title="Musical Duo Studio — WordPress za profesionalni studio gitare i basa"
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
        WordPress sajt za profesionalni studio za snimanje gitare i basa koji
        opslužuje internacionalne klijente — izgrađen da odmah komunicira
        kvalitet, prikazuje rad kroz video i pretvara posetioce u nove upite za
        projekte.
      </PageHero>

      <div className="public-page">
        <section className="case-study-meta">
          <div>
            <span>Tip projekta</span>
            <strong>WordPress / Elementor / Music Studio</strong>
          </div>
          <div>
            <span>Industrija</span>
            <strong>Muzička produkcija / Session snimanje</strong>
          </div>
          <div>
            <span>Fokus</span>
            <strong>Premium prezentacija, video showcase, kontakt i konverzija</strong>
          </div>
          <div>
            <span>Uloga</span>
            <strong>WordPress razvoj, implementacija dizajna, forme, SEO, performanse</strong>
          </div>
        </section>

        <section className="case-study-section">
          <h2>Galerija projekta</h2>
          <ProjectCarousel images={IMAGES} alt="Musical Duo Studio" />
        </section>

        <section className="case-study-section">
          <h2>Pregled projekta</h2>
          <p>
            Musical Duo Studio je profesionalni session studio koji nudi gitare i
            bas deonice za muzičke producente i izvođače širom sveta. Sajt je
            trebalo da odrazi kvalitet rada, predstavi video demonstracije i
            olakša novim klijentima slanje upita za projekat — sve u čistom,
            tamnom i premium vizuelnom stilu.
          </p>
        </section>

        <section className="case-study-section">
          <h2>Izazov</h2>
          <p>
            Session muzičari koji opslužuju internacionalnu publiku trebaju sajt
            koji komunicira profesionalnost i veštinu pre nego što se čuje ijedna
            nota. Sajt je morao brzo da izgradi poverenje i usmeri posetioce ka
            slanju projektnog brifinga.
          </p>
          <ul className="case-study-list">
            <li>Internacionalni klijenti morali su odmah prepoznati kvalitet</li>
            <li>Video uzorci morali su biti istaknuti i lako dostupni</li>
            <li>Testimonijali pravih klijenata trebalo je verodostojno prikazati</li>
            <li>Forma za upit morala je biti jednostavna i fokusirana na konverziju</li>
            <li>Brzina učitavanja je bila važna za posetioce iz različitih zemalja</li>
          </ul>
        </section>

        <section className="case-study-section">
          <h2>Ciljevi projekta</h2>
          <ul className="case-study-list">
            <li>Izgraditi premium WordPress sajt u tamnoj muzičkoj estetici</li>
            <li>Prikazati sviranje gitare i basa kroz ugradjen video</li>
            <li>Prikazati testimonijale klijenata iz inostranstva</li>
            <li>Napraviti strukturisanu formu za upit sa izborom usluge</li>
            <li>Podesiti pouzdanu email dostavu za unose forme</li>
            <li>Optimizovati performanse za brzo internacionalno učitavanje</li>
            <li>Pripremiti sajt sa SEO osnovama</li>
          </ul>
        </section>

        <section className="case-study-section">
          <h2>Šta je napravljeno</h2>
          <div className="case-study-grid">
            <article>
              <h3>Premium vizuelni dizajn</h3>
              <p>
                Tamna, visokokontrastna estetika izrađena u Elementor-u i
                Unlimited Addons-u, usklađena sa profesionalnim muzičkim
                standardima i koja odmah komunicira kvalitet.
              </p>
            </article>
            <article>
              <h3>Video showcase</h3>
              <p>
                Posebna sekcija &ldquo;Live From Studio&rdquo; ističe izvođenja
                gitare i basa kroz ugrađeni video, dajući posetiocima direktan
                dokaz veštine pre bilo kog teksta.
              </p>
            </article>
            <article>
              <h3>Testimonijali klijenata</h3>
              <p>
                Internacionalni testimonijali klijenata iz SAD, Švedske i
                Australije prikazani su jasno kako bi se izgradilo poverenje kod
                novih posetilaca iz različitih tržišta.
              </p>
            </article>
            <article>
              <h3>Forma za upit o projektu</h3>
              <p>
                Fluent Forms kontakt forma sa izborom usluge, poljem za
                referentni link i opisom projekta — strukturisana da prikupi sve
                informacije potrebne za početak razgovora.
              </p>
            </article>
          </div>
        </section>

        <section className="case-study-section">
          <h2>Alati i tehnologije</h2>
          <div className="tech-stack">
            <span>WordPress</span>
            <span>Elementor</span>
            <span>Unlimited Addons for Elementor</span>
            <span>Fluent Forms</span>
            <span>Fluent SMTP</span>
            <span>Yoast SEO</span>
            <span>W3 Total Cache</span>
            <span>Responsive design</span>
            <span>Video integracija</span>
            <span>Dark theme UI</span>
          </div>
        </section>

        <section className="case-study-section">
          <h2>Rezultat</h2>
          <p>
            Musical Duo Studio dobio je profesionalno online prisustvo koje
            odgovara kvalitetu snimaka. Tamni vizuelni stil odmah komunicira
            kredibilitet, video sekcija pušta sviranje da govori samo za sebe, a
            forma za upit daje novim klijentima jasan sledeći korak. Email
            dostava je pouzdano rešena kroz Fluent SMTP, a sajt se brzo učitava
            zahvaljujući W3 Total Cache.
          </p>
          <ul className="case-study-list">
            <li>Premium vizuelna prezentacija usklađena sa muzičkim industrijskim standardima</li>
            <li>Video showcase istaknut za neposredni social proof</li>
            <li>Internacionalni testimonijali koji povećavaju poverenje novih klijenata</li>
            <li>Strukturisana forma za upit koja smanjuje prepisku emailom</li>
            <li>Pouzdana dostava forme na email putem Fluent SMTP</li>
            <li>SEO osnove postavljene za buduću vidljivost na pretraživačima</li>
          </ul>
        </section>

        <section className="case-study-section">
          <h2>Mogući sledeći koraci</h2>
          <ul className="case-study-list">
            <li>Dodati posebne stranice usluga za gitaru i bas snimanje</li>
            <li>Napraviti portfolio sekciju sa audio uzorcima</li>
            <li>Dodati više testimonijala i proširiti social proof</li>
            <li>Implementirati praćenje kroz Google Search Console</li>
            <li>Nastaviti SEO optimizaciju za ključne reči muzičke produkcije</li>
          </ul>
        </section>

        <section className="case-study-cta">
          <h2>Treba ti WordPress sajt za studio ili kreativni biznis?</h2>
          <p>
            Ako ti treba profesionalni sajt koji komunicira kvalitet, gradi
            poverenje i olakšava novim klijentima da te kontaktiraju, mogu da ti
            pomognem da definišemo pravi pristup.
          </p>
          <div className="case-study-cta-actions">
            <Link href="/sr/kontakt">Kontakt</Link>
            <Link href="/sr/usluge" className="case-study-cta-secondary">
              Pogledaj usluge
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
