import Link from "next/link";
import HeroGlow from "./HeroGlow";
import styles from "./PublicFooter.module.css";

const CONTENT = {
  en: {
    description:
      "WordPress, SEO and AI workflow support for modern small business websites.",
    badge: "WordPress • SEO • AI Workflow",
    navTitle: "Navigation",
    links: [
      { href: "/en", label: "Home" },
      { href: "/en/projects", label: "Projects" },
      { href: "/en/services", label: "Services" },
      { href: "/en/process", label: "Process" },
      { href: "/en/contact", label: "Contact" },
    ],
    servicesTitle: "Services",
    services: [
      "WordPress websites",
      "Elementor development",
      "SEO structure",
      "Speed optimization",
      "AI workflow consulting",
    ],
    ctaTitle: "Have a project in mind?",
    ctaText:
      "Let's turn your website into a cleaner, faster and more useful business asset.",
    ctaLabel: "Start a project",
    contactHref: "/en/contact",
    copyright: "© 2026 Đorđe Popović. All rights reserved.",
    builtWith: "Built with Next.js.",
  },
  sr: {
    description:
      "WordPress, SEO i AI workflow podrška za moderne sajtove malih biznisa.",
    badge: "WordPress • SEO • AI Workflow",
    navTitle: "Navigacija",
    links: [
      { href: "/sr", label: "Početna" },
      { href: "/sr/projekti", label: "Projekti" },
      { href: "/sr/usluge", label: "Usluge" },
      { href: "/sr/proces", label: "Proces" },
      { href: "/sr/kontakt", label: "Kontakt" },
    ],
    servicesTitle: "Usluge",
    services: [
      "WordPress sajtovi",
      "Elementor razvoj",
      "SEO struktura",
      "Optimizacija brzine",
      "AI workflow konsalting",
    ],
    ctaTitle: "Imaš projekat u planu?",
    ctaText:
      "Hajde da pretvorimo tvoj sajt u čistiji, brži i korisniji poslovni alat.",
    ctaLabel: "Pokreni projekat",
    contactHref: "/sr/kontakt",
    copyright: "© 2026 Đorđe Popović. Sva prava zadržana.",
    builtWith: "Napravljeno uz Next.js.",
  },
};

export default function PublicFooter({ lang }) {
  const c = CONTENT[lang] ?? CONTENT.en;

  return (
    <footer className={styles.footer} data-glow-container>
      {/* Decorative blueprint grid */}
      <div className={styles.footerBg} aria-hidden="true" />

      {/* Cursor grid spotlight */}
      <HeroGlow />

      {/* Main content */}
      <div className={styles.footerInner}>
        <div className={styles.footerGrid}>

          {/* Brand */}
          <div className={styles.brand}>
            <span className={styles.brandName}>Đorđe Popović</span>
            <p className={styles.brandDesc}>{c.description}</p>
            <span className={styles.brandBadge}>{c.badge}</span>
          </div>

          {/* Navigation */}
          <div className={styles.col}>
            <h3 className={styles.colTitle}>{c.navTitle}</h3>
            <ul className={styles.colList}>
              {c.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={styles.colLink}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className={styles.col}>
            <h3 className={styles.colTitle}>{c.servicesTitle}</h3>
            <ul className={styles.colList}>
              {c.services.map((service) => (
                <li key={service} className={styles.colItem}>
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div className={styles.ctaCol}>
            <h3 className={styles.ctaTitle}>{c.ctaTitle}</h3>
            <p className={styles.ctaText}>{c.ctaText}</p>
            <Link href={c.contactHref} className={styles.ctaButton}>
              {c.ctaLabel}
            </Link>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className={styles.footerBottom}>
        <div className={styles.footerBottomInner}>
          <span className={styles.copyright}>{c.copyright}</span>
          <span className={styles.builtWith}>{c.builtWith}</span>
        </div>
      </div>
    </footer>
  );
}
