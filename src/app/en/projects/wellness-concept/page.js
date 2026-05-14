import Link from "next/link";
import PageHero from "@/components/PageHero";

export default function WellnessConceptCaseStudyPage() {
  return (
    <main className="public-page">
      <PageHero
        eyebrow="Case Study"
        title="Wellness Concept — WordPress, UX and SEO structure improvement"
      >
        A WordPress and Elementor-based project for a massage and wellness
        business, focused on clearer service structure, better user flow,
        stronger booking paths and SEO-friendly page organization.
      </PageHero>

      <section className="case-study-meta">
        <div>
          <span>Project type</span>
          <strong>WordPress / Elementor / SEO / UX</strong>
        </div>
        <div>
          <span>Industry</span>
          <strong>Wellness / Massage services</strong>
        </div>
        <div>
          <span>Focus</span>
          <strong>Structure, usability, performance and SEO foundations</strong>
        </div>
        <div>
          <span>Role</span>
          <strong>WordPress development, page structure, SEO basics, UX improvements</strong>
        </div>
      </section>

      <section className="case-study-section">
        <h2>Project overview</h2>
        <p>
          Wellness Concept is a service-based website where clarity, trust and
          easy navigation are important. The goal was to organize the website
          around clear service categories, improve the path toward booking and
          prepare the structure for better search visibility.
        </p>
      </section>

      <section className="case-study-section">
        <h2>The challenge</h2>
        <p>
          The website needed a clearer way to present massage treatments,
          pricing, booking information and contact paths. For service-based
          businesses, users should quickly understand what is offered, which
          treatment fits their needs and how they can book an appointment.
        </p>
        <ul className="case-study-list">
          <li>Service information needed clearer structure</li>
          <li>Booking path had to be easier to follow</li>
          <li>Mobile layout needed to stay simple and usable</li>
          <li>SEO structure needed stronger page organization</li>
          <li>Content had to support both users and search engines</li>
        </ul>
      </section>

      <section className="case-study-section">
        <h2>Project goals</h2>
        <ul className="case-study-list">
          <li>Create a clearer website structure</li>
          <li>Improve service presentation</li>
          <li>Make booking paths more visible</li>
          <li>Prepare pages for SEO improvements</li>
          <li>Keep the design clean and easy to maintain</li>
          <li>Improve user experience across desktop and mobile</li>
        </ul>
      </section>

      <section className="case-study-section">
        <h2>What was improved</h2>
        <div className="case-study-grid">
          <article>
            <h3>Service structure</h3>
            <p>
              Services were organized into clearer categories so visitors can
              understand the offer faster and compare treatments more easily.
            </p>
          </article>
          <article>
            <h3>User flow</h3>
            <p>
              Important actions like viewing treatments, checking prices and
              booking an appointment were made easier to reach.
            </p>
          </article>
          <article>
            <h3>SEO foundations</h3>
            <p>
              The page structure, headings and content organization were
              prepared with search visibility in mind.
            </p>
          </article>
          <article>
            <h3>Performance mindset</h3>
            <p>
              The project included attention to image optimization, clean page
              structure and practical performance improvements.
            </p>
          </article>
        </div>
      </section>

      <section className="case-study-section">
        <h2>Tools and technologies</h2>
        <div className="tech-stack">
          <span>WordPress</span>
          <span>Elementor</span>
          <span>Elementor Pro</span>
          <span>BookingPress</span>
          <span>Yoast SEO</span>
          <span>W3 Total Cache</span>
          <span>WebP image optimization</span>
          <span>Responsive design</span>
          <span>UX structure</span>
          <span>Technical SEO basics</span>
        </div>
      </section>

      <section className="case-study-section">
        <h2>Result</h2>
        <p>
          The project created a cleaner and more structured online presence for
          Wellness Concept. The website is easier to navigate, services are
          easier to understand and the structure is better prepared for SEO,
          performance improvements and future content expansion.
        </p>
        <ul className="case-study-list">
          <li>Clearer service presentation</li>
          <li>Better booking path visibility</li>
          <li>Stronger page structure</li>
          <li>More consistent mobile experience</li>
          <li>Better foundation for SEO and future improvements</li>
        </ul>
      </section>

      <section className="case-study-section">
        <h2>Possible next steps</h2>
        <ul className="case-study-list">
          <li>Continue improving treatment pages</li>
          <li>Add more SEO-focused landing pages</li>
          <li>Improve internal linking between services</li>
          <li>Track search performance through Google Search Console</li>
          <li>Continue optimizing images and page speed</li>
        </ul>
      </section>

      <section className="case-study-cta">
        <h2>Need a similar WordPress improvement?</h2>
        <p>
          If your website needs a clearer structure, better service presentation
          or SEO-focused improvements, I can help you define the next practical
          step.
        </p>
        <div className="case-study-cta-actions">
          <Link href="/en/contact">Contact me</Link>
          <Link href="/en/services" className="case-study-cta-secondary">
            View services
          </Link>
        </div>
      </section>
    </main>
  );
}
