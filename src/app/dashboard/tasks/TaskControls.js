"use client";

import { updateTaskStatus, deleteTask } from "./actions";

const STATUSES = [
  { value: "Open", label: "Otvoren" },
  { value: "In progress", label: "U toku" },
  { value: "Done", label: "Završen" },
  { value: "Backlog", label: "Za kasnije" },
];

export default function TaskControls({ task }) {
  return (
    <div className="dashboard-task-controls">
      {/* Change status — auto-submits on change */}
      <form action={updateTaskStatus} className="dashboard-inline-form">
        <input type="hidden" name="id" value={task.id} />
        <label className="dashboard-control-label">
          Status
          <select
            name="status"
            defaultValue={task.status}
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

      {/* Delete */}
      <form action={deleteTask} className="dashboard-inline-form">
        <input type="hidden" name="id" value={task.id} />
        <button type="submit" className="dashboard-delete-btn">
          Obriši
        </button>
      </form>
    </div>
  );
}
