"use client";

import { useState, useRef, useEffect, useCallback, useId } from "react";
import styles from "./TechStackCarousel.module.css";
import { techBrands } from "@/data/techBrands";
import TechIcon from "@/components/TechIcon";

/**
 * TechStackCarousel — interactive carousel for the tech stack section.
 *
 * Desktop: cards arranged in a 3D ring (CSS 3D transforms), rotated with the
 * arrows, ArrowLeft/ArrowRight keys, or a horizontal swipe / drag.
 * Mobile (<= 768px): the 3D ring is dropped for a simpler "one card in focus"
 * view with the same swipe gestures.
 *
 * No autoplay — the carousel only moves on a user action.
 */
export default function TechStackCarousel({ groups = [] }) {
  const count = groups.length;
  const theta = count ? 360 / count : 0;
  // Ring radius tuned so 5 cards sit comfortably without heavy overlap.
  const RADIUS = 360;

  // `step` is an unbounded rotation counter so wrapping past the last card
  // keeps rotating smoothly instead of snapping all the way back.
  const [step, setStep] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const activeIndex = count ? ((step % count) + count) % count : 0;

  const next = useCallback(() => setStep((s) => s + 1), []);
  const prev = useCallback(() => setStep((s) => s - 1), []);

  // Move to a specific card via the shortest direction around the ring.
  const goToIndex = useCallback(
    (i) => {
      setStep((s) => {
        const cur = ((s % count) + count) % count;
        let diff = i - cur;
        if (diff > count / 2) diff -= count;
        if (diff < -count / 2) diff += count;
        return s + diff;
      });
    },
    [count]
  );

  // Client-only responsive flag (avoids SSR/window access → no hydration gap).
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const onKeyDown = (e) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      prev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      next();
    }
  };

  // ── Swipe / drag (pointer events cover both touch and mouse) ──
  const drag = useRef({ active: false, startX: 0, moved: false });

  const onPointerDown = (e) => {
    drag.current = { active: true, startX: e.clientX, moved: false };
  };

  const onPointerMove = (e) => {
    if (!drag.current.active) return;
    if (Math.abs(e.clientX - drag.current.startX) > 8) drag.current.moved = true;
  };

  const endDrag = (e) => {
    if (!drag.current.active) return;
    const deltaX = e.clientX - drag.current.startX;
    drag.current.active = false;
    const THRESHOLD = 40;
    if (deltaX <= -THRESHOLD) next();
    else if (deltaX >= THRESHOLD) prev();
  };

  const ringStyle = isMobile
    ? undefined
    : { transform: `translateZ(-${RADIUS}px) rotateY(${-step * theta}deg)` };

  const cardTransform = (i) => {
    if (isMobile) {
      const offset = i - activeIndex;
      return `translateX(${offset * 106}%) scale(${i === activeIndex ? 1 : 0.92})`;
    }
    return `rotateY(${i * theta}deg) translateZ(${RADIUS}px)`;
  };

  const descId = useId();

  if (!count) return null;

  return (
    <div className={styles.wrapper}>
      <p id={descId} className={styles.srOnly}>
        Interactive tech stack carousel. Use the previous and next buttons, the
        left and right arrow keys, or swipe to move between {count} skill groups.
      </p>

      <button
        type="button"
        className={`${styles.navBtn} ${styles.navPrev}`}
        onClick={prev}
        aria-label="Previous skill group"
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
        type="button"
        className={`${styles.navBtn} ${styles.navNext}`}
        onClick={next}
        aria-label="Next skill group"
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

      <div
        className={`${styles.stage}${isMobile ? ` ${styles.stageMobile}` : ""}`}
        role="group"
        aria-roledescription="carousel"
        aria-describedby={descId}
        tabIndex={0}
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onPointerLeave={endDrag}
      >
        <div className={styles.ring} style={ringStyle}>
          {groups.map((group, i) => {
            const isActive = i === activeIndex;
            return (
              <article
                key={group.title}
                className={`${styles.card}${isActive ? ` ${styles.cardActive}` : ""}`}
                style={{ transform: cardTransform(i) }}
                aria-hidden={!isActive}
                aria-label={group.title}
                onClick={() => {
                  if (!drag.current.moved && !isActive) goToIndex(i);
                }}
              >
                <h3 className={styles.cardTitle}>{group.title}</h3>

                <div className={styles.pills}>
                  {group.items.map((item) => {
                    const brand = techBrands[item] || techBrands._default;
                    return (
                      <span
                        key={item}
                        className={styles.pill}
                        style={{
                          "--brand-color": brand.color,
                          "--brand-bg": brand.bg,
                          "--brand-border": brand.border,
                          "--brand-glow": brand.glow,
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
            );
          })}
        </div>
      </div>

      <div className={styles.dots} role="tablist" aria-label="Skill groups">
        {groups.map((g, i) => (
          <button
            key={g.title}
            type="button"
            role="tab"
            className={`${styles.dot}${i === activeIndex ? ` ${styles.dotActive}` : ""}`}
            onClick={() => goToIndex(i)}
            aria-label={g.title}
            aria-selected={i === activeIndex}
          />
        ))}
      </div>
    </div>
  );
}
