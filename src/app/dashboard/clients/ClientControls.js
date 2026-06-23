"use client";

import { useState } from "react";
import { updateClientStatus, deleteClient } from "./actions";
import { useToast } from "@/components/ToastProvider";

const STATUSES = [
  { value: "Active", label: "Aktivan" },
  { value: "Maintenance", label: "Održavanje" },
  { value: "Paused", label: "Pauziran" },
];

export default function ClientControls({ client }) {
  const { showToast } = useToast();
  const [pendingDelete, setPendingDelete] = useState(false);

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

  return (
    <div className="dashboard-task-controls">
      <label className="dashboard-control-label">
        Status
        <select
          defaultValue={client.status}
          onChange={handleStatusChange}
          className="dashboard-select"
        >
          {STATUSES.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </label>

      {pendingDelete ? (
        <div className="dashboard-delete-confirm">
          <span>Obrisati?</span>
          <button onClick={handleDelete} className="dashboard-confirm-yes">
            Da
          </button>
          <button
            onClick={() => setPendingDelete(false)}
            className="dashboard-confirm-no"
          >
            Ne
          </button>
        </div>
      ) : (
        <button
          onClick={() => setPendingDelete(true)}
          className="dashboard-delete-btn"
        >
          Obriši
        </button>
      )}
    </div>
  );
}
