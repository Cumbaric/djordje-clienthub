import Link from "next/link";
import Image from "next/image";
import SectionHeader from "@/components/SectionHeader";
import CTASection from "@/components/CTASection";
import HeroCube from "@/components/HeroCube";
import { featuredProjects } from "@/data/projects";
import { services } from "@/data/services";
import { techStackContent } from "@/data/techStack";
import { positioning } from "@/data/positioning";
import styles from "../(public)/page.module.css";
import HeroGlow from "@/components/HeroGlow";
import SectionOrb from "@/components/SectionOrb";

export const metadata = {
  title: "Đorđe Popović | Web Developer — Clean, Structured & SEO-Ready Websites",
  description:
    "Web developer building clean, well-structured and SEO-ready websites with a focus on performance, practical user experience and maintainable workflows.",
  openGraph: {
    title: "Đorđe Popović | Web Developer",
    description:
      "Clean, structured websites with SEO foundations, performance and AI-assisted workflows for small businesses and service providers.",
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

          {/* Left — text + features + workflow */}
          <div className={styles.introText}>
            <SectionOrb
              delay="0.3s"
              style={{
                "--orb-top": "8px",
                "--orb-left": "340px",
                "--orb-right": "auto",
                "--orb-bottom": "auto",
                "--orb-travel": "-340px",
              }}
            />
            <p className={styles.sectionLabel}>About Me</p>
            <h2 className={styles.aboutHeading}>
              About Djordje{" "}
              <span className={styles.aboutHeadingAccent}>ClientHub</span>
            </h2>
            <p className={styles.aboutDesc}>
              Web developer focused on clean structure, SEO foundations and
              practical user experience — helping small businesses build a
              better online presence.
            </p>
            <blockquote className={styles.aboutQuote}>
              {pos.extendedDescription}
            </blockquote>

            {/* 3 feature items — side by side */}
            <div className={styles.featurePills}>
              <div className={styles.featurePill}>
                <div className={styles.featurePillIcon}>
                  <svg viewBox="0 0 16 16" fill="none"><path d="M8 2L9.5 6.5H14L10.5 9L12 13.5L8 11L4 13.5L5.5 9L2 6.5H6.5L8 2Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/></svg>
                </div>
                <div className={styles.featurePillText}>
                  <p className={styles.featurePillTitle}>Performance First</p>
                  <p className={styles.featurePillDesc}>Fast pages, optimized assets and solid Core Web Vitals.</p>
                </div>
              </div>
              <div className={styles.featurePill}>
                <div className={styles.featurePillIcon}>
                  <svg viewBox="0 0 16 16" fill="none"><circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.4"/><path d="M10.5 10.5L13.5 13.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>
                </div>
                <div className={styles.featurePillText}>
                  <p className={styles.featurePillTitle}>SEO Focused</p>
                  <p className={styles.featurePillDesc}>Technical SEO, clean structure, better rankings.</p>
                </div>
              </div>
              <div className={styles.featurePill}>
                <div className={styles.featurePillIcon}>
                  <svg viewBox="0 0 16 16" fill="none"><path d="M3 8h2l2-5 2 10 2-5 1 3 1-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <div className={styles.featurePillText}>
                  <p className={styles.featurePillTitle}>AI Enhanced</p>
                  <p className={styles.featurePillDesc}>AI-assisted planning, QA and workflow for better results.</p>
                </div>
              </div>
            </div>

            {/* Card 02 — Workflow (in left column, below features) */}
            <div className={styles.aboutCard}>
              <div className={styles.aboutCardHeader}>
                <span className={styles.aboutCardNum}>02</span>
                <span className={styles.aboutCardTitle}>My Workflow</span>
              </div>
              <div className={styles.workflowSteps}>
                {[
                  { label: "Discovery", desc: "Understand goals & audience",      icon: <path d="M8 3a5 5 0 1 0 0 10A5 5 0 0 0 8 3zm0 2a3 3 0 1 1 0 6A3 3 0 0 1 8 5z" fill="currentColor"/> },
                  { label: "Structure", desc: "Plan information architecture",    icon: <><rect x="3" y="3" width="4" height="4" rx="1" stroke="currentColor" strokeWidth="1.4"/><rect x="9" y="3" width="4" height="4" rx="1" stroke="currentColor" strokeWidth="1.4"/><rect x="3" y="9" width="4" height="4" rx="1" stroke="currentColor" strokeWidth="1.4"/><rect x="9" y="9" width="4" height="4" rx="1" stroke="currentColor" strokeWidth="1.4"/></> },
                  { label: "Design",    desc: "Clean, responsive UI",             icon: <><path d="M4 12l2.5-2.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/><rect x="6" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.4"/></> },
                  { label: "Build",     desc: "Structured frontend build",        icon: <path d="M3 13l3.5-3.5 2 2L13 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/> },
                  { label: "SEO",       desc: "On-page & technical SEO",          icon: <><circle cx="7" cy="7" r="3.5" stroke="currentColor" strokeWidth="1.4"/><path d="M9.5 9.5L12 12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></> },
                  { label: "Launch",    desc: "Test, optimize & go live",         icon: <path d="M8 12V8m0-4c0 0 2.5 2 2.5 4h-5C5.5 6 8 4 8 4zM6 12h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/> },
                ].map((step, i, arr) => (
                  <div key={step.label} style={{ display: "contents" }}>
                    <div className={styles.workflowStep}>
                      <div className={styles.workflowStepIcon}>
                        <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          {step.icon}
                        </svg>
                      </div>
                      <span className={styles.workflowStepLabel}>{step.label}</span>
                      <span className={styles.workflowStepDesc}>{step.desc}</span>
                    </div>
                    {i < arr.length - 1 && (
                      <span className={styles.workflowArrow}>→</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <span className={styles.introCardStatus}>
              <span className={styles.introCardStatusDot} />
              Available for new projects
            </span>
          </div>

          {/* Right — workspace image + skills */}
          <div className={styles.introVisual}>

            {/* Card 01 — Workspace */}
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
                  sizes="(max-width: 900px) 100vw, 500px"
                  style={{ objectFit: "cover" }}
                  priority
                />
              </div>
            </div>

            {/* Card 03 — Skills */}
            <div className={styles.aboutCard}>
              <div className={styles.aboutCardHeader}>
                <span className={styles.aboutCardNum}>03</span>
                <span className={styles.aboutCardTitle}>Skills &amp; Stack</span>
              </div>
              <div className={styles.skillsGrid}>
                {/* Frontend group */}
                <div className={styles.skillsGroup}>
                  <p className={styles.skillsGroupLabel}>Frontend</p>
                  {[
                    { name: "HTML",    abbr: "HTML", bg: "rgba(227,79,38,0.12)",   border: "rgba(227,79,38,0.28)",   color: "#e34f26" },
                    { name: "CSS",     abbr: "CSS",  bg: "rgba(38,77,228,0.12)",   border: "rgba(38,77,228,0.28)",   color: "#264de4" },
                    { name: "JS",      abbr: "JS",   bg: "rgba(247,223,30,0.1)",   border: "rgba(247,223,30,0.25)",  color: "#f7df1e" },
                    { name: "React",   abbr: "R",    bg: "rgba(97,218,251,0.1)",   border: "rgba(97,218,251,0.25)",  color: "#61dafb" },
                    { name: "Next.js", abbr: "N",    bg: "rgba(255,255,255,0.05)", border: "rgba(255,255,255,0.12)", color: "#f1f5f9" },
                  ].map((skill) => (
                    <div
                      key={skill.name}
                      className={styles.skillBadge}
                      style={{
                        "--skill-bg": skill.bg,
                        "--skill-border": skill.border,
                        "--skill-icon-bg": skill.bg,
                        "--skill-color": skill.color,
                      }}
                    >
                      <span className={styles.skillIcon} style={{ color: skill.color }}>{skill.abbr}</span>
                      {skill.name}
                    </div>
                  ))}
                </div>
                {/* WordPress group */}
                <div className={styles.skillsGroup}>
                  <p className={styles.skillsGroupLabel}>WordPress</p>
                  {[
                    { name: "WordPress",      abbr: "WP",  bg: "rgba(0,115,170,0.15)",   border: "rgba(0,115,170,0.3)",    color: "#0096d6" },
                    { name: "WooCommerce",    abbr: "WC",  bg: "rgba(127,84,179,0.12)",  border: "rgba(127,84,179,0.28)",  color: "#7f54b3" },
                    { name: "Elementor",      abbr: "E",   bg: "rgba(226,80,76,0.12)",   border: "rgba(226,80,76,0.28)",   color: "#e2504c" },
                    { name: "Yoast SEO",      abbr: "YST", bg: "rgba(161,29,45,0.12)",   border: "rgba(161,29,45,0.28)",   color: "#c0392b" },
                    { name: "W3 Total Cache", abbr: "W3C", bg: "rgba(59,130,246,0.1)",   border: "rgba(59,130,246,0.25)",  color: "#60a5fa" },
                  ].map((skill) => (
                    <div
                      key={skill.name}
                      className={styles.skillBadge}
                      style={{
                        "--skill-bg": skill.bg,
                        "--skill-border": skill.border,
                        "--skill-icon-bg": skill.bg,
                        "--skill-color": skill.color,
                      }}
                    >
                      <span className={styles.skillIcon} style={{ color: skill.color }}>{skill.abbr}</span>
                      {skill.name}
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Services — alt bg */}
      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className={styles.sectionInner}>
          <SectionOrb
            delay="0s"
            style={{
              "--orb-top": "78px",
              "--orb-left": "340px",
              "--orb-right": "auto",
              "--orb-travel": "-340px",
              "--orb-duration": "1.8s",
            }}
          />
          <SectionHeader
            label="Services"
            title="Services I can offer clients"
            link={{ href: "/en/services", text: "Learn more" }}
          />

          <div className={styles.servicesGrid}>
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/en/services/${service.slug}`}
                className={styles.serviceItem}
              >
                {service.shortLabelEn}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack — base bg */}
      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <SectionOrb
            delay="0s"
            style={{
              "--orb-top": "78px",
              "--orb-left": "340px",
              "--orb-right": "auto",
              "--orb-travel": "-340px",
              "--orb-duration": "1.8s",
            }}
          />
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

      {/* ── Work showcase strip — alt bg ── */}
      <section className={`${styles.workSection} ${styles.sectionAlt}`}>
        <div className={styles.workSectionHeader}>
          <SectionOrb
            delay="0s"
            style={{
              "--orb-top": "6px",
              "--orb-left": "340px",
              "--orb-right": "auto",
              "--orb-travel": "-340px",
              "--orb-duration": "1.8s",
            }}
          />
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
