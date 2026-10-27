import Link from "next/link";
import PageHero from "@/components/PageHero";
import ProjectCarousel from "@/components/ProjectCarousel";
import JsonLd from "@/components/JsonLd";

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://dwebsolutions.rs/en" },
    { "@type": "ListItem", "position": 2, "name": "Projects", "item": "https://dwebsolutions.rs/en/projects" },
    { "@type": "ListItem", "position": 3, "name": "Lektura i prevod", "item": "https://dwebsolutions.rs/en/projects/lektura-i-prevod" },
  ],
};

const IMAGES = [
  "/Projects/lekturaiprevod.png",
  "/Projects/lekturaiprevod1.png",
  "/Projects/lekturaiprevod2.png",
  "/Projects/lekturaiprevod3.png",
  "/Projects/lekturaiprevod4.png",
];

export const metadata = {
  title: "Lektura i prevod — WordPress Website & Custom Plugin",
  description:
    "Case study of a WordPress website for proofreading, editing and translation services, with a custom plugin for quote requests and secure document submission. Currently in development.",
  openGraph: {
    title: "Lektura i prevod — WordPress Website & Custom Plugin",
    description:
      "A WordPress and Elementor website for a proofreading and translation service, paired with a custom quote-request plugin. Currently in development.",
  },
  alternates: {
    canonical: "/en/projects/lektura-i-prevod",
    languages: {
      en: "/en/projects/lektura-i-prevod",
      sr: "/sr/projekti/lektura-i-prevod",
    },
  },
};

export default function LekturaIPrevodCaseStudyPage() {
  return (
    <main>
      <JsonLd data={breadcrumbSchema} />
      <PageHero
        eyebrow="Case Study"
        title="Lektura i prevod — WordPress Website & Custom Plugin"
        actions={
          <>
            <Link href="/en/contact" className="hero-action-primary">
              Start a similar project
            </Link>
            <Link href="/en/services" className="hero-action-secondary">
              View services
            </Link>
          </>
        }
      >
        A WordPress and Elementor website for a proofreading, editing and
        translation service, built around a clear service structure and a
        custom plugin that handles quote requests and secure document
        submission. The project is currently in development.
      </PageHero>

      <div className="public-page">
        <Link href="/en/projects" className="case-study-back">
          ← Back to projects
        </Link>

        <section className="case-study-meta">
          <div>
            <span>Project type</span>
            <strong>WordPress / Elementor / Custom plugin</strong>
          </div>
          <div>
            <span>Industry</span>
            <strong>Proofreading, editing and translation services</strong>
          </div>
          <div>
            <span>Status</span>
            <strong>In development</strong>
          </div>
          <div>
            <span>Role</span>
            <strong>WordPress development, Elementor build, custom plugin development (PHP)</strong>
          </div>
        </section>

        <section className="case-study-section">
          <h2>Project gallery</h2>
          <ProjectCarousel images={IMAGES} alt="Lektura i prevod website screenshot" />
        </section>

        <section className="case-study-section">
          <h2>Project overview</h2>
          <p>
            Lektura i prevod is a website for a professional proofreading,
            editing and translation service. Its job is to explain the services
            clearly, help visitors understand what each one involves and make it
            easy to ask for a quote, including by sending the document that
            needs to be reviewed.
          </p>
          <p>
            The project combines a WordPress website built with Elementor and a
            purpose-built plugin, so the quote request process is part of the
            site rather than a generic contact form.
          </p>
        </section>

        <section className="case-study-section">
          <h2>Website structure and design direction</h2>
          <p>
            The site follows an editorial design direction that suits a
            language and text-focused service: calm typography, generous
            spacing and a consistent visual system across pages. Services are
            organized into a structured set of service pages, so each type of
            work has its own clear place on the site.
          </p>
          <ul className="case-study-list">
            <li>A custom, editorial-style design system</li>
            <li>Structured service-page architecture</li>
            <li>Clear paths from every service page to a quote request</li>
            <li>Layouts built for both desktop and mobile visitors</li>
          </ul>
        </section>

        <section className="case-study-section">
          <h2>WordPress and Elementor implementation</h2>
          <p>
            The website is built on WordPress with the lightweight Hello
            Elementor theme and Elementor Free using Flexbox Containers, with
            custom HTML and CSS where the design needed more control than the
            page builder offers. Yoast SEO is used for page-level SEO settings,
            and WP Mail SMTP handles reliable email delivery.
          </p>
        </section>

        <section className="case-study-section">
          <h2>Custom plugin: Lektura Kontakt Forma</h2>
          <p>
            Lektura Kontakt Forma (LKF) is a custom WordPress plugin written in
            PHP to manage quote requests from submission to follow-up. It was
            developed with extensive automated and staging testing.
          </p>
          <div className="case-study-grid">
            <article>
              <h3>Quote requests</h3>
              <p>
                Visitors submit a quote request through a form built into the
                site, describing the work they need.
              </p>
            </article>
            <article>
              <h3>Secure document upload</h3>
              <p>
                Documents can be attached to a request. Uploads are handled with
                security controls rather than being accepted unchecked.
              </p>
            </article>
            <article>
              <h3>Request management</h3>
              <p>
                Requests are stored and managed from the WordPress
                administration area, where each one carries a status so it is
                clear what still needs attention.
              </p>
            </article>
            <article>
              <h3>Email notifications</h3>
              <p>
                Email notifications keep both the business and the person who
                submitted a request informed.
              </p>
            </article>
            <article>
              <h3>Document retention</h3>
              <p>
                A document retention workflow covers how long uploaded files are
                kept.
              </p>
            </article>
          </div>
        </section>

        <section className="case-study-section">
          <h2>Current status</h2>
          <p>
            The project is currently in development. The plugin has been
            through substantial automated and staging testing, but the website
            and its workflows should not be treated as finished. This case
            study will be updated as the project progresses.
          </p>
        </section>

        <section className="case-study-section">
          <h2>View the website</h2>
          <p>
            The website is publicly reachable while development continues, so
            what you see there may change.
          </p>
          <div className="case-study-cta-actions" style={{ marginTop: "16px" }}>
            <a
              href="https://lekturaiprevod.rs"
              target="_blank"
              rel="noopener noreferrer"
            >
              lekturaiprevod.rs ↗
            </a>
          </div>
        </section>

        <section className="case-study-section">
          <h2>Tools and technologies</h2>
          <div className="tech-stack">
            <span>WordPress</span>
            <span>Hello Elementor</span>
            <span>Elementor Free</span>
            <span>Flexbox Containers</span>
            <span>HTML / CSS</span>
            <span>Custom WordPress plugin (PHP)</span>
            <span>Yoast SEO</span>
            <span>WP Mail SMTP</span>
          </div>
        </section>

        <section className="case-study-cta">
          <h2>Need a WordPress website with custom functionality?</h2>
          <p>
            If your website needs a clear structure and a feature that off-the-shelf
            plugins do not cover, we can help you define the next practical step.
          </p>
          <div className="case-study-cta-actions">
            <Link href="/en/contact">Contact us</Link>
            <Link href="/en/services" className="case-study-cta-secondary">
              View services
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
