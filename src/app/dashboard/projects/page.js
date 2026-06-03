import { db } from "@/db";
import { projects as projectsTable } from "@/db/schema";
import { statusLabel } from "@/lib/dashboardLabels";
import { createProject } from "./actions";
import ProjectControls from "./ProjectControls";
import "@/styles/dashboard-forms.css";

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
            <p className="dashboard-label">Dodaj novo</p>
            <h2>Novi projekat</h2>
          </div>
        </div>

        <form action={createProject} className="dashboard-form">
          <div className="dashboard-form-row">
            <label className="dashboard-field dashboard-field-wide">
              <span>Naziv *</span>
              <input name="name" type="text" required placeholder="Naziv projekta" />
            </label>
            <label className="dashboard-field">
              <span>Klijent</span>
              <input name="client" type="text" placeholder="npr. Wellness Concept" />
            </label>
          </div>

          <div className="dashboard-form-row">
            <label className="dashboard-field">
              <span>Tip</span>
              <input name="type" type="text" placeholder="npr. WordPress / Next.js" />
            </label>
            <label className="dashboard-field">
              <span>Status</span>
              <select name="status" defaultValue="Planning">
                <option value="Active">Aktivan</option>
                <option value="In progress">U toku</option>
                <option value="Planning">Planiranje</option>
                <option value="Paused">Pauziran</option>
              </select>
            </label>
            <label className="dashboard-field">
              <span>Faza</span>
              <input name="phase" type="text" placeholder="npr. SEO optimizacija" />
            </label>
            <label className="dashboard-field">
              <span>Napredak (%)</span>
              <input name="progress" type="text" placeholder="npr. 50" />
            </label>
          </div>

          <label className="dashboard-field dashboard-field-wide">
            <span>Opis</span>
            <textarea name="description" rows={2} placeholder="Kratak opis projekta" />
          </label>

          <label className="dashboard-field dashboard-field-wide">
            <span>Sledeći koraci (odvoji zarezom)</span>
            <input name="nextSteps" type="text" placeholder="npr. Proveriti mobilni, Optimizovati slike" />
          </label>

          <div className="dashboard-form-actions">
            <button type="submit" className="dashboard-primary-btn">
              Dodaj projekat
            </button>
          </div>
        </form>
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
            <article className="dashboard-project-card" key={project.id}>
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

              <ProjectControls project={project} />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
