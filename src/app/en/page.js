import Link from "next/link";
import SectionHeader from "@/components/SectionHeader";
import CTASection from "@/components/CTASection";
import { featuredProjects } from "@/data/projects";
import { serviceLabels } from "@/data/services";
import { techStack } from "@/data/techStack";
import styles from "../(public)/page.module.css";

export default function Home() {
  return (
    <main className={styles.homePage}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <p className={styles.eyebrow}>Djordje ClientHub</p>

          <h1>WordPress portfolio and internal client management tool</h1>

          <p className={styles.description}>
            A web application showcasing my WordPress projects, services, and
            workflow — with a private dashboard for organizing clients,
            projects, tasks, and work notes.
          </p>

          <div className={styles.heroActions}>
            <Link href="/en/projects" className={styles.primaryButton}>
              View projects
            </Link>

            <Link href="/en/contact" className={styles.secondaryButton}>
              Contact
            </Link>
          </div>
        </div>

        <div className={styles.heroCard}>
          <p className={styles.cardLabel}>Focus</p>
          <h2>WordPress, SEO, AI tools</h2>
          <p>
            Portfolio project built in Next.js as proof of technical progress,
            work organization, and understanding of real client needs.
          </p>
        </div>
      </section>

      <section className={styles.introSection}>
        <p className={styles.sectionLabel}>About</p>
        <h2>I build practical web solutions for small businesses and freelance work.</h2>
        <p>
          My focus is on WordPress development, Elementor websites, WooCommerce
          stores, basic SEO optimization, and clear content structure. Djordje
          ClientHub is my portfolio project, and also a tool I&#39;m developing
          for real client work organization.
        </p>
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
          label="Tech Stack"
          title="Technologies I use in my work"
        />

        <div className={styles.techGrid}>
          {techStack.map((stack) => (
            <article key={stack.group} className={styles.techCard}>
              <h3>{stack.group}</h3>

              <div className={styles.techItems}>
                {stack.items.map((item) => (
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
