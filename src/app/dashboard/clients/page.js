import { clients } from "@/data/clients";

export default function ClientsPage() {
  const totalClients = clients.length;

  const activeClients = clients.filter(
    (client) => client.status === "Active",
  ).length;

  const maintenanceClients = clients.filter(
    (client) => client.status === "Maintenance",
  ).length;

  const pausedClients = clients.filter(
    (client) => client.status === "Paused",
  ).length;

  const clientStats = [
    {
      label: "Total clients",
      value: totalClients,
      description: "All tracked WordPress clients",
    },
    {
      label: "Active clients",
      value: activeClients,
      description: "Currently active client work",
    },
    {
      label: "Maintenance",
      value: maintenanceClients,
      description: "Clients in maintenance phase",
    },
    {
      label: "Paused",
      value: pausedClients,
      description: "Paused or archived client work",
    },
  ];

  return (
    <section className="dashboard-page">
      <div className="dashboard-header">
        <p className="dashboard-label">Client management</p>
        <h1>Clients</h1>
        <p>
          Pregled WordPress klijenata, statusa projekata, tipa sajta i osnovnih
          radnih beleški.
        </p>
      </div>

      <div className="dashboard-stats-grid">
        {clientStats.map((item) => (
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
            <h2>Client list</h2>
          </div>
        </div>

        <div className="dashboard-client-grid">
          {clients.map((client) => (
            <article className="dashboard-client-card" key={client.name}>
              <div className="dashboard-client-top">
                <div>
                  <p className="dashboard-label">Client</p>
                  <h3>{client.name}</h3>
                  <a
                    href={`https://${client.website}`}
                    target="_blank"
                    rel="noreferrer"
                    className="dashboard-client-link"
                  >
                    {client.website}
                  </a>
                </div>

                <span
                  className={`dashboard-status dashboard-status-${client.status.toLowerCase()}`}
                >
                  {client.status}
                </span>
              </div>

              <div className="dashboard-client-meta">
                <span>Type: {client.type}</span>
                <span>Priority: {client.priority}</span>
              </div>

              <p className="dashboard-client-description">
                {client.description}
              </p>

              <div className="dashboard-next-steps">
                <h4>Work focus</h4>

                <div className="dashboard-tag-list">
                  {client.notes.map((note) => (
                    <span key={note}>{note}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
