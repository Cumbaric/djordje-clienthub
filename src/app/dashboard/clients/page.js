import { db } from "@/db";
import { clients as clientsTable } from "@/db/schema";
import { statusLabel, priorityLabel } from "@/lib/dashboardLabels";

export const dynamic = "force-dynamic";

export default async function ClientsPage() {
  const clients = await db.select().from(clientsTable).orderBy(clientsTable.id);

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
      label: "Ukupno klijenata",
      value: totalClients,
      description: "Svi praćeni WordPress klijenti",
    },
    {
      label: "Aktivni klijenti",
      value: activeClients,
      description: "Trenutno aktivan rad sa klijentima",
    },
    {
      label: "Održavanje",
      value: maintenanceClients,
      description: "Klijenti u fazi održavanja",
    },
    {
      label: "Pauzirani",
      value: pausedClients,
      description: "Pauziran ili arhiviran rad",
    },
  ];

  return (
    <section className="dashboard-page">
      <div className="dashboard-header">
        <p className="dashboard-label">Upravljanje klijentima</p>
        <h1>Klijenti</h1>
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
            <p className="dashboard-label">Pregled</p>
            <h2>Lista klijenata</h2>
          </div>
        </div>

        <div className="dashboard-client-grid">
          {clients.map((client) => (
            <article className="dashboard-client-card" key={client.name}>
              <div className="dashboard-client-top">
                <div>
                  <p className="dashboard-label">Klijent</p>
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
                  {statusLabel(client.status)}
                </span>
              </div>

              <div className="dashboard-client-meta">
                <span>Tip: {client.type}</span>
                <span>Prioritet: {priorityLabel(client.priority)}</span>
              </div>

              <p className="dashboard-client-description">
                {client.description}
              </p>

              <div className="dashboard-next-steps">
                <h4>Fokus rada</h4>

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
