"use client";
import { useRef, useState, useEffect, useCallback } from "react";
import styles from "./TechSlider.module.css";
import { techBrands } from "@/data/techBrands";
import TechIcon from "@/components/TechIcon";

export default function TechSlider({ groups }) {
  const trackRef = useRef(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const total = groups.length;

  // Programmatically scroll so slide[idx] is centered in the track
  const goTo = useCallback((idx) => {
    const track = trackRef.current;
    if (!track) return;
    const slides = Array.from(track.querySelectorAll("[data-slide]"));
    const slide = slides[idx];
    if (!slide) return;

    const trackW = track.clientWidth;
    const slideW = slide.offsetWidth;
    const targetLeft = slide.offsetLeft - (trackW - slideW) / 2;
    track.scrollTo({ left: targetLeft, behavior: "smooth" });
    setActiveIdx(idx);
  }, []);

  // Sync activeIdx when user scrolls manually (touch swipe, drag)
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const onScroll = () => {
      const slides = Array.from(track.querySelectorAll("[data-slide]"));
      const center = track.scrollLeft + track.clientWidth / 2;
      let closest = 0;
      let minDist = Infinity;
      slides.forEach((s, i) => {
        const dist = Math.abs(s.offsetLeft + s.offsetWidth / 2 - center);
        if (dist < minDist) {
          minDist = dist;
          closest = i;
        }
      });
      setActiveIdx(closest);
    };

    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, []);

  // Keyboard arrow navigation
  const onKeyDown = (e) => {
    if (e.key === "ArrowLeft") goTo(Math.max(0, activeIdx - 1));
    if (e.key === "ArrowRight") goTo(Math.min(total - 1, activeIdx + 1));
  };

  return (
    <div className={styles.wrapper} onKeyDown={onKeyDown}>
      {/* ── Prev / Next arrows ── */}
      <button
        className={`${styles.navBtn} ${styles.navPrev}`}
        onClick={() => goTo(Math.max(0, activeIdx - 1))}
        disabled={activeIdx === 0}
        aria-label="Previous"
        tabIndex={0}
      >
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M15 18l-6-6 6-6"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <button
        className={`${styles.navBtn} ${styles.navNext}`}
        onClick={() => goTo(Math.min(total - 1, activeIdx + 1))}
        disabled={activeIdx === total - 1}
        aria-label="Next"
        tabIndex={0}
      >
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M9 18l6-6-6-6"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* ── Scrollable track ── */}
      <div className={styles.track} ref={trackRef}>
        {groups.map((group, i) => (
          <article
            key={group.title}
            data-slide
            className={`${styles.slide}${i === activeIdx ? ` ${styles.active}` : ""}`}
            onClick={() => i !== activeIdx && goTo(i)}
            aria-label={group.title}
          >
            <h3 className={styles.slideTitle}>{group.title}</h3>

            <div className={styles.pills}>
              {group.items.map((item) => {
                const brand = techBrands[item] || techBrands._default;
                return (
                  <span
                    key={item}
                    className={styles.pill}
                    style={{
                      "--brand-color":  brand.color,
                      "--brand-bg":     brand.bg,
                      "--brand-border": brand.border,
                      "--brand-glow":   brand.glow,
                    }}
                  >
                    <span className={styles.pillIcon}>
                      <TechIcon name={item} size={13} />
                    </span>
                    {item}
                  </span>
                );
              })}
            </div>
          </article>
        ))}
      </div>

      {/* ── Dot indicators ── */}
      <div className={styles.dots} role="tablist" aria-label="Slides">
        {groups.map((g, i) => (
          <button
            key={i}
            role="tab"
            className={`${styles.dot}${i === activeIdx ? ` ${styles.dotActive}` : ""}`}
            onClick={() => goTo(i)}
            aria-label={g.title}
            aria-selected={i === activeIdx}
          />
        ))}
      </div>
    </div>
  );
}
