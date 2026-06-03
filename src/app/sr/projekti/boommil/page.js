import Link from "next/link";
import PageHero from "@/components/PageHero";
import ProjectCarousel from "@/components/ProjectCarousel";

const IMAGES = [
  "/Projects/boommil_1.png",
  "/Projects/boommil_2.png",
  "/Projects/boommil_3.png",
  "/Projects/boommil_4.png",
  "/Projects/boommil_5.png",
];

export const metadata = {
  title: "BoomMil Case Study",
  description:
    "WooCommerce projekat fokusiran na unos proizvoda, strukturu prodavnice, SEO pripremu i organizaciju sadržaja za online katalog.",
  openGraph: {
    title: "BoomMil Case Study",
    description:
      "WooCommerce projekat za unos i organizaciju proizvoda, strukturu prodavnice i SEO osnovu za online katalog.",
  },
  alternates: {
    languages: {
      en: "/en/projects/boommil",
      sr: "/sr/projekti/boommil",
    },
  },
};

export default function BoomMilPage() {
  return (
    <main>
      <PageHero
        eyebrow="Case Study"
        title="BoomMil — WooCommerce unos proizvoda i struktura prodavnice"
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
        WooCommerce projekat fokusiran na unos i organizaciju proizvoda,
        postavljanje strukture prodavnice, pripremu SEO osnove i organizaciju
        sadržaja za pregledan i funkcionalan online katalog proizvoda.
      </PageHero>

      <div className="public-page">
      <section className="case-study-meta">
        <div>
          <span>Tip projekta</span>
          <strong>WooCommerce / WordPress / Struktura proizvoda</strong>
        </div>
        <div>
          <span>Industrija</span>
          <strong>E-commerce / Katalog proizvoda</strong>
        </div>
        <div>
          <span>Fokus</span>
          <strong>Unos proizvoda, organizacija prodavnice, SEO osnova</strong>
        </div>
        <div>
          <span>Uloga</span>
          <strong>WooCommerce postavljanje, unos proizvoda, struktura prodavnice, organizacija sadržaja</strong>
        </div>
      </section>

      <section className="case-study-section">
        <h2>Galerija projekta</h2>
        <ProjectCarousel images={IMAGES} alt="BoomMil" />
      </section>

      <section className="case-study-section">
        <h2>Pregled projekta</h2>
        <p>
          Online katalog proizvoda na WooCommerce platformi gde je potrebno
          jasno predstaviti proizvode, omogućiti lako pregledanje i logičnu
          organizaciju po kategorijama. Cilj je bio strukturisana, pregledna
          prodavnica.
        </p>
      </section>

      <section className="case-study-section">
        <h2>Izazov</h2>
        <ul className="case-study-list">
          <li>Proizvodi su zahtevali konzistentne opise i jasnu prezentaciju</li>
          <li>Kategorije prodavnice su trebale logičnu organizaciju</li>
          <li>Stranice proizvoda nisu imale SEO-ready strukturu</li>
          <li>Sadržaj je trebalo organizovati za korisnike i pretraživače</li>
          <li>Mobilno pregledanje proizvoda moralo je biti intuitivno i glatko</li>
        </ul>
      </section>

      <section className="case-study-section">
        <h2>Ciljevi projekta</h2>
        <ul className="case-study-list">
          <li>Pravilno uneti i organizovati sve proizvode</li>
          <li>Kreirati jasnu strukturu kategorija</li>
          <li>Napisati i strukturisati opise proizvoda</li>
          <li>Pripremiti stranice proizvoda za SEO osnovu</li>
          <li>Osigurati laku navigaciju na svim uređajima</li>
        </ul>
      </section>

      <section className="case-study-section">
        <h2>Šta je unapređeno</h2>
        <div className="case-study-grid">
          <article>
            <h3>Unos proizvoda</h3>
            <p>
              Proizvodi su uneti sa konzistentnim opisima, slikama i atributima,
              što katalog čini uniformnim i profesionalnim.
            </p>
          </article>
          <article>
            <h3>Struktura prodavnice</h3>
            <p>
              Kategorije i grupe proizvoda su organizovane tako da kupci mogu
              lako da pretražuju i pronalaze proizvode.
            </p>
          </article>
          <article>
            <h3>SEO priprema</h3>
            <p>
              Stranice proizvoda, naslovi i opisi strukturisani su sa fokusom na
              vidljivost na pretraživačima.
            </p>
          </article>
          <article>
            <h3>Organizacija sadržaja</h3>
            <p>
              Sadržaj proizvoda organizovan je konzistentno, što katalog čini
              lakšim za održavanje i proširivanje.
            </p>
          </article>
        </div>
      </section>

      <section className="case-study-section">
        <h2>Alati i tehnologije</h2>
        <div className="tech-stack">
          <span>WordPress</span>
          <span>WooCommerce</span>
          <span>Elementor</span>
          <span>Yoast SEO</span>
          <span>Struktura stranica proizvoda</span>
          <span>Organizacija kategorija</span>
          <span>Responsive design</span>
          <span>SEO osnova</span>
        </div>
      </section>

      <section className="case-study-section">
        <h2>Rezultat</h2>
        <p>
          Projekat je rezultovao čistim i organizovanim WooCommerce katalogom
          gde su proizvodi pregledni, dobro opisani i strukturisani za korisnike
          i pretraživače.
        </p>
        <ul className="case-study-list">
          <li>Organizovan katalog proizvoda</li>
          <li>Jasna struktura kategorija</li>
          <li>Konzistentni opisi proizvoda</li>
          <li>SEO-ready stranice proizvoda</li>
          <li>Lakše za navigaciju i održavanje</li>
        </ul>
      </section>

      <section className="case-study-section">
        <h2>Mogući sledeći koraci</h2>
        <ul className="case-study-list">
          <li>Nastaviti proširivanje kataloga</li>
          <li>Kreirati SEO landing stranice za kategorije</li>
          <li>Unaprediti filtriranje i pretragu proizvoda</li>
          <li>Povezati analitiku za praćenje popularnih proizvoda</li>
          <li>Istražiti mogućnosti plaćenog oglašavanja</li>
        </ul>
      </section>

      <section className="case-study-cta">
        <h2>Trebaš WooCommerce prodavnicu?</h2>
        <p>
          Ako ti trebaju organizovani proizvodi, strukturisana prodavnica i
          stranice pripremljene za pretraživače, mogu da pomognem u izgradnji
          čiste i praktične WooCommerce osnove.
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
