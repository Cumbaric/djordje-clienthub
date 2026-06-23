"use client";

import { useState, useMemo } from "react";
import TaskCard from "./TaskCard";
import DashboardEmpty from "@/components/DashboardEmpty";

const PAGE_SIZE = 10;

const STATUS_OPTIONS = [
  { value: "all", label: "Svi statusi" },
  { value: "Open", label: "Otvoren" },
  { value: "In progress", label: "U toku" },
  { value: "Done", label: "Završen" },
  { value: "Backlog", label: "Za kasnije" },
];

const PRIORITY_OPTIONS = [
  { value: "all", label: "Svi prioriteti" },
  { value: "High", label: "Visok" },
  { value: "Medium", label: "Srednji" },
  { value: "Low", label: "Nizak" },
];

export default function TaskListClient({ tasks }) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const filtered = useMemo(() => {
    setVisibleCount(PAGE_SIZE);
    return tasks.filter((task) => {
      if (statusFilter !== "all" && task.status !== statusFilter) return false;
      if (priorityFilter !== "all" && task.priority !== priorityFilter) return false;
      if (search && !task.title.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [tasks, search, statusFilter, priorityFilter]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;
  const hasFilters = search || statusFilter !== "all" || priorityFilter !== "all";

  return (
    <>
      <div className="dashboard-filter-bar">
        <input
          type="search"
          placeholder="Pretraži zadatke..."
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
        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          className="dashboard-filter-select"
        >
          {PRIORITY_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
        {hasFilters && (
          <button
            onClick={() => { setSearch(""); setStatusFilter("all"); setPriorityFilter("all"); }}
            className="dashboard-filter-clear"
          >
            Poništi filtere
          </button>
        )}
        <span className="dashboard-filter-count">{filtered.length} zadataka</span>
      </div>

      <div className="dashboard-task-list">
        {filtered.length === 0 && (
          <DashboardEmpty message={
            hasFilters
              ? "Nema zadataka koji odgovaraju filterima."
              : "Nema aktivnih zadataka — dodaj prvi pomoću forme iznad."
          } />
        )}
        {visible.map((task) => (
          <TaskCard key={task.id} task={task} />
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
