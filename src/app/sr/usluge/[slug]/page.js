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
    title: `${service.title} | Usluge — Đorđe Popović`,
    description: service.description,
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
        label="Usluge"
        title={service.title}
        description={service.description}
        lang="sr"
      />

      <div className={styles.wrapper}>
        <div className={styles.inner}>

          {/* Category pill */}
          <p className={styles.category}>{service.category}</p>

          {/* Šta je uključeno */}
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

          {/* Tehnologije */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Alati i tehnologije</h2>
            <div className={styles.techPills}>
              {service.technologies.map((tech) => (
                <span key={tech} className={styles.techPill}>{tech}</span>
              ))}
            </div>
          </section>

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
