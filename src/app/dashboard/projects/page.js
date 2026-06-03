import { db } from "@/db";
import { projects as projectsTable } from "@/db/schema";
import { statusLabel } from "@/lib/dashboardLabels";

export const dynamic = "force-dynamic";

export default async function DashboardProjectsPage() {
  const dashboardProjects = await db
    .select()
    .from(projectsTable)
    .orderBy(projectsTable.id);

  const totalProjects = dashboardProjects.length;

  const activeProjects = dashboardProjects.filter((project) =>
    ["Active", "In progress"].includes(project.status)
  ).length;

  const planningProjects = dashboardProjects.filter(
    (project) => project.status === "Planning"
  ).length;

  const pausedProjects = dashboardProjects.filter(
    (project) => project.status === "Paused"
  ).length;

  const projectStats = [
    {
      label: "Ukupno projekata",
      value: totalProjects,
      description: "Svi praćeni projekti",
    },
    {
      label: "Aktivni / U toku",
      value: activeProjects,
      description: "Projekti koji su trenutno u radu",
    },
    {
      label: "Planiranje",
      value: planningProjects,
      description: "Projekti u fazi planiranja ili pregleda",
    },
    {
      label: "Pauzirani",
      value: pausedProjects,
      description: "Pauziran ili arhiviran rad",
    },
  ];

  return (
    <section className="dashboard-page">
      <div className="dashboard-header">
        <p className="dashboard-label">Upravljanje projektima</p>
        <h1>Projekti</h1>
        <p>
          Interni pregled aktivnih, planiranih i pauziranih projekata po
          klijentima, statusima i sledećim koracima.
        </p>
      </div>

      <div className="dashboard-stats-grid">
        {projectStats.map((item) => (
          <article className="dashboard-stat-card" key={item.label}>
            <span>{item.label}</span>
            <strong>{item.value}</strong>
            <p>{item.description}</p>
          </article>
        ))}
      </div>

      <div className="dashboard-section">
        <div className="dashboard-section-header">
          <div>
            <p className="dashboard-label">Pregled</p>
            <h2>Lista projekata</h2>
          </div>
        </div>

        <div className="dashboard-project-grid">
          {dashboardProjects.map((project) => (
            <article className="dashboard-project-card" key={project.slug}>
              <div className="dashboard-project-top">
                <div>
                  <p className="dashboard-label">Projekat</p>
                  <h3>{project.name}</h3>
                  <p>{project.client}</p>
                </div>

                <span
                  className={`dashboard-status dashboard-status-${project.status
                    .toLowerCase()
                    .replaceAll(" ", "-")}`}
                >
                  {statusLabel(project.status)}
                </span>
              </div>

              <div className="dashboard-client-meta">
                <span>Tip: {project.type}</span>
                <span>Faza: {project.phase}</span>
              </div>

              <p className="dashboard-client-description">
                {project.description}
              </p>

              <div className="dashboard-progress">
                <div className="dashboard-progress-top">
                  <span>Napredak</span>
                  <strong>{project.progress}</strong>
                </div>

                <div className="dashboard-progress-bar">
                  <span style={{ width: project.progress }}></span>
                </div>
              </div>

              <div className="dashboard-next-steps">
                <h4>Sledeći koraci</h4>

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
