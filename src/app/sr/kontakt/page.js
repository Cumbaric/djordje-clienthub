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

const sendList = [
  "URL sajta, ako ga već imaš",
  "Kratak opis biznisa ili projekta",
  "Šta želiš da unaprediš ili napraviš",
  "Rok ili prioritet, ako postoji",
  "Primere sajtova koji ti se dopadaju, ako ih imaš",
  "Da li ti treba WordPress, WooCommerce, SEO, održavanje ili custom workflow",
];

const nextSteps = [
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
      <section>
        <h2 style={{ marginBottom: "24px", fontSize: "30px", letterSpacing: "-0.02em" }}>
          U čemu mogu da pomognem
        </h2>
        <div className="contact-fit-grid">
          {fitItems.map((item) => (
            <div key={item.title} className="contact-fit-card">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="contact-what-to-send">
        <h2>Šta da pošalješ u poruci</h2>
        <ul className="contact-send-list">
          {sendList.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="contact-next-steps">
        <h2>Šta se dešava nakon poruke</h2>
        <ol className="contact-next-list">
          {nextSteps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </div>

      <div className="contact-options-card">
        <h2>Opcije za kontakt</h2>
        <p>Za sada koristi jednu od sledećih opcija za kontakt.</p>
        <ul className="contact-options-list">
          <li>
            <strong>Email: </strong>
            <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
          </li>
          <li>
            <strong>Upwork: </strong>Uskoro
          </li>
          <li>
            <strong>Fiverr: </strong>Uskoro
          </li>
          <li>
            <strong>LinkedIn: </strong>Uskoro
          </li>
        </ul>
      </div>

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
