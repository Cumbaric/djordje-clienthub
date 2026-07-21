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
    { "@type": "ListItem", "position": 3, "name": "Luma Dental", "item": "https://djordjepopovic.com/en/projects/luma-dental" },
  ],
};

const IMAGES = [
  "/Projects/luma_dental_1.png",
  "/Projects/luma_dental_2.png",
  "/Projects/luma_dental_3.png",
  "/Projects/luma_dental_4.png",
  "/Projects/luma_dental_5.png",
  "/Projects/luma_dental_6.png",
  "/Projects/luma_dental_7.png",
];

export const metadata = {
  title: "Luma Dental Case Study",
  description:
    "Next.js landing page for a dental clinic — service grid, team section, practice gallery, FAQ accordion and appointment booking form.",
  openGraph: {
    title: "Luma Dental Case Study",
    description:
      "A Next.js dental clinic website with clean medical aesthetics, structured service presentation and an appointment form.",
  },
  alternates: {
    canonical: "/en/projects/luma-dental",
    languages: {
      en: "/en/projects/luma-dental",
      sr: "/sr/projekti/luma-dental",
    },
  },
};

export default function LumaDentalCaseStudyPage() {
  return (
    <main>
      <JsonLd data={breadcrumbSchema} />
      <PageHero
        eyebrow="Case Study"
        title="Luma Dental — Next.js Landing Page for a Dental Clinic"
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
        A clean, professional Next.js website for a dental clinic in Belgrade —
        built to reduce patient anxiety, present services clearly, showcase the
        team and make booking an appointment as easy as possible.
      </PageHero>

      <div className="public-page">
        <section className="case-study-meta">
          <div>
            <span>Project type</span>
            <strong>Next.js / React / Landing Page</strong>
          </div>
          <div>
            <span>Industry</span>
            <strong>Healthcare / Dental clinic</strong>
          </div>
          <div>
            <span>Focus</span>
            <strong>Trust, service clarity, team presentation, appointment conversion</strong>
          </div>
          <div>
            <span>Role</span>
            <strong>Next.js development, design, layout, form, responsive implementation</strong>
          </div>
        </section>

        <section className="case-study-section">
          <h2>Project gallery</h2>
          <ProjectCarousel images={IMAGES} alt="Luma Dental" />
        </section>

        <section className="case-study-section">
          <h2>Project overview</h2>
          <p>
            Luma Dental is a dental clinic website designed to communicate
            professionalism and warmth at the same time. The goal was to give
            potential patients everything they need to feel confident booking an
            appointment — clear services, a trustworthy team, a comfortable
            practice environment and a straightforward way to get in touch.
          </p>
        </section>

        <section className="case-study-section">
          <h2>The challenge</h2>
          <p>
            Healthcare websites, especially dental clinics, face a specific
            challenge: visitors are often anxious before their first visit. The
            website had to communicate calm, safety and professionalism — while
            still making it easy to find services and book an appointment.
          </p>
          <ul className="case-study-list">
            <li>Dental anxiety required a soft, reassuring visual approach</li>
            <li>Six different services needed clear and equal presentation</li>
            <li>The team had to feel personal and approachable, not clinical</li>
            <li>The booking form had to be simple and conversion-focused</li>
            <li>Practice photos needed a section that felt inviting, not intimidating</li>
            <li>FAQ had to address real patient concerns before first contact</li>
          </ul>
        </section>

        <section className="case-study-section">
          <h2>Project goals</h2>
          <ul className="case-study-list">
            <li>Build a calm, professional website in a medical green and cream palette</li>
            <li>Present six dental services in a clear, scannable grid</li>
            <li>Add a &ldquo;Why LUMA&rdquo; section with key practice stats and values</li>
            <li>Showcase the dental team with cards that feel personal</li>
            <li>Create a gallery section of the practice environment</li>
            <li>Include a collapsible FAQ section addressing common concerns</li>
            <li>Build an appointment booking form with service selection and date picker</li>
          </ul>
        </section>

        <section className="case-study-section">
          <h2>What was built</h2>
          <div className="case-study-grid">
            <article>
              <h3>Hero section</h3>
              <p>
                A split-layout hero with a headline that addresses patient
                emotion directly (&ldquo;A smile that builds confidence&rdquo;),
                a clinic photo with an overlay quote, and two clear CTA buttons
                — one for booking and one for exploring services.
              </p>
            </article>
            <article>
              <h3>Services grid</h3>
              <p>
                Six dental services presented as clean icon cards in a
                responsive 3-column grid — General Dentistry, Cosmetic
                Dentistry, Orthodontics, Implantology, Prosthodontics and
                Pediatric Dentistry.
              </p>
            </article>
            <article>
              <h3>Why LUMA section</h3>
              <p>
                A two-column layout combining a clinic photo with four value
                cards (Pain-Free, Modern Equipment, Transparent Pricing,
                Comfortable Environment) and a dark stats bar showing 15+
                years of experience, 4,000+ patients and 98% satisfaction.
              </p>
            </article>
            <article>
              <h3>Team &amp; appointment</h3>
              <p>
                Three doctor cards with specialization labels and personal bios,
                followed by a practice photo gallery and a structured booking
                form with name, phone, email, service dropdown, date picker and
                an optional message field.
              </p>
            </article>
          </div>
        </section>

        <section className="case-study-section">
          <h2>Tools and technologies</h2>
          <div className="tech-stack">
            <span>Next.js</span>
            <span>React</span>
            <span>CSS Modules</span>
            <span>Responsive design</span>
            <span>Mobile-first layout</span>
            <span>Appointment form</span>
            <span>FAQ accordion</span>
            <span>Vercel deployment</span>
          </div>
        </section>

        <section className="case-study-section">
          <h2>Result</h2>
          <p>
            Luma Dental is a complete dental clinic web presence that balances
            medical professionalism with warmth and approachability. The muted
            green and cream palette reduces visual stress, the structured
            sections guide visitors naturally from services to team to booking,
            and the FAQ section handles the most common patient questions before
            they even pick up the phone.
          </p>
          <ul className="case-study-list">
            <li>Calm, trustworthy aesthetic suited to healthcare</li>
            <li>Six services clearly structured for fast scanning</li>
            <li>Credibility built through team cards and practice stats</li>
            <li>Patient questions addressed proactively in the FAQ</li>
            <li>Clear appointment booking path from every section of the page</li>
            <li>Fully responsive across desktop and mobile</li>
          </ul>
        </section>

        <section className="case-study-section">
          <h2>Possible next steps</h2>
          <ul className="case-study-list">
            <li>Connect the booking form to a real email or calendar system</li>
            <li>Add individual service detail pages for SEO</li>
            <li>Expand the patients section with more testimonials</li>
            <li>Add a before/after gallery for cosmetic treatments</li>
            <li>Implement Google Search Console and local SEO optimization</li>
          </ul>
        </section>

        <section className="case-study-cta">
          <h2>Need a Next.js website for your clinic or service business?</h2>
          <p>
            If you need a clean, trustworthy website that presents your services
            clearly, showcases your team and makes it easy for clients to book —
            I can help you design and build it.
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
