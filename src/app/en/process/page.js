import Link from "next/link";
import PageHero from "@/components/PageHero";
import RevealSection from "@/components/RevealSection";
import SectionOrb from "@/components/SectionOrb";
import PageIcon from "@/components/PageIcon";

export const metadata = {
  title: "Process — From Website Idea to Launch",
  description:
    "A clear website workflow covering discovery, structure, design direction, development, SEO, performance, testing and delivery.",
  openGraph: {
    title: "Process | Đorđe Popović",
    description:
      "A practical workflow for clean custom-coded and WordPress websites, SEO foundations and structured web projects.",
  },
  alternates: {
    languages: { en: "/en/process", sr: "/sr/proces" },
  },
};

const steps = [
  {
    number: "01",
    icon: "discovery",
    title: "Discovery and project goals",
    description:
      "We start by understanding the business, audience, current website situation and the main goal of the project.",
    focus: [
      "Business and service overview",
      "Target audience",
      "Current website problems",
      "Project priorities",
      "Main conversion goal",
    ],
  },
  {
    number: "02",
    icon: "structure",
    title: "Website structure and content planning",
    description:
      "Before design or development, the website needs a clear structure. This includes pages, sections, navigation and content priorities.",
    focus: [
      "Page structure",
      "Navigation planning",
      "Content hierarchy",
      "Service or product organization",
      "Internal linking ideas",
    ],
  },
  {
    number: "03",
    icon: "design",
    title: "Design direction and UX flow",
    description:
      "The visual direction should support usability. I focus on clean layouts, readable sections, clear calls to action and mobile-friendly structure.",
    focus: [
      "Layout direction",
      "Visual hierarchy",
      "CTA placement",
      "Mobile usability",
      "User flow",
    ],
  },
  {
    number: "04",
    icon: "build",
    title: "Development and implementation",
    description:
      "The website is built in the way that fits the project — either custom-coded from scratch with HTML, CSS, JavaScript, React and Next.js, or built on WordPress with Elementor and WooCommerce when a CMS makes sense.",
    focus: [
      "Custom-coded pages (HTML, CSS, JS, React, Next.js)",
      "WordPress / Elementor implementation",
      "WooCommerce when needed",
      "Responsive frontend",
      "Clean, maintainable code",
    ],
  },
  {
    number: "05",
    icon: "seo",
    title: "SEO and performance foundations",
    description:
      "The site should be technically organized and prepared for better visibility and speed. This includes basic SEO structure, headings, metadata and performance improvements.",
    focus: [
      "Heading structure",
      "Meta title and description basics",
      "Image optimization",
      "WebP workflow",
      "Internal linking suggestions",
      "Basic speed checks",
    ],
  },
  {
    number: "06",
    icon: "test",
    title: "Testing and quality check",
    description:
      "Before delivery, the website should be tested across key pages, devices and user flows.",
    focus: [
      "Desktop and mobile review",
      "Link and button checks",
      "Contact / booking path checks",
      "Layout consistency",
      "Basic technical review",
    ],
  },
  {
    number: "07",
    icon: "deliver",
    title: "Delivery and next steps",
    description:
      "After the first version is ready, we review the result, define potential improvements and prepare the website for future content, SEO or maintenance work.",
    focus: [
      "Final review",
      "Handover notes",
      "Maintenance suggestions",
      "SEO next steps",
      "Future improvements",
    ],
  },
];

const overviewItems = [
  {
    title: "Structure first",
    description:
      "Clear pages, logical navigation and prioritized content before any design or development.",
  },
  {
    title: "Build with clarity",
    description:
      "Implementation focused on maintainability, responsive behavior and practical UX.",
  },
  {
    title: "Test before delivery",
    description:
      "Every project goes through a quality check covering devices, links and user flows.",
  },
];

const principles = [
  {
    title: "Clear communication",
    description:
      "Scope, timeline and priorities are defined before implementation starts.",
  },
  {
    title: "Structured workflow",
    description:
      "Every project follows the same clear process from discovery to delivery.",
  },
  {
    title: "Responsive implementation",
    description:
      "All pages are checked and optimized for desktop, tablet and mobile.",
  },
  {
    title: "SEO-aware delivery",
    description:
      "Basic SEO foundations are part of every project, not an afterthought.",
  },
];

export default function ProcessPage() {
  return (
    <main>
      <PageHero
        eyebrow="Process"
        title="A clear workflow from idea to live website"
        actions={
          <>
            <Link href="/en/contact" className="hero-action-primary">
              Start a project
            </Link>
            <Link href="/en/services" className="hero-action-secondary">
              View services
            </Link>
          </>
        }
      >
        My process is focused on structure, clarity and practical execution. The
        goal is to understand the project, define the right website structure,
        build clean pages and prepare the site for SEO, performance and future
        improvements.
      </PageHero>

      <div className="public-page">

        {/* 2. Process overview */}
        <RevealSection>
          <section className="process-overview has-orb">
            <SectionOrb style={{ "--orb-top": "26px", "--orb-right": "44px" }} />
            <div className="process-overview-header">
              <h2>How I approach every project</h2>
              <p>
                A consistent process keeps projects on track and delivers
                predictable results.
              </p>
            </div>
            <div className="process-overview-grid">
              {overviewItems.map((item) => (
                <div key={item.title} className="process-overview-item">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              ))}
            </div>
          </section>
        </RevealSection>

        {/* 3. Process timeline / step cards */}
        <RevealSection delay={0.05}>
          <section className="process-steps-section">
            <h2 className="section-title">The workflow step by step</h2>
            <div className="process-list process-timeline">
              {steps.map((step) => (
                <article key={step.number} className="process-card">
                  <span className="process-card-node">
                    <span className="process-card-icon">
                      <PageIcon name={step.icon} size={22} />
                    </span>
                    <span className="process-card-number">{step.number}</span>
                  </span>
                  <div className="process-card-content">
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                    <ul className="process-focus-list">
                      {step.focus.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </RevealSection>

        {/* 4. Working principles */}
        <RevealSection delay={0.05}>
          <section className="process-principles">
            <h2 className="section-title">Working principles</h2>
            <div className="process-principles-grid">
              {principles.map((item) => (
                <div key={item.title} className="process-principle-card">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              ))}
            </div>
          </section>
        </RevealSection>

        {/* 5. Why this process matters */}
        <RevealSection delay={0.08}>
          <div className="process-note">
            <h2>Why this process matters</h2>
            <p>
              A good website is not only about design. It needs structure, clear
              content, fast user flow, technical stability and a practical plan
              for future improvements.
            </p>
          </div>

          {/* 6. Final CTA */}
          <section className="process-cta has-orb">
            <SectionOrb style={{ "--orb-top": "30px", "--orb-right": "44px" }} />
            <h2>Ready to improve your website?</h2>
            <p>
              Send me a short description of your website or project and I can
              help you define the next practical step.
            </p>
            <div className="process-cta-actions">
              <Link href="/en/contact">Contact me</Link>
              <Link href="/en/services" className="process-cta-secondary">
                View services
              </Link>
            </div>
          </section>
        </RevealSection>

      </div>
    </main>
  );
}
