"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

const CARD_SELECTORS = [
  ".project-card",
  ".project-card-link",
  ".service-list-card",
  ".process-card",
  ".contact-fit-card",
  ".case-study-meta > div",
  ".case-study-grid > article",
];

export default function ScrollAnimator() {
  const pathname = usePathname();

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    // ── Scroll reveal ──────────────────────────────
    const REVEAL_SELECTORS = [
      ...CARD_SELECTORS,
      ".case-study-section",
      ".process-note",
      ".contact-what-to-send",
      ".contact-next-steps",
      ".contact-options-card",
      ".projects-cta",
      ".services-cta",
      ".process-cta",
      ".contact-cta",
      ".case-study-cta",
    ].join(", ");

    const elements = document.querySelectorAll(REVEAL_SELECTORS);
    const isMobile = window.innerWidth < 700;

    if (isMobile) {
      document.documentElement.style.setProperty(
        "--scroll-reveal-duration",
        "0.35s"
      );
    }

    [
      [".projects-grid", ".project-card, .project-card-link"],
      [".contact-fit-grid", ".contact-fit-card"],
      [".services-list", ".service-list-card"],
      [".process-list", ".process-card"],
      [".case-study-meta", "div"],
      [".case-study-grid", "article"],
    ].forEach(([containerSel, itemsSel]) => {
      const container = document.querySelector(containerSel);
      if (!container) return;
      const maxDelay = isMobile ? 60 : 80;
      container.querySelectorAll(itemsSel).forEach((el, i) => {
        el.style.transitionDelay = `${i * maxDelay}ms`;
      });
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("scroll-revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.06, rootMargin: "0px 0px -40px 0px" }
    );

    elements.forEach((el) => {
      el.classList.add("scroll-hidden");
      observer.observe(el);
    });

    // ── Mouse glow ─────────────────────────────────
    const cards = document.querySelectorAll(CARD_SELECTORS.join(", "));
    const cleanups = [];

    cards.forEach((card) => {
      let rafId = null;

      const onMove = (e) => {
        if (rafId) return;
        rafId = requestAnimationFrame(() => {
          const rect = card.getBoundingClientRect();
          const x = ((e.clientX - rect.left) / rect.width) * 100;
          const y = ((e.clientY - rect.top) / rect.height) * 100;
          card.style.setProperty("--mouse-x", `${x}%`);
          card.style.setProperty("--mouse-y", `${y}%`);
          rafId = null;
        });
      };

      const onLeave = () => {
        if (rafId) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }
        card.style.removeProperty("--mouse-x");
        card.style.removeProperty("--mouse-y");
      };

      card.addEventListener("mousemove", onMove);
      card.addEventListener("mouseleave", onLeave);
      cleanups.push(() => {
        card.removeEventListener("mousemove", onMove);
        card.removeEventListener("mouseleave", onLeave);
        onLeave();
      });
    });

    return () => {
      observer.disconnect();
      document.documentElement.style.removeProperty("--scroll-reveal-duration");
      elements.forEach((el) => {
        el.classList.remove("scroll-hidden", "scroll-revealed");
        el.style.transitionDelay = "";
      });
      cleanups.forEach((fn) => fn());
    };
  }, [pathname]);

  return null;
}