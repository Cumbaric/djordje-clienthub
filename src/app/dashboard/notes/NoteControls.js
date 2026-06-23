"use client";

import { useState } from "react";
import { updateNoteStatus, deleteNote } from "./actions";
import { useToast } from "@/components/ToastProvider";

const STATUSES = [
  { value: "Open", label: "Otvoren" },
  { value: "Done", label: "Završen" },
  { value: "Backlog", label: "Za kasnije" },
];

export default function NoteControls({ note }) {
  const { showToast } = useToast();
  const [pendingDelete, setPendingDelete] = useState(false);

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

  return (
    <div className="dashboard-task-controls">
      <label className="dashboard-control-label">
        Status
        <select
          defaultValue={note.status}
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
