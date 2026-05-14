"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
  const nav = lang ? NAV[lang] : null;
  const homeHref = nav ? nav.home : "/";
  const links = nav ? nav.links : DEFAULT_LINKS;
  const switchHref = SWITCH_MAP[pathname] ?? null;
  const switchLabel = nav?.switchLabel ?? null;

  return (
    <header className={styles.header}>
      <Link href={homeHref} className={styles.logo}>
        Djordje ClientHub
      </Link>

      <nav className={styles.nav}>
        {links.map((link) => (
          <Link key={link.href} href={link.href}>
            {link.label}
          </Link>
        ))}
        {switchHref && switchLabel && (
          <Link href={switchHref} className={styles.langSwitch}>
            {switchLabel}
          </Link>
        )}
        <Link href="/login">Login</Link>
      </nav>
    </header>
  );
}
