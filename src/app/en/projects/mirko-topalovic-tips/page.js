import Link from "next/link";
import PageHero from "@/components/PageHero";

export const metadata = {
  title: "MirkoTopalovićTips Case Study | Đorđe Popović",
  description:
    "WordPress content platform for sports tips, focused on content organization, improved structure and preparation for future automation workflows.",
  openGraph: {
    title: "MirkoTopalovićTips Case Study",
    description:
      "WordPress project for a sports tips platform improving content structure, post organization and navigation for better user experience.",
  },
  alternates: {
    languages: {
      en: "/en/projects/mirko-topalovic-tips",
      sr: "/sr/projekti/mirko-topalovic-tips",
    },
  },
};

export default function MirkoTopalovicTipsPage() {
  return (
    <main>
      <PageHero
        eyebrow="Case Study"
        title="MirkoTopalovićTips — Sports Tips Content Platform and Structure"
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
        Content-driven WordPress project for a sports betting tips platform,
        focused on organizing published tips, improving content structure,
        creating clear navigation and preparing the site for easier management
        and future automation workflows.
      </PageHero>

      <div className="public-page">
        <section className="case-study-meta">
          <div>
            <span>Project type</span>
            <strong>WordPress / Content structure / Sports tips</strong>
          </div>
          <div>
            <span>Industry</span>
            <strong>Sports / Betting tips content</strong>
          </div>
          <div>
            <span>Focus</span>
            <strong>Content organization, navigation, automation planning</strong>
          </div>
          <div>
            <span>Role</span>
            <strong>WordPress development, content structure, post organization, workflow planning</strong>
          </div>
        </section>

        <section className="case-study-section">
          <h2>Project overview</h2>
          <p>
            Content platform publishing regular sports betting tips where readers
            need to quickly find recent tips, browse by sport or category and
            trust the site's structure. Goal was a well-organized content
            platform ready for consistent publishing and future scaling.
          </p>
        </section>

        <section className="case-study-section">
          <h2>The challenge</h2>
          <ul className="case-study-list">
            <li>Published tips lacked clear organization by category or sport</li>
            <li>Navigation made it hard for readers to find specific content</li>
            <li>Post structure was inconsistent across different tip types</li>
            <li>The site needed a foundation ready for regular content publishing</li>
            <li>Future automation workflows required a clean structural base</li>
          </ul>
        </section>

        <section className="case-study-section">
          <h2>Project goals</h2>
          <ul className="case-study-list">
            <li>Organize existing and future tips content clearly</li>
            <li>Create consistent post structure and categories</li>
            <li>Improve navigation for different types of content</li>
            <li>Build a foundation ready for future automation</li>
            <li>Make the site easier for the publisher to manage</li>
          </ul>
        </section>

        <section className="case-study-section">
          <h2>What was improved</h2>
          <div className="case-study-grid">
            <article>
              <h3>Content organization</h3>
              <p>
                Tips were organized into clear categories by sport and type,
                making it easier for readers to browse and find relevant content.
              </p>
            </article>
            <article>
              <h3>Post structure</h3>
              <p>
                A consistent post format was established for tips, making
                publishing faster and the reading experience more consistent.
              </p>
            </article>
            <article>
              <h3>Navigation</h3>
              <p>
                Site navigation was improved so readers can quickly reach the
                content they are looking for.
              </p>
            </article>
            <article>
              <h3>Automation readiness</h3>
              <p>
                The site structure was prepared with future automation workflows
                in mind, making it easier to scale content publishing.
              </p>
            </article>
          </div>
        </section>

        <section className="case-study-section">
          <h2>Tools and technologies</h2>
          <div className="tech-stack">
            <span>WordPress</span>
            <span>Content structure planning</span>
            <span>Category organization</span>
            <span>Post format standardization</span>
            <span>Navigation improvement</span>
            <span>Automation workflow planning</span>
            <span>SEO basics</span>
            <span>Responsive design</span>
          </div>
        </section>

        <section className="case-study-section">
          <h2>Result</h2>
          <p>
            The project created a more organized and navigable sports tips
            platform where content is easier to publish, browse and manage. The
            structural improvements also laid the groundwork for future
            automation and content scaling.
          </p>
          <ul className="case-study-list">
            <li>Clearer content organization by category</li>
            <li>Consistent post structure</li>
            <li>Improved reader navigation</li>
            <li>Better foundation for regular publishing</li>
            <li>Prepared for future automation workflows</li>
          </ul>
        </section>

        <section className="case-study-section">
          <h2>Possible next steps</h2>
          <ul className="case-study-list">
            <li>Implement content automation for tip publishing</li>
            <li>Add filtering by sport, league or date</li>
            <li>Create SEO-optimized category landing pages</li>
            <li>Track reader behavior through analytics</li>
            <li>Explore newsletter or notification workflows for followers</li>
          </ul>
        </section>

        <section className="case-study-cta">
          <h2>Need a content platform or WordPress structure improvement?</h2>
          <p>
            If you run a content-heavy website and need better organization,
            cleaner structure or a foundation ready for automation, I can help
            you plan the right approach.
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
