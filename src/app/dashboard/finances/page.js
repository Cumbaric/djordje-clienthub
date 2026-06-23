import { db } from "@/db";
import { invoices as invoicesTable } from "@/db/schema";
import { createInvoice } from "./actions";
import InvoiceListClient from "./InvoiceListClient";
import "@/styles/dashboard-forms.css";
import "@/styles/dashboard-extras.css";

export const dynamic = "force-dynamic";

function formatAmount(amount) {
  return Number(amount || 0).toLocaleString("de-DE") + " RSD";
}

export default async function FinancesPage() {
  const invoices = await db.select().from(invoicesTable).orderBy(invoicesTable.id);

  const paid = invoices.filter((i) => i.status === "Paid");
  const unpaid = invoices.filter((i) => i.status === "Unpaid");
  const overdue = invoices.filter((i) => i.status === "Overdue");

  const totalRevenue = paid.reduce((sum, i) => sum + (i.amount || 0), 0);
  const pendingAmount = unpaid.reduce((sum, i) => sum + (i.amount || 0), 0);
  const overdueAmount = overdue.reduce((sum, i) => sum + (i.amount || 0), 0);

  const clientRevenue = {};
  paid.forEach((inv) => {
    if (inv.client) {
      clientRevenue[inv.client] = (clientRevenue[inv.client] || 0) + (inv.amount || 0);
    }
  });
  const clientRevenueList = Object.entries(clientRevenue).sort((a, b) => b[1] - a[1]);

  const financeStats = [
    { label: "Ukupan prihod", value: formatAmount(totalRevenue), description: "Suma plaćenih faktura" },
    { label: "Čeka plaćanje", value: formatAmount(pendingAmount), description: `${unpaid.length} neplaćenih faktura` },
    { label: "Kasni", value: formatAmount(overdueAmount), description: `${overdue.length} faktura kasni` },
    { label: "Ukupno faktura", value: invoices.length, description: "Sve izdate fakture" },
  ];

  return (
    <section className="dashboard-page">
      <div className="dashboard-header">
        <p className="dashboard-label">Finansije</p>
        <h1>Fakture i prihodi</h1>
        <p>Praćenje faktura, prihoda po klijentima i neplaćenih iznosa.</p>
      </div>

      <div className="dashboard-stats-grid">
        {financeStats.map((item) => (
          <article className="dashboard-stat-card" key={item.label}>
            <span>{item.label}</span>
            <strong>{item.value}</strong>
            <p>{item.description}</p>
          </article>
        ))}
      </div>

      {clientRevenueList.length > 0 && (
        <div className="dashboard-section">
          <div className="dashboard-section-header">
            <div>
              <p className="dashboard-label">Analitika</p>
              <h2>Prihod po klijentu</h2>
            </div>
          </div>
          <div className="dashboard-client-revenue-list">
            {clientRevenueList.map(([client, amount]) => (
              <div key={client} className="dashboard-client-revenue-row">
                <span className="dashboard-client-revenue-name">{client}</span>
                <span className="dashboard-client-revenue-amount">{formatAmount(amount)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="dashboard-section">
        <div className="dashboard-section-header">
          <div>
            <p className="dashboard-label">Dodaj novo</p>
            <h2>Nova faktura</h2>
          </div>
        </div>
        <form action={createInvoice} className="dashboard-form">
          <div className="dashboard-form-row">
            <label className="dashboard-field dashboard-field-wide">
              <span>Klijent *</span>
              <input name="client" type="text" required placeholder="Ime klijenta" />
            </label>
            <label className="dashboard-field">
              <span>Broj fakture</span>
              <input name="invoiceNumber" type="text" placeholder="npr. 2026-001" />
            </label>
          </div>
          <div className="dashboard-form-row">
            <label className="dashboard-field">
              <span>Iznos (RSD)</span>
              <input name="amount" type="number" min="0" placeholder="npr. 45000" />
            </label>
            <label className="dashboard-field">
              <span>Status</span>
              <select name="status" defaultValue="Unpaid">
                <option value="Unpaid">Neplaćeno</option>
                <option value="Paid">Plaćeno</option>
                <option value="Overdue">Kasni</option>
              </select>
            </label>
            <label className="dashboard-field">
              <span>Datum izdavanja</span>
              <input name="issueDate" type="date" />
            </label>
            <label className="dashboard-field">
              <span>Rok plaćanja</span>
              <input name="dueDate" type="date" />
            </label>
          </div>
          <label className="dashboard-field dashboard-field-wide">
            <span>Opis</span>
            <textarea name="description" rows={2} placeholder="Opis usluge ili napomena" />
          </label>
          <div className="dashboard-form-actions">
            <button type="submit" className="dashboard-primary-btn">Dodaj fakturu</button>
          </div>
        </form>
      </div>

      <div className="dashboard-section">
        <div className="dashboard-section-header">
          <div>
            <p className="dashboard-label">Pregled</p>
            <h2>Lista faktura</h2>
          </div>
        </div>
        <InvoiceListClient invoices={invoices} />
      </div>
    </section>
  );
}
