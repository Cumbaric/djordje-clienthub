import Link from "next/link";
import styles from "./SectionHeader.module.css";

export default function SectionHeader({ label, title, link }) {
  return (
    <div className={styles.header}>
      <div>
        {label && <p className={styles.label}>{label}</p>}
        <h2 className={styles.title}>{title}</h2>
      </div>

      {link && (
        <Link href={link.href} className={styles.link}>
          {link.text}
        </Link>
      )}
    </div>
  );
}
