import Link from "next/link";
import Image from "next/image";
import SectionHeader from "@/components/SectionHeader";
import CTASection from "@/components/CTASection";
import HeroCube from "@/components/HeroCube";
import { featuredProjects } from "@/data/projects";
import { serviceLabels } from "@/data/services";
import { techStackContent } from "@/data/techStack";
import { positioning } from "@/data/positioning";
import styles from "../(public)/page.module.css";
import HeroGlow from "@/components/HeroGlow";

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
      <section className={styles.hero} data-glow-container>
         <HeroGlow /> 
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
        <div className={styles.heroBottomFade} aria-hidden="true" /> 
      </section>

      {/* ── About / Intro ── */}
      <section className={styles.introSection}>
        <div className={styles.introInner}>
        <div className={styles.introText}>
          <p className={styles.sectionLabel}>About</p>
          <h2>I build practical web solutions for small businesses and freelance work.</h2>
          <p>{pos.extendedDescription}</p>
        </div>

        <div className={styles.introVisual}>
          <div className={styles.introCard}>
            <p className={styles.introCardLabel}>What I bring</p>
            <ul className={styles.introCardList}>
              {[
                "WordPress development & Elementor",
                "SEO structure & on-page basics",
                "WooCommerce product setup",
                "Speed & performance optimization",
                "AI-assisted workflow consulting",
              ].map((item) => (
                <li key={item} className={styles.introCardItem}>
                  <span className={styles.introCardIcon}>
                    <svg viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <span className={styles.introCardStatus}>
              <span className={styles.introCardStatusDot} />
              Available for new projects
            </span>
          </div>
        </div>
        </div>
      </section>

      {/* ── Work showcase strip — alt bg ── */}
      <section className={`${styles.workSection} ${styles.sectionAlt}`}>
        <div className={styles.workSectionHeader}>
          <p className={styles.sectionLabel}>Recent Work</p>
          <h2>Projects that speak for themselves</h2>
        </div>
        <div className={styles.workCards}>
          {featuredProjects.map((project) => {
            const inner = (
              <>
                <div className={styles.workCardImg}>
                  {project.coverImage ? (
                    <Image
                      src={project.coverImage}
                      alt={project.title}
                      fill
                      sizes="252px"
                      style={{ objectFit: "cover" }}
                    />
                  ) : (
                    <div className={styles.workCardPlaceholder}>
                      <span>{project.title}</span>
                    </div>
                  )}
                </div>
                <div className={styles.workCardInfo}>
                  <p className={styles.workCardTitle}>{project.title}</p>
                  <p className={styles.workCardType}>{project.type}</p>
                </div>
              </>
            );

            return project.slug ? (
              <Link
                key={project.title}
                href={`/en/projects/${project.slug}`}
                className={styles.workCard}
              >
                {inner}
              </Link>
            ) : (
              <div key={project.title} className={styles.workCard}>
                {inner}
              </div>
            );
          })}
        </div>
      </section>

      {/* Projects — base bg */}
      <section className={styles.section}>
        <div className={styles.sectionInner}>
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
        </div>
      </section>

      {/* Tech Stack — alt bg */}
      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className={styles.sectionInner}>
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
        </div>
      </section>

      {/* Services — base bg */}
      <section className={styles.section}>
        <div className={styles.sectionInner}>
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
