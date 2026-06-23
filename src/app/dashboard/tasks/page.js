import { db } from "@/db";
import { tasks as tasksTable } from "@/db/schema";
import { createTask } from "./actions";
import TaskControls from "./TaskControls";
import ArchiveControls from "./ArchiveControls";
import { statusLabel, priorityLabel } from "@/lib/dashboardLabels";
import DashboardEmpty from "@/components/DashboardEmpty";
import "@/styles/dashboard-forms.css";

export const dynamic = "force-dynamic";

export default async function TasksPage() {
  const allTasks = await db.select().from(tasksTable).orderBy(tasksTable.id);

  const activeTasks = allTasks.filter((t) => !t.archived);
  const archivedTasks = allTasks.filter((t) => t.archived);

  const openTasks = activeTasks.filter((t) => t.status === "Open").length;
  const inProgressTasks = activeTasks.filter(
    (t) => t.status === "In progress",
  ).length;
  const doneTasks = activeTasks.filter((t) => t.status === "Done").length;

  const taskStats = [
    {
      label: "Aktivni zadaci",
      value: activeTasks.length,
      description: "Zadaci koji nisu arhivirani",
    },
    {
      label: "Otvoreni",
      value: openTasks,
      description: "Zadaci koji čekaju da se započnu",
    },
    {
      label: "U toku",
      value: inProgressTasks,
      description: "Zadaci na kojima se trenutno radi",
    },
    {
      label: "Završeni",
      value: doneTasks,
      description: "Završeni, još nisu arhivirani",
    },
  ];

  return (
    <section className="dashboard-page">
      <div className="dashboard-header">
        <p className="dashboard-label">Upravljanje zadacima</p>
        <h1>Zadaci</h1>
        <p>
          Pregled zadataka, prioriteta, statusa rada i sledećih aktivnosti po
          klijentima i projektima.
        </p>
      </div>

      <div className="dashboard-stats-grid">
        {taskStats.map((item) => (
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
            <h2>Kreiraj zadatak</h2>
          </div>
        </div>

        <form action={createTask} className="dashboard-form">
          <div className="dashboard-form-row">
            <label className="dashboard-field dashboard-field-wide">
              <span>Naslov *</span>
              <input name="title" type="text" required placeholder="Šta treba uraditi?" />
            </label>
            <label className="dashboard-field">
              <span>Projekat</span>
              <input name="project" type="text" placeholder="npr. Wellness Concept" />
            </label>
          </div>

          <div className="dashboard-form-row">
            <label className="dashboard-field">
              <span>Prioritet</span>
              <select name="priority" defaultValue="Medium">
                <option value="High">Visok</option>
                <option value="Medium">Srednji</option>
                <option value="Low">Nizak</option>
              </select>
            </label>
            <label className="dashboard-field">
              <span>Status</span>
              <select name="status" defaultValue="Open">
                <option value="Open">Otvoren</option>
                <option value="In progress">U toku</option>
                <option value="Done">Završen</option>
                <option value="Backlog">Za kasnije</option>
              </select>
            </label>
            <label className="dashboard-field">
              <span>Fokus</span>
              <input name="focus" type="text" placeholder="npr. SEO sadržaj" />
            </label>
            <label className="dashboard-field">
              <span>Rok</span>
              <input name="due" type="text" placeholder="npr. Ove nedelje" />
            </label>
          </div>

          <label className="dashboard-field dashboard-field-wide">
            <span>Opis</span>
            <textarea name="description" rows={2} placeholder="Opcioni detalji" />
          </label>

          <div className="dashboard-form-actions">
            <button type="submit" className="dashboard-primary-btn">
              Dodaj zadatak
            </button>
          </div>
        </form>
      </div>

      <div className="dashboard-section">
        <div className="dashboard-section-header">
          <div>
            <p className="dashboard-label">Pregled</p>
            <h2>Lista zadataka</h2>
          </div>
        </div>

        <div className="dashboard-task-list">
          {activeTasks.length === 0 && (
            <DashboardEmpty message="Nema aktivnih zadataka — dodaj prvi pomoću forme iznad." />
          )}
          {activeTasks.map((task) => (
            <article className="dashboard-task-card" key={task.id}>
              <div className="dashboard-task-main">
                <div>
                  <p className="dashboard-label">Zadatak</p>
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

              <TaskControls task={task} />
            </article>
          ))}
        </div>
      </div>

      {archivedTasks.length > 0 && (
        <div className="dashboard-section">
          <div className="dashboard-section-header">
            <div>
              <p className="dashboard-label">Arhiva</p>
              <h2>Arhivirani zadaci</h2>
            </div>
            <span className="dashboard-archive-count">
              {archivedTasks.length}{" "}
              {archivedTasks.length === 1 ? "zadatak" : "zadataka"}
            </span>
          </div>

          <div className="dashboard-task-list">
            {archivedTasks.map((task) => (
              <article
                className="dashboard-task-card dashboard-task-card-archived"
                key={task.id}
              >
                <div className="dashboard-task-main">
                  <div>
                    <p className="dashboard-label">Arhivirano</p>
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

                <ArchiveControls task={task} />
              </article>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
