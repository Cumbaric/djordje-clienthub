export default function DashboardPage() {
  const stats = [
    {
      label: "Active clients",
      value: "4",
      description: "WordPress clients currently tracked",
    },
    {
      label: "Active projects",
      value: "3",
      description: "Websites, SEO tasks and improvements",
    },
    {
      label: "Open tasks",
      value: "12",
      description: "Pending work items and follow-ups",
    },
    {
      label: "Work notes",
      value: "8",
      description: "Internal notes and recent updates",
    },
  ];

  const quickActions = [
    {
      title: "Clients",
      description:
        "Manage WordPress clients, contact details and project status.",
      href: "/dashboard/clients",
    },
    {
      title: "Projects",
      description:
        "Track active websites, case studies and development progress.",
      href: "/dashboard/projects",
    },
    {
      title: "Tasks",
      description: "Review open tasks, priorities and next actions.",
      href: "/dashboard/tasks",
    },
    {
      title: "Notes",
      description: "Open work log, internal notes and daily progress records.",
      href: "/dashboard/notes",
    },
  ];

  const recentWork = [
    "Public portfolio section completed.",
    "Wellness Concept case study added.",
    "Projects, Services, Process and Contact pages checked.",
    "Dashboard structure prepared for private workspace.",
  ];

  return (
    <section className="dashboard-page">
      <div className="dashboard-header">
        <p className="dashboard-label">Private workspace</p>
        <h1>Dashboard</h1>
        <p>
          Privatni pregled klijenata, projekata, zadataka i radnih beleški za
          WordPress freelance posao.
        </p>
      </div>

      <div className="dashboard-stats-grid">
        {stats.map((item) => (
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
            <p className="dashboard-label">Quick actions</p>
            <h2>Main workspace areas</h2>
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
            <p className="dashboard-label">Recent work</p>
            <h2>Latest project activity</h2>
          </div>
        </div>

        <div className="dashboard-activity-list">
          {recentWork.map((item) => (
            <div className="dashboard-activity-item" key={item}>
              <span></span>
              <p>{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
