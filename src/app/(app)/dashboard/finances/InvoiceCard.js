"use client";

import { useState } from "react";
import { updateInvoice, updateInvoiceStatus, deleteInvoice } from "./actions";
import { useToast } from "@/components/ToastProvider";

const STATUSES = [
  { value: "Unpaid", label: "Neplaćeno" },
  { value: "Paid", label: "Plaćeno" },
  { value: "Overdue", label: "Kasni" },
];

const STATUS_LABEL = { Unpaid: "Neplaćeno", Paid: "Plaćeno", Overdue: "Kasni" };
const STATUS_CLASS = {
  Unpaid: "dashboard-invoice-status-unpaid",
  Paid: "dashboard-invoice-status-paid",
  Overdue: "dashboard-invoice-status-overdue",
};

function formatAmount(amount) {
  return Number(amount || 0).toLocaleString("de-DE") + " RSD";
}

function formatDate(value) {
  if (!value) return "—";
  const d = new Date(value);
  if (isNaN(d)) return value;
  return d.toLocaleDateString("sr-Latn-RS", { day: "2-digit", month: "2-digit", year: "numeric" });
}

export default function InvoiceCard({ invoice }) {
  const { showToast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [pendingDelete, setPendingDelete] = useState(false);

  async function handleSave(e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    fd.append("id", invoice.id);
    await updateInvoice(fd);
    showToast("Faktura je ažurirana.");
    setIsEditing(false);
  }

  async function handleStatusChange(e) {
    const fd = new FormData();
    fd.append("id", invoice.id);
    fd.append("status", e.target.value);
    await updateInvoiceStatus(fd);
    showToast("Status fakture je ažuriran.");
  }

  async function handleDelete() {
    const fd = new FormData();
    fd.append("id", invoice.id);
    await deleteInvoice(fd);
    showToast("Faktura je obrisana.");
  }

  if (isEditing) {
    return (
      <article className="dashboard-invoice-card dashboard-task-card-editing">
        <form onSubmit={handleSave} className="dashboard-inline-edit">
          <div className="dashboard-edit-row">
            <label className="dashboard-edit-field dashboard-edit-field-wide">
              <span>Klijent *</span>
              <input name="client" type="text" required defaultValue={invoice.client} />
            </label>
            <label className="dashboard-edit-field">
              <span>Broj fakture</span>
              <input name="invoiceNumber" type="text" defaultValue={invoice.invoiceNumber ?? ""} />
            </label>
          </div>
          <div className="dashboard-edit-row">
            <label className="dashboard-edit-field">
              <span>Iznos (RSD)</span>
              <input name="amount" type="number" min="0" defaultValue={invoice.amount ?? 0} />
            </label>
            <label className="dashboard-edit-field">
              <span>Status</span>
              <select name="status" defaultValue={invoice.status ?? "Unpaid"}>
                {STATUSES.map((s) => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
            </label>
            <label className="dashboard-edit-field">
              <span>Datum izdavanja</span>
              <input name="issueDate" type="date" defaultValue={invoice.issueDate ?? ""} />
            </label>
            <label className="dashboard-edit-field">
              <span>Rok plaćanja</span>
              <input name="dueDate" type="date" defaultValue={invoice.dueDate ?? ""} />
            </label>
          </div>
          <label className="dashboard-edit-field dashboard-edit-field-wide">
            <span>Opis</span>
            <textarea name="description" rows={2} defaultValue={invoice.description ?? ""} />
          </label>
          <div className="dashboard-edit-actions">
            <button type="submit" className="dashboard-save-btn">Sačuvaj</button>
            <button type="button" onClick={() => setIsEditing(false)} className="dashboard-cancel-btn">Otkaži</button>
          </div>
        </form>
      </article>
    );
  }

  return (
    <article className="dashboard-invoice-card">
      <div className="dashboard-invoice-top">
        <div>
          <p className="dashboard-label">
            Faktura{invoice.invoiceNumber ? ` · ${invoice.invoiceNumber}` : ""}
          </p>
          <h3>{invoice.client}</h3>
          <p className="dashboard-invoice-amount">{formatAmount(invoice.amount)}</p>
        </div>
        <span className={`dashboard-status ${STATUS_CLASS[invoice.status] ?? ""}`}>
          {STATUS_LABEL[invoice.status] ?? invoice.status}
        </span>
      </div>

      <div className="dashboard-invoice-meta">
        <span>Izdato: {formatDate(invoice.issueDate)}</span>
        <span>Rok: {formatDate(invoice.dueDate)}</span>
        {invoice.description && (
          <span className="dashboard-invoice-desc">{invoice.description}</span>
        )}
      </div>

      <div className="dashboard-task-controls">
        <label className="dashboard-control-label">
          Status
          <select defaultValue={invoice.status} onChange={handleStatusChange} className="dashboard-select">
            {STATUSES.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </label>
        <button onClick={() => setIsEditing(true)} className="dashboard-edit-btn">Uredi</button>
        {pendingDelete ? (
          <div className="dashboard-delete-confirm">
            <span>Obrisati?</span>
            <button onClick={handleDelete} className="dashboard-confirm-yes">Da</button>
            <button onClick={() => setPendingDelete(false)} className="dashboard-confirm-no">Ne</button>
          </div>
        ) : (
          <button onClick={() => setPendingDelete(true)} className="dashboard-delete-btn">Obriši</button>
        )}
      </div>
    </article>
  );
}
