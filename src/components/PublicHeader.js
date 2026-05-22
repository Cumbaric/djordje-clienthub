"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import styles from "./PublicHeader.module.css";

const NAV = {
  en: {
    home: "/en",
    links: [
      { href: "/en/projects", label: "Projects" },
      { href: "/en/services", label: "Services" },
      { href: "/en/process", label: "Process" },
      { href: "/en/contact", label: "Contact" },
    ],
    switchLabel: "SR",
  },
  sr: {
    home: "/sr",
    links: [
      { href: "/sr/projekti", label: "Projekti" },
      { href: "/sr/usluge", label: "Usluge" },
      { href: "/sr/proces", label: "Proces" },
      { href: "/sr/kontakt", label: "Kontakt" },
    ],
    switchLabel: "EN",
  },
};

const SWITCH_MAP = {
  "/en": "/sr",
  "/en/projects": "/sr/projekti",
  "/en/projects/wellness-concept": "/sr/projekti/wellness-concept",
  "/en/services": "/sr/usluge",
  "/en/process": "/sr/proces",
  "/en/contact": "/sr/kontakt",
  "/sr": "/en",
  "/sr/projekti": "/en/projects",
  "/sr/projekti/wellness-concept": "/en/projects/wellness-concept",
  "/sr/usluge": "/en/services",
  "/sr/proces": "/en/process",
  "/sr/kontakt": "/en/contact",
};

const DEFAULT_LINKS = [
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
  const switchHref = SWITCH_MAP[pathname] ?? null;
  const switchLabel = nav?.switchLabel ?? null;

  return (
    <>
      <header
        className={[styles.header, scrolled && styles.scrolled]
          .filter(Boolean)
          .join(" ")}
      >
        <Link href={homeHref} className={styles.logo}>
          Djordje ClientHub
        </Link>

        {/* Desktop nav */}
        <nav className={styles.nav}>
          {links.map((link) => (
            <Link key={link.href} href={link.href} className={styles.navLink}>
              {link.label}
            </Link>
          ))}
          {switchHref && switchLabel && (
            <Link href={switchHref} className={styles.langSwitch}>
              {switchLabel}
            </Link>
          )}
          <Link href="/login" className={styles.navLogin}>
            Login
          </Link>
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
              <Link
                key={link.href}
                href={link.href}
                className={styles.mobileNavLink}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/login"
              className={styles.mobileNavLink}
              onClick={() => setMenuOpen(false)}
            >
              Login
            </Link>
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
