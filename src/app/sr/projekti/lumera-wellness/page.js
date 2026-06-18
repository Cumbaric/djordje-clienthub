import Link from "next/link";
import PageHero from "@/components/PageHero";

export const metadata = {
  title: "Lumera Wellness Case Study",
  description:
    "Moderan wellness sajt u Next.js-u, fokusiran na brz prikaz, jasnu strukturu usluga i SEO-friendly stranice.",
  openGraph: {
    title: "Lumera Wellness Case Study",
    description:
      "Next.js i React wellness sajt izrađen za performanse, čistu strukturu i SEO-friendly sadržaj.",
  },
  alternates: {
    languages: {
      en: "/en/projects/lumera-wellness",
      sr: "/sr/projekti/lumera-wellness",
    },
  },
};

export default function LumeraWellnessCaseStudyPage() {
  return (
    <main>
      <PageHero
        eyebrow="Case Study"
        title="Lumera Wellness — moderan wellness sajt u Next.js-u"
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
        Moderan wellness sajt izrađen u Next.js-u i React-u, fokusiran na brz
        prikaz, jasnu strukturu usluga i SEO-friendly stranice za spa i wellness
        ponudu. Projekat je trenutno u razvoju.
      </PageHero>

      <div className="public-page">
        <Link href="/sr/projekti" className="case-study-back">
          ← Nazad na projekte
        </Link>

        <section className="case-study-meta">
          <div>
            <span>Tip projekta</span>
            <strong>Next.js / React / Wellness sajt</strong>
          </div>
          <div>
            <span>Industrija</span>
            <strong>Wellness / Spa / Self-care</strong>
          </div>
          <div>
            <span>Fokus</span>
            <strong>Performanse, struktura, SEO i čist UX</strong>
          </div>
          <div>
            <span>Uloga</span>
            <strong>Frontend razvoj, struktura stranica, SEO osnova</strong>
          </div>
        </section>

        <section className="case-study-section">
          <h2>Pregled projekta</h2>
          <p>
            Lumera Wellness je moderan wellness sajt izrađen u Next.js-u. Cilj je
            da se spa i wellness usluge predstave kroz brz, čist i dobro
            strukturisan prikaz, gde posetioci brzo pronalaze tretmane, razumeju
            ponudu i dolaze do jasne kontakt putanje. Ovo je placeholder sadržaj
            koji će se dopunjavati kako projekat napreduje.
          </p>
        </section>

        <section className="case-study-section">
          <h2>Ciljevi projekta</h2>
          <ul className="case-study-list">
            <li>Napraviti brz Next.js sajt sa snažnim performansama</li>
            <li>Predstaviti wellness usluge kroz jasnu, preglednu strukturu</li>
            <li>Pripremiti SEO-friendly stranice za bolju vidljivost</li>
            <li>Zadržati čist, smiren dizajn lak za navigaciju</li>
            <li>Obezbediti gladak prikaz na desktop i mobile uređajima</li>
          </ul>
        </section>

        <section className="case-study-section">
          <h2>Šta se gradi</h2>
          <div className="case-study-grid">
            <article>
              <h3>Struktura usluga</h3>
              <p>
                Wellness tretmani su organizovani u jasne kategorije kako bi
                posetioci lako razumeli ponudu i uporedili opcije.
              </p>
            </article>
            <article>
              <h3>Performanse na prvom mestu</h3>
              <p>
                Next.js prikaz, optimizacija slika i čiste komponente drže sajt
                brzim i responzivnim na svakom uređaju.
              </p>
            </article>
            <article>
              <h3>SEO osnova</h3>
              <p>
                Struktura stranica, heading elementi i metapodaci pripremljeni
                su sa fokusom na vidljivost na pretraživačima od početka.
              </p>
            </article>
            <article>
              <h3>Smiren, čist UX</h3>
              <p>
                Jednostavan i konzistentan raspored podržava opuštajući i
                pouzdan utisak koji odgovara wellness brendu.
              </p>
            </article>
          </div>
        </section>

        <section className="case-study-section">
          <h2>Alati i tehnologije</h2>
          <div className="tech-stack">
            <span>Next.js</span>
            <span>React</span>
            <span>App Router</span>
            <span>JavaScript</span>
            <span>CSS</span>
            <span>Responsive design</span>
            <span>SEO osnova</span>
            <span>Optimizacija performansi</span>
          </div>
        </section>

        <section className="case-study-section">
          <h2>Mogući sledeći koraci</h2>
          <ul className="case-study-list">
            <li>Dopuna stranica tretmana i usluga pravim sadržajem</li>
            <li>Dodavanje toka za zakazivanje ili upit</li>
            <li>Povezivanje CMS-a za lakše ažuriranje sadržaja</li>
            <li>Dodavanje galerije projekta sa pravim screenshot-ovima</li>
            <li>Praćenje performansi pretrage i dorada SEO-a</li>
          </ul>
        </section>

        <section className="case-study-cta">
          <h2>Treba ti brz, moderan sajt?</h2>
          <p>
            Ako želiš čist i brz sajt izrađen u Next.js-u za svoj wellness ili
            uslužni biznis, mogu da ti pomognem da definišemo i izgradimo sledeći
            praktičan korak.
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
