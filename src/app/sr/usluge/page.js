import Link from "next/link";
import PageHero from "@/components/PageHero";

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

export default function UslugePage() {
  return (
    <main className="public-page">
      <PageHero
        eyebrow="Usluge"
        title="WordPress, SEO i website workflow usluge"
      >
        Pomažem malim biznisima, uslužnim delatnostima i content projektima da
        naprave preglednije, brže i bolje strukturisane sajtove kroz WordPress,
        Elementor, WooCommerce, SEO osnovu i AI-assisted workflow.
      </PageHero>

      <section className="services-list">
        {usluge.map((usluga) => (
          <article key={usluga.title} className="service-list-card">
            <div className="service-list-content">
              <h2>{usluga.title}</h2>
              <p>{usluga.description}</p>
              <ul className="service-includes-list">
                {usluga.includes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </section>

      <section className="services-cta">
        <h2>Treba ti pregledniji i bolje strukturisan sajt?</h2>
        <p>
          Pošalji mi kratak opis projekta i mogu da ti pomognem da definišemo
          sledeći praktičan korak.
        </p>
        <div className="services-cta-actions">
          <Link href="/sr/kontakt">Kontakt</Link>
          <Link href="/sr/projekti" className="services-cta-secondary">
            Pogledaj projekte
          </Link>
        </div>
      </section>
    </main>
  );
}
