"use client";
import { useRef, useEffect } from "react";
import styles from "./HeroGlow.module.css";

export default function HeroGlow() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const hero = el.closest("[data-glow-container]") ?? el.parentElement;

    const onMove = (e) => {
      const rect = hero.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const gradient = `radial-gradient(circle 180px at ${x}px ${y}px, black 0%, transparent 100%)`;
      el.style.maskImage = gradient;
      el.style.webkitMaskImage = gradient;
      el.style.opacity = "1";
    };

    const onLeave = () => {
      el.style.opacity = "0";
    };

    hero.addEventListener("mousemove", onMove);
    hero.addEventListener("mouseleave", onLeave);
    return () => {
      hero.removeEventListener("mousemove", onMove);
      hero.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return <div ref={ref} className={styles.glow} aria-hidden="true" />;
}
