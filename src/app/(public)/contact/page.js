import PageHero from "@/components/PageHero";
import { contactItems, messageChecklist, contactEmail } from "@/data/contact";

export default function ContactPage() {
  return (
    <main className="public-page">
      <PageHero eyebrow="Contact" title="Hajde da razgovaramo o tvom projektu">
        Ako ti treba WordPress sajt, WooCommerce prodavnica, SEO struktura,
        tehnička pomoć ili custom React / Next.js alat, pošalji kratak opis
        projekta i cilj koji želiš da postigneš.
      </PageHero>

      <section className="contact-layout">
        <div className="contact-main-card">
          <h2>Šta da pošalješ u prvoj poruci?</h2>
          <p>
            Najbolje je da odmah pošalješ osnovne informacije, kako bih mogao da
            razumem šta je potrebno i predložim konkretan sledeći korak.
          </p>

          <ul>
            {messageChecklist.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <a href={`mailto:${contactEmail}`}>Pošalji email</a>
        </div>

        <aside className="contact-info-card">
          <h2>Project fit</h2>

          <div className="contact-info-list">
            {contactItems.map((item) => (
              <div key={item.label}>
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </div>
            ))}
          </div>
        </aside>
      </section>

      <section className="contact-cta">
        <h2>Najbolji prvi korak je kratak opis problema.</h2>
        <p>
          Ne moraš imati spremnu kompletnu specifikaciju. Dovoljno je da opišeš
          šta trenutno imaš, šta ne radi dobro i šta želiš da postigneš.
        </p>
      </section>
    </main>
  );
}
