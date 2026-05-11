import { dashboardProjects } from "@/data/dashboardProjects";

export default function DashboardProjectsPage() {
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
      label: "Total projects",
      value: totalProjects,
      description: "All tracked dashboard projects",
    },
    {
      label: "Active / In progress",
      value: activeProjects,
      description: "Projects currently moving forward",
    },
    {
      label: "Planning",
      value: planningProjects,
      description: "Projects in planning or review phase",
    },
    {
      label: "Paused",
      value: pausedProjects,
      description: "Paused or archived project work",
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
            <p className="dashboard-label">Overview</p>
            <h2>Project list</h2>
          </div>
        </div>

        <div className="dashboard-project-grid">
          {dashboardProjects.map((project) => (
            <article className="dashboard-project-card" key={project.slug}>
              <div className="dashboard-project-top">
                <div>
                  <p className="dashboard-label">Project</p>
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
                <span>Type: {project.type}</span>
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