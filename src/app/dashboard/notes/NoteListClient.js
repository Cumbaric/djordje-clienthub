"use client";

import { useState, useMemo } from "react";
import NoteCard from "./NoteCard";
import DashboardEmpty from "@/components/DashboardEmpty";

const PAGE_SIZE = 10;

const STATUS_OPTIONS = [
  { value: "all", label: "Svi statusi" },
  { value: "Open", label: "Otvoren" },
  { value: "Done", label: "Završen" },
  { value: "Backlog", label: "Za kasnije" },
];

export default function NoteListClient({ notes }) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const filtered = useMemo(() => {
    setVisibleCount(PAGE_SIZE);
    return notes.filter((note) => {
      if (statusFilter !== "all" && note.status !== statusFilter) return false;
      if (search && !note.title.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [notes, search, statusFilter]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;
  const hasFilters = search || statusFilter !== "all";

  return (
    <>
      <div className="dashboard-filter-bar">
        <input
          type="search"
          placeholder="Pretraži beleške..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="dashboard-filter-search"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="dashboard-filter-select"
        >
          {STATUS_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
        {hasFilters && (
          <button
            onClick={() => { setSearch(""); setStatusFilter("all"); }}
            className="dashboard-filter-clear"
          >
            Poništi filtere
          </button>
        )}
        <span className="dashboard-filter-count">{filtered.length} beleški</span>
      </div>

      <div className="dashboard-notes-list">
        {filtered.length === 0 && (
          <DashboardEmpty message={
            hasFilters
              ? "Nema beleški koje odgovaraju filterima."
              : "Još nema beleški — dodaj prvu pomoću forme iznad."
          } />
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
            Učitaj još ({filtered.length - visibleCount} preostalih)
          </button>
        </div>
      )}
    </>
  );
}
