import Link from "next/link";
import PageHero from "@/components/PageHero";
import RevealSection from "@/components/RevealSection";
import SectionOrb from "@/components/SectionOrb";
import PageIcon from "@/components/PageIcon";
import ContactForm from "@/components/ContactForm";
import { contactEmail, socialLinks } from "@/data/contact";

export const metadata = {
  title: "Contact",
  description:
    "Contact Đorđe Popović for custom-coded and WordPress websites, WooCommerce setup, SEO optimization, maintenance and web workflow projects.",
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
    icon: "email",
    value: contactEmail,
    href: `mailto:${contactEmail}`,
    isLink: true,
  },
  {
    label: "Upwork",
    title: "Upwork",
    icon: "upwork",
    value: "View profile",
    href: socialLinks.upwork,
    isLink: true,
    external: true,
  },
  {
    label: "Fiverr",
    title: "Fiverr",
    icon: "fiverr",
    value: "View profile",
    href: socialLinks.fiverr,
    isLink: true,
    external: true,
  },
  {
    label: "LinkedIn",
    title: "LinkedIn",
    icon: "linkedin",
    value: "View profile",
    href: socialLinks.linkedin,
    isLink: true,
    external: true,
  },
];

const sendList = [
  "Your website URL, if you already have one",
  "Short description of your business or project",
  "What you want to improve or build",
  "Any deadline or priority",
  "Examples of websites you like, if you have them",
  "Whether you need a custom-coded site, WordPress, WooCommerce, SEO or maintenance",
];

const fitItems = [
  {
    icon: "code",
    title: "Custom-coded websites",
    description:
      "Websites, landing pages and web apps built from scratch with HTML, CSS, JavaScript, React and Next.js — for fast, fully custom results with full control over code and design.",
  },
  {
    icon: "wordpress",
    title: "WordPress & Elementor websites",
    description:
      "Presentation WordPress websites built and designed with Elementor — clear structure, readable sections and easy content management.",
  },
  {
    icon: "woocommerce",
    title: "E-commerce / online store",
    description:
      "WooCommerce store setup — category and product structure, product pages and checkout configuration for smaller online stores.",
  },
  {
    icon: "seo",
    title: "SEO and on-page optimization",
    description:
      "Technical and on-page SEO — heading structure, metadata, internal linking, load speed and Google indexing preparation. Works for existing sites too.",
  },
  {
    icon: "maintenance",
    title: "Website maintenance and support",
    description:
      "Content updates, plugin/theme support, technical fixes and small structure or CSS improvements.",
  },
  {
    icon: "ai",
    title: "AI-assisted website workflow",
    description:
      "Planning, QA, content structure and development support using AI tools with human control over the final result.",
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
        Whether you need a custom-coded website, a WordPress site, better
        structure, SEO-focused improvements or a practical web workflow, send me
        a short overview of your project.
      </PageHero>

      <div className="public-page">

        {/* 2. Contact options — first section after hero */}
        <RevealSection>
          <section className="contact-options-section">
            <span className="contact-availability">
              <span className="contact-availability-dot" />
              Available for new projects
            </span>
            <h2 className="section-title">Contact options</h2>
            <p>Choose the channel that works best for you.</p>
            <div className="contact-options-grid">
              {contactOptions.map((option) => (
                <div key={option.title} className="contact-option-card">
                  <span className="contact-option-icon">
                    <PageIcon name={option.icon} size={22} />
                  </span>
                  <span className="contact-option-label">{option.label}</span>
                  <h3>{option.title}</h3>
                  {option.isLink ? (
                    <a
                      href={option.href}
                      {...(option.external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                    >
                      {option.value}
                    </a>
                  ) : (
                    <p>{option.value}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        </RevealSection>

        {/* 3. Contact form */}
        <RevealSection delay={0.05}>
          <section className="contact-form-section">
            <ContactForm lang="en" contactEmail={contactEmail} />
          </section>
        </RevealSection>

        {/* 4. Project inquiry / What to send */}
        <RevealSection delay={0.05}>
          <section className="contact-inquiry has-orb">
            <SectionOrb style={{ "--orb-top": "30px", "--orb-right": "44px" }} />
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
        </RevealSection>

        {/* 4. What I can help with */}
        <RevealSection delay={0.05}>
          <section className="contact-fit-section">
            <h2 className="section-title">What I can help with</h2>
            <div className="contact-fit-grid">
              {fitItems.map((item) => (
                <div key={item.title} className="contact-fit-card">
                  <span className="contact-fit-icon">
                    <PageIcon name={item.icon} size={22} />
                  </span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              ))}
            </div>
          </section>
        </RevealSection>

        {/* 5. What happens next */}
        <RevealSection delay={0.05}>
          <section className="contact-steps-section">
            <h2 className="section-title">What happens next</h2>
            <div className="contact-steps-list contact-steps-timeline">
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
        </RevealSection>

        {/* 6. Final CTA */}
        <RevealSection delay={0.08}>
          <section className="contact-cta has-orb">
            <SectionOrb style={{ "--orb-top": "30px", "--orb-right": "44px" }} />
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
        </RevealSection>

      </div>
    </main>
  );
}
