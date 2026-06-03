import { db } from "@/db";
import { tasks as tasksTable } from "@/db/schema";
import { createTask } from "./actions";
import TaskControls from "./TaskControls";
import "@/styles/dashboard-forms.css";

export const dynamic = "force-dynamic";

export default async function TasksPage() {
  const tasks = await db.select().from(tasksTable).orderBy(tasksTable.id);

  const totalTasks = tasks.length;

  const openTasks = tasks.filter((task) => task.status === "Open").length;

  const inProgressTasks = tasks.filter(
    (task) => task.status === "In progress",
  ).length;

  const doneTasks = tasks.filter((task) => task.status === "Done").length;

  const taskStats = [
    {
      label: "Total tasks",
      value: totalTasks,
      description: "All tracked work items",
    },
    {
      label: "Open tasks",
      value: openTasks,
      description: "Tasks waiting to be started",
    },
    {
      label: "In progress",
      value: inProgressTasks,
      description: "Tasks currently being worked on",
    },
    {
      label: "Done",
      value: doneTasks,
      description: "Completed work items",
    },
  ];

  return (
    <section className="dashboard-page">
      <div className="dashboard-header">
        <p className="dashboard-label">Task management</p>
        <h1>Tasks</h1>
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
            <p className="dashboard-label">Add new</p>
            <h2>Create a task</h2>
          </div>
        </div>

        <form action={createTask} className="dashboard-form">
          <div className="dashboard-form-row">
            <label className="dashboard-field dashboard-field-wide">
              <span>Title *</span>
              <input name="title" type="text" required placeholder="What needs to be done?" />
            </label>
            <label className="dashboard-field">
              <span>Project</span>
              <input name="project" type="text" placeholder="e.g. Wellness Concept" />
            </label>
          </div>

          <div className="dashboard-form-row">
            <label className="dashboard-field">
              <span>Priority</span>
              <select name="priority" defaultValue="Medium">
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </label>
            <label className="dashboard-field">
              <span>Status</span>
              <select name="status" defaultValue="Open">
                <option>Open</option>
                <option>In progress</option>
                <option>Done</option>
                <option>Backlog</option>
              </select>
            </label>
            <label className="dashboard-field">
              <span>Focus</span>
              <input name="focus" type="text" placeholder="e.g. SEO content" />
            </label>
            <label className="dashboard-field">
              <span>Due</span>
              <input name="due" type="text" placeholder="e.g. This week" />
            </label>
          </div>

          <label className="dashboard-field dashboard-field-wide">
            <span>Description</span>
            <textarea name="description" rows={2} placeholder="Optional details" />
          </label>

          <div className="dashboard-form-actions">
            <button type="submit" className="dashboard-primary-btn">
              Add task
            </button>
          </div>
        </form>
      </div>

      <div className="dashboard-section">
        <div className="dashboard-section-header">
          <div>
            <p className="dashboard-label">Overview</p>
            <h2>Task list</h2>
          </div>
        </div>

        <div className="dashboard-task-list">
          {tasks.map((task) => (
            <article className="dashboard-task-card" key={task.id}>
              <div className="dashboard-task-main">
                <div>
                  <p className="dashboard-label">Task</p>
                  <h3>{task.title}</h3>
                  <p>{task.description}</p>
                </div>

                <span
                  className={`dashboard-status dashboard-status-${task.status
                    .toLowerCase()
                    .replaceAll(" ", "-")}`}
                >
                  {task.status}
                </span>
              </div>

              <div className="dashboard-task-meta">
                <span>Project: {task.project}</span>
                <span>Priority: {task.priority}</span>
                <span>Focus: {task.focus}</span>
                <span>Due: {task.due}</span>
              </div>

              <TaskControls task={task} />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
