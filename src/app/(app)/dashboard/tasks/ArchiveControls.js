"use client";

import { useState } from "react";
import { unarchiveTask, deleteTask } from "./actions";
import { useToast } from "@/components/ToastProvider";

export default function ArchiveControls({ task }) {
  const { showToast } = useToast();
  const [pendingDelete, setPendingDelete] = useState(false);

  async function handleUnarchive() {
    const fd = new FormData();
    fd.append("id", task.id);
    await unarchiveTask(fd);
    showToast("Zadatak je vraćen u aktivne.");
  }

  async function handleDelete() {
    const fd = new FormData();
    fd.append("id", task.id);
    await deleteTask(fd);
    showToast("Zadatak je trajno obrisan.");
  }

  return (
    <div className="dashboard-task-controls">
      <button onClick={handleUnarchive} className="dashboard-unarchive-btn">
        Vrati u aktivne
      </button>

      {pendingDelete ? (
        <div className="dashboard-delete-confirm">
          <span>Trajno obrisati?</span>
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
