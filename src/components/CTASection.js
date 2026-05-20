import Link from "next/link";
import SectionOrb from "./SectionOrb";
import styles from "./CTASection.module.css";

export default function CTASection({ eyebrow, title, children, action }) {
  return (
    <section className={styles.cta}>
      <SectionOrb
        delay="0s"
        style={{
          "--orb-top": "62px",
          "--orb-left": "340px",
          "--orb-right": "auto",
          "--orb-bottom": "auto",
          "--orb-travel": "-340px",
          "--orb-duration": "1.8s",
        }}
      />

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
