"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollAnimator() {
  const pathname = usePathname();

  useEffect(() => {
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

    // Stagger delay na grid karticama
    [
      [".projects-grid", ".project-card, .project-card-link"],
      [".contact-fit-grid", ".contact-fit-card"],
      [".case-study-meta", "div"],
      [".case-study-grid", "article"],
    ].forEach(([containerSel, itemsSel]) => {
      const container = document.querySelector(containerSel);
      if (!container) return;
      container.querySelectorAll(itemsSel).forEach((el, i) => {
        el.style.transitionDelay = `${i * 80}ms`;
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
      { threshold: 0.08, rootMargin: "0px 0px -50px 0px" }
    );

    elements.forEach((el) => {
      el.classList.add("scroll-hidden");
      observer.observe(el);
    });

    return () => {
      observer.disconnect();
      elements.forEach((el) => {
        el.classList.remove("scroll-hidden", "scroll-revealed");
        el.style.transitionDelay = "";
      });
    };
  }, [pathname]);

  return null;
}
