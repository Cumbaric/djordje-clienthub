"use client";
import { useRef, useState, useEffect } from "react";
import styles from "./RevealSection.module.css";

/**
 * Wraps any section with a fade-up entry animation triggered once
 * when the element enters the viewport (IntersectionObserver).
 *
 * Props:
 *   delay  — optional CSS transition-delay in seconds (default 0)
 */
export default function RevealSection({ children, delay = 0 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect(); // animate only once
        }
      },
      {
        threshold: 0.07,
        rootMargin: "0px 0px -48px 0px",
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${styles.reveal} ${visible ? styles.visible : ""}`}
      style={delay ? { "--reveal-delay": `${delay}s` } : undefined}
    >
      {children}
    </div>
  );
}
