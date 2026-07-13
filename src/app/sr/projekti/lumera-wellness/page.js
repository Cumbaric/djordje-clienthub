import Link from "next/link";
import PageHero from "@/components/PageHero";
import ProjectCarousel from "@/components/ProjectCarousel";

const IMAGES = [
  "/Projects/LumeraWellness1.png",
  "/Projects/LumeraWellness2.png",
  "/Projects/LumeraWellness4.png",
  "/Projects/LumeraWellness3.png",
  "/Projects/LumeraWellness5.png",
  "/Projects/LumeraWellness6.png",
];

export const metadata = {
  title: "Lumera Wellness Case Study",
  description:
    "Next.js template za zakazivanje za wellness salone — prilagodljiv javni sajt i admin dashboard za rezervacije, klijente i prihod.",
  openGraph: {
    title: "Lumera Wellness Case Study",
    description:
      "Reusable Next.js platforma za zakazivanje za wellness studije — javni sajt i zaštićen admin dashboard.",
  },
  alternates: {
    canonical: "/sr/projekti/lumera-wellness",
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
        title="Lumera Wellness — reusable Next.js template za zakazivanje za wellness salone"
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
        Lumera Wellness je Next.js platforma za zakazivanje napravljena kao
        proizvod — uglađen javni sajt spojen sa zaštićenim admin dashboard-om,
        spreman da se brendira i ponudi wellness i masažnim salonima. Prikazani
        sadržaj je generički demo.
      </PageHero>

      <div className="public-page">
        <Link href="/sr/projekti" className="case-study-back">
          ← Nazad na projekte
        </Link>

        <section className="case-study-meta">
          <div>
            <span>Tip projekta</span>
            <strong>Next.js / React template za zakazivanje</strong>
          </div>
          <div>
            <span>Publika</span>
            <strong>Wellness, spa i masažni saloni</strong>
          </div>
          <div>
            <span>Fokus</span>
            <strong>Tok zakazivanja, admin dashboard, ponovljivost</strong>
          </div>
          <div>
            <span>Uloga</span>
            <strong>Koncept, frontend, dashboard, sistem za zakazivanje</strong>
          </div>
        </section>

        <section className="case-study-section">
          <h2>Galerija projekta</h2>
          <ProjectCarousel images={IMAGES} alt="Lumera Wellness" />
        </section>

        <section className="case-study-section">
          <h2>Pregled projekta</h2>
          <p>
            Lumera Wellness nije sajt za jednog klijenta, već platforma kao
            proizvod. Cilj je bio da se jednom napravi kompletno i lepo wellness
            rešenje — javni sajt plus admin dashboard — i da se lako prebrendira
            i ponudi različitim wellness i masažnim salonima. Sva imena,
            tretmani i kontakt podaci u demou su generički placeholderi koje
            svaki salon zamenjuje svojim.
          </p>
        </section>

        <section className="case-study-section">
          <h2>Ideja</h2>
          <p>
            Manjim wellness salonima često treba i privlačno online prisustvo i
            jednostavan način za obradu zahteva za termin, ali retko žele potpuno
            custom rešenje. Lumera oba spaja u jedan ponovljiv proizvod koji se
            brzo postavlja i prilagođava brendu svakog salona.
          </p>
          <ul className="case-study-list">
            <li>Jedan uglađen template umesto izrade od nule svaki put</li>
            <li>Javni sajt koji predstavlja usluge i podstiče zakazivanje</li>
            <li>Admin deo za pregled i upravljanje pristiglim zahtevima</li>
            <li>Generički demo sadržaj koji se lako menja po klijentu</li>
            <li>Konzistentan, smiren vizuelni stil prilagođen wellness brendovima</li>
          </ul>
        </section>

        <section className="case-study-section">
          <h2>Šta uključuje</h2>
          <div className="case-study-grid">
            <article>
              <h3>Javni marketing sajt</h3>
              <p>
                Moderna landing stranica sa hero sekcijom, &quot;zašto mi&quot;
                izdvojenim prednostima, about i story sekcijama, uslugama,
                cenama, kontaktom, prijavom na newsletter i jasnim pozivima na
                zakazivanje.
              </p>
            </article>
            <article>
              <h3>Online zahtevi za termin</h3>
              <p>
                Posetioci mogu da pošalju zahtev za termin za tretman i vreme,
                koji stiže u admin dashboard kao novi zahtev na čekanju za
                pregled.
              </p>
            </article>
            <article>
              <h3>Admin dashboard</h3>
              <p>
                Zaštićeni dashboard na jednom mestu prikazuje današnje i nedeljne
                rezervacije, zahteve na čekanju, potvrđene termine, ukupan broj
                klijenata i mesečni prihod.
              </p>
            </article>
            <article>
              <h3>Rezervacije i klijenti</h3>
              <p>
                Posebni prikazi za rezervacije i klijente omogućavaju salonu da
                prati zahteve kroz statuse na čekanju, potvrđeno i otkazano i da
                ima pregled svojih gostiju.
              </p>
            </article>
          </div>
        </section>

        <section className="case-study-section">
          <h2>Uvidi i upravljanje</h2>
          <ul className="case-study-list">
            <li>Command center sa nadolazećim terminima i današnjim rasporedom</li>
            <li>Grafikon &quot;najtraženiji tretmani&quot; kroz sve statuse</li>
            <li>Top tretman i skorašnja aktivnost zahteva za zakazivanje</li>
            <li>Workflow statusa za zahteve na čekanju, potvrđene i otkazane</li>
            <li>Brze akcije za kreiranje nove rezervacije i pregled onih na čekanju</li>
          </ul>
        </section>

        <section className="case-study-section">
          <h2>Napravljeno za ponovnu upotrebu</h2>
          <p>
            Template je strukturisan tako da se javni sadržaj, brending i podaci
            o tretmanima mogu zameniti bez diranja osnovne logike zakazivanja i
            dashboard-a. To čini praktičnim da se pokrene prilagođena verzija za
            novi salon, uz zadržavanje jedinstvenog koda koji je lak za
            održavanje.
          </p>
        </section>

        <section className="case-study-section">
          <h2>Alati i tehnologije</h2>
          <div className="tech-stack">
            <span>Next.js</span>
            <span>React</span>
            <span>App Router</span>
            <span>JavaScript</span>
            <span>CSS</span>
            <span>Admin dashboard</span>
            <span>Sistem za zakazivanje</span>
            <span>Responsive design</span>
          </div>
        </section>

        <section className="case-study-section">
          <h2>Mogući sledeći koraci</h2>
          <ul className="case-study-list">
            <li>Theming po salonu i podesiv brending</li>
            <li>Online plaćanja i depoziti za rezervacije</li>
            <li>Automatske email potvrde i podsetnici</li>
            <li>Raspored osoblja i prostorija za veće salone</li>
            <li>Izveštaji i export za prihod i posećenost</li>
          </ul>
        </section>

        <section className="case-study-cta">
          <h2>Želiš ovakav sajt za zakazivanje?</h2>
          <p>
            Ako vodiš wellness, spa ili masažni salon i želiš moderan sajt sa
            ugrađenim dashboard-om za zakazivanje, mogu da prilagodim ovu
            platformu tvom brendu i načinu rada.
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
