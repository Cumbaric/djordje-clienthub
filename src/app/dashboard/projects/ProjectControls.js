"use client";

import { updateProjectStatus, deleteProject } from "./actions";

const STATUSES = [
  { value: "Active", label: "Aktivan" },
  { value: "In progress", label: "U toku" },
  { value: "Planning", label: "Planiranje" },
  { value: "Paused", label: "Pauziran" },
];

export default function ProjectControls({ project }) {
  return (
    <div className="dashboard-task-controls">
      <form action={updateProjectStatus} className="dashboard-inline-form">
        <input type="hidden" name="id" value={project.id} />
        <label className="dashboard-control-label">
          Status
          <select
            name="status"
            defaultValue={project.status}
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

      <form action={deleteProject} className="dashboard-inline-form">
        <input type="hidden" name="id" value={project.id} />
        <button type="submit" className="dashboard-delete-btn">
          Obriši
        </button>
      </form>
    </div>
  );
}
