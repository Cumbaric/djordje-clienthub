import Link from "next/link";
import PageHero from "@/components/PageHero";
import { contactEmail } from "@/data/contact";

export const metadata = {
  title: "Kontakt | Đorđe Popović",
  description:
    "Kontaktiraj Đorđa Popovića za WordPress sajtove, Elementor unapređenja, WooCommerce podešavanje, SEO optimizaciju, održavanje i web workflow projekte.",
  openGraph: {
    title: "Kontakt | Đorđe Popović",
    description:
      "Pošalji kratak opis projekta i definiši sledeći praktičan korak za svoj sajt ili workflow.",
  },
  alternates: {
    languages: { en: "/en/contact", sr: "/sr/kontakt" },
  },
};

const opcijePoruke = [
  {
    label: "Email",
    title: "Email",
    value: contactEmail,
    href: `mailto:${contactEmail}`,
    isLink: true,
  },
  {
    label: "Upwork",
    title: "Upwork",
    value: "Uskoro",
    isLink: false,
  },
  {
    label: "Fiverr",
    title: "Fiverr",
    value: "Uskoro",
    isLink: false,
  },
  {
    label: "LinkedIn",
    title: "LinkedIn",
    value: "Uskoro",
    isLink: false,
  },
];

const sendList = [
  "URL sajta, ako ga već imaš",
  "Kratak opis biznisa ili projekta",
  "Šta želiš da unaprediš ili napraviš",
  "Rok ili prioritet, ako postoji",
  "Primere sajtova koji ti se dopadaju, ako ih imaš",
  "Da li ti treba WordPress, WooCommerce, SEO, održavanje ili custom workflow",
];

const fitItems = [
  {
    title: "Izrada WordPress sajtova",
    description:
      "Pregledni i responsive WordPress sajtovi za male biznise, uslužne delatnosti i content projekte.",
  },
  {
    title: "Elementor redizajn i unapređenje",
    description:
      "Unapređenje postojećih Elementor sajtova kroz bolji layout, strukturu, mobile prikaz i CTA pozicioniranje.",
  },
  {
    title: "WooCommerce podešavanje",
    description:
      "Osnovna WooCommerce struktura, product stranice i podešavanje prodavnice za manje online prodavnice ili kataloge proizvoda.",
  },
  {
    title: "SEO i performance unapređenja",
    description:
      "Tehnička struktura, heading elementi, metadata osnova, predlozi za interno linkovanje i workflow za optimizaciju slika.",
  },
  {
    title: "Održavanje sajtova",
    description:
      "Ažuriranje sadržaja, podrška za plugin/theme izmene, manje ispravke i unapređenje strukture.",
  },
  {
    title: "AI-assisted website workflow",
    description:
      "Planiranje, QA, struktura sadržaja i razvojna podrška uz AI alate i ljudsku kontrolu finalnog rezultata.",
  },
];

const sledeciKoraci = [
  "Pregledam tvoju poruku i kontekst projekta",
  "Identifikujem najpraktičniji sledeći korak",
  "Definišemo obim, prioritete i okvirni rok",
  "Predlažem jasan pravac ili plan implementacije",
];

export default function KontaktPage() {
  return (
    <main>
      <PageHero
        eyebrow="Kontakt"
        title="Hajde da pričamo o tvom sajtu ili workflow-u"
        actions={
          <>
            <a href={`mailto:${contactEmail}`} className="hero-action-primary">
              Pošalji email
            </a>
            <Link href="/sr/usluge" className="hero-action-secondary">
              Pogledaj usluge
            </Link>
          </>
        }
      >
        Ako ti treba pregledniji WordPress sajt, bolja struktura, SEO-focused
        unapređenje ili praktičan web workflow, pošalji mi kratak opis projekta.
      </PageHero>

      <div className="public-page">

        {/* 2. Opcije za kontakt — odmah posle hero-a */}
        <section className="contact-options-section">
          <h2 className="section-title">Opcije za kontakt</h2>
          <p>Izaberi kanal koji ti najviše odgovara.</p>
          <div className="contact-options-grid">
            {opcijePoruke.map((opcija) => (
              <div key={opcija.title} className="contact-option-card">
                <span className="contact-option-label">{opcija.label}</span>
                <h3>{opcija.title}</h3>
                {opcija.isLink ? (
                  <a href={opcija.href}>{opcija.value}</a>
                ) : (
                  <p>{opcija.value}</p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* 3. Šta da pošalješ */}
        <section className="contact-inquiry">
          <div className="contact-inquiry-grid">
            <div className="contact-inquiry-left">
              <h2>Šta da pošalješ u poruci</h2>
              <p>
                Kratak i jasan opis projekta mi pomaže da razumem situaciju i
                brzo predložim najpraktičniji sledeći korak.
              </p>
            </div>
            <div className="contact-inquiry-right">
              <ul className="contact-inquiry-list">
                {sendList.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* 4. U čemu mogu da pomognem */}
        <section className="contact-fit-section">
          <h2 className="section-title">U čemu mogu da pomognem</h2>
          <div className="contact-fit-grid">
            {fitItems.map((item) => (
              <div key={item.title} className="contact-fit-card">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Šta se dešava nakon poruke */}
        <section className="contact-steps-section">
          <h2 className="section-title">Šta se dešava nakon poruke</h2>
          <div className="contact-steps-list">
            {sledeciKoraci.map((korak, index) => (
              <div key={korak} className="contact-step-item">
                <span className="contact-step-number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="contact-step-text">{korak}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 6. Final CTA */}
        <section className="contact-cta">
          <h2>Spreman/spremna si da definišemo sledeći korak?</h2>
          <p>
            Pošalji mi kratku poruku sa ciljem sajta i pomoći ću ti da to
            pretvorimo u praktičan plan.
          </p>
          <div className="contact-cta-actions">
            <a href={`mailto:${contactEmail}`}>Pošalji email</a>
            <Link href="/sr/usluge" className="contact-cta-secondary">
              Pogledaj usluge
            </Link>
          </div>
        </section>

      </div>
    </main>
  );
}
