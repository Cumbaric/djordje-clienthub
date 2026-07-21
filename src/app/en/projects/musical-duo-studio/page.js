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
    { "@type": "ListItem", "position": 3, "name": "Musical Duo Studio", "item": "https://djordjepopovic.com/en/projects/musical-duo-studio" },
  ],
};

const IMAGES = [
  "/Projects/musical_duo_studio_1.png",
  "/Projects/musical_duo_studio_2.png",
  "/Projects/musical_duo_studio_3.png",
  "/Projects/musical_duo_studio_4.png",
  "/Projects/musical_duo_studio_5.png",
];

export const metadata = {
  title: "Musical Duo Studio Case Study",
  description:
    "WordPress website for a professional guitar and bass recording studio — Elementor, Fluent Forms, Yoast SEO and W3 Total Cache.",
  openGraph: {
    title: "Musical Duo Studio Case Study",
    description:
      "WordPress project for an international music studio with video showcase, client testimonials and a project inquiry form.",
  },
  alternates: {
    canonical: "/en/projects/musical-duo-studio",
    languages: {
      en: "/en/projects/musical-duo-studio",
      sr: "/sr/projekti/musical-duo-studio",
    },
  },
};

export default function MusicalDuoStudioCaseStudyPage() {
  return (
    <main>
      <JsonLd data={breadcrumbSchema} />
      <PageHero
        eyebrow="Case Study"
        title="Musical Duo Studio — WordPress for a Professional Guitar & Bass Studio"
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
        A WordPress website for a professional guitar and bass recording studio
        serving international clients — built to communicate quality instantly,
        showcase work through video and convert visitors into new project
        inquiries.
      </PageHero>

      <div className="public-page">
        <section className="case-study-meta">
          <div>
            <span>Project type</span>
            <strong>WordPress / Elementor / Music Studio</strong>
          </div>
          <div>
            <span>Industry</span>
            <strong>Music production / Session recording</strong>
          </div>
          <div>
            <span>Focus</span>
            <strong>Premium presentation, video showcase, contact & conversion</strong>
          </div>
          <div>
            <span>Role</span>
            <strong>WordPress development, design implementation, forms, SEO, performance</strong>
          </div>
        </section>

        <section className="case-study-section">
          <h2>Project gallery</h2>
          <ProjectCarousel images={IMAGES} alt="Musical Duo Studio" />
        </section>

        <section className="case-study-section">
          <h2>Project overview</h2>
          <p>
            Musical Duo Studio is a professional session recording studio
            offering guitar and bass tracks for music producers and artists
            worldwide. The website needed to reflect the quality of the work,
            present video demonstrations and make it easy for new clients to
            send a project inquiry — all in a clean, dark and premium visual
            style.
          </p>
        </section>

        <section className="case-study-section">
          <h2>The challenge</h2>
          <p>
            Session musicians serving an international audience need a website
            that communicates professionalism and skill before a single note is
            heard. The site had to build trust quickly and guide visitors toward
            sending a project brief.
          </p>
          <ul className="case-study-list">
            <li>International clients needed to trust the quality at a glance</li>
            <li>Video samples had to be prominent and easy to access</li>
            <li>Testimonials from real clients needed to be presented credibly</li>
            <li>The inquiry form had to be simple and conversion-focused</li>
            <li>Page speed mattered for visitors from different countries</li>
          </ul>
        </section>

        <section className="case-study-section">
          <h2>Project goals</h2>
          <ul className="case-study-list">
            <li>Build a premium-looking WordPress website in a dark music aesthetic</li>
            <li>Showcase guitar and bass playing through embedded video</li>
            <li>Display client testimonials from international clients</li>
            <li>Create a structured project inquiry form with service selection</li>
            <li>Set up reliable email delivery for form submissions</li>
            <li>Optimize performance for fast international loading</li>
            <li>Prepare the site with SEO foundations</li>
          </ul>
        </section>

        <section className="case-study-section">
          <h2>What was built</h2>
          <div className="case-study-grid">
            <article>
              <h3>Premium visual design</h3>
              <p>
                Dark, high-contrast aesthetic built with Elementor and Unlimited
                Addons, matching the professional music industry standard and
                communicating quality instantly.
              </p>
            </article>
            <article>
              <h3>Video showcase</h3>
              <p>
                A dedicated &ldquo;Live From Studio&rdquo; section highlights
                guitar and bass performances through embedded video, giving
                visitors direct proof of skill before reading anything.
              </p>
            </article>
            <article>
              <h3>Client testimonials</h3>
              <p>
                International testimonials from clients in the United States,
                Sweden and Australia displayed clearly to build trust with new
                visitors from different markets.
              </p>
            </article>
            <article>
              <h3>Project inquiry form</h3>
              <p>
                Fluent Forms contact form with service selection, reference link
                field and project description — structured to collect all the
                information needed to start a conversation.
              </p>
            </article>
          </div>
        </section>

        <section className="case-study-section">
          <h2>Tools and technologies</h2>
          <div className="tech-stack">
            <span>WordPress</span>
            <span>Elementor</span>
            <span>Unlimited Addons for Elementor</span>
            <span>Fluent Forms</span>
            <span>Fluent SMTP</span>
            <span>Yoast SEO</span>
            <span>W3 Total Cache</span>
            <span>Responsive design</span>
            <span>Video integration</span>
            <span>Dark theme UI</span>
          </div>
        </section>

        <section className="case-study-section">
          <h2>Result</h2>
          <p>
            Musical Duo Studio received a professional online presence that
            matches the quality of the recordings. The dark visual style
            communicates credibility immediately, the video section lets the
            playing speak for itself and the inquiry form gives new clients a
            clear next step. Email delivery is handled reliably through Fluent
            SMTP and the site loads fast thanks to W3 Total Cache.
          </p>
          <ul className="case-study-list">
            <li>Premium visual presentation aligned with music industry standards</li>
            <li>Video showcase prominently placed for immediate social proof</li>
            <li>International testimonials increasing trust with new clients</li>
            <li>Structured inquiry form reducing back-and-forth emails</li>
            <li>Reliable form-to-email delivery via Fluent SMTP</li>
            <li>SEO foundations in place for future search visibility</li>
          </ul>
        </section>

        <section className="case-study-section">
          <h2>Possible next steps</h2>
          <ul className="case-study-list">
            <li>Add individual service pages for guitar and bass recording</li>
            <li>Build a portfolio section with audio samples</li>
            <li>Add more client testimonials and expand social proof</li>
            <li>Implement Google Search Console tracking</li>
            <li>Continue SEO optimization for music production keywords</li>
          </ul>
        </section>

        <section className="case-study-cta">
          <h2>Need a WordPress website for your studio or creative business?</h2>
          <p>
            If you need a professional website that communicates quality, builds
            trust and makes it easy for new clients to reach you, I can help
            you define the right approach.
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
