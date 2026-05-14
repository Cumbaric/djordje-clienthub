import PageHero from "@/components/PageHero";
import { contactItems, contactEmail } from "@/data/contact";

const messageChecklistEn = [
  "Brief project or problem description",
  "Link to your current site, if you have one",
  "What you want fixed, built, or improved",
  "Rough deadline or priority",
  "Whether it's WordPress, WooCommerce, or a custom application",
];

export default function ContactPage() {
  return (
    <main className="public-page">
      <PageHero eyebrow="Contact" title="Let's talk about your project">
        If you need a WordPress website, WooCommerce store, SEO structure,
        technical help, or a custom React / Next.js tool, send a brief project
        description and the goal you want to achieve.
      </PageHero>

      <section className="contact-layout">
        <div className="contact-main-card">
          <h2>What to include in your first message?</h2>
          <p>
            The best approach is to send basic information upfront so I can
            understand what&#39;s needed and suggest a concrete next step.
          </p>

          <ul>
            {messageChecklistEn.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <a href={`mailto:${contactEmail}`}>Send email</a>
        </div>

        <aside className="contact-info-card">
          <h2>Project fit</h2>

          <div className="contact-info-list">
            {contactItems.map((item) => (
              <div key={item.label}>
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </div>
            ))}
          </div>
        </aside>
      </section>

      <section className="contact-cta">
        <h2>The best first step is a brief problem description.</h2>
        <p>
          You don&#39;t need a complete specification ready. It&#39;s enough to
          describe what you currently have, what isn&#39;t working well, and
          what you want to achieve.
        </p>
      </section>
    </main>
  );
}
