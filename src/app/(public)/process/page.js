import PageHero from "@/components/PageHero";
import CTASection from "@/components/CTASection";
import { processSteps } from "@/data/processSteps";

export default function ProcessPage() {
  return (
    <main className="public-page">
      <PageHero eyebrow="Process" title="Jasan proces rada od ideje do gotovog rešenja">
        Svaki projekat vodim kroz nekoliko jasnih faza: analiza, struktura,
        izrada, SEO osnova, testiranje i dalje održavanje. Cilj je da klijent
        u svakom trenutku zna šta se radi i zašto.
      </PageHero>

      <section className="process-list">
        {processSteps.map((step) => (
          <article key={step.number} className="process-card">
            <span>{step.number}</span>

            <div>
              <h2>{step.title}</h2>
              <p>{step.description}</p>
            </div>
          </article>
        ))}
      </section>

      <CTASection
        title="Proces nije samo dizajn — već organizovan način rada."
        action={{ href: "/contact", text: "Započni projekat" }}
      >
        Dobar sajt ili aplikacija ne nastaju slučajno. Potrebni su jasna
        struktura, realan plan, tehnička disciplina i razumevanje poslovnog
        cilja.
      </CTASection>
    </main>
  );
}
