import Link from "next/link";
import PageHero from "@/components/PageHero";
import ProjectCarousel from "@/components/ProjectCarousel";

const IMAGES = [
  "/Projects/boommil_1.png",
  "/Projects/boommil_2.png",
  "/Projects/boommil_3.png",
  "/Projects/boommil_4.png",
  "/Projects/boommil_5.png",
];

export const metadata = {
  title: "BoomMil Case Study | Đorđe Popović",
  description:
    "WooCommerce product catalog project focused on product setup, store structure, SEO preparation and content organization for an online store.",
  openGraph: {
    title: "BoomMil Case Study",
    description:
      "WooCommerce project covering product setup, store structure and basic SEO for an online product catalog.",
  },
  alternates: {
    languages: {
      en: "/en/projects/boommil",
      sr: "/sr/projekti/boommil",
    },
  },
};

export default function BoomMilPage() {
  return (
    <main>
      <PageHero
        eyebrow="Case Study"
        title="BoomMil — WooCommerce Product Setup and Store Structure"
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
        WooCommerce project focused on entering and organizing products, setting
        up store structure, preparing basic SEO foundations and organizing
        content for a clear and navigable online product catalog.
      </PageHero>

      <div className="public-page">
        <section className="case-study-meta">
          <div>
            <span>Project type</span>
            <strong>WooCommerce / WordPress / Product structure</strong>
          </div>
          <div>
            <span>Industry</span>
            <strong>E-commerce / Product catalog</strong>
          </div>
          <div>
            <span>Focus</span>
            <strong>Product setup, store organization, SEO basics</strong>
          </div>
          <div>
            <span>Role</span>
            <strong>WooCommerce setup, product entry, store structure, content organization</strong>
          </div>
        </section>

        <section className="case-study-section">
          <h2>Project gallery</h2>
          <ProjectCarousel images={IMAGES} alt="BoomMil" />
        </section>

        <section className="case-study-section">
          <h2>Project overview</h2>
          <p>
            Online product catalog built on WooCommerce where products need to
            be clearly presented, easy to browse and well-organized by category.
            The goal was a structured, navigable store ready for customers.
          </p>
        </section>

        <section className="case-study-section">
          <h2>The challenge</h2>
          <ul className="case-study-list">
            <li>Products needed consistent descriptions and clear presentation</li>
            <li>Store categories required logical organization</li>
            <li>Product pages lacked SEO-ready structure</li>
            <li>Content needed to be organized for both users and search engines</li>
            <li>Mobile product browsing needed to be smooth and intuitive</li>
          </ul>
        </section>

        <section className="case-study-section">
          <h2>Project goals</h2>
          <ul className="case-study-list">
            <li>Set up and organize all products correctly</li>
            <li>Create a clear category structure</li>
            <li>Write and structure product descriptions</li>
            <li>Prepare product pages for basic SEO</li>
            <li>Ensure the store is easy to navigate on all devices</li>
          </ul>
        </section>

        <section className="case-study-section">
          <h2>What was improved</h2>
          <div className="case-study-grid">
            <article>
              <h3>Product setup</h3>
              <p>
                Products were entered with consistent descriptions, images and
                attributes, creating a uniform and professional catalog
                presentation.
              </p>
            </article>
            <article>
              <h3>Store structure</h3>
              <p>
                Categories and product groupings were organized so customers can
                browse and find products easily.
              </p>
            </article>
            <article>
              <h3>SEO preparation</h3>
              <p>
                Product pages, titles and descriptions were structured with
                search engine visibility in mind.
              </p>
            </article>
            <article>
              <h3>Content organization</h3>
              <p>
                Product content was organized consistently, making the catalog
                easier to maintain and expand.
              </p>
            </article>
          </div>
        </section>

        <section className="case-study-section">
          <h2>Tools and technologies</h2>
          <div className="tech-stack">
            <span>WordPress</span>
            <span>WooCommerce</span>
            <span>Elementor</span>
            <span>Yoast SEO</span>
            <span>Product page structure</span>
            <span>Category organization</span>
            <span>Responsive design</span>
            <span>SEO basics</span>
          </div>
        </section>

        <section className="case-study-section">
          <h2>Result</h2>
          <p>
            The project created a clean and organized WooCommerce product catalog
            where products are easy to browse, well-described and structured for
            both users and search engines.
          </p>
          <ul className="case-study-list">
            <li>Organized product catalog</li>
            <li>Clear category structure</li>
            <li>Consistent product descriptions</li>
            <li>Basic SEO-ready product pages</li>
            <li>Easier to navigate and maintain</li>
          </ul>
        </section>

        <section className="case-study-section">
          <h2>Possible next steps</h2>
          <ul className="case-study-list">
            <li>Continue adding and expanding the product catalog</li>
            <li>Create SEO-focused category and product landing pages</li>
            <li>Improve product filtering and search functionality</li>
            <li>Connect analytics to track popular products</li>
            <li>Explore paid advertising integration</li>
          </ul>
        </section>

        <section className="case-study-cta">
          <h2>Need a WooCommerce store setup?</h2>
          <p>
            If you need products organized, a store structured and pages prepared
            for search visibility, I can help you build a clean and practical
            WooCommerce foundation.
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
