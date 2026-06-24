"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import styles from "./PublicHeader.module.css";
import ThemeToggle from "./ThemeToggle";

const NAV = {
  en: {
    home: "/en",
    links: [
      { href: "/en", label: "Home" },
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
      { href: "/sr", label: "Početna" },
      { href: "/sr/projekti", label: "Projekti" },
      { href: "/sr/usluge", label: "Usluge" },
      { href: "/sr/proces", label: "Proces" },
      { href: "/sr/kontakt", label: "Kontakt" },
    ],
    switchLabel: "EN",
  },
};

// Section-segment translations (first path part after the language prefix).
// Deeper segments (project/service slugs) are shared across languages.
const SEGMENT_MAP = {
  en: { projects: "projekti", services: "usluge", process: "proces", contact: "kontakt" },
  sr: { projekti: "projects", usluge: "services", proces: "process", kontakt: "contact" },
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
          <ThemeToggle />
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
            {switchHref && switchLabel && (
              <Link
                href={switchHref}
                className={styles.mobileLangSwitch}
                onClick={() => setMenuOpen(false)}
              >
                {switchLabel}
              </Link>
            )}
            <ThemeToggle />
          </nav>
        </div>
      )}
    </>
  );
}
