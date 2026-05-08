import Link from "next/link";
import styles from "./CTASection.module.css";

export default function CTASection({ eyebrow, title, children, action }) {
  return (
    <section className={styles.cta}>
      {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
      <h2 className={styles.title}>{title}</h2>
      {children && <p className={styles.description}>{children}</p>}

      {action && (
        <Link href={action.href} className={styles.button}>
          {action.text}
        </Link>
      )}
    </section>
  );
}
