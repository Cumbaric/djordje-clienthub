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

const seoTitles = {
  "html-css-js": "HTML/CSS/JS Website Development Belgrade",
  "react-nextjs": "React & Next.js Web App Development",
  "seo-optimization": "SEO Optimization Services Belgrade",
  "wordpress-website-development": "WordPress Website Development Belgrade",
  "ecommerce-store": "WooCommerce Store Development Belgrade",
  "website-maintenance": "WordPress Maintenance & Support Belgrade",
};

const seoDescriptions = {
  "html-css-js": "Hand-coded HTML, CSS and JavaScript websites and landing pages built in Belgrade. Fast, lightweight, pixel-accurate — no frameworks or CMS dependencies.",
  "react-nextjs": "Custom React and Next.js web applications built in Belgrade — dashboards, internal tools and MVPs for small businesses and startups.",
  "seo-optimization": "On-page and technical SEO optimization — Belgrade web developer. Fix indexing issues, structure and meta descriptions for better Google rankings.",
  "wordpress-website-development": "WordPress website development for small businesses and local companies in Belgrade. Elementor design, SEO-ready, responsive and easy to manage.",
  "ecommerce-store": "WooCommerce online store development in Belgrade — product structure, SEO-ready product pages and checkout setup for small and mid-size shops.",
  "website-maintenance": "WordPress maintenance and technical support for businesses in Belgrade — content updates, plugin management, performance fixes and ongoing care.",
};

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};
  return {
    title: seoTitles[slug] ?? `${service.titleEn} — Services`,
    description: seoDescriptions[slug] ?? service.descriptionEn,
    alternates: {
      canonical: `/en/services/${service.slug}`,
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
    "name": service.titleEn,
    "description": service.descriptionEn,
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
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://djordjepopovic.com/en" },
      { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://djordjepopovic.com/en/services" },
      { "@type": "ListItem", "position": 3, "name": service.titleEn, "item": `https://djordjepopovic.com/en/services/${service.slug}` },
    ],
  };

  return (
    <main>
      <JsonLd data={serviceSchema} />
      <JsonLd data={breadcrumbSchema} />
      <PageHero eyebrow="Services" title={service.titleEn}>
        {service.descriptionEn}
      </PageHero>

      <div className={styles.wrapper}>
        <div className={styles.inner}>

          {/* Meta bar — category · timeline · price */}
          <div className={styles.metaBar}>
            <span className={styles.category}>{service.category}</span>
            <span className={styles.metaItem}>⏱ {service.timelineEn}</span>
            <span className={styles.metaPrice}>From {service.priceFrom}</span>
          </div>

          {/* Overview */}
          <RevealSection>
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Overview</h2>
              <div className={styles.overview}>
                {service.overviewEn.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </section>
          </RevealSection>

          {/* Who it's for */}
          <RevealSection delay={0.05}>
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Who it&apos;s for</h2>
              <ul className={styles.idealList}>
                {service.idealForEn.map((item) => (
                  <li key={item} className={styles.idealItem}>
                    <span className={styles.idealMarker} aria-hidden="true">▸</span>
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          </RevealSection>

          {/* What's included */}
          <RevealSection delay={0.05}>
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>What&apos;s included</h2>
              <ul className={styles.includesList}>
                {service.includesEn.map((item) => (
                  <li key={item} className={styles.includesItem}>
                    <span className={styles.checkIcon} aria-hidden="true">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          </RevealSection>

          {/* How it works */}
          <RevealSection delay={0.05}>
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>How it works</h2>
              <ol className={styles.steps}>
                {service.stepsEn.map((step, index) => (
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

          {/* Tools & technologies */}
          <RevealSection delay={0.05}>
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Tools &amp; technologies</h2>
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
              <h2 className={styles.sectionTitle}>Questions about this service</h2>
              <div className={styles.faqList}>
                {service.faqEn.map((item) => (
                  <details key={item.q} className={styles.faqItem}>
                    <summary className={styles.faqQuestion}>{item.q}</summary>
                    <p className={styles.faqAnswer}>{item.a}</p>
                  </details>
                ))}
              </div>
            </section>
          </RevealSection>

          {/* Back link */}
          <Link href="/en/services" className={styles.backLink}>
            ← All services
          </Link>

        </div>
      </div>

      <CTASection
        eyebrow="Contact"
        title="Interested in this service?"
        action={{ href: "/en/contact", text: "Contact me" }}
      >
        Send me a message with a brief description of your project and I&apos;ll
        get back to you.
      </CTASection>
    </main>
  );
}
