import { notFound } from "next/navigation";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import RevealSection from "@/components/RevealSection";
import CTASection from "@/components/CTASection";
import JsonLd from "@/components/JsonLd";
import { services } from "@/data/services";
import styles from "./service-detail.module.css";

function parsePrice(str) {
  const m = str?.match(/([€$£])(\d+)/);
  if (!m) return null;
  return { price: m[2], currency: { "€": "EUR", "$": "USD", "£": "GBP" }[m[1]] ?? "EUR" };
}

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};
  return {
    title: `${service.title} — Usluge`,
    description: service.description,
    alternates: {
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
    "provider": { "@id": "https://djordjepopovic.com/#organization" },
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
      { "@type": "ListItem", "position": 1, "name": "Početna", "item": "https://djordjepopovic.com/sr" },
      { "@type": "ListItem", "position": 2, "name": "Usluge", "item": "https://djordjepopovic.com/sr/usluge" },
      { "@type": "ListItem", "position": 3, "name": service.title, "item": `https://djordjepopovic.com/sr/usluge/${service.slug}` },
    ],
  };

  return (
    <main>
      <JsonLd data={serviceSchema} />
      <JsonLd data={breadcrumbSchema} />
      <PageHero eyebrow="Usluge" title={service.title}>
        {service.description}
      </PageHero>

      <div className={styles.wrapper}>
        <div className={styles.inner}>

          {/* Meta bar — kategorija · rok · cena */}
          <div className={styles.metaBar}>
            <span className={styles.category}>{service.category}</span>
            <span className={styles.metaItem}>⏱ {service.timeline}</span>
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
                    <span className={styles.idealMarker} aria-hidden="true">▸</span>
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          </RevealSection>

          {/* Šta je uključeno */}
          <RevealSection delay={0.05}>
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Šta je uključeno</h2>
              <ul className={styles.includesList}>
                {service.includes.map((item) => (
                  <li key={item} className={styles.includesItem}>
                    <span className={styles.checkIcon} aria-hidden="true">✓</span>
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
            ← Sve usluge
          </Link>

        </div>
      </div>

      <CTASection
        eyebrow="Kontakt"
        title="Zainteresovan za ovu uslugu?"
        action={{ href: "/sr/kontakt", text: "Kontaktiraj me" }}
      >
        Pošalji mi poruku sa kratkim opisom projekta i javiću ti se.
      </CTASection>
    </main>
  );
}
