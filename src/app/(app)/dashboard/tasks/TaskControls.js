"use client";

import { useState } from "react";
import { updateTaskStatus, deleteTask, archiveTask } from "./actions";
import { useToast } from "@/components/ToastProvider";

const STATUSES = [
  { value: "Open", label: "Otvoren" },
  { value: "In progress", label: "U toku" },
  { value: "Done", label: "Završen" },
  { value: "Backlog", label: "Za kasnije" },
];

export default function TaskControls({ task }) {
  const { showToast } = useToast();
  const [pendingDelete, setPendingDelete] = useState(false);

  async function handleStatusChange(e) {
    const fd = new FormData();
    fd.append("id", task.id);
    fd.append("status", e.target.value);
    await updateTaskStatus(fd);
    showToast("Status zadatka je ažuriran.");
  }

  async function handleArchive() {
    const fd = new FormData();
    fd.append("id", task.id);
    await archiveTask(fd);
    showToast("Zadatak je arhiviran.");
  }

  async function handleDelete() {
    const fd = new FormData();
    fd.append("id", task.id);
    await deleteTask(fd);
    showToast("Zadatak je obrisan.");
  }

  return (
    <div className="dashboard-task-controls">
      <label className="dashboard-control-label">
        Status
        <select
          defaultValue={task.status}
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

      <button onClick={handleArchive} className="dashboard-archive-btn">
        Arhiviraj
      </button>

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
