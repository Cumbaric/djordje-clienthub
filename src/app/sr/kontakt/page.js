import Link from "next/link";
import PageHero from "@/components/PageHero";
import RevealSection from "@/components/RevealSection";
import SectionOrb from "@/components/SectionOrb";
import PageIcon from "@/components/PageIcon";
import { contactEmail, socialLinks } from "@/data/contact";

export const metadata = {
  title: "Kontakt",
  description:
    "Kontaktiraj Đorđa Popovića za sajtove kodirane od nule i WordPress sajtove, WooCommerce podešavanje, SEO optimizaciju, održavanje i web workflow projekte.",
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
    icon: "email",
    value: contactEmail,
    href: `mailto:${contactEmail}`,
    isLink: true,
  },
  {
    label: "Upwork",
    title: "Upwork",
    icon: "upwork",
    value: "Pogledaj profil",
    href: socialLinks.upwork,
    isLink: true,
    external: true,
  },
  {
    label: "Fiverr",
    title: "Fiverr",
    icon: "fiverr",
    value: "Pogledaj profil",
    href: socialLinks.fiverr,
    isLink: true,
    external: true,
  },
  {
    label: "LinkedIn",
    title: "LinkedIn",
    icon: "linkedin",
    value: "Pogledaj profil",
    href: socialLinks.linkedin,
    isLink: true,
    external: true,
  },
];

const sendList = [
  "URL sajta, ako ga već imaš",
  "Kratak opis biznisa ili projekta",
  "Šta želiš da unaprediš ili napraviš",
  "Rok ili prioritet, ako postoji",
  "Primere sajtova koji ti se dopadaju, ako ih imaš",
  "Da li ti treba sajt kodiran od nule, WordPress, WooCommerce, SEO ili održavanje",
];

const fitItems = [
  {
    icon: "code",
    title: "Sajtovi kodirani od nule",
    description:
      "Sajtovi, landing stranice i web aplikacije pravljene od nule u HTML, CSS, JavaScript, React i Next.js-u — za brze, potpuno custom rezultate sa punom kontrolom nad kodom i dizajnom.",
  },
  {
    icon: "wordpress",
    title: "WordPress i Elementor sajtovi",
    description:
      "Prezentacioni WordPress sajtovi izrađeni i dizajnirani u Elementoru — jasna struktura, pregledne sekcije i jednostavno upravljanje sadržajem.",
  },
  {
    icon: "woocommerce",
    title: "Online prodavnica",
    description:
      "Postavljanje WooCommerce prodavnice — struktura kategorija i proizvoda, stranice proizvoda i podešavanje checkout procesa za manje prodavnice.",
  },
  {
    icon: "seo",
    title: "SEO i on-page optimizacija",
    description:
      "Tehnička i on-page SEO optimizacija — heading struktura, metadata, interno linkovanje, brzina učitavanja i priprema za Google indeksiranje. Radi i za postojeće sajtove.",
  },
  {
    icon: "maintenance",
    title: "Održavanje i podrška",
    description:
      "Ažuriranje sadržaja, podrška za plugin/theme izmene, tehničke ispravke i sitna unapređenja strukture ili CSS-a.",
  },
  {
    icon: "ai",
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
        Bilo da ti treba sajt kodiran od nule, WordPress sajt, bolja struktura,
        SEO-focused unapređenje ili praktičan web workflow, pošalji mi kratak
        opis projekta.
      </PageHero>

      <div className="public-page">

        {/* 2. Opcije za kontakt — odmah posle hero-a */}
        <RevealSection>
          <section className="contact-options-section">
            <span className="contact-availability">
              <span className="contact-availability-dot" />
              Dostupan za nove projekte
            </span>
            <h2 className="section-title">Opcije za kontakt</h2>
            <p>Izaberi kanal koji ti najviše odgovara.</p>
            <div className="contact-options-grid">
              {opcijePoruke.map((opcija) => (
                <div key={opcija.title} className="contact-option-card">
                  <span className="contact-option-icon">
                    <PageIcon name={opcija.icon} size={22} />
                  </span>
                  <span className="contact-option-label">{opcija.label}</span>
                  <h3>{opcija.title}</h3>
                  {opcija.isLink ? (
                    <a
                      href={opcija.href}
                      {...(opcija.external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                    >
                      {opcija.value}
                    </a>
                  ) : (
                    <p>{opcija.value}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        </RevealSection>

        {/* 3. Šta da pošalješ */}
        <RevealSection delay={0.05}>
          <section className="contact-inquiry has-orb">
            <SectionOrb style={{ "--orb-top": "30px", "--orb-right": "44px" }} />
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
        </RevealSection>

        {/* 4. U čemu mogu da pomognem */}
        <RevealSection delay={0.05}>
          <section className="contact-fit-section">
            <h2 className="section-title">U čemu mogu da pomognem</h2>
            <div className="contact-fit-grid">
              {fitItems.map((item) => (
                <div key={item.title} className="contact-fit-card">
                  <span className="contact-fit-icon">
                    <PageIcon name={item.icon} size={22} />
                  </span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              ))}
            </div>
          </section>
        </RevealSection>

        {/* 5. Šta se dešava nakon poruke */}
        <RevealSection delay={0.05}>
          <section className="contact-steps-section">
            <h2 className="section-title">Šta se dešava nakon poruke</h2>
            <div className="contact-steps-list contact-steps-timeline">
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
        </RevealSection>

        {/* 6. Final CTA */}
        <RevealSection delay={0.08}>
          <section className="contact-cta has-orb">
            <SectionOrb style={{ "--orb-top": "30px", "--orb-right": "44px" }} />
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
        </RevealSection>

      </div>
    </main>
  );
}
