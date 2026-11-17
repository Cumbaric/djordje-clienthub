import Image from "next/image";
import Link from "next/link";
import logoDark from "@/assets/brand/logo-dark-bg.png";
import HeroGlow from "./HeroGlow";
import { business } from "@/data/contact";
import styles from "./PublicFooter.module.css";

const CONTENT = {
  en: {
    description:
      "Web development agency based in Belgrade — WordPress, Next.js, WooCommerce and SEO for small businesses.",
    badge: "WordPress • Next.js • WooCommerce • SEO",
    navTitle: "Navigation",
    links: [
      { href: "/en", label: "Home" },
      { href: "/en/projects", label: "Projects" },
      { href: "/en/services", label: "Services" },
      { href: "/en/process", label: "Process" },
      { href: "/en/blog", label: "Blog" },
      { href: "/en/contact", label: "Contact" },
    ],
    servicesTitle: "Services",
    services: [
      { href: "/en/services/wordpress-website-development", label: "WordPress Development" },
      { href: "/en/services/html-css-js", label: "HTML / CSS / JS Development" },
      { href: "/en/services/react-nextjs", label: "React & Next.js Apps" },
      { href: "/en/services/ecommerce-store", label: "WooCommerce Store" },
      { href: "/en/services/seo-optimization", label: "SEO Optimization" },
      { href: "/en/services/website-maintenance", label: "Website Maintenance" },
    ],
    ctaTitle: "Have a project in mind?",
    ctaText:
      "Let's build a clean, fast and well-structured website that works for your business.",
    ctaLabel: "Start a project",
    contactHref: "/en/contact",
    copyright: "© 2026 DWeb Solutions. All rights reserved.",
    builtWith: "Built with Next.js.",
  },
  sr: {
    description:
      "Web development agencija iz Beograda — WordPress, Next.js, WooCommerce i SEO za male biznise.",
    badge: "WordPress • Next.js • WooCommerce • SEO",
    navTitle: "Navigacija",
    links: [
      { href: "/sr", label: "Početna" },
      { href: "/sr/projekti", label: "Projekti" },
      { href: "/sr/usluge", label: "Usluge" },
      { href: "/sr/proces", label: "Proces" },
      { href: "/sr/blog", label: "Blog" },
      { href: "/sr/kontakt", label: "Kontakt" },
    ],
    servicesTitle: "Usluge",
    services: [
      { href: "/sr/usluge/izrada-wordpress-sajta", label: "WordPress sajtovi" },
      { href: "/sr/usluge/html-css-js", label: "HTML / CSS / JS razvoj" },
      { href: "/sr/usluge/react-nextjs", label: "React i Next.js aplikacije" },
      { href: "/sr/usluge/izrada-online-prodavnice", label: "WooCommerce prodavnica" },
      { href: "/sr/usluge/seo-optimizacija", label: "SEO optimizacija" },
      { href: "/sr/usluge/odrzavanje-sajta", label: "Održavanje sajtova" },
    ],
    ctaTitle: "Imaš projekat u planu?",
    ctaText:
      "Napravimo zajedno čist, brz i dobro strukturisan sajt koji radi za tvoj biznis.",
    ctaLabel: "Pokreni projekat",
    contactHref: "/sr/kontakt",
    copyright: "© 2026 DWeb Solutions. Sva prava zadržana.",
    builtWith: "Napravljeno uz Next.js.",
  },
};

export default function PublicFooter({ lang }) {
  const c = CONTENT[lang] ?? CONTENT.en;
  const place = `${business.city[lang] ?? business.city.en}, ${business.country[lang] ?? business.country.en}`;
  const hours = business.hours[lang] || business.hours.en;

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
            <Image src={logoDark} alt="DWeb Solutions" className={styles.brandLogo} sizes="180px" />
            <p className={styles.brandDesc}>{c.description}</p>
            <p className={styles.brandDesc}>
              {place}
              {business.telephone && (
                <>
                  <br />
                  <a href={`tel:${business.telephone}`} className={styles.colLink}>
                    {business.telephoneDisplay || business.telephone}
                  </a>
                </>
              )}
              {hours && (
                <>
                  <br />
                  {hours}
                </>
              )}
            </p>
            <span className={styles.brandBadge}>{c.badge}</span>
          </div>

          {/* Navigation */}
          <div className={styles.col}>
            <p className={styles.colTitle}>{c.navTitle}</p>
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
            <p className={styles.colTitle}>{c.servicesTitle}</p>
            <ul className={styles.colList}>
              {c.services.map((service) => (
                <li key={service.href}>
                  <Link href={service.href} className={styles.colLink}>
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div className={styles.ctaCol}>
            <p className={styles.ctaTitle}>{c.ctaTitle}</p>
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
