import { notFound } from "next/navigation";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import RevealSection from "@/components/RevealSection";
import CTASection from "@/components/CTASection";
import { services } from "@/data/services";
import styles from "./service-detail.module.css";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};
  return {
    title: `${service.titleEn} | Services — Đorđe Popović`,
    description: service.descriptionEn,
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

  return (
    <main>
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
