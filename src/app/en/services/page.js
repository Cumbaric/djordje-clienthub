import PageHero from "@/components/PageHero";
import CTASection from "@/components/CTASection";
import { services } from "@/data/services";

const descriptionEn = {
  "WordPress Website Development":
    "Building presentation WordPress websites for small businesses, services, personal brands, and local companies. Focus on clear structure, well-organized sections, and easy content management.",
  "Elementor Landing Pages":
    "Creating landing pages for services, campaigns, promotions, and individual offerings. Pages are built with clear headings, CTA buttons, trust sections, and a logical user flow.",
  "WooCommerce Setup":
    "Setting up a basic WooCommerce store, adding products, categories, descriptions, images, basic SEO elements, and configuring the checkout process to match client needs.",
  "SEO Structure & On-page Setup":
    "Basic site SEO structure: headings, meta descriptions, page structure, internal content logic, service organization, and preparing the site for Google indexing.",
  "React / Next.js Web Applications":
    "Building modern custom web applications and internal tools using the React / Next.js stack. Focus on dashboard systems, client organization, tasks, projects, and workflow management.",
  "Website Maintenance & Technical Fixes":
    "WordPress site maintenance, minor technical changes, resolving display issues, plugin configuration, contact forms, basic performance improvements, and responsive display fixes.",
};

export default function ServicesPage() {
  return (
    <main className="public-page">
      <PageHero
        eyebrow="Services"
        title="Services for WordPress, SEO, and custom web applications"
      >
        I combine WordPress experience, Elementor, WooCommerce, SEO structure,
        and modern React / Next.js application development for practical
        business needs.
      </PageHero>

      <section className="services-list">
        {services.map((service) => (
          <article key={service.title} className="service-list-card">
            <div className="service-list-content">
              <p className="service-category">{service.category}</p>
              <h2>{service.title}</h2>
              <p>{descriptionEn[service.title] || service.description}</p>
            </div>

            <div className="service-tech-list">
              {service.technologies.map((technology) => (
                <span key={technology}>{technology}</span>
              ))}
            </div>
          </article>
        ))}
      </section>

      <CTASection
        title="Do you need a website, redesign, or internal tool?"
        action={{ href: "/en/contact", text: "Contact me" }}
      >
        Send a brief project description, your current problem, and the goal
        you want to achieve. Based on that, I can suggest the best technical
        approach.
      </CTASection>
    </main>
  );
}
