import Link from "next/link";
import PageHero from "@/components/PageHero";
import ProjectCarousel from "@/components/ProjectCarousel";

const IMAGES = [
  "/Projects/LumeraWellness1.png",
  "/Projects/LumeraWellness2.png",
  "/Projects/LumeraWellness4.png",
  "/Projects/LumeraWellness3.png",
  "/Projects/LumeraWellness5.png",
  "/Projects/LumeraWellness6.png",
];

export const metadata = {
  title: "Lumera Wellness Case Study",
  description:
    "A Next.js wellness booking template combining a customizable public site with an admin dashboard for reservations, clients and revenue.",
  openGraph: {
    title: "Lumera Wellness Case Study",
    description:
      "A reusable Next.js booking platform for wellness studios — public marketing site plus a protected admin dashboard.",
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
        title="Lumera Wellness — a reusable Next.js booking template for wellness studios"
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
        Lumera Wellness is a Next.js booking platform built as a product — a
        polished public website paired with a protected admin dashboard, ready
        to be branded and offered to wellness and massage studios. The content
        shown is a generic demo.
      </PageHero>

      <div className="public-page">
        <Link href="/en/projects" className="case-study-back">
          ← Back to projects
        </Link>

        <section className="case-study-meta">
          <div>
            <span>Project type</span>
            <strong>Next.js / React booking template</strong>
          </div>
          <div>
            <span>Audience</span>
            <strong>Wellness, spa and massage studios</strong>
          </div>
          <div>
            <span>Focus</span>
            <strong>Booking flow, admin dashboard, reusability</strong>
          </div>
          <div>
            <span>Role</span>
            <strong>Concept, frontend, dashboard, booking system</strong>
          </div>
        </section>

        <section className="case-study-section">
          <h2>Project gallery</h2>
          <ProjectCarousel images={IMAGES} alt="Lumera Wellness" />
        </section>

        <section className="case-study-section">
          <h2>Project overview</h2>
          <p>
            Lumera Wellness is a productized booking platform rather than a
            one-off website. The goal was to build a complete, good-looking
            wellness solution once — a public marketing site plus an admin
            dashboard — and make it easy to rebrand and offer to different
            wellness and massage studios. All names, treatments and contact
            details in the demo are generic placeholders that each studio would
            replace with their own.
          </p>
        </section>

        <section className="case-study-section">
          <h2>The idea</h2>
          <p>
            Small wellness studios often need both an attractive online presence
            and a simple way to handle appointment requests, but rarely want a
            full custom build. Lumera packages both into one reusable product
            that can be set up quickly and tailored to each studio&apos;s brand.
          </p>
          <ul className="case-study-list">
            <li>One polished template instead of building from scratch each time</li>
            <li>A public site that presents services and drives bookings</li>
            <li>An admin area to review and manage incoming requests</li>
            <li>Generic demo content that is easy to replace per client</li>
            <li>A consistent, calm visual style suited to wellness brands</li>
          </ul>
        </section>

        <section className="case-study-section">
          <h2>What it includes</h2>
          <div className="case-study-grid">
            <article>
              <h3>Public marketing site</h3>
              <p>
                A modern landing experience with hero, &quot;why us&quot;
                highlights, about and story sections, services, pricing,
                contact, a newsletter signup and clear booking calls to action.
              </p>
            </article>
            <article>
              <h3>Online booking requests</h3>
              <p>
                Visitors can request an appointment for a treatment and time,
                which lands in the admin dashboard as a new pending request to
                review.
              </p>
            </article>
            <article>
              <h3>Admin dashboard</h3>
              <p>
                A protected dashboard summarizes today&apos;s and this
                week&apos;s bookings, pending requests, confirmed appointments,
                total clients and monthly revenue at a glance.
              </p>
            </article>
            <article>
              <h3>Reservations &amp; clients</h3>
              <p>
                Dedicated reservations and clients views let the studio track
                booking requests through pending, confirmed and cancelled
                statuses and keep an overview of their guests.
              </p>
            </article>
          </div>
        </section>

        <section className="case-study-section">
          <h2>Insights and management</h2>
          <ul className="case-study-list">
            <li>Command center with upcoming appointments and today&apos;s schedule</li>
            <li>&quot;Most requested treatments&quot; chart across all statuses</li>
            <li>Top treatment and recent booking-request activity</li>
            <li>Status workflow for pending, confirmed and cancelled requests</li>
            <li>Quick actions for creating a new booking and reviewing pending ones</li>
          </ul>
        </section>

        <section className="case-study-section">
          <h2>Built to be reused</h2>
          <p>
            The template is structured so the public content, branding and
            treatment data can be swapped without touching the core booking and
            dashboard logic. That makes it practical to spin up a tailored
            version for a new studio while keeping a single, maintainable
            codebase.
          </p>
        </section>

        <section className="case-study-section">
          <h2>Tools and technologies</h2>
          <div className="tech-stack">
            <span>Next.js</span>
            <span>React</span>
            <span>App Router</span>
            <span>JavaScript</span>
            <span>CSS</span>
            <span>Admin dashboard</span>
            <span>Booking system</span>
            <span>Responsive design</span>
          </div>
        </section>

        <section className="case-study-section">
          <h2>Possible next steps</h2>
          <ul className="case-study-list">
            <li>Per-studio theming and configurable branding</li>
            <li>Online payments and deposits for bookings</li>
            <li>Automated email confirmations and reminders</li>
            <li>Staff and room scheduling for larger studios</li>
            <li>Reporting and export for revenue and attendance</li>
          </ul>
        </section>

        <section className="case-study-cta">
          <h2>Want a booking site like this?</h2>
          <p>
            If you run a wellness, spa or massage studio and want a modern site
            with a built-in booking dashboard, I can adapt this platform to your
            brand and the way you work.
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
