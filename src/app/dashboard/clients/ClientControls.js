"use client";

import { updateClientStatus, deleteClient } from "./actions";

const STATUSES = [
  { value: "Active", label: "Aktivan" },
  { value: "Maintenance", label: "Održavanje" },
  { value: "Paused", label: "Pauziran" },
];

export default function ClientControls({ client }) {
  return (
    <div className="dashboard-task-controls">
      <form action={updateClientStatus} className="dashboard-inline-form">
        <input type="hidden" name="id" value={client.id} />
        <label className="dashboard-control-label">
          Status
          <select
            name="status"
            defaultValue={client.status}
            onChange={(e) => e.currentTarget.form.requestSubmit()}
            className="dashboard-select"
          >
            {STATUSES.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </label>
      </form>

      <form action={deleteClient} className="dashboard-inline-form">
        <input type="hidden" name="id" value={client.id} />
        <button type="submit" className="dashboard-delete-btn">
          Obriši
        </button>
      </form>
    </div>
  );
}
