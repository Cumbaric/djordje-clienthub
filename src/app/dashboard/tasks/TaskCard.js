"use client";

import { useState } from "react";
import { updateTask, updateTaskStatus, deleteTask, archiveTask } from "./actions";
import { useToast } from "@/components/ToastProvider";
import { statusLabel, priorityLabel } from "@/lib/dashboardLabels";

const STATUSES = [
  { value: "Open", label: "Otvoren" },
  { value: "In progress", label: "U toku" },
  { value: "Done", label: "Završen" },
  { value: "Backlog", label: "Za kasnije" },
];

const PRIORITIES = [
  { value: "High", label: "Visok" },
  { value: "Medium", label: "Srednji" },
  { value: "Low", label: "Nizak" },
];

function formatDue(value) {
  if (!value) return null;
  const d = new Date(value);
  if (isNaN(d)) return value;
  return d.toLocaleDateString("sr-Latn-RS", { day: "2-digit", month: "2-digit", year: "numeric" });
}

function isOverdue(due, status) {
  if (!due || status === "Done") return false;
  const d = new Date(due);
  if (isNaN(d)) return false;
  return d < new Date(new Date().toDateString());
}

function isDueSoon(due, status) {
  if (!due || status === "Done") return false;
  const d = new Date(due);
  if (isNaN(d)) return false;
  const today = new Date(new Date().toDateString());
  const diff = d - today;
  return diff >= 0 && diff <= 3 * 24 * 60 * 60 * 1000;
}

export default function TaskCard({ task }) {
  const { showToast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [pendingDelete, setPendingDelete] = useState(false);

  async function handleSave(e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    fd.append("id", task.id);
    await updateTask(fd);
    showToast("Zadatak je ažuriran.");
    setIsEditing(false);
  }

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

  const overdue = isOverdue(task.due, task.status);
  const dueSoon = !overdue && isDueSoon(task.due, task.status);

  if (isEditing) {
    return (
      <article className="dashboard-task-card dashboard-task-card-editing">
        <form onSubmit={handleSave} className="dashboard-inline-edit">
          <div className="dashboard-edit-row">
            <label className="dashboard-edit-field dashboard-edit-field-wide">
              <span>Naslov *</span>
              <input name="title" type="text" required defaultValue={task.title} />
            </label>
            <label className="dashboard-edit-field">
              <span>Projekat</span>
              <input name="project" type="text" defaultValue={task.project ?? ""} />
            </label>
          </div>
          <div className="dashboard-edit-row">
            <label className="dashboard-edit-field">
              <span>Prioritet</span>
              <select name="priority" defaultValue={task.priority ?? "Medium"}>
                {PRIORITIES.map((p) => (
                  <option key={p.value} value={p.value}>{p.label}</option>
                ))}
              </select>
            </label>
            <label className="dashboard-edit-field">
              <span>Status</span>
              <select name="status" defaultValue={task.status ?? "Open"}>
                {STATUSES.map((s) => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
            </label>
            <label className="dashboard-edit-field">
              <span>Fokus</span>
              <input name="focus" type="text" defaultValue={task.focus ?? ""} />
            </label>
            <label className="dashboard-edit-field">
              <span>Rok</span>
              <input name="due" type="date" defaultValue={task.due ?? ""} />
            </label>
          </div>
          <label className="dashboard-edit-field dashboard-edit-field-wide">
            <span>Opis</span>
            <textarea name="description" rows={2} defaultValue={task.description ?? ""} />
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
    <article className="dashboard-task-card">
      <div className="dashboard-task-main">
        <div>
          <p className="dashboard-label">Zadatak</p>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
        </div>
        <span className={`dashboard-status dashboard-status-${task.status.toLowerCase().replaceAll(" ", "-")}`}>
          {statusLabel(task.status)}
        </span>
      </div>

      <div className="dashboard-task-meta">
        <span>Projekat: {task.project}</span>
        <span>Prioritet: {priorityLabel(task.priority)}</span>
        <span>Fokus: {task.focus}</span>
        <span className={overdue ? "dashboard-overdue" : dueSoon ? "dashboard-due-soon" : ""}>
          Rok: {formatDue(task.due)}
          {overdue && <strong> — Istekao!</strong>}
          {dueSoon && <strong> — Uskoro ističe!</strong>}
        </span>
      </div>

      <div className="dashboard-task-controls">
        <label className="dashboard-control-label">
          Status
          <select defaultValue={task.status} onChange={handleStatusChange} className="dashboard-select">
            {STATUSES.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </label>

        <button onClick={() => setIsEditing(true)} className="dashboard-edit-btn">Uredi</button>
        <button onClick={handleArchive} className="dashboard-archive-btn">Arhiviraj</button>

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
