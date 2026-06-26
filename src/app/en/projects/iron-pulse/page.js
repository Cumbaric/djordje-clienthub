import Link from "next/link";
import PageHero from "@/components/PageHero";
import ProjectCarousel from "@/components/ProjectCarousel";
import JsonLd from "@/components/JsonLd";

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://djordjepopovic.com/en" },
    { "@type": "ListItem", "position": 2, "name": "Projects", "item": "https://djordjepopovic.com/en/projects" },
    { "@type": "ListItem", "position": 3, "name": "Iron Pulse", "item": "https://djordjepopovic.com/en/projects/iron-pulse" },
  ],
};

const IMAGES = [
  "/Projects/iron_pulse_1.png",
  "/Projects/iron_pulse_2.png",
  "/Projects/iron_pulse_3.png",
  "/Projects/iron_pulse_4.png",
  "/Projects/iron_pulse_5.png",
];

export const metadata = {
  title: "Iron Pulse Case Study",
  description:
    "Landing page for a personal training and strength coaching service — built with pure HTML, CSS and JavaScript. Mobile-first, SEO-ready, deployed on Vercel.",
  openGraph: {
    title: "Iron Pulse Case Study",
    description:
      "Pure HTML/CSS/JS landing page for a personal training service — mobile-first, SEO-optimized, accessible and deployed on Vercel.",
  },
  alternates: {
    languages: {
      en: "/en/projects/iron-pulse",
      sr: "/sr/projekti/iron-pulse",
    },
  },
};

export default function IronPulseCaseStudyPage() {
  return (
    <main>
      <JsonLd data={breadcrumbSchema} />
      <PageHero
        eyebrow="Case Study"
        title="Iron Pulse — Personal Training Landing Page"
        actions={
          <>
            <a
              href="https://iron-pulse-iota-dun.vercel.app"
              className="hero-action-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              View live site
            </a>
            <Link href="/en/contact" className="hero-action-secondary">
              Start a similar project
            </Link>
          </>
        }
      >
        A landing page for a personal training and strength coaching service,
        built entirely with HTML, CSS and JavaScript — no frameworks, no
        dependencies. Mobile-first, SEO-ready and deployed on Vercel.
      </PageHero>

      <div className="public-page">
        <section className="case-study-meta">
          <div>
            <span>Project type</span>
            <strong>Landing Page</strong>
          </div>
          <div>
            <span>Tech stack</span>
            <strong>HTML / CSS / JavaScript</strong>
          </div>
          <div>
            <span>Hosting</span>
            <strong>Vercel</strong>
          </div>
          <div>
            <span>Focus</span>
            <strong>Performance, SEO, accessibility, conversions</strong>
          </div>
        </section>

        <section className="case-study-section">
          <h2>Project gallery</h2>
          <ProjectCarousel images={IMAGES} alt="Iron Pulse" />
        </section>

        <section className="case-study-section">
          <h2>Project overview</h2>
          <p>
            Iron Pulse is a landing page for a personal training and strength
            coaching business based in Belgrade. The goal was to build a
            professional, conversion-focused site without any JavaScript
            frameworks — relying entirely on clean HTML, CSS and vanilla JS for
            maximum performance and simplicity.
          </p>
          <p>
            The site covers all key conversion elements: service offerings,
            pricing tiers, a free lead magnet (7-day training plan), client
            testimonials, FAQ and a contact form with real-time validation.
          </p>
        </section>

        <section className="case-study-section">
          <h2>The challenge</h2>
          <p>
            Personal training businesses need to quickly communicate trust,
            expertise and a clear value proposition. The site had to:
          </p>
          <ul className="case-study-list">
            <li>Present services and pricing clearly without overwhelming visitors</li>
            <li>Work flawlessly on mobile devices</li>
            <li>Load fast with no framework overhead</li>
            <li>Include a lead capture form with client-side validation</li>
            <li>Meet accessibility and SEO standards</li>
          </ul>
        </section>

        <section className="case-study-section">
          <h2>What was built</h2>
          <div className="case-study-grid">
            <article>
              <h3>Mobile-first layout</h3>
              <p>
                Fully responsive design built mobile-first with semantic HTML
                and clean CSS — no layout frameworks or utility classes.
              </p>
            </article>
            <article>
              <h3>SEO optimization</h3>
              <p>
                Complete meta tags, Open Graph, structured heading hierarchy and
                semantic elements for search visibility and social sharing.
              </p>
            </article>
            <article>
              <h3>Accessibility</h3>
              <p>
                Skip links, keyboard navigation support, proper ARIA attributes
                and contrast-compliant color choices throughout.
              </p>
            </article>
            <article>
              <h3>Form validation</h3>
              <p>
                Vanilla JavaScript contact form with real-time field validation
                and user-friendly error feedback — no libraries needed.
              </p>
            </article>
            <article>
              <h3>Animations</h3>
              <p>
                Scroll-reveal effects and subtle pulse animations built with CSS
                and Intersection Observer — smooth without hurting performance.
              </p>
            </article>
            <article>
              <h3>Zero dependencies</h3>
              <p>
                No npm, no bundler, no framework. Only Google Fonts as an
                external resource — fast load, simple deployment, easy to maintain.
              </p>
            </article>
          </div>
        </section>

        <section className="case-study-section">
          <h2>Tools and technologies</h2>
          <div className="tech-stack">
            <span>HTML5</span>
            <span>CSS3</span>
            <span>Vanilla JavaScript</span>
            <span>Intersection Observer API</span>
            <span>CSS Animations</span>
            <span>Open Graph</span>
            <span>Semantic HTML</span>
            <span>ARIA</span>
            <span>Vercel</span>
            <span>Google Fonts</span>
          </div>
        </section>

        <section className="case-study-section">
          <h2>Result</h2>
          <p>
            A clean, fast and professional landing page deployed on Vercel — no
            build step, no configuration, just a well-structured project that
            opens directly in the browser. The site is accessible, SEO-ready
            and covers all conversion touchpoints a personal training business
            needs.
          </p>
          <ul className="case-study-list">
            <li>Zero framework overhead — pure HTML, CSS and JS</li>
            <li>Mobile-first, fully responsive layout</li>
            <li>SEO and Open Graph ready</li>
            <li>Accessible — keyboard nav, skip links, ARIA</li>
            <li>Live on Vercel with instant global CDN delivery</li>
          </ul>
        </section>

        <section className="case-study-section">
          <h2>View the project</h2>
          <p>
            The project is live on Vercel and fully open source on GitHub.
          </p>
          <div className="case-study-cta-actions" style={{ marginTop: "16px" }}>
            <a
              href="https://iron-pulse-iota-dun.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
            >
              Live site ↗
            </a>
            <a
              href="https://github.com/Cumbaric/Iron-Pulse"
              target="_blank"
              rel="noopener noreferrer"
              className="case-study-cta-secondary"
            >
              GitHub ↗
            </a>
          </div>
        </section>

        <section className="case-study-cta">
          <h2>Need a landing page like this?</h2>
          <p>
            If you need a fast, clean and professional landing page without
            framework overhead, I can help you build one from scratch.
          </p>
          <div className="case-study-cta-actions">
            <Link href="/en/contact">Contact me</Link>
            <Link href="/en/services" className="case-study-cta-secondary">
              View services
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
