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

const contactOptions = [
  {
    label: "Email",
    title: "Email",
    value: contactEmail,
    href: `mailto:${contactEmail}`,
    isLink: true,
  },
  {
    label: "Upwork",
    title: "Upwork",
    value: "Coming soon",
    isLink: false,
  },
  {
    label: "Fiverr",
    title: "Fiverr",
    value: "Coming soon",
    isLink: false,
  },
  {
    label: "LinkedIn",
    title: "LinkedIn",
    value: "Coming soon",
    isLink: false,
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

const nextSteps = [
  "I review your message and project context",
  "I identify the most practical next step",
  "We clarify scope, priorities and timeline",
  "I suggest a clear direction or implementation plan",
];

export default function ContactPage() {
  return (
    <main>
      <PageHero
        eyebrow="Contact"
        title="Let's talk about your website or workflow"
        actions={
          <>
            <a href={`mailto:${contactEmail}`} className="hero-action-primary">
              Email me
            </a>
            <Link href="/en/services" className="hero-action-secondary">
              View services
            </Link>
          </>
        }
      >
        If you need a cleaner WordPress website, better structure, SEO-focused
        improvements or a practical web workflow, send me a short overview of
        your project.
      </PageHero>

      <div className="public-page">

        {/* 2. Contact options — first section after hero */}
        <section className="contact-options-section">
          <h2 className="section-title">Contact options</h2>
          <p>Choose the channel that works best for you.</p>
          <div className="contact-options-grid">
            {contactOptions.map((option) => (
              <div key={option.title} className="contact-option-card">
                <span className="contact-option-label">{option.label}</span>
                <h3>{option.title}</h3>
                {option.isLink ? (
                  <a href={option.href}>{option.value}</a>
                ) : (
                  <p>{option.value}</p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* 3. Project inquiry / What to send */}
        <section className="contact-inquiry">
          <div className="contact-inquiry-grid">
            <div className="contact-inquiry-left">
              <h2>What to include in your message</h2>
              <p>
                A short, clear project overview helps me understand the
                situation and suggest the most practical next step quickly.
              </p>
            </div>
            <div className="contact-inquiry-right">
              <ul className="contact-inquiry-list">
                {sendList.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* 4. What I can help with */}
        <section className="contact-fit-section">
          <h2 className="section-title">What I can help with</h2>
          <div className="contact-fit-grid">
            {fitItems.map((item) => (
              <div key={item.title} className="contact-fit-card">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 5. What happens next */}
        <section className="contact-steps-section">
          <h2 className="section-title">What happens next</h2>
          <div className="contact-steps-list">
            {nextSteps.map((step, index) => (
              <div key={step} className="contact-step-item">
                <span className="contact-step-number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="contact-step-text">{step}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 6. Final CTA */}
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

      </div>
    </main>
  );
}
