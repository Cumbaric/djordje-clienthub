import Link from "next/link";
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
  },
  sr: {
    home: "/sr",
    links: [
      { href: "/sr/projekti", label: "Projekti" },
      { href: "/sr/usluge", label: "Usluge" },
      { href: "/sr/proces", label: "Proces" },
      { href: "/sr/kontakt", label: "Kontakt" },
    ],
  },
};

const DEFAULT_LINKS = [
  { href: "/projects", label: "Projects" },
  { href: "/services", label: "Services" },
  { href: "/process", label: "Process" },
  { href: "/contact", label: "Contact" },
];

export default function PublicHeader({ lang }) {
  const nav = lang ? NAV[lang] : null;
  const homeHref = nav ? nav.home : "/";
  const links = nav ? nav.links : DEFAULT_LINKS;

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
        <Link href="/login">Login</Link>
      </nav>
    </header>
  );
}
