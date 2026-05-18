"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollAnimator() {
  const pathname = usePathname();

  useEffect(() => {
    // Prefers-reduced-motion — preskoči animacije
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const SELECTORS = [
      ".project-card",
      ".project-card-link",
      ".service-list-card",
      ".process-card",
      ".contact-fit-card",
      ".case-study-meta > div",
      ".case-study-grid > article",
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

    const elements = document.querySelectorAll(SELECTORS);

    // Mobile — kraće trajanje animacije
    const isMobile = window.innerWidth < 700;
    if (isMobile) {
      document.documentElement.style.setProperty(
        "--scroll-reveal-duration",
        "0.35s"
      );
    }

    // Stagger delay na grid karticama
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

    return () => {
      observer.disconnect();
      document.documentElement.style.removeProperty("--scroll-reveal-duration");
      elements.forEach((el) => {
        el.classList.remove("scroll-hidden", "scroll-revealed");
        el.style.transitionDelay = "";
      });
    };
  }, [pathname]);

  return null;
}
