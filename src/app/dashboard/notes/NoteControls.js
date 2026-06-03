"use client";

import { updateNoteStatus, deleteNote } from "./actions";

const STATUSES = [
  { value: "Open", label: "Otvoren" },
  { value: "Done", label: "Završen" },
  { value: "Backlog", label: "Za kasnije" },
];

export default function NoteControls({ note }) {
  return (
    <div className="dashboard-task-controls">
      <form action={updateNoteStatus} className="dashboard-inline-form">
        <input type="hidden" name="id" value={note.id} />
        <label className="dashboard-control-label">
          Status
          <select
            name="status"
            defaultValue={note.status}
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

      <form action={deleteNote} className="dashboard-inline-form">
        <input type="hidden" name="id" value={note.id} />
        <button type="submit" className="dashboard-delete-btn">
          Obriši
        </button>
      </form>
    </div>
  );
}
