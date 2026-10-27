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
    { "@type": "ListItem", "position": 3, "name": "PNR Scout", "item": "https://dwebsolutions.rs/en/projects/pnr-scout" },
  ],
};

const IMAGES = [
  "/Projects/pnrscout2.png",
  "/Projects/pnrscout1-clean.png",
  "/Projects/pnrscout6.png",
  "/Projects/pnrscout5-clean.png",
  "/Projects/pnrscout7.png",
  "/Projects/pnrscout3.png",
  "/Projects/pnrscout4.png",
];

// ProjectCarousel numbers a single alt per slide, so this describes the set in order:
// homepage, teams directory, player comparison, tier list, player profile,
// example projection section, player database section.
const IMAGES_ALT =
  "PNR Scout EuroLeague analytics website in a dark interface: homepage, teams directory, player comparison table, club tier list, player profile, example projection section and player database section, screenshot";

export const metadata = {
  title: "PNR Scout — EuroLeague Analytics Platform Case Study",
  description:
    "Front-end case study of PNR Scout, a EuroLeague player analytics website: player comparison, an interactive club tier list, team and player navigation and a responsive interface.",
  openGraph: {
    title: "PNR Scout — EuroLeague Analytics Platform Case Study",
    description:
      "Front-end development for a EuroLeague player analytics website: player comparison, an interactive club tier list and a responsive interface.",
  },
  alternates: {
    canonical: "/en/projects/pnr-scout",
    languages: {
      en: "/en/projects/pnr-scout",
      sr: "/sr/projekti/pnr-scout",
    },
  },
};

