"use client";
import { useRef, useState, useEffect } from "react";
import styles from "./StatsSection.module.css";

/* ── Per-language stat definitions ── */
const STATS = {
  sr: [
    {
      id: "done",
      countTo: 6,
      suffix: "",
      label: "završenih projekata",
      icon: "check",
      accent: "#4ade80",
      accentBg: "rgba(74,222,128,0.1)",
      accentBorder: "rgba(74,222,128,0.2)",
    },
    {
      id: "active",
      countTo: 2,
      suffix: "",
      label: "projekata u izradi",
      icon: "code",
      accent: "#3b82f6",
      accentBg: "rgba(59,130,246,0.1)",
      accentBorder: "rgba(59,130,246,0.2)",
      live: true,
    },
    {
      id: "exp",
      countTo: 2,
      suffix: "+",
      label: "godine iskustva",
      icon: "calendar",
      accent: "#a78bfa",
      accentBg: "rgba(167,139,250,0.1)",
      accentBorder: "rgba(167,139,250,0.2)",
    },
    {
      id: "resp",
      display: "<24h",
      label: "vreme odgovora",
      icon: "zap",
      accent: "#fbbf24",
      accentBg: "rgba(251,191,36,0.1)",
      accentBorder: "rgba(251,191,36,0.2)",
    },
  ],
  en: [
    {
      id: "done",
      countTo: 6,
      suffix: "",
      label: "completed projects",
      icon: "check",
      accent: "#4ade80",
      accentBg: "rgba(74,222,128,0.1)",
      accentBorder: "rgba(74,222,128,0.2)",
    },
    {
      id: "active",
      countTo: 2,
      suffix: "",
      label: "projects in progress",
      icon: "code",
      accent: "#3b82f6",
      accentBg: "rgba(59,130,246,0.1)",
      accentBorder: "rgba(59,130,246,0.2)",
      live: true,
    },
    {
      id: "exp",
      countTo: 2,
      suffix: "+",
      label: "years of experience",
      icon: "calendar",
      accent: "#a78bfa",
      accentBg: "rgba(167,139,250,0.1)",
      accentBorder: "rgba(167,139,250,0.2)",
    },
    {
      id: "resp",
      display: "<24h",
      label: "response time",
      icon: "zap",
      accent: "#fbbf24",
      accentBg: "rgba(251,191,36,0.1)",
      accentBorder: "rgba(251,191,36,0.2)",
    },
  ],
};

/* ── SVG icons ── */
function StatIcon({ name }) {
  const p = {
    width: 20,
    height: 20,
    viewBox: "0 0 24 24",
    fill: "none",
    "aria-hidden": "true",
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };
  switch (name) {
    case "check":
      return (
        <svg {...p}>
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
          <path d="M8 12l3 3 5-5" stroke="currentColor" strokeWidth="2" />
        </svg>
      );
    case "code":
      return (
        <svg {...p}>
          <polyline points="16 18 22 12 16 6" stroke="currentColor" strokeWidth="2" />
          <polyline points="8 6 2 12 8 18" stroke="currentColor" strokeWidth="2" />
        </svg>
      );
    case "calendar":
      return (
        <svg {...p}>
          <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
          <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="2" />
          <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="2" />
          <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="2" />
        </svg>
      );
    case "zap":
      return (
        <svg {...p}>
          <polygon
            points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      );
    default:
      return null;
  }
}

/* ── Main component ── */
export default function StatsSection({ lang = "sr" }) {
  const stats = STATS[lang] ?? STATS.sr;
  const wrapperRef = useRef(null);
  const [counts, setCounts] = useState(() => stats.map(() => 0));
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    if (animated) return;
    const el = wrapperRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        setAnimated(true);

        const DURATION = 1600;
        const startTs = performance.now();

        const tick = (now) => {
          const raw = Math.min((now - startTs) / DURATION, 1);
          // ease-out cubic
          const eased = 1 - Math.pow(1 - raw, 3);
          setCounts(
            stats.map((s) =>
              s.countTo != null ? Math.round(eased * s.countTo) : 0
            )
          );
          if (raw < 1) requestAnimationFrame(tick);
        };

        requestAnimationFrame(tick);
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [animated, stats]);

  return (
    <div className={styles.section}>
      <div className={styles.grid} ref={wrapperRef}>
        {stats.map((stat, i) => (
          <div
            key={stat.id}
            className={styles.card}
            style={{
              "--accent":        stat.accent,
              "--accent-bg":     stat.accentBg,
              "--accent-border": stat.accentBorder,
            }}
          >
            {/* Radial top glow — visible on hover via CSS */}
            <div className={styles.cardGlow} aria-hidden="true" />

            {/* Icon */}
            <div className={styles.iconWrap}>
              <StatIcon name={stat.icon} />
            </div>

            {/* Value */}
            <div className={styles.valueRow}>
              {stat.live && (
                <span className={styles.liveDot} aria-label="active" />
              )}
              <span
                className={`${styles.value} ${animated ? styles.valueIn : ""}`}
              >
                {stat.display ?? `${counts[i]}${stat.suffix}`}
              </span>
            </div>

            {/* Label */}
            <p className={styles.label}>{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
