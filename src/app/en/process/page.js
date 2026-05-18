import Link from "next/link";
import PageHero from "@/components/PageHero";

export const metadata = {
  title: "Process | From Website Idea to Launch",
  description:
    "A clear website workflow covering discovery, structure, design direction, WordPress implementation, SEO, performance, testing and delivery.",
  openGraph: {
    title: "Process | Đorđe Popović",
    description:
      "A practical workflow for clean WordPress websites, SEO foundations and structured web projects.",
  },
  alternates: {
    languages: { en: "/en/process", sr: "/sr/proces" },
  },
};

const steps = [
  {
    number: "01",
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
    title: "WordPress / frontend implementation",
    description:
      "The website is built using practical and maintainable implementation, depending on the project: WordPress, Elementor, WooCommerce or modern frontend tools.",
    focus: [
      "WordPress page setup",
      "Elementor / Elementor Pro implementation",
      "WooCommerce basics when needed",
      "Responsive frontend",
      "Clean CSS structure",
    ],
  },
  {
    number: "05",
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

export default function ProcessPage() {
  return (
    <main className="public-page">
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

      <section className="process-list">
        {steps.map((step) => (
          <article key={step.number} className="process-card">
            <span>{step.number}</span>
            <div>
              <h2>{step.title}</h2>
              <p>{step.description}</p>
              <ul className="process-focus-list">
                {step.focus.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </section>

      <div className="process-note">
        <h2>Why this process matters</h2>
        <p>
          A good website is not only about design. It needs structure, clear
          content, fast user flow, technical stability and a practical plan for
          future improvements.
        </p>
      </div>

      <section className="process-cta">
        <h2>Ready to improve your website?</h2>
        <p>
          Send me a short description of your website or project and I can help
          you define the next practical step.
        </p>
        <div className="process-cta-actions">
          <Link href="/en/contact">Contact me</Link>
          <Link href="/en/services" className="process-cta-secondary">
            View services
          </Link>
        </div>
      </section>
    </main>
  );
}
