import Link from "next/link";
import PageHero from "@/components/PageHero";

export const metadata = {
  title: "Wellness Concept Case Study | Đorđe Popović",
  description:
    "WordPress, Elementor, UX i SEO case study za salon masaže i wellness usluga.",
  openGraph: {
    title: "Wellness Concept Case Study",
    description:
      "WordPress i SEO projekat za unapređenje strukture usluga, putanje za zakazivanje, UX-a i organizacije stranica.",
  },
  alternates: {
    languages: {
      en: "/en/projects/wellness-concept",
      sr: "/sr/projekti/wellness-concept",
    },
  },
};

export default function WellnessConceptCaseStudyPage() {
  return (
    <main className="public-page">
      <PageHero
        eyebrow="Case Study"
        title="Wellness Concept — WordPress, UX i SEO unapređenje strukture"
      >
        WordPress i Elementor projekat za salon masaže i wellness usluga,
        fokusiran na jasniju strukturu usluga, bolji korisnički tok, vidljivije
        putanje za zakazivanje i SEO-friendly organizaciju stranica.
      </PageHero>

      <section className="case-study-meta">
        <div>
          <span>Tip projekta</span>
          <strong>WordPress / Elementor / SEO / UX</strong>
        </div>
        <div>
          <span>Industrija</span>
          <strong>Wellness / usluge masaže</strong>
        </div>
        <div>
          <span>Fokus</span>
          <strong>Struktura, upotrebljivost, performanse i SEO osnova</strong>
        </div>
        <div>
          <span>Uloga</span>
          <strong>WordPress razvoj, struktura stranica, SEO osnova, UX unapređenja</strong>
        </div>
      </section>

      <section className="case-study-section">
        <h2>Pregled projekta</h2>
        <p>
          Wellness Concept je sajt za uslužnu delatnost gde su jasnoća,
          poverenje i laka navigacija veoma važni. Cilj je bio da se sajt
          organizuje oko jasnih kategorija usluga, unapredi putanja ka
          zakazivanju i pripremi struktura za bolju vidljivost na pretraživačima.
        </p>
      </section>

      <section className="case-study-section">
        <h2>Izazov</h2>
        <p>
          Sajtu je bila potrebna jasnija prezentacija tretmana masaže, cena,
          informacija o zakazivanju i kontakt putanja. Kod uslužnih biznisa
          korisnik treba brzo da razume šta se nudi, koji tretman odgovara
          njegovim potrebama i kako može da zakaže termin.
        </p>
        <ul className="case-study-list">
          <li>Informacije o uslugama trebalo je jasnije strukturisati</li>
          <li>Putanja ka zakazivanju morala je biti lakša za praćenje</li>
          <li>Mobilni prikaz morao je ostati jednostavan i upotrebljiv</li>
          <li>SEO struktura je zahtevala bolju organizaciju stranica</li>
          <li>Sadržaj je morao da podrži i korisnike i pretraživače</li>
        </ul>
      </section>

      <section className="case-study-section">
        <h2>Ciljevi projekta</h2>
        <ul className="case-study-list">
          <li>Napraviti jasniju strukturu sajta</li>
          <li>Unaprediti prezentaciju usluga</li>
          <li>Učiniti putanje ka zakazivanju vidljivijim</li>
          <li>Pripremiti stranice za SEO unapređenja</li>
          <li>Zadržati čist dizajn koji je lak za održavanje</li>
          <li>Unaprediti korisničko iskustvo na desktop i mobile prikazu</li>
        </ul>
      </section>

      <section className="case-study-section">
        <h2>Šta je unapređeno</h2>
        <div className="case-study-grid">
          <article>
            <h3>Struktura usluga</h3>
            <p>
              Usluge su organizovane u jasnije kategorije kako bi posetioci brže
              razumeli ponudu i lakše uporedili tretmane.
            </p>
          </article>
          <article>
            <h3>Korisnički tok</h3>
            <p>
              Važne akcije kao što su pregled tretmana, provera cena i
              zakazivanje termina učinjene su dostupnijim.
            </p>
          </article>
          <article>
            <h3>SEO osnova</h3>
            <p>
              Struktura stranica, heading elementi i organizacija sadržaja
              pripremljeni su sa fokusom na bolju vidljivost na pretraživačima.
            </p>
          </article>
          <article>
            <h3>Performance pristup</h3>
            <p>
              Projekat uključuje pažnju na optimizaciju slika, čistu strukturu
              stranica i praktična unapređenja performansi.
            </p>
          </article>
        </div>
      </section>

      <section className="case-study-section">
        <h2>Alati i tehnologije</h2>
        <div className="tech-stack">
          <span>WordPress</span>
          <span>Elementor</span>
          <span>Elementor Pro</span>
          <span>BookingPress</span>
          <span>Yoast SEO</span>
          <span>W3 Total Cache</span>
          <span>WebP optimizacija slika</span>
          <span>Responsive design</span>
          <span>UX struktura</span>
          <span>Technical SEO osnova</span>
        </div>
      </section>

      <section className="case-study-section">
        <h2>Rezultat</h2>
        <p>
          Projekat je omogućio preglednije i bolje strukturisano online prisustvo
          za Wellness Concept. Sajt je lakši za navigaciju, usluge su jasnije
          predstavljene, a struktura je bolje pripremljena za SEO, performanse i
          buduće proširenje sadržaja.
        </p>
        <ul className="case-study-list">
          <li>Jasnija prezentacija usluga</li>
          <li>Vidljivija putanja ka zakazivanju</li>
          <li>Snažnija struktura stranica</li>
          <li>Konzistentniji mobilni prikaz</li>
          <li>Bolja osnova za SEO i buduća unapređenja</li>
        </ul>
      </section>

      <section className="case-study-section">
        <h2>Mogući sledeći koraci</h2>
        <ul className="case-study-list">
          <li>Dalje unapređenje stranica tretmana</li>
          <li>Dodavanje SEO landing stranica</li>
          <li>Unapređenje internog linkovanja između usluga</li>
          <li>Praćenje performansi kroz Google Search Console</li>
          <li>Nastavak optimizacije slika i brzine stranica</li>
        </ul>
      </section>

      <section className="case-study-cta">
        <h2>Treba ti slično WordPress unapređenje?</h2>
        <p>
          Ako tvom sajtu treba jasnija struktura, bolja prezentacija usluga ili
          SEO-focused unapređenje, mogu da ti pomognem da definišemo sledeći
          praktičan korak.
        </p>
        <div className="case-study-cta-actions">
          <Link href="/sr/kontakt">Kontakt</Link>
          <Link href="/sr/usluge" className="case-study-cta-secondary">
            Pogledaj usluge
          </Link>
        </div>
      </section>
    </main>
  );
}
