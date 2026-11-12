import Link from "next/link";
import PageHero from "@/components/PageHero";
import ProjectCarousel from "@/components/ProjectCarousel";
import { seoMeta } from "@/lib/seo";

const IMAGES = [
  "/Projects/ben-akiba-dashboard_1.webp",
  "/Projects/ben-akiba-dashboard_2.webp",
  "/Projects/ben-akiba-dashboard_3.webp",
  "/Projects/ben-akiba-dashboard_4.webp",
  "/Projects/ben-akiba-dashboard_5.webp",
];

const seo = seoMeta({ lang: "sr", en: "/en/projects/ben-akiba-dashboard", sr: "/sr/projekti/ben-akiba-dashboard", type: "article", image: null });

export const metadata = {
  title: "Ben Akiba Dashboard — studija slučaja",
  description:
    "Next.js i Supabase admin dashboard za Ben Akiba događaje, rezervacije, stand up nastupe i žurke.",
  openGraph: {
    ...seo.openGraph,
    title: "Ben Akiba Dashboard — studija slučaja",
    description:
      "Dashboard za upravljanje događajima sa javnim pregledom repertoara i admin panelom za rezervacije i unos događaja.",
  },
  alternates: seo.alternates,
  twitter: seo.twitter,
};

export default function BenAkibaDashboardPage() {
  return (
    <main>
      <PageHero
        eyebrow="Studija slučaja"
        title="Ben Akiba Dashboard - Admin panel za upravljanje događajima"
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
        Admin dashboard aplikacija za upravljanje Ben Akiba stand up nastupima i
        žurkama, sa javnim pregledom repertoara i internim panelom za
        rezervacije, podatke o događajima, kapacitet i izveštavanje.
      </PageHero>

      <div className="public-page">
        <section className="case-study-meta">
          <div>
            <span>Tip projekta</span>
            <strong>Next.js / React / Supabase dashboard</strong>
          </div>
          <div>
            <span>Industrija</span>
            <strong>Događaji / Comedy club / Nightlife</strong>
          </div>
          <div>
            <span>Fokus</span>
            <strong>Događaji, rezervacije, broj gostiju, administrativni tok rada</strong>
          </div>
          <div>
            <span>Uloga</span>
            <strong>Frontend, dashboard struktura, Supabase integracija, deployment</strong>
          </div>
        </section>

        <section className="case-study-section">
          <h2>Galerija projekta</h2>
          <ProjectCarousel images={IMAGES} alt="Ben Akiba Dashboard" />
        </section>

        <section className="case-study-section">
          <h2>Pregled projekta</h2>
          <p>
            Ben Akiba Dashboard je web aplikacija za organizaciju mesečnih stand
            up i žurka događaja. Javna početna strana omogućava posetiocima da vide
            dostupne kategorije događaja, mesečni repertoar, izvođače, cene i
            trenutni broj rezervacija, dok admin panel timu daje pregledno mesto
            za rad sa događajima i rezervacijama gostiju.
          </p>
        </section>

        <section className="case-study-section">
          <h2>Izazov</h2>
          <ul className="case-study-list">
            <li>Informacije o događajima su morale biti jasne i publici i internom timu</li>
            <li>Stand up i žurke zahtevaju različite tabele i vizuelni tretman</li>
            <li>Ukupan broj rezervacija morao je ostati vidljiv tokom rada sa pojedinačnim unosima</li>
            <li>Administrativni tok rada je tražio brz obrazac za dodavanje novih događaja</li>
            <li>Projekat je trebalo da bude dostupan online preko deljenog Vercel linka</li>
          </ul>
        </section>

        <section className="case-study-section">
          <h2>Ciljevi projekta</h2>
          <ul className="case-study-list">
            <li>Kreirati doteranu javnu početnu stranu za izbor Stand Up ili Žurka repertoara</li>
            <li>Napraviti pregledne mesečne tabele sa datumima, izvođačima, cenama i rezervacijama</li>
            <li>Omogućiti admin detaljni prikaz događaja sa statistikom kapaciteta i rezervacija</li>
            <li>Podržati unos novih događaja kroz strukturisan admin formular</li>
            <li>Postaviti aplikaciju na Vercel i povezati je sa Supabase backend slojem</li>
          </ul>
        </section>

        <section className="case-study-section">
          <h2>Sta je izgrađeno</h2>
          <div className="case-study-grid">
            <article>
              <h3>Javni pregled događaja</h3>
              <p>
                Brendirana početna strana omogućava korisnicima da izaberu Stand
                Up ili Žurka repertoar i brzo razumeju koje vrste događaja su
                dostupne.
              </p>
            </article>
            <article>
              <h3>Mesecni repertoar</h3>
              <p>
                Tabele događaja prikazuju datume, vremena, izvođače, cene i
                broj rezervacija u formatu koji se lako skenira.
              </p>
            </article>
            <article>
              <h3>Admin pregled rezervacija</h3>
              <p>
                Detaljna strana događaja prikazuje sve rezervacije, izvore
                karata, potvrđene goste, listu čekanja, kapacitet i slobodna
                mesta.
              </p>
            </article>
            <article>
              <h3>Unos novog događaja</h3>
              <p>
                Strukturisan formular omogućava adminu unos tipa događaja,
                naziva, izvođača, datuma, vremena, cene, kapaciteta, telefona i
                statusa.
              </p>
            </article>
          </div>
        </section>

        <section className="case-study-section">
          <h2>Alati i tehnologije</h2>
          <div className="tech-stack">
            <span>Next.js</span>
            <span>React</span>
            <span>JavaScript</span>
            <span>CSS</span>
            <span>Supabase</span>
            <span>Vercel</span>
            <span>Admin dashboard</span>
            <span>Upravljanje događajima</span>
          </div>
        </section>

        <section className="case-study-section">
          <h2>Rezultat</h2>
          <p>
            Projekat donosi fokusiran dashboard za upravljanje događajima sa
            javnim pregledom i praktičnim internim admin delom. Tim može da drži
            podatke o događajima, rezervacijama i kapacitetu na jednom mestu,
            dok javni prikaz ostaje jednostavan i lak za pregled.
          </p>
          <ul className="case-study-list">
            <li>Javna početna strana za Stand Up i Žurka repertoar</li>
            <li>Odvojeni prikazi za različite tipove događaja</li>
            <li>Admin detaljna strana sa statistikama rezervacija i kapaciteta</li>
            <li>Forma za dodavanje novih događaja</li>
            <li>Vercel deployment povezan sa Supabase podacima</li>
          </ul>
        </section>

        <section className="case-study-section">
          <h2>Moguci sledeći koraci</h2>
          <ul className="case-study-list">
            <li>Dodati naprednije filtriranje po mesecu, tipu događaja i statusu</li>
            <li>Unaprediti mobilne admin prikaze za brzi rad na manjim ekranima</li>
            <li>Dodati role-based pristup za različite članove tima</li>
            <li>Prosiriti PDF izveštaje i opcije export-a</li>
            <li>Povezati analitiku za praćenje posećenosti i trendova rezervacija</li>
          </ul>
        </section>

        <section className="case-study-cta">
          <h2>Treba ti custom admin dashboard?</h2>
          <p>
            Ako tvom timu treba praktičan dashboard za događaje, rezervacije,
            klijente ili interne procese rada, možemo da napravimo web aplikaciju
            prilagođenu načinu na koji posao stvarno funkcioniše.
          </p>
          <div className="case-study-cta-actions">
            <Link href="/sr/kontakt">Kontaktiraj nas</Link>
            <Link href="/sr/usluge/react-nextjs" className="case-study-cta-secondary">
              Povezana usluga: React / Next.js web aplikacije
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
