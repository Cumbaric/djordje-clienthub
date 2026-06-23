"use client";

import { useState } from "react";
import { updateClient, updateClientStatus, deleteClient } from "./actions";
import { useToast } from "@/components/ToastProvider";
import { statusLabel, priorityLabel, toArray } from "@/lib/dashboardLabels";

const STATUSES = [
  { value: "Active", label: "Aktivan" },
  { value: "Maintenance", label: "Održavanje" },
  { value: "Paused", label: "Pauziran" },
];

const PRIORITIES = [
  { value: "High", label: "Visok" },
  { value: "Medium", label: "Srednji" },
  { value: "Low", label: "Nizak" },
];

export default function ClientCard({ client }) {
  const { showToast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [pendingDelete, setPendingDelete] = useState(false);

  async function handleSave(e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    fd.append("id", client.id);
    await updateClient(fd);
    showToast("Klijent je ažuriran.");
    setIsEditing(false);
  }

  async function handleStatusChange(e) {
    const fd = new FormData();
    fd.append("id", client.id);
    fd.append("status", e.target.value);
    await updateClientStatus(fd);
    showToast("Status klijenta je ažuriran.");
  }

  async function handleDelete() {
    const fd = new FormData();
    fd.append("id", client.id);
    await deleteClient(fd);
    showToast("Klijent je obrisan.");
  }

  const focusAreas = toArray(client.notes);

  if (isEditing) {
    return (
      <article className="dashboard-client-card dashboard-task-card-editing">
        <form onSubmit={handleSave} className="dashboard-inline-edit">
          <div className="dashboard-edit-row">
            <label className="dashboard-edit-field dashboard-edit-field-wide">
              <span>Ime *</span>
              <input name="name" type="text" required defaultValue={client.name} />
            </label>
            <label className="dashboard-edit-field">
              <span>Sajt</span>
              <input name="website" type="text" defaultValue={client.website ?? ""} />
            </label>
          </div>
          <div className="dashboard-edit-row">
            <label className="dashboard-edit-field">
              <span>Tip</span>
              <input name="type" type="text" defaultValue={client.type ?? ""} />
            </label>
            <label className="dashboard-edit-field">
              <span>Status</span>
              <select name="status" defaultValue={client.status ?? "Active"}>
                {STATUSES.map((s) => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
            </label>
            <label className="dashboard-edit-field">
              <span>Prioritet</span>
              <select name="priority" defaultValue={client.priority ?? "Medium"}>
                {PRIORITIES.map((p) => (
                  <option key={p.value} value={p.value}>{p.label}</option>
                ))}
              </select>
            </label>
          </div>
          <label className="dashboard-edit-field dashboard-edit-field-wide">
            <span>Opis</span>
            <textarea name="description" rows={2} defaultValue={client.description ?? ""} />
          </label>
          <label className="dashboard-edit-field dashboard-edit-field-wide">
            <span>Fokus rada (odvoji zarezom)</span>
            <input name="notes" type="text" defaultValue={focusAreas.join(", ")} />
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
    <article className="dashboard-client-card">
      <div className="dashboard-client-top">
        <div>
          <p className="dashboard-label">Klijent</p>
          <h3>{client.name}</h3>
          {client.website && (
            <a
              href={client.website.startsWith("http") ? client.website : `https://${client.website}`}
              target="_blank"
              rel="noreferrer"
              className="dashboard-client-link"
            >
              {client.website}
            </a>
          )}
        </div>
        <span className={`dashboard-status dashboard-status-${client.status.toLowerCase()}`}>
          {statusLabel(client.status)}
        </span>
      </div>

      <div className="dashboard-client-meta">
        <span>Tip: {client.type}</span>
        <span>Prioritet: {priorityLabel(client.priority)}</span>
      </div>

      <p className="dashboard-client-description">{client.description}</p>

      <div className="dashboard-next-steps">
        <h4>Fokus rada</h4>
        <div className="dashboard-tag-list">
          {focusAreas.map((note) => (
            <span key={note}>{note}</span>
          ))}
        </div>
      </div>

      <div className="dashboard-task-controls">
        <label className="dashboard-control-label">
          Status
          <select defaultValue={client.status} onChange={handleStatusChange} className="dashboard-select">
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
