import Link from "next/link";
import PageHero from "@/components/PageHero";

export default function WellnessConceptCaseStudyPage() {
  return (
    <main className="public-page">
      <PageHero eyebrow="Case study" title="Wellness Concept">
        WordPress presentation website for a massage salon, developed with a
        focus on clear treatment structure, better user experience, SEO
        foundation, and a more professional online presence.
      </PageHero>

      <section className="case-study-meta">
        <div>
          <span>Platform</span>
          <strong>WordPress</strong>
        </div>

        <div>
          <span>Builder</span>
          <strong>Elementor Pro</strong>
        </div>

        <div>
          <span>Focus</span>
          <strong>SEO / UX / Structure</strong>
        </div>

        <div>
          <span>Type</span>
          <strong>Business website</strong>
        </div>
      </section>

      <section className="case-study-section">
        <h2>Project overview</h2>
        <p>
          Wellness Concept is a website for a massage and treatment salon, where
          the main goal was to present the services clearly, professionally, and
          with good overview. The work focused on better page structure,
          treatment organization, a clearer user journey, and basic SEO
          optimization for relevant services.
        </p>
      </section>

      <section className="case-study-section">
        <h2>My role</h2>
        <div className="case-study-grid">
          <article>
            <h3>WordPress structure</h3>
            <p>
              Working on page organization, sections, navigation, and content
              so users can more easily find treatments and information they
              need.
            </p>
          </article>

          <article>
            <h3>Elementor layout</h3>
            <p>
              Creating and customizing sections in Elementor, working with
              cards, hero sections, responsive layouts, and visual hierarchy.
            </p>
          </article>

          <article>
            <h3>SEO basics</h3>
            <p>
              Setting up basic SEO elements, heading structure, service
              descriptions, and content that better explains treatments and
              local offerings.
            </p>
          </article>

          <article>
            <h3>Technical improvements</h3>
            <p>
              Working on technical settings, checking mobile display, basic
              performance optimization, and resolving display issues.
            </p>
          </article>
        </div>
      </section>

      <section className="case-study-section">
        <h2>Key improvements</h2>
        <ul className="case-study-list">
          <li>Clearer presentation of services and treatments.</li>
          <li>Improved homepage structure.</li>
          <li>Better organized cards for the most popular treatments.</li>
          <li>Responsive display improvements for mobile devices.</li>
          <li>Basic SEO content organization.</li>
          <li>More professional visual appearance of the site.</li>
        </ul>
      </section>

      <section className="case-study-section">
        <h2>Tools and technologies</h2>
        <div className="tech-stack">
          <span>WordPress</span>
          <span>Elementor Pro</span>
          <span>Hello Elementor</span>
          <span>Yoast SEO</span>
          <span>Google Site Kit</span>
          <span>W3 Total Cache</span>
          <span>CSS</span>
        </div>
      </section>

      <section className="case-study-cta">
        <h2>Result</h2>
        <p>
          The project demonstrates my experience working with a real WordPress
          site, Elementor structure, SEO basics, and the practical challenges
          small businesses face with their online presence.
        </p>

        <Link href="/en/projects" className="case-study-button">
          Back to projects
        </Link>
      </section>
    </main>
  );
}
