import styles from "./PageHero.module.css";

export default function PageHero({
  eyebrow,
  title,
  children,
  actions,
  variant = "public",
}) {
  if (variant === "dashboard") {
    return (
      <section className={styles.heroDashboard}>
        {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
        <h1 className={styles.title}>{title}</h1>
        {children && <p className={styles.description}>{children}</p>}
      </section>
    );
  }

  return (
    <section className={styles.hero}>
      {/* Background visual layer */}
      <div className={styles.heroBg} aria-hidden="true">
        <div className={styles.heroOrbPrimary} />
        <div className={styles.heroOrbSecondary} />
      </div>

      {/* Content */}
      <div className={styles.heroContent}>
        {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
        <h1 className={styles.title}>{title}</h1>
        {children && <p className={styles.description}>{children}</p>}
        {actions && <div className={styles.actions}>{actions}</div>}
      </div>
    </section>
  );
}
