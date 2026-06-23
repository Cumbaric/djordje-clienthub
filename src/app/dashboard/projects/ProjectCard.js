"use client";

import { useState, useTransition } from "react";
import { updateProject, updateProjectStatus, updateProjectProgressSilent, deleteProject } from "./actions";
import { useToast } from "@/components/ToastProvider";
import { statusLabel, toArray } from "@/lib/dashboardLabels";

const STATUSES = [
  { value: "Active", label: "Aktivan" },
  { value: "In progress", label: "U toku" },
  { value: "Planning", label: "Planiranje" },
  { value: "Paused", label: "Pauziran" },
];

function parseProgress(value) {
  return parseInt((value ?? "0").toString().replace("%", ""), 10) || 0;
}

export default function ProjectCard({ project }) {
  const { showToast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [pendingDelete, setPendingDelete] = useState(false);
  const [progress, setProgress] = useState(parseProgress(project.progress));
  const [, startTransition] = useTransition();

  const nextSteps = toArray(project.nextSteps);

  async function handleSave(e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    fd.append("id", project.id);
    await updateProject(fd);
    showToast("Projekat je ažuriran.");
    setIsEditing(false);
  }

  async function handleStatusChange(e) {
    const fd = new FormData();
    fd.append("id", project.id);
    fd.append("status", e.target.value);
    await updateProjectStatus(fd);
    showToast("Status projekta je ažuriran.");
  }

  function handleProgressCommit(e) {
    const value = e.target.value;
    startTransition(async () => {
      const fd = new FormData();
      fd.append("id", project.id);
      fd.append("progress", value);
      await updateProjectProgressSilent(fd);
    });
  }

  async function handleDelete() {
    const fd = new FormData();
    fd.append("id", project.id);
    await deleteProject(fd);
    showToast("Projekat je obrisan.");
  }

  if (isEditing) {
    return (
      <article className="dashboard-project-card dashboard-task-card-editing">
        <form onSubmit={handleSave} className="dashboard-inline-edit">
          <div className="dashboard-edit-row">
            <label className="dashboard-edit-field dashboard-edit-field-wide">
              <span>Naziv *</span>
              <input name="name" type="text" required defaultValue={project.name} />
            </label>
            <label className="dashboard-edit-field">
              <span>Klijent</span>
              <input name="client" type="text" defaultValue={project.client ?? ""} />
            </label>
          </div>
          <div className="dashboard-edit-row">
            <label className="dashboard-edit-field">
              <span>Tip</span>
              <input name="type" type="text" defaultValue={project.type ?? ""} />
            </label>
            <label className="dashboard-edit-field">
              <span>Status</span>
              <select name="status" defaultValue={project.status ?? "Planning"}>
                {STATUSES.map((s) => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
            </label>
            <label className="dashboard-edit-field">
              <span>Faza</span>
              <input name="phase" type="text" defaultValue={project.phase ?? ""} />
            </label>
            <label className="dashboard-edit-field">
              <span>Napredak (%)</span>
              <input name="progress" type="text" defaultValue={parseProgress(project.progress)} />
            </label>
          </div>
          <label className="dashboard-edit-field dashboard-edit-field-wide">
            <span>Opis</span>
            <textarea name="description" rows={2} defaultValue={project.description ?? ""} />
          </label>
          <label className="dashboard-edit-field dashboard-edit-field-wide">
            <span>Sledeći koraci (odvoji zarezom)</span>
            <input name="nextSteps" type="text" defaultValue={nextSteps.join(", ")} />
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
    <article className="dashboard-project-card">
      <div className="dashboard-project-top">
        <div>
          <p className="dashboard-label">Projekat</p>
          <h3>{project.name}</h3>
          <p>{project.client}</p>
        </div>
        <span className={`dashboard-status dashboard-status-${project.status.toLowerCase().replaceAll(" ", "-")}`}>
          {statusLabel(project.status)}
        </span>
      </div>

      <div className="dashboard-client-meta">
        <span>Tip: {project.type}</span>
        <span>Faza: {project.phase}</span>
      </div>

      <p className="dashboard-client-description">{project.description}</p>

      <div className="dashboard-progress">
        <div className="dashboard-progress-top">
          <span>Napredak</span>
          <strong>{progress}%</strong>
        </div>
        <div className="dashboard-progress-bar">
          <span style={{ width: `${progress}%` }}></span>
        </div>
      </div>

      <div className="dashboard-next-steps">
        <h4>Sledeći koraci</h4>
        <ul>
          {nextSteps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ul>
      </div>

      <div className="dashboard-task-controls">
        <label className="dashboard-control-label">
          Status
          <select defaultValue={project.status} onChange={handleStatusChange} className="dashboard-select">
            {STATUSES.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
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
            onChange={(e) => setProgress(Number(e.target.value))}
            onMouseUp={handleProgressCommit}
            onTouchEnd={handleProgressCommit}
            className="dashboard-progress-slider"
          />
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
