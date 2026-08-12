import { notFound } from "next/navigation";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import RevealSection from "@/components/RevealSection";
import CTASection from "@/components/CTASection";
import JsonLd from "@/components/JsonLd";
import { services } from "@/data/services";
import styles from "./service-detail.module.css";

function parsePrice(str) {
  const m = str?.match(/([â‚¬$Â£])(\d+)/);
  if (!m) return null;
  return { price: m[2], currency: { "â‚¬": "EUR", "$": "USD", "Â£": "GBP" }[m[1]] ?? "EUR" };
}

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

const seoTitlesSr = {
  "html-css-js": "Izrada HTML/CSS/JS sajta Beograd",
  "react-nextjs": "React i Next.js web aplikacije Beograd",
  "seo-optimization": "SEO optimizacija sajta Beograd",
  "wordpress-website-development": "Izrada WordPress sajta Beograd",
  "ecommerce-store": "Izrada WooCommerce prodavnice Beograd",
  "website-maintenance": "OdrÅ¾avanje WordPress sajta Beograd",
};

const seoDescriptionsSr = {
  "html-css-js": "Izrada sajtova i landing stranica u HTML, CSS i JavaScript kodu iz Beograda. Brzo, lagano, piksel-precizno â€” bez frameworka i CMS-a.",
  "react-nextjs": "Razvoj custom React i Next.js web aplikacija u Beogradu â€” dashboard-i, interni alati i MVP-ovi za male biznise i startupe.",
  "seo-optimization": "On-page i tehniÄka SEO optimizacija za sajtove u Beogradu i Srbiji. Indeksiranje, heading struktura i meta opisi za bolje rangiranje na Google-u.",
  "wordpress-website-development": "Izrada WordPress sajtova za male biznise i lokalne kompanije u Beogradu. Elementor dizajn, SEO priprema, responsive i jednostavno upravljanje.",
  "ecommerce-store": "Izrada WooCommerce online prodavnice u Beogradu â€” struktura kategorija i proizvoda, SEO-optimizovane stranice i checkout podeÅ¡avanje.",
  "website-maintenance": "OdrÅ¾avanje i tehniÄka podrÅ¡ka za WordPress sajtove u Beogradu â€” aÅ¾uriranje sadrÅ¾aja, plugini, reÅ¡avanje problema i redovna briga.",
};

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};
  return {
    title: seoTitlesSr[slug] ?? `${service.title} â€” Usluge`,
    description: seoDescriptionsSr[slug] ?? service.description,
    alternates: {
      canonical: `/sr/usluge/${service.slug}`,
      languages: {
        en: `/en/services/${service.slug}`,
        sr: `/sr/usluge/${service.slug}`,
      },
    },
  };
}

export default async function ServiceDetailPage({ params }) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  const parsedPrice = parsePrice(service.priceFrom);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.title,
    "description": service.description,
    "provider": { "@id": "https://dwebsolutions.rs/#organization" },
    "areaServed": "Worldwide",
    ...(parsedPrice && {
      "offers": {
        "@type": "Offer",
        "price": parsedPrice.price,
        "priceCurrency": parsedPrice.currency,
        "availability": "https://schema.org/InStock",
      },
    }),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "PoÄetna", "item": "https://dwebsolutions.rs/sr" },
      { "@type": "ListItem", "position": 2, "name": "Usluge", "item": "https://dwebsolutions.rs/sr/usluge" },
      { "@type": "ListItem", "position": 3, "name": service.title, "item": `https://dwebsolutions.rs/sr/usluge/${service.slug}` },
    ],
  };

  const faqSchema = service.faq?.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": service.faq.map((item) => ({
      "@type": "Question",
      "name": item.q,
      "acceptedAnswer": { "@type": "Answer", "text": item.a },
    })),
  } : null;

  return (
    <main>
      <JsonLd data={serviceSchema} />
      <JsonLd data={breadcrumbSchema} />
      {faqSchema && <JsonLd data={faqSchema} />}
      <PageHero eyebrow="Usluge" title={service.title}>
        {service.description}
      </PageHero>

      <div className={styles.wrapper}>
        <div className={styles.inner}>

          {/* Meta bar â€” kategorija Â· rok Â· cena */}
          <div className={styles.metaBar}>
            <span className={styles.category}>{service.category}</span>
            <span className={styles.metaItem}>â± {service.timeline}</span>
            <span className={styles.metaPrice}>Od {service.priceFrom}</span>
          </div>

          {/* Pregled */}
          <RevealSection>
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Pregled</h2>
              <div className={styles.overview}>
                {service.overview.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </section>
          </RevealSection>

          {/* Za koga je */}
          <RevealSection delay={0.05}>
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Za koga je</h2>
              <ul className={styles.idealList}>
                {service.idealFor.map((item) => (
                  <li key={item} className={styles.idealItem}>
                    <span className={styles.idealMarker} aria-hidden="true">â–¸</span>
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          </RevealSection>

          {/* Å ta je ukljuÄeno */}
          <RevealSection delay={0.05}>
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Å ta je ukljuÄeno</h2>
              <ul className={styles.includesList}>
                {service.includes.map((item) => (
                  <li key={item} className={styles.includesItem}>
                    <span className={styles.checkIcon} aria-hidden="true">âœ“</span>
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          </RevealSection>

          {/* Kako izgleda proces */}
          <RevealSection delay={0.05}>
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Kako izgleda proces</h2>
              <ol className={styles.steps}>
                {service.steps.map((step, index) => (
                  <li key={step.title} className={styles.step}>
                    <span className={styles.stepNum}>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className={styles.stepBody}>
                      <h3>{step.title}</h3>
                      <p>{step.description}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>
          </RevealSection>

          {/* Alati i tehnologije */}
          <RevealSection delay={0.05}>
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Alati i tehnologije</h2>
              <div className={styles.techPills}>
                {service.technologies.map((tech) => (
                  <span key={tech} className={styles.techPill}>{tech}</span>
                ))}
              </div>
            </section>
          </RevealSection>

          {/* FAQ */}
          <RevealSection delay={0.05}>
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Pitanja o ovoj usluzi</h2>
              <div className={styles.faqList}>
                {service.faq.map((item) => (
                  <details key={item.q} className={styles.faqItem}>
                    <summary className={styles.faqQuestion}>{item.q}</summary>
                    <p className={styles.faqAnswer}>{item.a}</p>
                  </details>
                ))}
              </div>
            </section>
          </RevealSection>

          {/* Nazad */}
          <Link href="/sr/usluge" className={styles.backLink}>
            â† Sve usluge
          </Link>

        </div>
      </div>

      <CTASection
        eyebrow="Kontakt"
        title="Zainteresovan za ovu uslugu?"
        action={{ href: "/sr/kontakt", text: "Kontaktiraj nas" }}
      >
        PoÅ¡alji nam poruku sa kratkim opisom projekta i javiÄ‡emo ti se.
      </CTASection>
    </main>
  );
}
