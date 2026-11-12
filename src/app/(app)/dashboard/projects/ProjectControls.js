"use client";

import { useState } from "react";
import { updateProjectStatus, updateProjectProgress, deleteProject } from "./actions";
import { useToast } from "@/components/ToastProvider";

const STATUSES = [
  { value: "Active", label: "Aktivan" },
  { value: "In progress", label: "U toku" },
  { value: "Planning", label: "Planiranje" },
  { value: "Paused", label: "Pauziran" },
];

function parseProgress(value) {
  return parseInt((value ?? "0").toString().replace("%", ""), 10) || 0;
}

export default function ProjectControls({ project }) {
  const { showToast } = useToast();
  const [pendingDelete, setPendingDelete] = useState(false);
  const [progress, setProgress] = useState(parseProgress(project.progress));

  async function handleStatusChange(e) {
    const fd = new FormData();
    fd.append("id", project.id);
    fd.append("status", e.target.value);
    await updateProjectStatus(fd);
    showToast("Status projekta je ažuriran.");
  }

  async function handleProgressChange(e) {
    setProgress(Number(e.target.value));
  }

  async function handleProgressCommit(e) {
    const fd = new FormData();
    fd.append("id", project.id);
    fd.append("progress", e.target.value);
    await updateProjectProgress(fd);
    showToast(`Napredak ažuriran na ${e.target.value}%.`);
  }

  async function handleDelete() {
    const fd = new FormData();
    fd.append("id", project.id);
    await deleteProject(fd);
    showToast("Projekat je obrisan.");
  }

  return (
    <div className="dashboard-task-controls">
      <label className="dashboard-control-label">
        Status
        <select
          defaultValue={project.status}
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

      <label className="dashboard-control-label dashboard-progress-control">
        <span>Napredak: <strong>{progress}%</strong></span>
        <input
          type="range"
          min={0}
          max={100}
          step={5}
          value={progress}
          onChange={handleProgressChange}
          onMouseUp={handleProgressCommit}
          onTouchEnd={handleProgressCommit}
          className="dashboard-progress-slider"
        />
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
