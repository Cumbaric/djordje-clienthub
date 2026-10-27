import Link from "next/link";
import PageHero from "@/components/PageHero";
import ProjectCarousel from "@/components/ProjectCarousel";
import JsonLd from "@/components/JsonLd";

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Početna", "item": "https://dwebsolutions.rs/sr" },
    { "@type": "ListItem", "position": 2, "name": "Projekti", "item": "https://dwebsolutions.rs/sr/projekti" },
    { "@type": "ListItem", "position": 3, "name": "PNR Scout", "item": "https://dwebsolutions.rs/sr/projekti/pnr-scout" },
  ],
};

const IMAGES = [
  "/Projects/pnrscout2.png",
  "/Projects/pnrscout1-clean.png",
  "/Projects/pnrscout6.png",
  "/Projects/pnrscout5-clean.png",
  "/Projects/pnrscout7.png",
  "/Projects/pnrscout3.png",
  "/Projects/pnrscout4.png",
];

// ProjectCarousel numbers a single alt per slide, so this describes the set in order:
// početna, pregled timova, poređenje igrača, tier lista, profil igrača,
// primer projekcije, baza igrača.
const IMAGES_ALT =
  "Sajt PNR Scout za analitiku Evrolige u tamnom dizajnu: početna strana, pregled timova, tabela za poređenje igrača, tier lista klubova, profil igrača, primer projekcije i odeljak o bazi igrača, snimak ekrana";

export const metadata = {
  title: "PNR Scout — Platforma za analitiku igrača Evrolige",
  description:
    "Case study front-end razvoja sajta PNR Scout za analitiku igrača Evrolige: poređenje igrača, interaktivna tier lista klubova, navigacija kroz timove i igrače i responzivan interfejs.",
  openGraph: {
    title: "PNR Scout — Platforma za analitiku igrača Evrolige",
    description:
      "Front-end razvoj sajta za analitiku igrača Evrolige: poređenje igrača, interaktivna tier lista klubova i responzivan interfejs.",
  },
  alternates: {
    canonical: "/sr/projekti/pnr-scout",
    languages: {
      en: "/en/projects/pnr-scout",
      sr: "/sr/projekti/pnr-scout",
    },
  },
};

