import { db } from "@/db";
import {
  clients as clientsTable,
  projects as projectsTable,
  tasks as tasksTable,
  notes as notesTable,
} from "@/db/schema";
import { quickActions } from "@/data/dashboardOverview";
import { statusLabel, priorityLabel } from "@/lib/dashboardLabels";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const [clients, dashboardProjects, tasks, notes] = await Promise.all([
    db.select().from(clientsTable).orderBy(clientsTable.id),
    db.select().from(projectsTable).orderBy(projectsTable.id),
    db.select().from(tasksTable).orderBy(tasksTable.id),
    db.select().from(notesTable).orderBy(notesTable.id),
  ]);

  const activeClients = clients.filter(
    (client) => client.status === "Active",
  ).length;

  const activeProjects = dashboardProjects.filter((project) =>
    ["Active", "In progress", "Planning"].includes(project.status),
  ).length;

  const openTasks = tasks.filter((task) => task.status !== "Done").length;

  const workNotes = notes.length;

  const recentProjects = dashboardProjects.slice(0, 3);

  const recentNotes = notes.slice(0, 4);

  const openTaskPreview = tasks
    .filter((task) => task.status !== "Done")
    .slice(0, 3);

  const dashboardStats = [
    {
      label: "Aktivni klijenti",
      value: activeClients,
      description: "WordPress klijenti koje trenutno pratiš",
    },
    {
      label: "Aktivni projekti",
      value: activeProjects,
      description: "Sajtovi, SEO zadaci i poboljšanja",
    },
    {
      label: "Otvoreni zadaci",
      value: openTasks,
      description: "Zadaci na čekanju i naredne aktivnosti",
    },
    {
      label: "Radne beleške",
      value: workNotes,
      description: "Interne beleške i nedavna ažuriranja",
    },
  ];

  return (
    <section className="dashboard-page">
      <div className="dashboard-header">
        <p className="dashboard-label">Privatni radni prostor</p>
        <h1>Kontrolna tabla</h1>
        <p>
          Privatni pregled klijenata, projekata, zadataka i radnih beleški za
          WordPress freelance posao.
        </p>
      </div>

      <div className="dashboard-stats-grid">
        {dashboardStats.map((item) => (
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
            <p className="dashboard-label">Brze akcije</p>
            <h2>Glavne oblasti</h2>
          </div>
        </div>

        <div className="dashboard-action-grid">
          {quickActions.map((action) => (
            <a
              className="dashboard-action-card"
              href={action.href}
              key={action.title}
            >
              <h3>{action.title}</h3>
              <p>{action.description}</p>
            </a>
          ))}
        </div>
      </div>

      <div className="dashboard-section">
        <div className="dashboard-section-header">
          <div>
            <p className="dashboard-label">Nedavni projekti</p>
            <h2>Napredak projekata</h2>
          </div>
        </div>

        <div className="dashboard-project-grid">
          {recentProjects.map((project) => (
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
                  {statusLabel(project.status)}
                </span>
              </div>

              <div className="dashboard-client-meta">
                <span>{project.type}</span>
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
            </article>
          ))}
        </div>
      </div>

      <div className="dashboard-section">
        <div className="dashboard-section-header">
          <div>
            <p className="dashboard-label">Otvoreni zadaci</p>
            <h2>Sledeći zadaci</h2>
          </div>
        </div>

        <div className="dashboard-task-list">
          {openTaskPreview.map((task) => (
            <article className="dashboard-task-card" key={task.title}>
              <div className="dashboard-task-main">
                <div>
                  <h3>{task.title}</h3>
                  <p>{task.description}</p>
                </div>

                <span
                  className={`dashboard-status dashboard-status-${task.status
                    .toLowerCase()
                    .replaceAll(" ", "-")}`}
                >
                  {statusLabel(task.status)}
                </span>
              </div>

              <div className="dashboard-task-meta">
                <span>Projekat: {task.project}</span>
                <span>Prioritet: {priorityLabel(task.priority)}</span>
                <span>Fokus: {task.focus}</span>
                <span>Rok: {task.due}</span>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="dashboard-section">
        <div className="dashboard-section-header">
          <div>
            <p className="dashboard-label">Nedavni rad</p>
            <h2>Najnovije beleške</h2>
          </div>
        </div>

        <div className="dashboard-activity-list">
          {recentNotes.map((note) => (
            <div className="dashboard-activity-item" key={note.title}>
              <span></span>
              <div>
                <strong>{note.title}</strong>
                <p>{note.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
