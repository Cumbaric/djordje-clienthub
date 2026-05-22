import Link from "next/link";
import PageHero from "@/components/PageHero";

export const metadata = {
  title: "Usluge | WordPress, SEO i website workflow",
  description:
    "Izrada WordPress sajtova, Elementor redizajn, WooCommerce podešavanje, SEO optimizacija, održavanje i AI-assisted workflow usluge.",
  openGraph: {
    title: "Usluge | Đorđe Popović",
    description:
      "WordPress, Elementor, WooCommerce, SEO i AI-assisted website workflow usluge.",
  },
  alternates: {
    languages: { en: "/en/services", sr: "/sr/usluge" },
  },
};

const usluge = [
  {
    title: "Izrada WordPress sajtova",
    description:
      "Pregledni i responsive WordPress sajtovi sa jasnom strukturom, praktičnim UX pristupom i održivim layout-ima.",
    includes: [
      "Struktura sajta i postavljanje stranica",
      "Elementor / Elementor Pro implementacija",
      "Responsive layout",
      "Osnovno tehničko podešavanje",
    ],
  },
  {
    title: "Redizajn Elementor sajtova",
    description:
      "Unapređenje postojećih Elementor sajtova kroz čistiji layout, bolju konzistentnost i bolji prikaz na svim uređajima.",
    includes: [
      "Čišćenje sekcija i layout-a",
      "Unapređenje mobilnog prikaza",
      "Bolja vizuelna hijerarhija",
      "Bolje pozicioniranje CTA elemenata",
    ],
  },
  {
    title: "Izrada WooCommerce prodavnica",
    description:
      "Osnovno postavljanje WooCommerce prodavnice za manje biznise kojima treba jasna struktura proizvoda i jednostavan tok kupovine.",
    includes: [
      "Struktura proizvoda",
      "Podešavanje product stranica",
      "Osnovna WooCommerce konfiguracija",
      "Pregled checkout toka",
    ],
  },
  {
    title: "SEO i tehnička optimizacija",
    description:
      "SEO unapređenja koja pomažu da sajt bude jasniji korisnicima i pretraživačima.",
    includes: [
      "Osnovni title i meta description",
      "Struktura headinga",
      "Predlozi za interno linkovanje",
      "Technical SEO provera",
    ],
  },
  {
    title: "Održavanje WordPress sajtova",
    description:
      "Kontinuirana podrška za WordPress sajtove kako bi sadržaj, pluginovi i struktura ostali stabilni i organizovani.",
    includes: [
      "Ažuriranje sadržaja",
      "Podrška za plugin/theme update",
      "Osnovni troubleshooting",
      "Unapređenje strukture sajta",
    ],
  },
  {
    title: "AI-assisted website workflow",
    description:
      "Korišćenje AI alata za brže planiranje, strukturu sadržaja, QA i razvojni workflow, uz ljudsku kontrolu nad finalnim rezultatom.",
    includes: [
      "Planiranje sadržaja",
      "Planiranje strukture sajta",
      "QA checkliste",
      "Dokumentacija workflow-a",
    ],
  },
];

const introHighlights = [
  "WordPress & Elementor",
  "WooCommerce",
  "SEO osnova",
  "AI-assisted workflow",
];

const valueItems = [
  {
    title: "Jasna struktura",
    description:
      "Stranice i sekcije koje su logički organizovane i lako se koriste.",
  },
  {
    title: "Responsive implementacija",
    description:
      "Layouti koji ispravno funkcionišu na desktopu, tabletu i mobilnom.",
  },
  {
    title: "SEO osnova",
    description:
      "Tehnički temelji — headinzi, meta, interno linkovanje — postavljeni ispravno od početka.",
  },
  {
    title: "Praktična predaja",
    description:
      "Sajt koji je lako ažurirati i održavati nakon isporuke.",
  },
  {
    title: "Održiv workflow",
    description:
      "Čista implementacija koja olakšava buduće izmene.",
  },
];

export default function UslugePage() {
  return (
    <main>
      <PageHero
        eyebrow="Usluge"
        title="WordPress, SEO i website workflow usluge"
        actions={
          <>
            <Link href="/sr/kontakt" className="hero-action-primary">
              Kontaktiraj me
            </Link>
            <Link href="/sr/projekti" className="hero-action-secondary">
              Pogledaj projekte
            </Link>
          </>
        }
      >
        Pomažem malim biznisima, uslužnim delatnostima i content projektima da
        naprave preglednije, brže i bolje strukturisane sajtove kroz WordPress,
        Elementor, WooCommerce, SEO osnovu i AI-assisted workflow.
      </PageHero>

      <div className="public-page">

        {/* 2. Intro / pozicioniranje */}
        <section className="services-intro">
          <p className="services-intro-label">Šta radim</p>
          <h2>Praktične web usluge za male biznise</h2>
          <p>
            Radim sa malim biznisima, uslužnim delatnostima i content projektima
            kojima treba pregledniji i bolje strukturisan web nastup. Svaka
            usluga je fokusirana na praktičnu realizaciju — jasne stranice,
            ispravna struktura i održiv rezultat.
          </p>
          <div className="services-intro-highlights">
            {introHighlights.map((item) => (
              <span key={item} className="services-intro-highlight">
                {item}
              </span>
            ))}
          </div>
        </section>

        {/* 3. Pregled usluga — grid */}
        <section className="services-overview">
          <h2 className="section-title">Pregled usluga</h2>
          <div className="services-overview-grid">
            {usluge.map((usluga) => (
              <div key={usluga.title} className="services-overview-card">
                <h3>{usluga.title}</h3>
                <p>{usluga.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Detaljan prikaz usluga */}
        <section className="services-detail">
          <h2 className="section-title">Šta uključuje svaka usluga</h2>
          <div className="services-list">
            {usluge.map((usluga) => (
              <article key={usluga.title} className="service-list-card">
                <div className="service-list-content">
                  <h3>{usluga.title}</h3>
                  <p>{usluga.description}</p>
                  <ul className="service-includes-list">
                    {usluga.includes.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* 5. Šta dobijaš */}
        <section className="services-value">
          <h2 className="section-title">Šta dobijaš</h2>
          <p>
            Svaki projekat je usmeren ka praktičnom i održivom rezultatu.
          </p>
          <div className="services-value-grid">
            {valueItems.map((item) => (
              <div key={item.title} className="services-value-card">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 6. Final CTA */}
        <section className="services-cta">
          <h2>Treba ti pregledniji i bolje strukturisan sajt?</h2>
          <p>
            Pošalji mi kratak opis projekta i mogu da ti pomognem da
            definišemo sledeći praktičan korak.
          </p>
          <div className="services-cta-actions">
            <Link href="/sr/kontakt">Kontakt</Link>
            <Link href="/sr/projekti" className="services-cta-secondary">
              Pogledaj projekte
            </Link>
          </div>
        </section>

      </div>
    </main>
  );
}
