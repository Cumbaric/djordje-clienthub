import Link from "next/link";
import PageHero from "@/components/PageHero";
import ProjectCarousel from "@/components/ProjectCarousel";

const IMAGES = [
  "/Projects/Olvera_Popovic_1.png",
  "/Projects/Olvera_Popovic_2.png",
  "/Projects/Olvera_Popovic_3.png",
  "/Projects/Olvera_Popovic_4.png",
  "/Projects/Olvera_Popovic_5.png",
];

export const metadata = {
  title: "Olivera Popović Edu Case Study",
  description:
    "WordPress projekat za edukativnu platformu fokusiran na strukturu sadržaja, organizaciju stranica i SEO osnovu za bolju vidljivost i lakšu navigaciju.",
  openGraph: {
    title: "Olivera Popović Edu Case Study",
    description:
      "WordPress projekat za poboljšanje strukture sadržaja, hijerarhije stranica i SEO osnove edukativne platforme.",
  },
  alternates: {
    languages: {
      en: "/en/projects/olivera-popovic-edu",
      sr: "/sr/projekti/olivera-popovic-edu",
    },
  },
};

export default function OliveraPopovicEduPage() {
  return (
    <main>
      <PageHero
        eyebrow="Case Study"
        title="Olivera Popović Edu — Edukativni sajt, struktura sadržaja i SEO osnova"
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
        WordPress projekat za edukativnu platformu, fokusiran na jasnu
        organizaciju sadržaja, kreiranje pravilne hijerarhije stranica i
        pripremu strukture sajta za bolju vidljivost na pretraživačima i lakšu
        navigaciju za posetioce.
      </PageHero>

      <div className="public-page">
      <section className="case-study-meta">
        <div>
          <span>Tip projekta</span>
          <strong>WordPress / Edukativni sajt</strong>
        </div>
        <div>
          <span>Industrija</span>
          <strong>Obrazovanje / Online učenje</strong>
        </div>
        <div>
          <span>Fokus</span>
          <strong>Struktura sadržaja, navigacija, SEO osnova</strong>
        </div>
        <div>
          <span>Uloga</span>
          <strong>WordPress razvoj, struktura stranica, organizacija sadržaja, SEO osnova</strong>
        </div>
      </section>

      <section className="case-study-section">
        <h2>Galerija projekta</h2>
        <ProjectCarousel images={IMAGES} alt="Olivera Popović Edu" />
      </section>

      <section className="case-study-section">
        <h2>Pregled projekta</h2>
        <p>
          Edukativna platforma gde posetioci (učenici, roditelji, zainteresovani)
          treba brzo da pronađu kurseve, resurse i kontakt informacije. Cilj je
          bio jasna hijerarhija sadržaja i struktura prilagođena pretraživačima.
        </p>
      </section>

      <section className="case-study-section">
        <h2>Izazov</h2>
        <ul className="case-study-list">
          <li>Sadržaj nije imao jasnu organizaciju</li>
          <li>Stranice sa kursevima i resursima zahtevale su pravilnu hijerarhiju</li>
          <li>Navigacija morala biti intuitivna za različite tipove posetilaca</li>
          <li>SEO struktura nije podržavala dugoročnu vidljivost</li>
          <li>Mobilno iskustvo moralo je ostati čisto i dostupno</li>
        </ul>
      </section>

      <section className="case-study-section">
        <h2>Ciljevi projekta</h2>
        <ul className="case-study-list">
          <li>Organizovati edukativni sadržaj sa jasnom strukturom</li>
          <li>Kreirati konzistentnu hijerarhiju stranica</li>
          <li>Unaprediti navigaciju za učenike i posetioce</li>
          <li>Pripremiti stranice za SEO unapređenja</li>
          <li>Zadržati čist dizajn koji je lak za održavanje</li>
        </ul>
      </section>

      <section className="case-study-section">
        <h2>Šta je unapređeno</h2>
        <div className="case-study-grid">
          <article>
            <h3>Struktura sadržaja</h3>
            <p>
              Edukativni sadržaj reorganizovan u jasne kategorije, što
              posetiocima olakšava pronalaženje relevantnih kurseva i resursa.
            </p>
          </article>
          <article>
            <h3>Hijerarhija stranica</h3>
            <p>
              Kreirana konzistentna struktura stranica koja sajt čini lakšim za
              navigaciju i razumevanje.
            </p>
          </article>
          <article>
            <h3>SEO osnova</h3>
            <p>
              Naslovi stranica, heading elementi i organizacija sadržaja
              pripremljeni su za bolju vidljivost na pretraživačima.
            </p>
          </article>
          <article>
            <h3>Jasnoća navigacije</h3>
            <p>
              Navigacija sajta je unapređena kako bi različiti tipovi posetilaca
              brzo pronašli ono što traže.
            </p>
          </article>
        </div>
      </section>

      <section className="case-study-section">
        <h2>Alati i tehnologije</h2>
        <div className="tech-stack">
          <span>WordPress</span>
          <span>Elementor</span>
          <span>Yoast SEO</span>
          <span>Responsive design</span>
          <span>Struktura sadržaja</span>
          <span>SEO osnova</span>
          <span>Planiranje hijerarhije stranica</span>
        </div>
      </section>

      <section className="case-study-section">
        <h2>Rezultat</h2>
        <p>
          Rezultat je čistiji i organizovaniji edukativni sajt gde je sadržaj
          lako pronaći, a struktura je spremna za dalje proširivanje i SEO
          unapređenja.
        </p>
        <ul className="case-study-list">
          <li>Jasnija organizacija sadržaja</li>
          <li>Bolja hijerarhija stranica</li>
          <li>Unapređena navigacija</li>
          <li>Snažnija SEO osnova</li>
          <li>Lakše za održavanje i proširivanje</li>
        </ul>
      </section>

      <section className="case-study-section">
        <h2>Mogući sledeći koraci</h2>
        <ul className="case-study-list">
          <li>Dodati više strukturiranih stranica kurseva</li>
          <li>Kreirati SEO-focused kategorije sadržaja</li>
          <li>Unaprediti interno linkovanje između resursa</li>
          <li>Pratiti vidljivost kroz Google Search Console</li>
          <li>Nastaviti proširivanje sadržaja</li>
        </ul>
      </section>

      <section className="case-study-cta">
        <h2>Trebaš strukturiran WordPress sajt?</h2>
        <p>
          Ako tvom sajtu treba jasnija organizacija sadržaja, bolja struktura
          stranica ili SEO-focused unapređenje, mogu da ti pomognem da
          definišemo praktičan sledeći korak.
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
