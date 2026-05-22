import Link from "next/link";
import PageHero from "@/components/PageHero";

export const metadata = {
  title: "Proces | Od ideje do gotovog sajta",
  description:
    "Jasan workflow za sajtove: analiza, struktura, dizajn pravac, WordPress implementacija, SEO, performanse, testiranje i predaja.",
  openGraph: {
    title: "Proces | Đorđe Popović",
    description:
      "Praktičan proces za WordPress sajtove, SEO osnovu i strukturisane web projekte.",
  },
  alternates: {
    languages: { en: "/en/process", sr: "/sr/proces" },
  },
};

const koraci = [
  {
    number: "01",
    title: "Analiza i ciljevi projekta",
    description:
      "Počinjemo od razumevanja biznisa, publike, trenutnog stanja sajta i glavnog cilja projekta.",
    focus: [
      "Pregled biznisa i usluga",
      "Ciljna publika",
      "Problemi postojećeg sajta",
      "Prioriteti projekta",
      "Glavni conversion cilj",
    ],
  },
  {
    number: "02",
    title: "Struktura sajta i planiranje sadržaja",
    description:
      "Pre dizajna ili izrade, sajt treba da ima jasnu strukturu. To uključuje stranice, sekcije, navigaciju i prioritete sadržaja.",
    focus: [
      "Struktura stranica",
      "Planiranje navigacije",
      "Hijerarhija sadržaja",
      "Organizacija usluga ili proizvoda",
      "Ideje za interno linkovanje",
    ],
  },
  {
    number: "03",
    title: "Dizajn pravac i UX tok",
    description:
      "Vizuelni pravac treba da podrži upotrebljivost. Fokus je na čistim layout-ima, čitljivim sekcijama, jasnim CTA elementima i mobile-friendly strukturi.",
    focus: [
      "Layout pravac",
      "Vizuelna hijerarhija",
      "Pozicioniranje CTA elemenata",
      "Mobilna upotrebljivost",
      "Korisnički tok",
    ],
  },
  {
    number: "04",
    title: "WordPress / frontend implementacija",
    description:
      "Sajt se izrađuje kroz praktičnu i održivu implementaciju, u zavisnosti od projekta: WordPress, Elementor, WooCommerce ili moderni frontend alati.",
    focus: [
      "Postavljanje WordPress stranica",
      "Elementor / Elementor Pro implementacija",
      "WooCommerce osnova kada je potrebna",
      "Responsive frontend",
      "Čista CSS struktura",
    ],
  },
  {
    number: "05",
    title: "SEO i osnova performansi",
    description:
      "Sajt treba da bude tehnički organizovan i pripremljen za bolju vidljivost i brzinu. To uključuje osnovnu SEO strukturu, headinge, metadata i performance unapređenja.",
    focus: [
      "Struktura headinga",
      "Osnovni meta title i description",
      "Optimizacija slika",
      "WebP workflow",
      "Predlozi za interno linkovanje",
      "Osnovna provera brzine",
    ],
  },
  {
    number: "06",
    title: "Testiranje i quality check",
    description:
      "Pre isporuke, sajt treba proveriti kroz ključne stranice, uređaje i korisničke tokove.",
    focus: [
      "Desktop i mobile provera",
      "Provera linkova i dugmadi",
      "Provera kontakt / booking putanje",
      "Konzistentnost layout-a",
      "Osnovna tehnička provera",
    ],
  },
  {
    number: "07",
    title: "Predaja i sledeći koraci",
    description:
      "Kada je prva verzija spremna, proveravamo rezultat, definišemo moguća unapređenja i pripremamo sajt za budući sadržaj, SEO ili održavanje.",
    focus: [
      "Finalna provera",
      "Napomene za predaju",
      "Predlozi za održavanje",
      "SEO sledeći koraci",
      "Buduća unapređenja",
    ],
  },
];

const pregled = [
  {
    title: "Struktura pre svega",
    description:
      "Jasne stranice, logična navigacija i prioritizovan sadržaj pre dizajna ili razvoja.",
  },
  {
    title: "Izgradnja sa jasnoćom",
    description:
      "Implementacija fokusirana na održivost, responsive ponašanje i praktičan UX.",
  },
  {
    title: "Testiranje pre predaje",
    description:
      "Svaki projekat prolazi kroz quality check koji pokriva uređaje, linkove i korisničke tokove.",
  },
];

const principi = [
  {
    title: "Jasna komunikacija",
    description:
      "Obim, rok i prioriteti se definišu pre nego što implementacija počne.",
  },
  {
    title: "Strukturisan workflow",
    description:
      "Svaki projekat prati isti jasan proces od analize do predaje.",
  },
  {
    title: "Responsive implementacija",
    description:
      "Sve stranice se proveravaju i optimizuju za desktop, tablet i mobilni.",
  },
  {
    title: "SEO-aware predaja",
    description:
      "SEO osnova je deo svakog projekta, a ne naknadna dopuna.",
  },
];

export default function ProcesPage() {
  return (
    <main>
      <PageHero
        eyebrow="Proces"
        title="Jasan workflow od ideje do gotovog sajta"
        actions={
          <>
            <Link href="/sr/kontakt" className="hero-action-primary">
              Pokreni projekat
            </Link>
            <Link href="/sr/usluge" className="hero-action-secondary">
              Pogledaj usluge
            </Link>
          </>
        }
      >
        Moj proces je fokusiran na strukturu, jasnoću i praktičnu realizaciju.
        Cilj je da razumemo projekat, definišemo pravu strukturu sajta,
        izgradimo čiste stranice i pripremimo sajt za SEO, performanse i buduća
        unapređenja.
      </PageHero>

      <div className="public-page">

        {/* 2. Pregled procesa */}
        <section className="process-overview">
          <div className="process-overview-header">
            <h2>Kako pristupam svakom projektu</h2>
            <p>
              Konzistentan proces drži projekte na pravom putu i isporučuje
              predvidive rezultate.
            </p>
          </div>
          <div className="process-overview-grid">
            {pregled.map((item) => (
              <div key={item.title} className="process-overview-item">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Koraci procesa */}
        <section className="process-steps-section">
          <h2 className="section-title">Workflow korak po korak</h2>
          <div className="process-list">
            {koraci.map((korak) => (
              <article key={korak.number} className="process-card">
                <span className="process-card-number">{korak.number}</span>
                <div className="process-card-content">
                  <h3>{korak.title}</h3>
                  <p>{korak.description}</p>
                  <ul className="process-focus-list">
                    {korak.focus.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* 4. Principi rada */}
        <section className="process-principles">
          <h2 className="section-title">Principi rada</h2>
          <div className="process-principles-grid">
            {principi.map((item) => (
              <div key={item.title} className="process-principle-card">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Zašto je ovaj proces važan */}
        <div className="process-note">
          <h2>Zašto je ovaj proces važan</h2>
          <p>
            Dobar sajt nije samo dizajn. Potrebni su struktura, jasan sadržaj,
            brz korisnički tok, tehnička stabilnost i praktičan plan za buduća
            unapređenja.
          </p>
        </div>

        {/* 6. Final CTA */}
        <section className="process-cta">
          <h2>Spreman/spremna si da unaprediš svoj sajt?</h2>
          <p>
            Pošalji mi kratak opis sajta ili projekta i mogu da ti pomognem da
            definišemo sledeći praktičan korak.
          </p>
          <div className="process-cta-actions">
            <Link href="/sr/kontakt">Kontakt</Link>
            <Link href="/sr/usluge" className="process-cta-secondary">
              Pogledaj usluge
            </Link>
          </div>
        </section>

      </div>
    </main>
  );
}
