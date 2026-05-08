import styles from "./PageHero.module.css";

export default function PageHero({ eyebrow, title, children, variant = "public" }) {
  const className = variant === "dashboard" ? styles.heroDashboard : styles.hero;

  return (
    <section className={className}>
      {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
      <h1 className={styles.title}>{title}</h1>
      {children && <p className={styles.description}>{children}</p>}
    </section>
  );
}
