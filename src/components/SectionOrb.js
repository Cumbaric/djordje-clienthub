"use client";

import { useRef, useEffect, useState } from "react";
import styles from "./SectionOrb.module.css";

/**
 * SectionOrb — decorative blue/cyan comet-energy orb.
 *
 * Animates when the element enters the viewport (IntersectionObserver).
 * Each orb fires independently as the user scrolls.
 *
 * Props:
 *  delay    — small CSS time value after entering view (default "0s")
 *  duration — travel animation length                 (default "1.4s")
 *  className — extra class for positioning overrides
 *  style     — inline style for CSS custom-property overrides:
 *              --orb-top, --orb-right, --orb-left, --orb-bottom
 *              --orb-travel, --orb-duration, --orb-float-duration
 */
export default function SectionOrb({
  delay = "0s",
  duration = "1.4s",
  className = "",
  style = {},
}) {
  const ref = useRef(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <span
      ref={ref}
      className={`${styles.orbWrapper} ${active ? styles.orbActive : ""} ${className}`.trim()}
      style={{
        "--orb-delay": delay,
        "--orb-duration": duration,
        ...style,
      }}
      aria-hidden="true"
    >
      <span className={styles.orbInner} />
    </span>
  );
}
