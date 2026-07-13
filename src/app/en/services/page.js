import Link from "next/link";
import PageHero from "@/components/PageHero";
import RevealSection from "@/components/RevealSection";
import { services } from "@/data/services";

export const metadata = {
  title: "Website Services — WordPress, SEO & Next.js",
  description:
    "Web development services in Belgrade — custom HTML/CSS/JS, WordPress websites, React & Next.js apps, WooCommerce stores, SEO optimization and website maintenance.",
  openGraph: {
    title: "Web Development Services | Đorđe Popović",
    description:
      "WordPress, Next.js, WooCommerce, SEO and HTML/CSS development services. Freelance web developer based in Belgrade, Serbia.",
  },
  alternates: {
    canonical: "/en/services",
    languages: { en: "/en/services", sr: "/sr/usluge" },
  },
};

/* ── Icons per slug (Feather-style SVG) ── */
const serviceIcons = {
  "html-css-js": (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none"
      viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  "react-nextjs": (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none"
      viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  "seo-optimization": (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none"
      viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  ),
  "wordpress-website-development": (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none"
      viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <line x1="3" y1="9" x2="21" y2="9" />
      <line x1="9" y1="21" x2="9" y2="9" />
    </svg>
  ),
  "ecommerce-store": (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none"
      viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  ),
  "website-maintenance": (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none"
      viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  ),
};

const introHighlights = [
  "WordPress & Elementor",
  "WooCommerce",
  "SEO optimization",
  "React / Next.js",
];

const valueItems = [
  {
    title: "Clear structure",
    description:
      "Pages and sections that are logically organized and easy to navigate.",
  },
  {
    title: "Responsive implementation",
    description:
      "Layouts that work correctly across desktop, tablet and mobile.",
  },
  {
    title: "SEO-aware setup",
    description:
      "Technical foundations — headings, meta, internal linking — set up correctly from the start.",
  },
  {
    title: "Practical handover",
    description:
      "A website that is easy to update and maintain after delivery.",
  },
  {
    title: "Maintainable workflow",
    description:
      "Clean implementation that makes future changes straightforward.",
  },
];

export default function ServicesPage() {
  return (
    <main>
      <PageHero
        eyebrow="Services"
        title="WordPress, SEO and website workflow services"
        actions={
          <>
            <Link href="/en/contact" className="hero-action-primary">
              Contact me
            </Link>
            <Link href="/en/projects" className="hero-action-secondary">
              View projects
            </Link>
          </>
        }
      >
        I help small businesses, service providers and content-driven projects
        build cleaner, faster and better structured websites using WordPress,
        Elementor, WooCommerce, SEO fundamentals and AI-assisted workflows.
      </PageHero>

      <div className="public-page">

        {/* 2. Intro / positioning */}
        <RevealSection>
          <section className="services-intro">
            <p className="services-intro-label">What I do</p>
            <h2>Practical web services for small businesses</h2>
            <p>
              I work with small businesses, service providers and content-driven
              projects that need a cleaner, better structured web presence. Each
              service is focused on practical execution — clear pages, proper
              structure and a maintainable result.
            </p>
            <div className="services-intro-highlights">
              {introHighlights.map((item) => (
                <span key={item} className="services-intro-highlight">
                  {item}
                </span>
              ))}
            </div>
          </section>
        </RevealSection>

        {/* 3. Unified services grid — icon + description + includes + link */}
        <RevealSection delay={0.08}>
          <section className="services-unified">
            <h2 className="section-title">Services overview</h2>
            <div className="services-unified-grid">
              {services.map((service) => (
                <Link
                  key={service.slug}
                  href={`/en/services/${service.slug}`}
                  className="service-card"
                >
                  <div className="service-card-header">
                    <div className="service-card-icon">
                      {serviceIcons[service.slug]}
                    </div>
                    <h3>{service.titleEn}</h3>
                  </div>
                  <p className="service-card-desc">{service.descriptionEn}</p>
                  <ul className="service-includes-list">
                    {service.includesEn.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <div className="service-card-cta">
                    View details <span>→</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </RevealSection>

        {/* 4. What you get */}
        <RevealSection delay={0.05}>
          <section className="services-value">
            <h2 className="section-title">What you get</h2>
            <p>
              Every project is focused on delivering a practical and maintainable
              result.
            </p>
            <div className="services-value-grid">
              {valueItems.map((item) => (
                <div key={item.title} className="services-value-card">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              ))}
            </div>
          </section>
        </RevealSection>

        {/* 5. Final CTA */}
        <RevealSection delay={0.05}>
          <section className="services-cta">
            <h2>Need a cleaner and better structured website?</h2>
            <p>
              Send me a short description of your project and I can help you
              define the next practical step.
            </p>
            <div className="services-cta-actions">
              <Link href="/en/contact">Contact me</Link>
              <Link href="/en/projects" className="services-cta-secondary">
                View projects
              </Link>
            </div>
          </section>
        </RevealSection>

      </div>
    </main>
  );
}
