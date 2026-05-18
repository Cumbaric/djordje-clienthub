import Link from "next/link";
import SectionHeader from "@/components/SectionHeader";
import CTASection from "@/components/CTASection";
import HeroCube from "@/components/HeroCube";
import { featuredProjects } from "@/data/projects";
import { serviceLabels } from "@/data/services";
import { techStackContent } from "@/data/techStack";
import { positioning } from "@/data/positioning";
import styles from "../(public)/page.module.css";

export const metadata = {
  title: "Đorđe Popović | WordPress developer i SEO-focused izrada sajtova",
  description:
    "WordPress developer fokusiran na brze, pregledne i prodajno orijentisane sajtove, uz SEO osnovu, optimizaciju performansi i AI-assisted workflow.",
  openGraph: {
    title: "Đorđe Popović | WordPress developer",
    description:
      "WordPress sajtovi, Elementor layout-i, WooCommerce osnove, SEO struktura i AI-assisted web workflow.",
  },
  alternates: {
    languages: { en: "/en", sr: "/sr" },
  },
};

const pos = positioning.sr;
const tech = techStackContent.sr;

export default function Home() {
  return (
    <main className={styles.homePage}>
      <section className={styles.hero}>
        <div className={styles.heroGrid}>
          <div className={styles.heroContent}>
            <p className={styles.eyebrow}>Djordje ClientHub</p>

            <h1>{pos.headline}</h1>

            <p className={styles.description}>{pos.shortDescription}</p>

            <div className={styles.heroActions}>
              <Link href="/sr/projekti" className={styles.primaryButton}>
                Pogledaj projekte
              </Link>

              <Link href="/sr/kontakt" className={styles.secondaryButton}>
                Kontakt
              </Link>
            </div>
          </div>

          <div className={styles.heroVisual}>
            <HeroCube />
          </div>
        </div>
      </section>

      <section className={styles.introSection}>
        <p className={styles.sectionLabel}>O meni</p>
        <h2>Pravim praktična web rešenja za male biznise i freelance rad.</h2>
        <p>{pos.extendedDescription}</p>
      </section>

      <section className={styles.section}>
        <SectionHeader
          label="Projekti"
          title="Izdvojeni projekti"
          link={{ href: "/sr/projekti", text: "Svi projekti" }}
        />

        <div className={styles.projectGrid}>
          {featuredProjects.map((project) => (
            <Link
              key={project.title}
              href={project.slug ? `/sr/projekti/${project.slug}` : "/sr/projekti"}
              className={styles.projectCard}
            >
              <p className={styles.cardType}>{project.type}</p>
              <h3>{project.title}</h3>
              <p className={styles.cardDescription}>{project.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <SectionHeader
          label={tech.eyebrow}
          title={tech.title}
        />
        <p className={styles.sectionDescription}>{tech.description}</p>

        <div className={styles.techGrid}>
          {tech.groups.map((group) => (
            <article key={group.title} className={styles.techCard}>
              <h3>{group.title}</h3>

              <div className={styles.techItems}>
                {group.items.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <SectionHeader
          label="Usluge"
          title="Usluge koje mogu da ponudim klijentima"
          link={{ href: "/sr/usluge", text: "Detaljnije" }}
        />

        <div className={styles.servicesGrid}>
          {serviceLabels.map((service) => (
            <div key={service} className={styles.serviceItem}>
              {service}
            </div>
          ))}
        </div>
      </section>

      <CTASection
        eyebrow="Kontakt"
        title="Imaš WordPress projekat koji treba srediti ili razviti?"
        action={{ href: "/sr/kontakt", text: "Kontaktiraj me" }}
      >
        Pošalji mi poruku sa kratkim opisom projekta, trenutnim problemom ili
        ciljem koji želiš da postigneš.
      </CTASection>
    </main>
  );
}
