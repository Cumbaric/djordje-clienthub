import PageHero from "@/components/PageHero";
import CTASection from "@/components/CTASection";
import { services } from "@/data/services";

export default function UslugePage() {
  return (
    <main className="public-page">
      <PageHero eyebrow="Services" title="Usluge za WordPress, SEO i custom web aplikacije">
        Kombinujem WordPress iskustvo, Elementor, WooCommerce, SEO strukturu i
        razvoj modernih React / Next.js aplikacija za praktične poslovne
        potrebe.
      </PageHero>

      <section className="services-list">
        {services.map((service) => (
          <article key={service.title} className="service-list-card">
            <div className="service-list-content">
              <p className="service-category">{service.category}</p>
              <h2>{service.title}</h2>
              <p>{service.description}</p>
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
        title="Treba ti sajt, redizajn ili interni alat?"
        action={{ href: "/sr/kontakt", text: "Kontaktiraj me" }}
      >
        Pošalji kratak opis projekta, trenutni problem i cilj koji želiš da
        postigneš. Na osnovu toga mogu da predložim najbolji tehnički pristup.
      </CTASection>
    </main>
  );
}
