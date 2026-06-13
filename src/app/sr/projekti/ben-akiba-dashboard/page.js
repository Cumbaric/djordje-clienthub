import Link from "next/link";
import PageHero from "@/components/PageHero";
import ProjectCarousel from "@/components/ProjectCarousel";

const IMAGES = [
  "/Projects/ben-akiba-dashboard_1.png",
  "/Projects/ben-akiba-dashboard_2.png",
  "/Projects/ben-akiba-dashboard_3.png",
  "/Projects/ben-akiba-dashboard_4.png",
  "/Projects/ben-akiba-dashboard_5.png",
];

export const metadata = {
  title: "Ben Akiba Dashboard Case Study",
  description:
    "Next.js i Supabase admin dashboard za Ben Akiba dogadjaje, rezervacije, stand up nastupe i zurke.",
  openGraph: {
    title: "Ben Akiba Dashboard Case Study",
    description:
      "Dashboard za upravljanje dogadjajima sa javnim pregledom repertoara i admin panelom za rezervacije i unos dogadjaja.",
  },
  alternates: {
    languages: {
      en: "/en/projects/ben-akiba-dashboard",
      sr: "/sr/projekti/ben-akiba-dashboard",
    },
  },
};

export default function BenAkibaDashboardPage() {
  return (
    <main>
      <PageHero
        eyebrow="Case Study"
        title="Ben Akiba Dashboard - Admin panel za upravljanje dogadjajima"
        actions={
          <>
            <Link href="/sr/kontakt" className="hero-action-primary">
              Pokreni slican projekat
            </Link>
            <Link href="/sr/usluge" className="hero-action-secondary">
              Pogledaj usluge
            </Link>
          </>
        }
      >
        Admin dashboard aplikacija za upravljanje Ben Akiba stand up nastupima i
        zurkama, sa javnim pregledom repertoara i internim panelom za
        rezervacije, podatke o dogadjajima, kapacitet i izvestavanje.
      </PageHero>

      <div className="public-page">
        <section className="case-study-meta">
          <div>
            <span>Tip projekta</span>
            <strong>Next.js / React / Supabase dashboard</strong>
          </div>
          <div>
            <span>Industrija</span>
            <strong>Dogadjaji / Comedy club / Nightlife</strong>
          </div>
          <div>
            <span>Fokus</span>
            <strong>Dogadjaji, rezervacije, broj gostiju, admin workflow</strong>
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
            Ben Akiba Dashboard je web aplikacija za organizaciju mesecnih stand
            up i zurka dogadjaja. Javni front page omogucava posetiocima da vide
            dostupne kategorije dogadjaja, mesecni repertoar, izvodjace, cene i
            trenutni broj rezervacija, dok admin panel timu daje pregledno mesto
            za rad sa dogadjajima i rezervacijama gostiju.
          </p>
        </section>

        <section className="case-study-section">
          <h2>Izazov</h2>
          <ul className="case-study-list">
            <li>Informacije o dogadjajima su morale biti jasne i publici i internom timu</li>
            <li>Stand up i zurke zahtevaju razlicite tabele i vizuelni tretman</li>
            <li>Ukupan broj rezervacija morao je ostati vidljiv tokom rada sa pojedinacnim unosima</li>
            <li>Admin workflow je trazio brz obrazac za dodavanje novih dogadjaja</li>
            <li>Projekat je trebalo da bude dostupan online preko deljenog Vercel linka</li>
          </ul>
        </section>

        <section className="case-study-section">
          <h2>Ciljevi projekta</h2>
          <ul className="case-study-list">
            <li>Kreirati poliran javni front page za izbor Stand Up ili Zurka repertoara</li>
            <li>Napraviti pregledne mesecne tabele sa datumima, izvodjacima, cenama i rezervacijama</li>
            <li>Omoguciti admin detaljni prikaz dogadjaja sa statistikom kapaciteta i rezervacija</li>
            <li>Podrzati unos novih dogadjaja kroz strukturisan admin formular</li>
            <li>Postaviti aplikaciju na Vercel i povezati je sa Supabase backend slojem</li>
          </ul>
        </section>

        <section className="case-study-section">
          <h2>Sta je izgradjeno</h2>
          <div className="case-study-grid">
            <article>
              <h3>Javni pregled dogadjaja</h3>
              <p>
                Brendirana pocetna strana omogucava korisnicima da izaberu Stand
                Up ili Zurka repertoar i brzo razumeju koje vrste dogadjaja su
                dostupne.
              </p>
            </article>
            <article>
              <h3>Mesecni repertoar</h3>
              <p>
                Tabele dogadjaja prikazuju datume, vremena, izvodjace, cene i
                broj rezervacija u formatu koji se lako skenira.
              </p>
            </article>
            <article>
              <h3>Admin pregled rezervacija</h3>
              <p>
                Detaljna strana dogadjaja prikazuje sve rezervacije, izvore
                karata, potvrdjene goste, listu cekanja, kapacitet i slobodna
                mesta.
              </p>
            </article>
            <article>
              <h3>Unos novog dogadjaja</h3>
              <p>
                Strukturisan formular omogucava adminu unos tipa dogadjaja,
                naziva, izvodjaca, datuma, vremena, cene, kapaciteta, telefona i
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
            <span>Upravljanje dogadjajima</span>
          </div>
        </section>

        <section className="case-study-section">
          <h2>Rezultat</h2>
          <p>
            Projekat donosi fokusiran dashboard za upravljanje dogadjajima sa
            javnim pregledom i prakticnim internim admin delom. Tim moze da drzi
            podatke o dogadjajima, rezervacijama i kapacitetu na jednom mestu,
            dok javni prikaz ostaje jednostavan i lak za pregled.
          </p>
          <ul className="case-study-list">
            <li>Javni front page za Stand Up i Zurka repertoar</li>
            <li>Odvojeni prikazi za razlicite tipove dogadjaja</li>
            <li>Admin detaljna strana sa statistikama rezervacija i kapaciteta</li>
            <li>Forma za dodavanje novih dogadjaja</li>
            <li>Vercel deployment povezan sa Supabase podacima</li>
          </ul>
        </section>

        <section className="case-study-section">
          <h2>Moguci sledeci koraci</h2>
          <ul className="case-study-list">
            <li>Dodati naprednije filtriranje po mesecu, tipu dogadjaja i statusu</li>
            <li>Unaprediti mobilne admin prikaze za brzi rad na manjim ekranima</li>
            <li>Dodati role-based pristup za razlicite clanove tima</li>
            <li>Prosiriti PDF izvestaje i opcije export-a</li>
            <li>Povezati analitiku za pracenje posecenosti i trendova rezervacija</li>
          </ul>
        </section>

        <section className="case-study-cta">
          <h2>Treba ti custom admin dashboard?</h2>
          <p>
            Ako tvom timu treba praktican dashboard za dogadjaje, rezervacije,
            klijente ili interne workflow-e, mogu da napravim web aplikaciju
            prilagodjenu nacinu na koji posao stvarno funkcionise.
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
