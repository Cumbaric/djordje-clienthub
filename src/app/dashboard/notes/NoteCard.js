"use client";

import { useState } from "react";
import { updateNote, updateNoteStatus, deleteNote } from "./actions";
import { useToast } from "@/components/ToastProvider";
import { statusLabel } from "@/lib/dashboardLabels";

const STATUSES = [
  { value: "Open", label: "Otvoren" },
  { value: "Done", label: "Završen" },
  { value: "Backlog", label: "Za kasnije" },
];

export default function NoteCard({ note }) {
  const { showToast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [pendingDelete, setPendingDelete] = useState(false);

  async function handleSave(e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    fd.append("id", note.id);
    await updateNote(fd);
    showToast("Beleška je ažurirana.");
    setIsEditing(false);
  }

  async function handleStatusChange(e) {
    const fd = new FormData();
    fd.append("id", note.id);
    fd.append("status", e.target.value);
    await updateNoteStatus(fd);
    showToast("Status beleške je ažuriran.");
  }

  async function handleDelete() {
    const fd = new FormData();
    fd.append("id", note.id);
    await deleteNote(fd);
    showToast("Beleška je obrisana.");
  }

  if (isEditing) {
    return (
      <article className="dashboard-note-card dashboard-task-card-editing">
        <form onSubmit={handleSave} className="dashboard-inline-edit">
          <div className="dashboard-edit-row">
            <label className="dashboard-edit-field dashboard-edit-field-wide">
              <span>Naslov *</span>
              <input name="title" type="text" required defaultValue={note.title} />
            </label>
            <label className="dashboard-edit-field">
              <span>Projekat</span>
              <input name="project" type="text" defaultValue={note.project ?? ""} />
            </label>
          </div>
          <div className="dashboard-edit-row">
            <label className="dashboard-edit-field">
              <span>Tip</span>
              <input name="type" type="text" defaultValue={note.type ?? ""} />
            </label>
            <label className="dashboard-edit-field">
              <span>Status</span>
              <select name="status" defaultValue={note.status ?? "Open"}>
                {STATUSES.map((s) => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
            </label>
            <label className="dashboard-edit-field">
              <span>Datum</span>
              <input name="date" type="text" defaultValue={note.date ?? ""} />
            </label>
          </div>
          <label className="dashboard-edit-field dashboard-edit-field-wide">
            <span>Opis</span>
            <textarea name="description" rows={2} defaultValue={note.description ?? ""} />
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
    <article className="dashboard-note-card">
      <div className="dashboard-note-main">
        <div>
          <p className="dashboard-label">Beleška</p>
          <h3>{note.title}</h3>
          <p>{note.description}</p>
        </div>
        <span className={`dashboard-status dashboard-status-${note.status.toLowerCase().replaceAll(" ", "-")}`}>
          {statusLabel(note.status)}
        </span>
      </div>

      <div className="dashboard-task-meta">
        <span>Projekat: {note.project}</span>
        <span>Tip: {note.type}</span>
        <span>Datum: {note.date}</span>
      </div>

      <div className="dashboard-task-controls">
        <label className="dashboard-control-label">
          Status
          <select defaultValue={note.status} onChange={handleStatusChange} className="dashboard-select">
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
