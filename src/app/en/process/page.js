import PageHero from "@/components/PageHero";
import CTASection from "@/components/CTASection";
import { processSteps } from "@/data/processSteps";

const stepsEn = {
  "01": {
    title: "Discovery / analysis",
    description:
      "I start by analyzing what the client needs, what the goal of the site or application is, who the users are, and what problem needs to be solved.",
  },
  "02": {
    title: "Structure & planning",
    description:
      "I define the page structure, content, main sections, user flow, and technical approach before development begins.",
  },
  "03": {
    title: "Design / development",
    description:
      "I build the pages, components, layouts, and functionality. For WordPress projects, the focus is on Elementor, structure, and responsiveness.",
  },
  "04": {
    title: "SEO & technical setup",
    description:
      "I establish the basic SEO structure, headings, descriptions, content logic, basic technical configuration, and display verification.",
  },
  "05": {
    title: "Testing",
    description:
      "I check desktop and mobile display, links, forms, basic functionality, speed, and any display issues.",
  },
  "06": {
    title: "Launch / ongoing maintenance",
    description:
      "After the project is complete, the site can go live. I provide ongoing maintenance, changes, additions, and technical improvements as needed.",
  },
};

export default function ProcessPage() {
  return (
    <main className="public-page">
      <PageHero
        eyebrow="Process"
        title="A clear workflow from idea to finished solution"
      >
        Every project goes through several clear phases: analysis, structure,
        development, SEO foundation, testing, and ongoing maintenance. The goal
        is for the client to always know what is being done and why.
      </PageHero>

      <section className="process-list">
        {processSteps.map((step) => {
          const en = stepsEn[step.number];
          return (
            <article key={step.number} className="process-card">
              <span>{step.number}</span>

              <div>
                <h2>{en ? en.title : step.title}</h2>
                <p>{en ? en.description : step.description}</p>
              </div>
            </article>
          );
        })}
      </section>

      <CTASection
        title="Process isn't just design — it's an organized way of working."
        action={{ href: "/en/contact", text: "Start a project" }}
      >
        A good website or application doesn&#39;t happen by chance. It requires
        clear structure, a realistic plan, technical discipline, and
        understanding of the business goal.
      </CTASection>
    </main>
  );
}
