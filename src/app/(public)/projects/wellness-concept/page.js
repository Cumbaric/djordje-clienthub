import Link from "next/link";
import PageHero from "@/components/PageHero";

export default function WellnessConceptCaseStudyPage() {
  return (
    <main className="public-page">
      <PageHero eyebrow="Case study" title="Wellness Concept">
        WordPress prezentacioni sajt za salon masaže, razvijan sa fokusom na
        jasnu strukturu tretmana, bolji korisnički doživljaj, SEO osnovu i
        profesionalniju online prezentaciju.
      </PageHero>

      <section className="case-study-meta">
        <div>
          <span>Platform</span>
          <strong>WordPress</strong>
        </div>

        <div>
          <span>Builder</span>
          <strong>Elementor Pro</strong>
        </div>

        <div>
          <span>Focus</span>
          <strong>SEO / UX / Structure</strong>
        </div>

        <div>
          <span>Type</span>
          <strong>Business website</strong>
        </div>
      </section>

      <section className="case-study-section">
        <h2>Project overview</h2>
        <p>
          Wellness Concept je sajt za salon masaže i tretmana, gde je glavni
          cilj bio da se usluge predstave jasno, profesionalno i pregledno.
          Fokus rada bio je na boljoj strukturi stranica, organizaciji tretmana,
          jasnijem korisničkom putu i osnovnoj SEO optimizaciji za relevantne
          usluge.
        </p>
      </section>

      <section className="case-study-section">
        <h2>My role</h2>
        <div className="case-study-grid">
          <article>
            <h3>WordPress structure</h3>
            <p>
              Rad na organizaciji stranica, sekcija, navigacije i sadržaja tako
              da korisnik lakše pronađe tretmane i informacije koje su mu
              potrebne.
            </p>
          </article>

          <article>
            <h3>Elementor layout</h3>
            <p>
              Kreiranje i prilagođavanje sekcija u Elementoru, rad sa karticama,
              hero sekcijama, responzivnim rasporedom i vizuelnom hijerarhijom.
            </p>
          </article>

          <article>
            <h3>SEO basics</h3>
            <p>
              Podešavanje osnovnih SEO elemenata, strukture naslova, opisa
              usluga i sadržaja koji bolje objašnjava tretmane i lokalnu ponudu.
            </p>
          </article>

          <article>
            <h3>Technical improvements</h3>
            <p>
              Rad na tehničkim podešavanjima, proveri prikaza na mobilnim
              uređajima, osnovnoj optimizaciji i rešavanju problema u prikazu.
            </p>
          </article>
        </div>
      </section>

      <section className="case-study-section">
        <h2>Key improvements</h2>
        <ul className="case-study-list">
          <li>Jasnija prezentacija usluga i tretmana.</li>
          <li>Bolja struktura početne stranice.</li>
          <li>Preglednije kartice za najtraženije tretmane.</li>
          <li>Rad na responzivnom prikazu za mobilne uređaje.</li>
          <li>Osnovna SEO organizacija sadržaja.</li>
          <li>Profesionalniji vizuelni nastup sajta.</li>
        </ul>
      </section>

      <section className="case-study-section">
        <h2>Tools and technologies</h2>
        <div className="tech-stack">
          <span>WordPress</span>
          <span>Elementor Pro</span>
          <span>Hello Elementor</span>
          <span>Yoast SEO</span>
          <span>Google Site Kit</span>
          <span>W3 Total Cache</span>
          <span>CSS</span>
        </div>
      </section>

      <section className="case-study-cta">
        <h2>Result</h2>
        <p>
          Projekat pokazuje moje iskustvo u radu sa realnim WordPress sajtom,
          Elementor strukturom, SEO osnovama i praktičnim problemima koje mali
          biznisi imaju prilikom online prezentacije.
        </p>

        <Link href="/projects" className="case-study-button">
          Nazad na projekte
        </Link>
      </section>
    </main>
  );
}
