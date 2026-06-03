import Link from "next/link";
import PageHero from "@/components/PageHero";
import RevealSection from "@/components/RevealSection";
import { services } from "@/data/services";

export const metadata = {
  title: "Usluge — WordPress, SEO i website workflow",
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

/* ── Ikone po slug-u (Feather-style SVG) ── */
const serviceIcons = {
  "html-css-js": (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none"
      viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  "react-nextjs": (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none"
      viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  "seo-optimization": (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none"
      viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  ),
  "wordpress-website-development": (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none"
      viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <line x1="3" y1="9" x2="21" y2="9" />
      <line x1="9" y1="21" x2="9" y2="9" />
    </svg>
  ),
  "ecommerce-store": (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none"
      viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  ),
  "website-maintenance": (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none"
      viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  ),
};

const introHighlights = [
  "WordPress & Elementor",
  "WooCommerce",
  "SEO optimizacija",
  "React / Next.js",
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
        <RevealSection>
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
        </RevealSection>

        {/* 3. Unified services grid — ikona + opis + stavke + link */}
        <RevealSection delay={0.08}>
          <section className="services-unified">
            <h2 className="section-title">Pregled usluga</h2>
            <div className="services-unified-grid">
              {services.map((service) => (
                <Link
                  key={service.slug}
                  href={`/sr/usluge/${service.slug}`}
                  className="service-card"
                >
                  <div className="service-card-header">
                    <div className="service-card-icon">
                      {serviceIcons[service.slug]}
                    </div>
                    <h3>{service.title}</h3>
                  </div>
                  <p className="service-card-desc">{service.description}</p>
                  <ul className="service-includes-list">
                    {service.includes.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <div className="service-card-cta">
                    Pogledaj detalje <span>→</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </RevealSection>

        {/* 4. Šta dobijaš */}
        <RevealSection delay={0.05}>
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
        </RevealSection>

        {/* 5. Final CTA */}
        <RevealSection delay={0.05}>
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
        </RevealSection>

      </div>
    </main>
  );
}
