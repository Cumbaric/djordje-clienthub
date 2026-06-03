"use client";

import { updateTaskStatus, deleteTask } from "./actions";

const STATUSES = ["Open", "In progress", "Done", "Backlog"];

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
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </label>
      </form>

      {/* Delete */}
      <form action={deleteTask} className="dashboard-inline-form">
        <input type="hidden" name="id" value={task.id} />
        <button type="submit" className="dashboard-delete-btn">
          Delete
        </button>
      </form>
    </div>
  );
}
