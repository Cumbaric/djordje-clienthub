import { db } from "@/db";
import { clients as clientsTable } from "@/db/schema";
import { statusLabel, priorityLabel, toArray } from "@/lib/dashboardLabels";
import { createClient } from "./actions";
import ClientControls from "./ClientControls";
import DashboardEmpty from "@/components/DashboardEmpty";
import "@/styles/dashboard-forms.css";

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
            <p className="dashboard-label">Dodaj novo</p>
            <h2>Novi klijent</h2>
          </div>
        </div>

        <form action={createClient} className="dashboard-form">
          <div className="dashboard-form-row">
            <label className="dashboard-field dashboard-field-wide">
              <span>Ime *</span>
              <input name="name" type="text" required placeholder="Naziv klijenta" />
            </label>
            <label className="dashboard-field">
              <span>Sajt</span>
              <input name="website" type="text" placeholder="npr. primer.rs" />
            </label>
          </div>

          <div className="dashboard-form-row">
            <label className="dashboard-field">
              <span>Tip</span>
              <input name="type" type="text" placeholder="npr. WordPress / Elementor" />
            </label>
            <label className="dashboard-field">
              <span>Status</span>
              <select name="status" defaultValue="Active">
                <option value="Active">Aktivan</option>
                <option value="Maintenance">Održavanje</option>
                <option value="Paused">Pauziran</option>
              </select>
            </label>
            <label className="dashboard-field">
              <span>Prioritet</span>
              <select name="priority" defaultValue="Medium">
                <option value="High">Visok</option>
                <option value="Medium">Srednji</option>
                <option value="Low">Nizak</option>
              </select>
            </label>
          </div>

          <label className="dashboard-field dashboard-field-wide">
            <span>Opis</span>
            <textarea name="description" rows={2} placeholder="Kratak opis klijenta" />
          </label>

          <label className="dashboard-field dashboard-field-wide">
            <span>Fokus rada (odvoji zarezom)</span>
            <input name="notes" type="text" placeholder="npr. SEO, Performanse, Elementor" />
          </label>

          <div className="dashboard-form-actions">
            <button type="submit" className="dashboard-primary-btn">
              Dodaj klijenta
            </button>
          </div>
        </form>
      </div>

      <div className="dashboard-section">
        <div className="dashboard-section-header">
          <div>
            <p className="dashboard-label">Pregled</p>
            <h2>Lista klijenata</h2>
          </div>
        </div>

        <div className="dashboard-client-grid">
          {clients.length === 0 && (
            <DashboardEmpty message="Još nema klijenata — dodaj prvog pomoću forme iznad." />
          )}
          {clients.map((client) => (
            <article className="dashboard-client-card" key={client.id}>
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
                  {toArray(client.notes).map((note) => (
                    <span key={note}>{note}</span>
                  ))}
                </div>
              </div>

              <ClientControls client={client} />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
