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
  title: "Đorđe Popović | WordPress Developer & SEO-focused Website Builder",
  description:
    "WordPress developer focused on clean, fast and conversion-oriented websites, with SEO foundations, performance optimization and AI-assisted workflows.",
  openGraph: {
    title: "Đorđe Popović | WordPress Developer",
    description:
      "Clean WordPress websites, Elementor layouts, WooCommerce foundations, SEO structure and AI-assisted web workflows.",
  },
  alternates: {
    languages: { en: "/en", sr: "/sr" },
  },
};

const pos = positioning.en;
const tech = techStackContent.en;

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
              <Link href="/en/projects" className={styles.primaryButton}>
                View projects
              </Link>

              <Link href="/en/contact" className={styles.secondaryButton}>
                Contact me
              </Link>
            </div>
          </div>

          <div className={styles.heroVisual}>
            <HeroCube />
          </div>
        </div>
      </section>

      <section className={styles.introSection}>
        <p className={styles.sectionLabel}>About</p>
        <h2>I build practical web solutions for small businesses and freelance work.</h2>
        <p>{pos.extendedDescription}</p>
      </section>

      <section className={styles.section}>
        <SectionHeader
          label="Projects"
          title="Featured projects"
          link={{ href: "/en/projects", text: "All projects" }}
        />

        <div className={styles.projectGrid}>
          {featuredProjects.map((project) => (
            <Link
              key={project.title}
              href={project.slug ? `/en/projects/${project.slug}` : "/en/projects"}
              className={styles.projectCard}
            >
              <p className={styles.cardType}>{project.type}</p>
              <h3>{project.title}</h3>
              <p className={styles.cardDescription}>
                {project.descriptionEn || project.description}
              </p>
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
          label="Services"
          title="Services I can offer clients"
          link={{ href: "/en/services", text: "Learn more" }}
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
        eyebrow="Contact"
        title="Do you have a WordPress project that needs attention?"
        action={{ href: "/en/contact", text: "Contact me" }}
      >
        Send me a message with a brief project description, your current
        problem, or the goal you want to achieve.
      </CTASection>
    </main>
  );
}
