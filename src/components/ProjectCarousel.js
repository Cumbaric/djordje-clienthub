"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import styles from "./ProjectCarousel.module.css";

export default function ProjectCarousel({ images = [], alt = "Project screenshot" }) {
  const [current, setCurrent] = useState(0);

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + images.length) % images.length);
  }, [images.length]);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % images.length);
  }, [images.length]);

  const goTo = useCallback((i) => setCurrent(i), []);

  if (!images.length) return null;

  return (
    <div className={styles.carousel}>
      {/* Main image */}
      <div className={styles.track}>
        {images.map((src, i) => (
          <div
            key={src}
            className={`${styles.slide} ${i === current ? styles.slideActive : ""}`}
            aria-hidden={i !== current}
          >
            <Image
              src={src}
              alt={`${alt} ${i + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, 900px"
              style={{ objectFit: "cover" }}
              priority={i === 0}
            />
          </div>
        ))}
      </div>

      {/* Controls */}
      <button
        className={`${styles.btn} ${styles.btnPrev}`}
        onClick={prev}
        aria-label="Previous image"
      >
        <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path d="M13 4L7 10l6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      <button
        className={`${styles.btn} ${styles.btnNext}`}
        onClick={next}
        aria-label="Next image"
      >
        <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path d="M7 4l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* Counter + dots */}
      <div className={styles.footer}>
        <span className={styles.counter}>{current + 1} / {images.length}</span>
        <div className={styles.dots}>
          {images.map((_, i) => (
            <button
              key={i}
              className={`${styles.dot} ${i === current ? styles.dotActive : ""}`}
              onClick={() => goTo(i)}
              aria-label={`Go to image ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
