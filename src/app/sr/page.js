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
      <section className={styles.hero} data-glow-container>
        <HeroGlow />
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

      {/* ── O meni / Intro ── */}
      <section className={styles.introSection}>
        <div className={styles.introInner}>

          {/* Levo — tekst */}
          <div className={styles.introText}>
            <p className={styles.sectionLabel}>O meni</p>
            <h2 className={styles.aboutHeading}>
              O Djordje{" "}
              <span className={styles.aboutHeadingAccent}>ClientHub</span>
            </h2>
            <p className={styles.aboutDesc}>
              WordPress developer fokusiran na izgradnju brzih, SEO-friendly
              sajtova koji pomažu biznisima da rastu.
            </p>
            <blockquote className={styles.aboutQuote}>
              {pos.extendedDescription}
            </blockquote>

            <div className={styles.featurePills}>
              <div className={styles.featurePill}>
                <div className={styles.featurePillIcon}>
                  <svg viewBox="0 0 16 16" fill="none"><path d="M8 2L9.5 6.5H14L10.5 9L12 13.5L8 11L4 13.5L5.5 9L2 6.5H6.5L8 2Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/></svg>
                </div>
                <p className={styles.featurePillTitle}>Performanse</p>
                <p className={styles.featurePillDesc}>Optimizovano za brzinu i Core Web Vitals.</p>
              </div>
              <div className={styles.featurePill}>
                <div className={styles.featurePillIcon}>
                  <svg viewBox="0 0 16 16" fill="none"><circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.4"/><path d="M10.5 10.5L13.5 13.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>
                </div>
                <p className={styles.featurePillTitle}>SEO fokus</p>
                <p className={styles.featurePillDesc}>Tehnički SEO, čista struktura, bolji ranking.</p>
              </div>
              <div className={styles.featurePill}>
                <div className={styles.featurePillIcon}>
                  <svg viewBox="0 0 16 16" fill="none"><path d="M3 8h2l2-5 2 10 2-5 1 3 1-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <p className={styles.featurePillTitle}>AI pristup</p>
                <p className={styles.featurePillDesc}>AI workflow za brži razvoj i bolji rezultat.</p>
              </div>
            </div>

            <span className={styles.introCardStatus}>
              <span className={styles.introCardStatusDot} />
              Dostupan za nove projekte
            </span>
          </div>

          {/* Desno — kartice */}
          <div className={styles.introVisual}>

            {/* Kartica 01 — Workspace */}
            <div className={styles.aboutCard}>
              <div className={styles.aboutCardHeader}>
                <span className={styles.aboutCardNum}>01</span>
                <span className={styles.aboutCardTitle}>My Workspace</span>
              </div>
              <div className={styles.aboutCardImg}>
                <Image
                  src="/Projects/about_workspace.png"
                  alt="Developer workspace"
                  fill
                  sizes="(max-width: 900px) 100vw, 540px"
                  style={{ objectFit: "cover" }}
                  priority
                />
              </div>
            </div>

            <div className={styles.aboutCardRow}>
              {/* Kartica 02 — Workflow */}
              <div className={styles.aboutCard}>
                <div className={styles.aboutCardHeader}>
                  <span className={styles.aboutCardNum}>02</span>
                  <span className={styles.aboutCardTitle}>Workflow</span>
                </div>
                <div className={styles.workflowSteps}>
                  {[
                    { label: "Analiza", icon: <path d="M8 3a5 5 0 1 0 0 10A5 5 0 0 0 8 3zm0 2a3 3 0 1 1 0 6A3 3 0 0 1 8 5z" fill="currentColor"/> },
                    { label: "Struktura", icon: <><rect x="3" y="3" width="4" height="4" rx="1" stroke="currentColor" strokeWidth="1.4"/><rect x="9" y="3" width="4" height="4" rx="1" stroke="currentColor" strokeWidth="1.4"/><rect x="3" y="9" width="4" height="4" rx="1" stroke="currentColor" strokeWidth="1.4"/><rect x="9" y="9" width="4" height="4" rx="1" stroke="currentColor" strokeWidth="1.4"/></> },
                    { label: "Razvoj", icon: <path d="M4 12l3-3 2 2 4-5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/> },
                    { label: "SEO", icon: <><circle cx="7" cy="7" r="3.5" stroke="currentColor" strokeWidth="1.4"/><path d="M9.5 9.5L12 12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></> },
                    { label: "Launch", icon: <path d="M8 13V8m0-5c0 0 3 2.5 3 5H5c0-2.5 3-5 3-5zM6 13h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/> },
                  ].map((step, i, arr) => (
                    <div key={step.label} style={{ display: "contents" }}>
                      <div className={styles.workflowStep}>
                        <div className={styles.workflowStepIcon}>
                          <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            {step.icon}
                          </svg>
                        </div>
                        <span className={styles.workflowStepLabel}>{step.label}</span>
                      </div>
                      {i < arr.length - 1 && (
                        <span className={styles.workflowArrow}>›</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Kartica 03 — Skills */}
              <div className={styles.aboutCard}>
                <div className={styles.aboutCardHeader}>
                  <span className={styles.aboutCardNum}>03</span>
                  <span className={styles.aboutCardTitle}>Stack</span>
                </div>
                <div className={styles.skillsGrid}>
                  {["WordPress", "Elementor", "WooCommerce", "SEO", "Performance", "AI Workflow", "Next.js"].map((skill) => (
                    <div key={skill} className={styles.skillBadge}>
                      <span className={styles.skillDot} />
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Work showcase strip — alt bg ── */}
      <section className={`${styles.workSection} ${styles.sectionAlt}`}>
        <div className={styles.workSectionHeader}>
          <p className={styles.sectionLabel}>Radovi</p>
          <h2>Projekti koji govore sami za sebe</h2>
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
                href={`/sr/projekti/${project.slug}`}
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

      {/* Projekti — base bg */}
      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <SectionHeader
            label="Projekti"
            title="Izdvojeni projekti"
            link={{ href: "/sr/projekti", text: "Svi projekti" }}
          />

          <div className={styles.projectGrid}>
            {featuredProjects.map((project) => (
              <Link
                key={project.title}
                href={
                  project.slug ? `/sr/projekti/${project.slug}` : "/sr/projekti"
                }
                className={styles.projectCard}
              >
                <p className={styles.cardType}>{project.type}</p>
                <h3>{project.title}</h3>
                <p className={styles.cardDescription}>{project.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack — alt bg */}
      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className={styles.sectionInner}>
          <SectionHeader label={tech.eyebrow} title={tech.title} />
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

      {/* Usluge — base bg */}
      <section className={styles.section}>
        <div className={styles.sectionInner}>
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
