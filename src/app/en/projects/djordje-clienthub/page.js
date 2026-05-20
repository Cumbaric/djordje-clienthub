import Link from "next/link";
import PageHero from "@/components/PageHero";
import ProjectCarousel from "@/components/ProjectCarousel";

const IMAGES = [
  "/Projects/djordje_clienthub_1.png",
  "/Projects/djordje_clienthub_2.png",
  "/Projects/djordje_clienthub_3.png",
  "/Projects/djordje_clienthub_4.png",
  "/Projects/djordje_clienthub_5.png",
  "/Projects/djordje_clienthub_6.png",
];

export const metadata = {
  title: "Djordje ClientHub Case Study | Đorđe Popović",
  description:
    "Next.js bilingual portfolio and private dashboard application built with React, App Router, route protection and AI-assisted development workflow.",
  openGraph: {
    title: "Djordje ClientHub Case Study",
    description:
      "Full-stack Next.js project combining a public bilingual portfolio with a protected internal dashboard for clients, projects, tasks and work notes.",
  },
  alternates: {
    languages: {
      en: "/en/projects/djordje-clienthub",
      sr: "/sr/projekti/djordje-clienthub",
    },
  },
};

export default function DjordjeClientHubPage() {
  return (
    <main>
      <PageHero
        eyebrow="Case Study"
        title="Djordje ClientHub — Bilingual Portfolio and Private Dashboard"
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
        Full-stack Next.js application combining a public bilingual portfolio
        (EN/SR) with a protected internal dashboard for managing clients,
        projects, tasks and work notes — built with an AI-assisted development
        workflow.
      </PageHero>

      <div className="public-page">
      <section className="case-study-meta">
        <div>
          <span>Project type</span>
          <strong>Next.js / React / App Router / Dashboard</strong>
        </div>
        <div>
          <span>Industry</span>
          <strong>Web development / Personal tooling</strong>
        </div>
        <div>
          <span>Focus</span>
          <strong>Full-stack architecture, auth protection, bilingual content, internal tooling</strong>
        </div>
        <div>
          <span>Role</span>
          <strong>Full-stack development, architecture, design, deployment</strong>
        </div>
      </section>

      <section className="case-study-section">
        <h2>Project gallery</h2>
        <ProjectCarousel images={IMAGES} alt="Djordje ClientHub" />
      </section>

      <section className="case-study-section">
        <h2>Project overview</h2>
        <p>
          Personal project combining two distinct parts — a public-facing
          bilingual portfolio and a private password-protected dashboard for
          internal project and client management. Built with Next.js App Router
          and deployed on Vercel.
        </p>
      </section>

      <section className="case-study-section">
        <h2>The challenge</h2>
        <ul className="case-study-list">
          <li>Needed both a professional public portfolio and a private management tool in one codebase</li>
          <li>Bilingual content (EN/SR) required a clean routing architecture</li>
          <li>Route protection had to work reliably without a backend service</li>
          <li>Dashboard needed to handle clients, projects, tasks and notes</li>
          <li>AI-assisted workflow had to be integrated naturally into the development process</li>
        </ul>
      </section>

      <section className="case-study-section">
        <h2>Project goals</h2>
        <ul className="case-study-list">
          <li>Build a polished bilingual public portfolio</li>
          <li>Create a protected private dashboard</li>
          <li>Implement reliable route protection without a separate backend</li>
          <li>Keep the codebase clean and maintainable</li>
          <li>Deploy reliably on Vercel with no production issues</li>
        </ul>
      </section>

      <section className="case-study-section">
        <h2>What was built</h2>
        <div className="case-study-grid">
          <article>
            <h3>Public portfolio</h3>
            <p>
              A bilingual (EN/SR) portfolio with home, projects, services,
              process and contact pages, featuring premium visual details and
              smooth animations.
            </p>
          </article>
          <article>
            <h3>Protected dashboard</h3>
            <p>
              A private dashboard accessible only after login, containing
              sections for clients, projects, tasks and work notes.
            </p>
          </article>
          <article>
            <h3>Route protection</h3>
            <p>
              Middleware-based route protection using JWT tokens stored in
              HTTP-only cookies, working reliably in both development and
              production.
            </p>
          </article>
          <article>
            <h3>AI-assisted workflow</h3>
            <p>
              The entire project was built using an AI-assisted development
              workflow, combining Claude with manual code review for faster,
              cleaner output.
            </p>
          </article>
        </div>
      </section>

      <section className="case-study-section">
        <h2>Tools and technologies</h2>
        <div className="tech-stack">
          <span>Next.js 16</span>
          <span>React</span>
          <span>App Router</span>
          <span>CSS Modules</span>
          <span>JWT authentication</span>
          <span>HTTP-only cookies</span>
          <span>Middleware route protection</span>
          <span>Vercel deployment</span>
          <span>AI-assisted workflow</span>
          <span>Bilingual routing</span>
          <span>Server and client components</span>
        </div>
      </section>

      <section className="case-study-section">
        <h2>Result</h2>
        <p>
          A production-deployed full-stack application combining a premium
          public portfolio with a functional private dashboard. The project
          demonstrates modern Next.js architecture, clean code organization and
          reliable deployment on Vercel.
        </p>
        <ul className="case-study-list">
          <li>Live bilingual portfolio at djordje-clienthub.vercel.app</li>
          <li>Protected dashboard with client and project management</li>
          <li>Reliable JWT-based route protection</li>
          <li>Clean App Router architecture</li>
          <li>Built with AI-assisted development workflow</li>
        </ul>
      </section>

      <section className="case-study-section">
        <h2>Possible next steps</h2>
        <ul className="case-study-list">
          <li>Add more dashboard features (invoicing, time tracking)</li>
          <li>Expand project case studies with more detail pages</li>
          <li>Improve dashboard analytics and reporting</li>
          <li>Add email notifications for client updates</li>
          <li>Continue improving public portfolio content and visuals</li>
        </ul>
      </section>

      <section className="case-study-cta">
        <h2>Interested in a Next.js portfolio or dashboard?</h2>
        <p>
          If you need a modern portfolio, a custom internal tool or a full-stack
          Next.js application, I can help you plan and build it.
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
