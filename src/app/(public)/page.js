import Link from "next/link";
import SectionHeader from "@/components/SectionHeader";
import CTASection from "@/components/CTASection";
import { featuredProjects } from "@/data/projects";
import { serviceLabels } from "@/data/services";
import { techStack } from "@/data/techStack";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.homePage}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <p className={styles.eyebrow}>Djordje ClientHub</p>

          <h1>WordPress portfolio i interni alat za rad sa klijentima</h1>

          <p className={styles.description}>
            Web aplikacija koja prikazuje moje WordPress projekte, usluge i
            proces rada, uz privatni dashboard za organizaciju klijenata,
            projekata, zadataka i radnih beleški.
          </p>

          <div className={styles.heroActions}>
            <Link href="/projects" className={styles.primaryButton}>
              Pogledaj projekte
            </Link>

            <Link href="/contact" className={styles.secondaryButton}>
              Kontakt
            </Link>
          </div>
        </div>

        <div className={styles.heroCard}>
          <p className={styles.cardLabel}>Focus</p>
          <h2>WordPress, SEO, AI tools</h2>
          <p>
            Portfolio projekat napravljen u Next.js-u kao dokaz tehničkog
            napretka, organizacije rada i razumevanja realnih potreba klijenata.
          </p>
        </div>
      </section>

      <section className={styles.introSection}>
        <p className={styles.sectionLabel}>About</p>
        <h2>Pravim praktična web rešenja za male biznise i freelance rad.</h2>
        <p>
          Fokus mi je na WordPress razvoju, Elementor sajtovima, WooCommerce
          prodavnicama, osnovnoj SEO optimizaciji i jasnoj strukturi sadržaja.
          Djordje ClientHub je moj portfolio projekat, ali i alat koji razvijam
          za stvarnu organizaciju rada sa klijentima.
        </p>
      </section>

      <section className={styles.section}>
        <SectionHeader
          label="Projects"
          title="Featured projects"
          link={{ href: "/projects", text: "Svi projekti" }}
        />

        <div className={styles.projectGrid}>
          {featuredProjects.map((project) => (
            <Link
              key={project.title}
              href={project.url}
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
          label="Tech Stack"
          title="Tehnologije koje koristim u radu"
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
          title="Usluge koje mogu da ponudim klijentima"
          link={{ href: "/services", text: "Detaljnije" }}
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
        title="Imaš WordPress projekat koji treba srediti ili razviti?"
        action={{ href: "/contact", text: "Kontaktiraj me" }}
      >
        Pošalji mi poruku sa kratkim opisom projekta, trenutnim problemom ili
        ciljem koji želiš da postigneš.
      </CTASection>
    </main>
  );
}
