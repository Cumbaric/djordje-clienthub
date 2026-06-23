"use client";

import { useState } from "react";
import NoteCard from "./NoteCard";
import DashboardEmpty from "@/components/DashboardEmpty";

const PAGE_SIZE = 10;

export default function NoteListClient({ notes }) {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const visible = notes.slice(0, visibleCount);
  const hasMore = visibleCount < notes.length;

  return (
    <>
      <div className="dashboard-notes-list">
        {notes.length === 0 && (
          <DashboardEmpty message="Još nema beleški — dodaj prvu pomoću forme iznad." />
        )}
        {visible.map((note) => (
          <NoteCard key={note.id} note={note} />
        ))}
      </div>

      {hasMore && (
        <div className="dashboard-load-more">
          <button
            onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
            className="dashboard-load-more-btn"
          >
            Učitaj još ({notes.length - visibleCount} preostalih)
          </button>
        </div>
      )}
    </>
  );
}
