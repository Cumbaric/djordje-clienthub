export default function DashboardProjectsPage() {
  const projects = [
    {
      name: "Wellness Concept — SEO & UX improvements",
      client: "Wellness Concept",
      type: "WordPress / Elementor",
      status: "Active",
      phase: "Public optimization",
      progress: "75%",
      description:
        "Unapređenje strukture stranica, SEO sadržaja, brzine sajta i korisničkog iskustva za salon masaže i tretmana.",
      nextSteps: [
        "Proveriti mobilni prikaz ključnih stranica",
        "Optimizovati hero slike",
        "Dopuniti SEO opise za tretmane",
      ],
    },
    {
      name: "Djordje ClientHub",
      client: "Internal project",
      type: "Next.js / React",
      status: "In progress",
      phase: "Private dashboard",
      progress: "45%",
      description:
        "Interna web aplikacija za portfolio, klijente, projekte, zadatke, beleške i buduće SEO/AI module.",
      nextSteps: [
        "Završiti dashboard UI",
        "Pripremiti tasks i notes stranice",
        "Kasnije povezati bazu i auth sistem",
      ],
    },
    {
      name: "Olivera Popović Edu — Content structure",
      client: "Olivera Popović Edu",
      type: "WordPress",
      status: "Planning",
      phase: "Content review",
      progress: "25%",
      description:
        "Pregled postojeće strukture edukativnog sajta i priprema plana za bolje predstavljanje sadržaja.",
      nextSteps: [
        "Pregledati postojeće stranice",
        "Definisati glavne kategorije sadržaja",
        "Pripremiti SEO osnovu",
      ],
    },
    {
      name: "Boommil — WooCommerce archive",
      client: "Boommil",
      type: "WooCommerce",
      status: "Paused",
      phase: "Archived",
      progress: "10%",
      description:
        "Evidencija prethodno urađenog WooCommerce projekta, proizvoda, SEO podešavanja i tehničkih napomena.",
      nextSteps: [
        "Zabeležiti urađene funkcionalnosti",
        "Sačuvati portfolio opis projekta",
        "Ne raditi dalje dok domen/hosting nisu aktivni",
      ],
    },
  ];

  return (
    <section className="dashboard-page">
      <div className="dashboard-header">
        <p className="dashboard-label">Project management</p>
        <h1>Dashboard Projects</h1>
        <p>
          Interni pregled aktivnih, planiranih i pauziranih projekata po
          klijentima, statusima i sledećim koracima.
        </p>
      </div>

      <div className="dashboard-section">
        <div className="dashboard-section-header">
          <div>
            <p className="dashboard-label">Overview</p>
            <h2>Project list</h2>
          </div>
        </div>

        <div className="dashboard-project-grid">
          {projects.map((project) => (
            <article className="dashboard-project-card" key={project.name}>
              <div className="dashboard-project-top">
                <div>
                  <h3>{project.name}</h3>
                  <p>{project.client}</p>
                </div>

                <span
                  className={`dashboard-status dashboard-status-${project.status
                    .toLowerCase()
                    .replaceAll(" ", "-")}`}
                >
                  {project.status}
                </span>
              </div>

              <div className="dashboard-client-meta">
                <span>{project.type}</span>
                <span>Phase: {project.phase}</span>
              </div>

              <p className="dashboard-client-description">
                {project.description}
              </p>

              <div className="dashboard-progress">
                <div className="dashboard-progress-top">
                  <span>Progress</span>
                  <strong>{project.progress}</strong>
                </div>

                <div className="dashboard-progress-bar">
                  <span style={{ width: project.progress }}></span>
                </div>
              </div>

              <div className="dashboard-next-steps">
                <h4>Next steps</h4>

                <ul>
                  {project.nextSteps.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}