export default function PnrScoutCaseStudyPage() {
  return (
    <main>
      <JsonLd data={breadcrumbSchema} />
      <PageHero
        eyebrow="Case Study"
        title="PNR Scout — EuroLeague Analytics Platform"
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
        PNR Scout is an independent EuroLeague player intelligence and scouting
        website. This case study covers the front-end work contributed to its
        public site: the player comparison tool, an interactive club tier list,
        team and player navigation and a responsive interface.
      </PageHero>

      <div className="public-page">
        <Link href="/en/projects" className="case-study-back">
          ← Back to projects
        </Link>

        <section className="case-study-meta">
          <div>
            <span>Project type</span>
            <strong>Web platform / HTML / CSS / JavaScript</strong>
          </div>
          <div>
            <span>Industry</span>
            <strong>Basketball analytics (EuroLeague)</strong>
          </div>
          <div>
            <span>Status</span>
            <strong>Live site, AI/ML beta in development</strong>
          </div>
          <div>
            <span>Role</span>
            <strong>Front-end development as part of the PNR Scout team</strong>
          </div>
        </section>

        <section className="case-study-section">
          <h2>Project gallery</h2>
          <ProjectCarousel images={IMAGES} alt={IMAGES_ALT} />
        </section>

        <section className="case-study-section">
          <h2>Project overview</h2>
          <p>
            PNR Scout presents EuroLeague player data (team rosters, player
            profiles, side-by-side comparisons and editorial articles) through a
            fast, statically generated website. It describes itself as an
            analytics and scouting resource and is not affiliated with any
            league or club.
          </p>
          <p>
            The product is built by a team. This case study describes the
            public-website front-end work and states clearly where that scope
            ends.
          </p>
        </section>

        <section className="case-study-section">
          <h2>Purpose and audience</h2>
          <p>
            The site is meant for people who follow the EuroLeague and want
            player numbers in one readable place: season averages, recent form
            and how one player stacks up against another. The interface is
            designed so that a visitor can reach a player, a team or a
            comparison within a couple of clicks.
          </p>
        </section>

        <section className="case-study-section">
          <h2>Platform architecture and interface</h2>
          <p>
            Pages are generated at build time from player and team data files by
            Node.js build scripts, which produces plain HTML served as static
            assets on Cloudflare. The interactive parts, such as player search,
            comparison and the tier list, are written in vanilla JavaScript on
            top of those generated pages, with no front-end framework.
          </p>
          <ul className="case-study-list">
            <li>Site-wide header and footer with a mobile navigation menu</li>
            <li>Player search available from every page</li>
            <li>Consistent breadcrumbs from the home page to teams and players</li>
            <li>A dark, data-focused visual style shared across all sections</li>
          </ul>
        </section>

        <section className="case-study-section">
          <h2>EuroLeague player database and statistics</h2>
          <p>
            The site is organized around teams. The teams directory links to a
            page for every club, and each club page links to its players.
            Player profiles present season averages, recent form, home and away
            splits, per-36 rates and short written notes, laid out so the key
            numbers are readable at a glance.
          </p>
          <div className="case-study-grid">
            <article>
              <h3>Teams directory</h3>
              <p>
                Every club appears as a card with its roster size and top scorer,
                with a featured club highlighted at the top of the page.
              </p>
            </article>
            <article>
              <h3>Team pages</h3>
              <p>
                Each club page carries an arena photo background and its full
                roster, linking through to individual player profiles.
              </p>
            </article>
            <article>
              <h3>Player profiles</h3>
              <p>
                Season averages, a last-games table and splits are presented in
                compact stat tiles and tables.
              </p>
            </article>
          </div>
        </section>

        <section className="case-study-section">
          <h2>Player comparison experience</h2>
          <p>
            The comparison tool lets a visitor pick two to four players with a
            search-as-you-type picker and see their season averages and per-36
            rates side by side. The leading value in each row is highlighted, so
            the difference between players reads immediately.
          </p>
          <ul className="case-study-list">
            <li>Dedicated comparison page and a compare panel reachable from the navigation</li>
            <li>A compare button on each player profile</li>
            <li>Selection kept in the browser, so it follows the visitor between pages</li>
          </ul>
        </section>

        <section className="case-study-section">
          <h2>Interactive tier list</h2>
          <p>
            The EuroLeague club tier list lets visitors rank every club from
            Championship Contender down to Rebuilding by dragging clubs into
            tiers. Tiers can be added or removed, the layout is saved in the
            browser and the finished list can be exported as an image to share.
          </p>
          <p>
            The pointer-based drag interaction, saved state and image export are
            plain JavaScript, using the Canvas API to render the exported image.
          </p>
        </section>

        <section className="case-study-section">
          <h2>Responsive interface and user experience</h2>
          <p>
            The interface was refined for desktop and mobile, including a
            collapsing navigation menu, tighter hero spacing so the main call to
            action appears earlier on small screens, and a wider content
            container on large ones.
          </p>
        </section>

        <section className="case-study-section">
          <h2>Verified development contributions</h2>
          <p>
            The items below were checked against the project&apos;s Git history.
            They cover the public website front end only.
          </p>
          <ul className="case-study-list">
            <li>Homepage redesign, including the hero, about, signals, example projection and player database sections</li>
            <li>Site-wide header and footer, mobile navigation menu and player search</li>
            <li>Restructuring of the site around Teams, with Blog and About page templates</li>
            <li>Team page presentation: arena photo backgrounds, a teams ticker and richer team cards</li>
            <li>Player comparison: dedicated page, navigation sidebar and per-player compare button</li>
            <li>Initial tier list implementation: drag-and-drop interaction, saved state and image export</li>
            <li>Search-result favicon and navigation polish</li>
          </ul>
          <p>
            Backend services, the data pipeline, the AI/ML projection work and
            other features are handled by the wider PNR Scout team and are not
            part of this case study.
          </p>
        </section>

        <section className="case-study-section">
          <h2>Current product status</h2>
          <p>
            The public website is live with team, player, comparison, tier list
            and blog sections. AI/ML performance projections and game-day
            alerts are presented by the product as a beta, and the projection
            shown on the homepage is labelled as an illustrative example. They
            should not be read as a released feature. Statistics and counts on
            the site change over time, so the live site is the reference for
            current figures.
          </p>
        </section>

        <section className="case-study-section">
          <h2>View the website</h2>
          <p>
            PNR Scout is publicly available. Content and features may have
            changed since the screenshots in this case study were taken.
          </p>
          <div className="case-study-cta-actions" style={{ marginTop: "16px" }}>
            <a
              href="https://pnrscout.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              pnrscout.com ↗
            </a>
          </div>
        </section>

        <section className="case-study-section">
          <h2>Tools and technologies</h2>
          <div className="tech-stack">
            <span>HTML</span>
            <span>CSS</span>
            <span>JavaScript (no framework)</span>
            <span>Node.js build scripts</span>
            <span>Static site generation</span>
            <span>Canvas API</span>
            <span>Cloudflare Workers (hosting)</span>
          </div>
        </section>

        <section className="case-study-cta">
          <h2>Need a data-driven website with interactive features?</h2>
          <p>
            If your project needs clear data presentation, comparison tools or
            interactive elements, we can help you define the next practical
            step.
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
