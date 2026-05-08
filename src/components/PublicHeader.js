import Link from "next/link";
import styles from "./PublicHeader.module.css";

export default function PublicHeader() {
  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logo}>
        Djordje ClientHub
      </Link>

      <nav className={styles.nav}>
        <Link href="/projects">Projects</Link>
        <Link href="/services">Services</Link>
        <Link href="/process">Process</Link>
        <Link href="/contact">Contact</Link>
        <Link href="/login">Login</Link>
      </nav>
    </header>
  );
}
