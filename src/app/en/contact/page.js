import Link from "next/link";
import PageHero from "@/components/PageHero";
import { contactEmail } from "@/data/contact";

export const metadata = {
  title: "Contact | Đorđe Popović",
  description:
    "Contact Đorđe Popović for WordPress websites, Elementor improvements, WooCommerce setup, SEO optimization, maintenance and web workflow projects.",
  openGraph: {
    title: "Contact | Đorđe Popović",
    description:
      "Send a short project overview and define the next practical step for your website or workflow.",
  },
  alternates: {
    languages: { en: "/en/contact", sr: "/sr/kontakt" },
  },
};

const fitItems = [
  {
    title: "WordPress website development",
    description:
      "Clean, responsive WordPress websites for small businesses, service providers and content projects.",
  },
  {
    title: "Elementor redesign and improvement",
    description:
      "Improving existing Elementor websites through better layout, structure, mobile experience and CTA placement.",
  },
  {
    title: "WooCommerce setup",
    description:
      "Basic WooCommerce structure, product pages and store setup for smaller online stores or product catalogs.",
  },
  {
    title: "SEO and performance improvements",
    description:
      "Technical structure, headings, metadata basics, internal linking ideas and image optimization workflow.",
  },
  {
    title: "Website maintenance",
    description:
      "Content updates, plugin/theme support, small fixes and structure improvements.",
  },
  {
    title: "AI-assisted website workflow",
    description:
      "Planning, QA, content structure and development support using AI tools with human control.",
  },
];

const sendList = [
  "Your website URL, if you already have one",
  "Short description of your business or project",
  "What you want to improve or build",
  "Any deadline or priority",
  "Examples of websites you like, if you have them",
  "Whether you need WordPress, WooCommerce, SEO, maintenance or a custom workflow",
];

const nextSteps = [
  "I review your message and project context",
  "I identify the most practical next step",
  "We clarify scope, priorities and timeline",
  "I suggest a clear direction or implementation plan",
];

export default function ContactPage() {
  return (
    <main className="public-page">
      <PageHero eyebrow="Contact" title="Let's talk about your website or workflow">
        If you need a cleaner WordPress website, better structure, SEO-focused
        improvements or a practical web workflow, send me a short overview of
        your project.
      </PageHero>

      <section>
        <h2 style={{ marginBottom: "24px", fontSize: "30px", letterSpacing: "-0.02em" }}>
          What I can help with
        </h2>
        <div className="contact-fit-grid">
          {fitItems.map((item) => (
            <div key={item.title} className="contact-fit-card">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="contact-what-to-send">
        <h2>What to include in your message</h2>
        <ul className="contact-send-list">
          {sendList.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="contact-next-steps">
        <h2>What happens next</h2>
        <ol className="contact-next-list">
          {nextSteps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </div>

      <div className="contact-options-card">
        <h2>Contact options</h2>
        <p>For now, use one of the following contact methods.</p>
        <ul className="contact-options-list">
          <li>
            <strong>Email: </strong>
            <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
          </li>
          <li>
            <strong>Upwork: </strong>Coming soon
          </li>
          <li>
            <strong>Fiverr: </strong>Coming soon
          </li>
          <li>
            <strong>LinkedIn: </strong>Coming soon
          </li>
        </ul>
      </div>

      <section className="contact-cta">
        <h2>Ready to define the next step?</h2>
        <p>
          Send me a short message with your website goal and I will help you
          turn it into a practical plan.
        </p>
        <div className="contact-cta-actions">
          <a href={`mailto:${contactEmail}`}>Email me</a>
          <Link href="/en/services" className="contact-cta-secondary">
            View services
          </Link>
        </div>
      </section>
    </main>
  );
}
