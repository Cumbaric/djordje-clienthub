import styles from "./HeroCube.module.css";

const faces = [
  {
    id: "wordpress",
    cssClass: "faceFront",
    label: "WordPress",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20" />
        <path d="M12 2c2.5 3.5 4 6.7 4 10s-1.5 6.5-4 10" />
        <path d="M12 2c-2.5 3.5-4 6.7-4 10s1.5 6.5 4 10" />
      </svg>
    ),
  },
  {
    id: "seo",
    cssClass: "faceBack",
    label: "SEO",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="11" cy="11" r="7" />
        <path d="m21 21-4.35-4.35" />
        <path d="M11 8v6M8 11h6" />
      </svg>
    ),
  },
  {
    id: "speed",
    cssClass: "faceRight",
    label: "Speed",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
  },
  {
    id: "mobile",
    cssClass: "faceLeft",
    label: "Mobile",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="5" y="2" width="14" height="20" rx="2" />
        <circle cx="12" cy="17" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    id: "woocommerce",
    cssClass: "faceTop",
    label: "WooCommerce",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
        <path d="M3 6h18" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
    ),
  },
  {
    id: "ai",
    cssClass: "faceBottom",
    label: "AI Workflow",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
      </svg>
    ),
  },
];

export default function HeroCube() {
  return (
    <div className={styles.scene} aria-hidden="true">
      {/* Ambient glow */}
      <div className={styles.glow} />

      {/* Floating particles */}
      {["p1","p2","p3","p4","p5","p6","p7","p8","p9","p10","p11","p12"].map((p) => (
        <div key={p} className={`${styles.particle} ${styles[p]}`} />
      ))}

      {/* 3D Cube */}
      <div className={styles.cubeScene}>
        <div className={styles.cube}>
          {faces.map((face) => (
            <div
              key={face.id}
              className={`${styles.face} ${styles[face.cssClass]}`}
            >
              <div className={styles.faceIcon}>{face.icon}</div>
              <span className={styles.faceLabel}>{face.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
