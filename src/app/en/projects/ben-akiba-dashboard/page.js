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
    { "@type": "ListItem", "position": 3, "name": "Ben Akiba Dashboard", "item": "https://djordjepopovic.com/en/projects/ben-akiba-dashboard" },
  ],
};

const IMAGES = [
  "/Projects/ben-akiba-dashboard_1.png",
  "/Projects/ben-akiba-dashboard_2.png",
  "/Projects/ben-akiba-dashboard_3.png",
  "/Projects/ben-akiba-dashboard_4.png",
  "/Projects/ben-akiba-dashboard_5.png",
];

export const metadata = {
  title: "Ben Akiba Dashboard Case Study",
  description:
    "Next.js and Supabase admin dashboard for Ben Akiba events, reservations, stand-up shows and parties.",
  openGraph: {
    title: "Ben Akiba Dashboard Case Study",
    description:
      "Event management dashboard with a public event overview and an admin panel for reservations and event setup.",
  },
  alternates: {
    canonical: "/en/projects/ben-akiba-dashboard",
    languages: {
      en: "/en/projects/ben-akiba-dashboard",
      sr: "/sr/projekti/ben-akiba-dashboard",
    },
  },
};

export default function BenAkibaDashboardPage() {
  return (
    <main>
      <JsonLd data={breadcrumbSchema} />
      <PageHero
        eyebrow="Case Study"
        title="Ben Akiba Dashboard - Event Management Admin Panel"
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
        Admin dashboard application for managing Ben Akiba stand-up shows and
        parties, combining a public event overview with an internal panel for
        reservations, event data, capacity tracking and PDF-ready reporting.
      </PageHero>

      <div className="public-page">
        <section className="case-study-meta">
          <div>
            <span>Project type</span>
            <strong>Next.js / React / Supabase dashboard</strong>
          </div>
          <div>
            <span>Industry</span>
            <strong>Events / Comedy club / Nightlife</strong>
          </div>
          <div>
            <span>Focus</span>
            <strong>Events, reservations, guest counts, admin workflow</strong>
          </div>
          <div>
            <span>Role</span>
            <strong>Frontend, dashboard structure, Supabase integration, deployment</strong>
          </div>
        </section>

        <section className="case-study-section">
          <h2>Project gallery</h2>
          <ProjectCarousel images={IMAGES} alt="Ben Akiba Dashboard" />
        </section>

        <section className="case-study-section">
          <h2>Project overview</h2>
          <p>
            Ben Akiba Dashboard is a web application for organizing monthly
            stand-up and party events. The public front page lets visitors see
            available event categories, monthly listings, performers, prices and
            current reservation numbers, while the admin panel gives the team a
            focused place to manage event details and guest reservations.
          </p>
        </section>

        <section className="case-study-section">
          <h2>The challenge</h2>
          <ul className="case-study-list">
            <li>Event information needed to be clear for both public visitors and internal staff</li>
            <li>Stand-up shows and parties required different table structures and visual treatment</li>
            <li>Reservation totals had to stay visible while working with individual guest entries</li>
            <li>The admin flow needed a fast form for creating new events</li>
            <li>The project needed to be available online through a shared Vercel link</li>
          </ul>
        </section>

        <section className="case-study-section">
          <h2>Project goals</h2>
          <ul className="case-study-list">
            <li>Create a polished public front page for choosing Stand Up or Party listings</li>
            <li>Build readable monthly repertoire tables with dates, performers, prices and reservations</li>
            <li>Provide an admin event detail view with capacity and reservation statistics</li>
            <li>Support event creation through a structured admin form</li>
            <li>Deploy the application on Vercel with Supabase as the backend data layer</li>
          </ul>
        </section>

        <section className="case-study-section">
          <h2>What was built</h2>
          <div className="case-study-grid">
            <article>
              <h3>Public event overview</h3>
              <p>
                A branded front page lets users choose between Stand Up and
                Party repertoires and quickly understand what type of events are
                available.
              </p>
            </article>
            <article>
              <h3>Monthly repertoire tables</h3>
              <p>
                Event lists show dates, times, performers, prices and live
                reservation counts in a format suited for quick scanning.
              </p>
            </article>
            <article>
              <h3>Admin reservation view</h3>
              <p>
                The event detail page summarizes all reservations, ticket
                sources, confirmed guests, waiting list, capacity and available
                seats.
              </p>
            </article>
            <article>
              <h3>New event workflow</h3>
              <p>
                A structured form allows the admin to create new events with
                type, title, performer, date, time, price, capacity, phone and
                status data.
              </p>
            </article>
          </div>
        </section>

        <section className="case-study-section">
          <h2>Tools and technologies</h2>
          <div className="tech-stack">
            <span>Next.js</span>
            <span>React</span>
            <span>JavaScript</span>
            <span>CSS</span>
            <span>Supabase</span>
            <span>Vercel</span>
            <span>Admin dashboard</span>
            <span>Event management</span>
          </div>
        </section>

        <section className="case-study-section">
          <h2>Result</h2>
          <p>
            The project delivers a focused event-management dashboard with a
            public-facing overview and a practical internal admin area. It helps
            the team keep event data, reservation counts and capacity numbers in
            one place while keeping the public view simple and easy to browse.
          </p>
          <ul className="case-study-list">
            <li>Public front page for Stand Up and Party repertoires</li>
            <li>Separate event listings for different event types</li>
            <li>Admin detail page with reservation and capacity statistics</li>
            <li>Form for adding new events</li>
            <li>Vercel deployment connected with Supabase data</li>
          </ul>
        </section>

        <section className="case-study-section">
          <h2>Possible next steps</h2>
          <ul className="case-study-list">
            <li>Add more advanced filtering by month, event type and status</li>
            <li>Improve mobile admin views for faster work on smaller screens</li>
            <li>Add role-based access for different staff members</li>
            <li>Expand PDF reporting and export options</li>
            <li>Connect analytics for event attendance and reservation trends</li>
          </ul>
        </section>

        <section className="case-study-cta">
          <h2>Need a custom admin dashboard?</h2>
          <p>
            If your team needs a practical dashboard for events, reservations,
            clients or internal workflows, I can build a focused web app around
            the way your business actually works.
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
