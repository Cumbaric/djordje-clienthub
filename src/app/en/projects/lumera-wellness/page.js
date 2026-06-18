import Link from "next/link";
import PageHero from "@/components/PageHero";

export const metadata = {
  title: "Lumera Wellness Case Study",
  description:
    "A modern Next.js wellness website focused on fast rendering, clear service structure and SEO-friendly pages.",
  openGraph: {
    title: "Lumera Wellness Case Study",
    description:
      "A Next.js and React wellness website built for performance, clean structure and SEO-friendly content.",
  },
  alternates: {
    languages: {
      en: "/en/projects/lumera-wellness",
      sr: "/sr/projekti/lumera-wellness",
    },
  },
};

export default function LumeraWellnessCaseStudyPage() {
  return (
    <main>
      <PageHero
        eyebrow="Case Study"
        title="Lumera Wellness — a modern Next.js wellness website"
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
        A modern wellness website built with Next.js and React, focused on fast
        rendering, a clear service structure and SEO-friendly pages for spa and
        wellness offerings. This project is currently in development.
      </PageHero>

      <div className="public-page">
        <Link href="/en/projects" className="case-study-back">
          ← Back to projects
        </Link>

        <section className="case-study-meta">
          <div>
            <span>Project type</span>
            <strong>Next.js / React / Wellness website</strong>
          </div>
          <div>
            <span>Industry</span>
            <strong>Wellness / Spa / Self-care</strong>
          </div>
          <div>
            <span>Focus</span>
            <strong>Performance, structure, SEO and clean UX</strong>
          </div>
          <div>
            <span>Role</span>
            <strong>Frontend development, page structure, SEO foundations</strong>
          </div>
        </section>

        <section className="case-study-section">
          <h2>Project overview</h2>
          <p>
            Lumera Wellness is a modern wellness website built with Next.js. The
            goal is to present spa and wellness services through a fast, clean
            and well-structured experience, where visitors can quickly find
            treatments, understand the offer and reach a clear contact path.
            This is placeholder content that will be expanded as the project
            develops.
          </p>
        </section>

        <section className="case-study-section">
          <h2>Project goals</h2>
          <ul className="case-study-list">
            <li>Build a fast Next.js website with strong performance</li>
            <li>Present wellness services with a clear, scannable structure</li>
            <li>Prepare SEO-friendly pages for better visibility</li>
            <li>Keep the design clean, calm and easy to navigate</li>
            <li>Deliver a smooth experience across desktop and mobile</li>
          </ul>
        </section>

        <section className="case-study-section">
          <h2>What is being built</h2>
          <div className="case-study-grid">
            <article>
              <h3>Service structure</h3>
              <p>
                Wellness treatments are organized into clear categories so
                visitors can understand the offer and compare options easily.
              </p>
            </article>
            <article>
              <h3>Performance first</h3>
              <p>
                Next.js rendering, image optimization and clean components keep
                the site fast and responsive on every device.
              </p>
            </article>
            <article>
              <h3>SEO foundations</h3>
              <p>
                Page structure, headings and metadata are prepared with search
                visibility in mind from the start.
              </p>
            </article>
            <article>
              <h3>Calm, clean UX</h3>
              <p>
                A simple and consistent layout supports a relaxing, trustworthy
                feel that fits a wellness brand.
              </p>
            </article>
          </div>
        </section>

        <section className="case-study-section">
          <h2>Tools and technologies</h2>
          <div className="tech-stack">
            <span>Next.js</span>
            <span>React</span>
            <span>App Router</span>
            <span>JavaScript</span>
            <span>CSS</span>
            <span>Responsive design</span>
            <span>SEO foundations</span>
            <span>Performance optimization</span>
          </div>
        </section>

        <section className="case-study-section">
          <h2>Possible next steps</h2>
          <ul className="case-study-list">
            <li>Expand treatment and service pages with real content</li>
            <li>Add a booking or inquiry flow</li>
            <li>Connect a CMS for easier content updates</li>
            <li>Add a project gallery with real screenshots</li>
            <li>Track search performance and refine SEO</li>
          </ul>
        </section>

        <section className="case-study-cta">
          <h2>Need a fast, modern website?</h2>
          <p>
            If you want a clean, performant website built with Next.js for your
            wellness or service business, I can help you define and build the
            next practical step.
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
