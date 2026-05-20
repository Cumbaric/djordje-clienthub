import Link from "next/link";
import PageHero from "@/components/PageHero";
import ProjectCarousel from "@/components/ProjectCarousel";

const IMAGES = [
  "/Projects/Olvera_Popovic_1.png",
  "/Projects/Olvera_Popovic_2.png",
  "/Projects/Olvera_Popovic_3.png",
  "/Projects/Olvera_Popovic_4.png",
  "/Projects/Olvera_Popovic_5.png",
];

export const metadata = {
  title: "Olivera Popović Edu Case Study | Đorđe Popović",
  description:
    "WordPress educational website project focused on content structure, page organization and SEO foundations for better visibility and easier navigation.",
  openGraph: {
    title: "Olivera Popović Edu Case Study",
    description:
      "WordPress project improving content structure, page hierarchy and SEO foundations for an educational platform.",
  },
  alternates: {
    languages: {
      en: "/en/projects/olivera-popovic-edu",
      sr: "/sr/projekti/olivera-popovic-edu",
    },
  },
};

export default function OliveraPopovicEduPage() {
  return (
    <main>
      <PageHero
        eyebrow="Case Study"
        title="Olivera Popović Edu — Educational Website, Content Structure and SEO Foundation"
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
        WordPress project for an educational platform, focused on organizing
        content clearly, creating a proper page hierarchy and preparing the site
        structure for better search engine visibility and easier navigation for
        students and visitors.
      </PageHero>

      <div className="public-page">
        <section className="case-study-meta">
          <div>
            <span>Project type</span>
            <strong>WordPress / Education Website</strong>
          </div>
          <div>
            <span>Industry</span>
            <strong>Education / Online learning</strong>
          </div>
          <div>
            <span>Focus</span>
            <strong>Content structure, navigation, SEO foundation</strong>
          </div>
          <div>
            <span>Role</span>
            <strong>WordPress development, page structure, content organization, SEO basics</strong>
          </div>
        </section>

        <section className="case-study-section">
          <h2>Project gallery</h2>
          <ProjectCarousel images={IMAGES} alt="Olivera Popović Edu" />
        </section>

        <section className="case-study-section">
          <h2>Project overview</h2>
          <p>
            Educational platform where visitors (students, parents, interested
            learners) need to quickly find courses, resources and contact
            information. Goal was clear content hierarchy and search-ready
            structure.
          </p>
        </section>

        <section className="case-study-section">
          <h2>The challenge</h2>
          <ul className="case-study-list">
            <li>Content lacked clear organization</li>
            <li>Course and resource pages needed proper hierarchy</li>
            <li>Navigation needed to be intuitive for different visitor types</li>
            <li>SEO structure needed to support long-term visibility</li>
            <li>Mobile experience needed to stay clean and accessible</li>
          </ul>
        </section>

        <section className="case-study-section">
          <h2>Project goals</h2>
          <ul className="case-study-list">
            <li>Organize educational content with a clear structure</li>
            <li>Create consistent page hierarchy</li>
            <li>Improve navigation for students and visitors</li>
            <li>Prepare pages for SEO improvements</li>
            <li>Keep the design clean and maintainable</li>
          </ul>
        </section>

        <section className="case-study-section">
          <h2>What was improved</h2>
          <div className="case-study-grid">
            <article>
              <h3>Content structure</h3>
              <p>
                Educational content was reorganized into clear categories making
                it easier for visitors to find relevant courses and resources.
              </p>
            </article>
            <article>
              <h3>Page hierarchy</h3>
              <p>
                A consistent structure across pages was created, making the site
                easier to navigate and understand.
              </p>
            </article>
            <article>
              <h3>SEO foundations</h3>
              <p>
                Page titles, headings and content structure were prepared with
                search visibility in mind.
              </p>
            </article>
            <article>
              <h3>Navigation clarity</h3>
              <p>
                The site navigation was improved so different types of visitors
                can quickly find what they need.
              </p>
            </article>
          </div>
        </section>

        <section className="case-study-section">
          <h2>Tools and technologies</h2>
          <div className="tech-stack">
            <span>WordPress</span>
            <span>Elementor</span>
            <span>Yoast SEO</span>
            <span>Responsive design</span>
            <span>Content structure</span>
            <span>SEO basics</span>
            <span>Page hierarchy planning</span>
          </div>
        </section>

        <section className="case-study-section">
          <h2>Result</h2>
          <p>
            The result is a cleaner, more organized educational website where
            content is easy to find and the structure is ready for future growth
            and SEO improvements.
          </p>
          <ul className="case-study-list">
            <li>Clearer content organization</li>
            <li>Better page hierarchy</li>
            <li>Improved navigation experience</li>
            <li>Stronger SEO foundation</li>
            <li>Easier to maintain and expand</li>
          </ul>
        </section>

        <section className="case-study-section">
          <h2>Possible next steps</h2>
          <ul className="case-study-list">
            <li>Add more structured course pages</li>
            <li>Create SEO-focused content categories</li>
            <li>Improve internal linking between resources</li>
            <li>Track visibility through Google Search Console</li>
            <li>Continue expanding content</li>
          </ul>
        </section>

        <section className="case-study-cta">
          <h2>Need a structured WordPress website?</h2>
          <p>
            If your website needs clearer content organization, better page
            structure or SEO-focused improvements, I can help you define a
            practical next step.
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