export default function PnrScoutCaseStudyPage() {
  return (
    <main>
      <JsonLd data={breadcrumbSchema} />
      <PageHero
        eyebrow="Case Study"
        title="PNR Scout — Platforma za analitiku igrača Evrolige"
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
        PNR Scout je nezavisan sajt za praćenje i analizu igrača Evrolige. Ovaj
        case study opisuje front-end rad na njegovom javnom delu: alat za
        poređenje igrača, interaktivnu tier listu klubova, navigaciju kroz
        timove i igrače i responzivan interfejs.
      </PageHero>

      <div className="public-page">
        <Link href="/sr/projekti" className="case-study-back">
          ← Nazad na projekte
        </Link>

        <section className="case-study-meta">
          <div>
            <span>Tip projekta</span>
            <strong>Veb platforma / HTML / CSS / JavaScript</strong>
          </div>
          <div>
            <span>Oblast</span>
            <strong>Košarkaška analitika (Evroliga)</strong>
          </div>
          <div>
            <span>Status</span>
            <strong>Sajt je aktivan, AI/ML beta je u razvoju</strong>
          </div>
          <div>
            <span>Uloga</span>
            <strong>Front-end razvoj u okviru PNR Scout tima</strong>
          </div>
        </section>

        <section className="case-study-section">
          <h2>Galerija projekta</h2>
          <ProjectCarousel images={IMAGES} alt={IMAGES_ALT} />
        </section>

        <section className="case-study-section">
          <h2>Pregled projekta</h2>
          <p>
            PNR Scout prikazuje podatke o igračima Evrolige (sastave timova,
            profile igrača, poređenja jednog pored drugog i uređivačke članke)
            kroz brz, statički generisan sajt. Sam sebe predstavlja kao izvor
            analitike i skautinga i nije povezan ni sa jednom ligom ni klubom.
          </p>
          <p>
            Proizvod gradi tim. Ovaj case study opisuje front-end rad na javnom
            sajtu i jasno navodi gde taj obim rada prestaje.
          </p>
        </section>

        <section className="case-study-section">
          <h2>Namena i publika</h2>
          <p>
            Sajt je namenjen onima koji prate Evroligu i žele brojke o igračima
            na jednom, preglednom mestu: prosek u sezoni, skorašnju formu i
            uporedni prikaz dva ili više igrača. Interfejs je osmišljen tako da
            se do igrača, tima ili poređenja stiže u nekoliko klikova.
          </p>
        </section>

        <section className="case-study-section">
          <h2>Arhitektura platforme i interfejs</h2>
          <p>
            Stranice se generišu pri izgradnji sajta iz fajlova sa podacima o
            igračima i timovima, pomoću Node.js skripti. Rezultat je običan HTML
            koji se služi kao statički sadržaj preko Cloudflare-a. Interaktivni
            delovi, kao što su pretraga igrača, poređenje i tier lista, napisani
            su u čistom JavaScript-u povrh generisanih stranica, bez front-end
            framework-a.
          </p>
          <ul className="case-study-list">
            <li>Zajedničko zaglavlje i podnožje sa mobilnim menijem</li>
            <li>Pretraga igrača dostupna sa svake stranice</li>
            <li>Dosledne putanje (breadcrumbs) od početne do timova i igrača</li>
            <li>Taman vizuelni stil usmeren na podatke, isti u svim odeljcima</li>
          </ul>
        </section>

        <section className="case-study-section">
          <h2>Baza igrača i statistika</h2>
          <p>
            Sajt je organizovan oko timova. Pregled timova vodi do stranice
            svakog kluba, a stranica kluba do njegovih igrača. Profil igrača
            prikazuje prosek u sezoni, skorašnju formu, učinak kod kuće i u
            gostima, vrednosti na 36 minuta i kratke pisane beleške, raspoređene
            tako da se ključni brojevi vide na prvi pogled.
          </p>
          <div className="case-study-grid">
            <article>
              <h3>Pregled timova</h3>
              <p>
                Svaki klub je kartica sa brojem igrača i najboljim strelcem, a
                istaknuti klub je na vrhu stranice.
              </p>
            </article>
            <article>
              <h3>Stranice timova</h3>
              <p>
                Stranica kluba ima fotografiju arene u pozadini i ceo sastav, sa
                vezama ka profilima pojedinačnih igrača.
              </p>
            </article>
            <article>
              <h3>Profili igrača</h3>
              <p>
                Prosek u sezoni, tabela poslednjih utakmica i podele učinka
                prikazani su u kompaktnim pločicama i tabelama.
              </p>
            </article>
          </div>
        </section>

        <section className="case-study-section">
          <h2>Poređenje igrača</h2>
          <p>
            Alat za poređenje omogućava da se izaberu dva do četiri igrača kroz
            polje za pretragu koje predlaže imena dok kucate, pa da se njihov
            prosek u sezoni i vrednosti na 36 minuta vide jedan pored drugog.
            Bolja vrednost u svakom redu je istaknuta, pa se razlika među
            igračima odmah uočava.
          </p>
          <ul className="case-study-list">
            <li>Posebna stranica za poređenje i panel dostupan iz navigacije</li>
            <li>Dugme za poređenje na profilu svakog igrača</li>
            <li>Izbor se čuva u pregledaču, pa prati posetioca sa strane na stranu</li>
          </ul>
        </section>

        <section className="case-study-section">
          <h2>Interaktivna tier lista</h2>
          <p>
            Tier lista klubova Evrolige omogućava posetiocima da rangiraju svaki
            klub, od favorita za titulu do kluba u obnovi, prevlačenjem klubova
            u nivoe. Nivoi se mogu dodavati i uklanjati, raspored se čuva u
            pregledaču, a gotova lista može da se izveze kao slika i podeli.
          </p>
          <p>
            Prevlačenje pokazivačem, čuvanje stanja i izvoz slike napisani su u
            čistom JavaScript-u, a za iscrtavanje izvezene slike koristi se
            Canvas API.
          </p>
        </section>

        <section className="case-study-section">
          <h2>Responzivan interfejs i korisničko iskustvo</h2>
          <p>
            Interfejs je doteran za računare i mobilne uređaje: meni se na
            manjim ekranima sažima, razmaci u početnom delu su smanjeni da bi se
            glavni poziv na akciju ranije pojavio, a na velikim ekranima sadržaj
            zauzima širi okvir.
          </p>
        </section>

        <section className="case-study-section">
          <h2>Potvrđeni doprinos razvoju</h2>
          <p>
            Stavke ispod proverene su prema istoriji Git repozitorijuma
            projekta. Odnose se samo na front-end javnog sajta.
          </p>
          <ul className="case-study-list">
            <li>Redizajn početne strane, uključujući uvodni deo, odeljke o platformi, signale, primer projekcije i bazu igrača</li>
            <li>Zajedničko zaglavlje i podnožje, mobilni meni i pretraga igrača</li>
            <li>Preuređenje sajta oko timova, uz šablone za Blog i stranicu O nama</li>
            <li>Prikaz stranica timova: pozadine sa fotografijama arena, traka sa timovima i bogatije kartice timova</li>
            <li>Poređenje igrača: posebna stranica, bočni panel u navigaciji i dugme za poređenje na profilu igrača</li>
            <li>Prva verzija tier liste: prevlačenje, čuvanje stanja i izvoz slike</li>
            <li>Ikonica sajta za rezultate pretrage i doterivanje navigacije</li>
          </ul>
          <p>
            Pozadinske servise, obradu podataka, AI/ML projekcije i ostale
            funkcije razvija širi PNR Scout tim, pa nisu deo ovog case study-ja.
          </p>
        </section>

        <section className="case-study-section">
          <h2>Trenutni status proizvoda</h2>
          <p>
            Javni sajt je aktivan i ima odeljke za timove, igrače, poređenje,
            tier listu i blog. AI/ML projekcije performansi i obaveštenja za dan
            utakmice proizvod predstavlja kao beta verziju, a projekcija na
            početnoj strani označena je kao ilustrativan primer. Ne treba ih
            shvatiti kao objavljenu funkciju. Statistika i brojevi na sajtu se
            menjaju, pa je za aktuelne podatke merodavan sam sajt.
          </p>
        </section>

        <section className="case-study-section">
          <h2>Pogledajte sajt</h2>
          <p>
            PNR Scout je javno dostupan. Sadržaj i funkcije su se možda promenili
            od trenutka kada su snimljeni ekrani iz ovog case study-ja.
          </p>
          <div className="case-study-cta-actions" style={{ marginTop: "16px" }}>
            <a
              href="https://pnrscout.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              pnrscout.com ↗
            </a>
          </div>
        </section>

        <section className="case-study-section">
          <h2>Alati i tehnologije</h2>
          <div className="tech-stack">
            <span>HTML</span>
            <span>CSS</span>
            <span>JavaScript (bez framework-a)</span>
            <span>Node.js skripte za izgradnju</span>
            <span>Statička generacija sajta</span>
            <span>Canvas API</span>
            <span>Cloudflare Workers (hosting)</span>
          </div>
        </section>

        <section className="case-study-cta">
          <h2>Treba vam sajt sa podacima i interaktivnim funkcijama?</h2>
          <p>
            Ako vašem projektu trebaju pregledan prikaz podataka, alati za
            poređenje ili interaktivni elementi, možemo zajedno da definišemo
            sledeći praktičan korak.
          </p>
          <div className="case-study-cta-actions">
            <Link href="/sr/kontakt">Kontaktirajte nas</Link>
            <Link href="/sr/usluge" className="case-study-cta-secondary">
              Pogledaj usluge
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
