import Link from "next/link";
import PageHero from "@/components/PageHero";

export const metadata = {
  title: "Services | WordPress, SEO and Website Workflow",
  description:
    "WordPress website development, Elementor redesign, WooCommerce setup, SEO optimization, maintenance and AI-assisted website workflow services.",
  openGraph: {
    title: "Services | Đorđe Popović",
    description:
      "WordPress, Elementor, WooCommerce, SEO and AI-assisted website workflow services.",
  },
  alternates: {
    languages: { en: "/en/services", sr: "/sr/usluge" },
  },
};

const services = [
  {
    title: "WordPress Website Development",
    description:
      "Clean, responsive WordPress websites built with a clear structure, practical UX and maintainable page layouts.",
    includes: [
      "Website structure and page setup",
      "Elementor / Elementor Pro implementation",
      "Responsive layout",
      "Basic technical setup",
    ],
  },
  {
    title: "Elementor Website Redesign",
    description:
      "Improving existing Elementor websites by making layouts cleaner, more consistent and easier to use across devices.",
    includes: [
      "Section and layout cleanup",
      "Mobile responsiveness improvements",
      "Visual hierarchy improvements",
      "Better CTA placement",
    ],
  },
  {
    title: "WooCommerce Store Setup",
    description:
      "Basic WooCommerce store setup for small businesses that need a clear product structure and simple purchasing flow.",
    includes: [
      "Product structure",
      "Product page setup",
      "Basic WooCommerce configuration",
      "Checkout flow review",
    ],
  },
  {
    title: "SEO & Technical Optimization",
    description:
      "SEO-focused improvements that help websites become easier to understand for users and search engines.",
    includes: [
      "Page title and meta description basics",
      "Heading structure",
      "Internal linking suggestions",
      "Technical SEO checks",
    ],
  },
  {
    title: "WordPress Maintenance",
    description:
      "Ongoing support for WordPress websites to keep content, plugins and structure stable and organized.",
    includes: [
      "Content updates",
      "Plugin/theme update support",
      "Basic troubleshooting",
      "Site structure improvements",
    ],
  },
  {
    title: "AI-assisted Website Workflow",
    description:
      "Using AI tools to speed up planning, content structure, QA and development workflows while keeping human control over the final result.",
    includes: [
      "Content planning",
      "Website structure planning",
      "QA checklists",
      "Workflow documentation",
    ],
  },
];

const introHighlights = [
  "WordPress & Elementor",
  "WooCommerce",
  "SEO foundations",
  "AI-assisted workflow",
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

        {/* 3. Services overview grid */}
        <section className="services-overview">
          <h2 className="section-title">Services overview</h2>
          <div className="services-overview-grid">
            {services.map((service) => (
              <div key={service.title} className="services-overview-card">
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Detailed services */}
        <section className="services-detail">
          <h2 className="section-title">What each service includes</h2>
          <div className="services-list">
            {services.map((service) => (
              <article key={service.title} className="service-list-card">
                <div className="service-list-content">
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <ul className="service-includes-list">
                    {service.includes.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* 5. What you get */}
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

        {/* 6. Final CTA */}
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

      </div>
    </main>
  );
}
