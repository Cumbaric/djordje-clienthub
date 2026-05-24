import { notFound } from "next/navigation";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import CTASection from "@/components/CTASection";
import { services } from "@/data/services";
import styles from "./service-detail.module.css";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }) {
  const service = services.find((s) => s.slug === params.slug);
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

export default function ServiceDetailPage({ params }) {
  const service = services.find((s) => s.slug === params.slug);
  if (!service) notFound();

  return (
    <main>
      <PageHero
        label="Services"
        title={service.titleEn}
        description={service.descriptionEn}
        lang="en"
      />

      <div className={styles.wrapper}>
        <div className={styles.inner}>

          {/* Category pill */}
          <p className={styles.category}>{service.category}</p>

          {/* What's included */}
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

          {/* Technologies */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Tools &amp; technologies</h2>
            <div className={styles.techPills}>
              {service.technologies.map((tech) => (
                <span key={tech} className={styles.techPill}>{tech}</span>
              ))}
            </div>
          </section>

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
