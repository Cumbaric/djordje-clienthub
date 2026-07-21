"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import styles from "./PublicHeader.module.css";

const SERVICE_SUBITEMS = {
  en: [
    { href: "/en/services/html-css-js", label: "HTML / CSS / JS" },
    { href: "/en/services/react-nextjs", label: "React / Next.js" },
    { href: "/en/services/seo-optimization", label: "SEO Optimization" },
    { href: "/en/services/wordpress-website-development", label: "WordPress" },
    { href: "/en/services/ecommerce-store", label: "E-commerce" },
    { href: "/en/services/website-maintenance", label: "Maintenance" },
  ],
  sr: [
    { href: "/sr/usluge/html-css-js", label: "HTML / CSS / JS" },
    { href: "/sr/usluge/react-nextjs", label: "React / Next.js" },
    { href: "/sr/usluge/seo-optimization", label: "SEO optimizacija" },
    { href: "/sr/usluge/wordpress-website-development", label: "WordPress" },
    { href: "/sr/usluge/ecommerce-store", label: "E-commerce" },
    { href: "/sr/usluge/website-maintenance", label: "Održavanje" },
  ],
};

const NAV = {
  en: {
    home: "/en",
    links: [
      { href: "/en", label: "Home" },
      { href: "/en/projects", label: "Projects" },
      { href: "/en/services", label: "Services", subitems: SERVICE_SUBITEMS.en },
      { href: "/en/process", label: "Process" },
      { href: "/en/blog", label: "Blog" },
      { href: "/en/contact", label: "Contact" },
    ],
    switchLabel: "SR",
  },
  sr: {
    home: "/sr",
    links: [
      { href: "/sr", label: "Početna" },
      { href: "/sr/projekti", label: "Projekti" },
      { href: "/sr/usluge", label: "Usluge", subitems: SERVICE_SUBITEMS.sr },
      { href: "/sr/proces", label: "Proces" },
      { href: "/sr/blog", label: "Blog" },
      { href: "/sr/kontakt", label: "Kontakt" },
    ],
    switchLabel: "EN",
  },
};

// Section-segment translations (first path part after the language prefix).
// Deeper segments (project/service slugs) are shared across languages.
const SEGMENT_MAP = {
  en: { projects: "projekti", services: "usluge", process: "proces", contact: "kontakt", blog: "blog" },
  sr: { projekti: "projects", usluge: "services", proces: "process", kontakt: "contact", blog: "blog" },
};

// Build the equivalent path in the other language for ANY public route,
// including project case studies and service detail pages.
function getSwitchHref(pathname) {
  const parts = pathname.split("/").filter(Boolean); // ["en", "projects", "boommil"]
  const lang = parts[0];
  if (lang !== "en" && lang !== "sr") return null;

  const targetLang = lang === "en" ? "sr" : "en";
  const segMap = SEGMENT_MAP[lang];
  const rest = parts
    .slice(1)
    .map((seg, i) => (i === 0 ? segMap[seg] ?? seg : seg));

  return "/" + [targetLang, ...rest].join("/");
}

const DEFAULT_LINKS = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/services", label: "Services" },
  { href: "/process", label: "Process" },
  { href: "/contact", label: "Contact" },
];

export default function PublicHeader({ lang }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Sticky scroll effect
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    const close = () => setMenuOpen(false);
    close();
  }, [pathname]);

  // Lock body scroll while menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const nav = lang ? NAV[lang] : null;
  const homeHref = nav ? nav.home : "/";
  const links = nav ? nav.links : DEFAULT_LINKS;
  const switchHref = getSwitchHref(pathname);
  const switchLabel = nav?.switchLabel ?? null;

  return (
    <>
      <header
        className={[styles.header, scrolled && styles.scrolled]
          .filter(Boolean)
          .join(" ")}
      >
        <Link href={homeHref} className={styles.logo}>
          Đorđe Popović
        </Link>

        {/* Desktop nav */}
        <nav className={styles.nav}>
          {links.map((link) =>
            link.subitems ? (
              <div key={link.href} className={styles.navDropdown}>
                <Link href={link.href} className={styles.navLink}>
                  {link.label}
                  <span className={styles.dropdownCaret} aria-hidden="true">▾</span>
                </Link>
                <div className={styles.dropdownMenu}>
                  {link.subitems.map((sub) => (
                    <Link key={sub.href} href={sub.href} className={styles.dropdownItem}>
                      {sub.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link key={link.href} href={link.href} className={styles.navLink}>
                {link.label}
              </Link>
            )
          )}
          {switchHref && switchLabel && (
            <Link href={switchHref} className={styles.langSwitch}>
              {switchLabel}
            </Link>
          )}
        </nav>

        {/* Hamburger button — mobile only */}
        <button
          className={`${styles.hamburger} ${menuOpen ? styles.hamburgerOpen : ""}`}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Zatvori meni" : "Otvori meni"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          <span />
          <span />
          <span />
        </button>
      </header>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div
          id="mobile-menu"
          className={styles.mobileMenu}
          role="dialog"
          aria-label="Navigacija"
        >
          <nav className={styles.mobileNav}>
            {links.map((link) => (
              <div key={link.href} className={styles.mobileNavGroup}>
                <Link
                  href={link.href}
                  className={styles.mobileNavLink}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
                {link.subitems && (
                  <div className={styles.mobileSubitems}>
                    {link.subitems.map((sub) => (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        className={styles.mobileSubLink}
                        onClick={() => setMenuOpen(false)}
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {switchHref && switchLabel && (
              <Link
                href={switchHref}
                className={styles.mobileLangSwitch}
                onClick={() => setMenuOpen(false)}
              >
                {switchLabel}
              </Link>
            )}
          </nav>
        </div>
      )}
    </>
  );
}
