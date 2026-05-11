import { tasks } from "@/data/tasks";

export default function TasksPage() {
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
            <p className="dashboard-label">Overview</p>
            <h2>Task list</h2>
          </div>
        </div>

        <div className="dashboard-task-list">
          {tasks.map((task) => (
            <article className="dashboard-task-card" key={task.slug}>
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
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
