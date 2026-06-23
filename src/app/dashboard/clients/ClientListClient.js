"use client";

import { useState, useMemo } from "react";
import ClientCard from "./ClientCard";
import DashboardEmpty from "@/components/DashboardEmpty";

const STATUS_OPTIONS = [
  { value: "all", label: "Svi statusi" },
  { value: "Active", label: "Aktivni" },
  { value: "Maintenance", label: "Održavanje" },
  { value: "Paused", label: "Pauzirani" },
];

export default function ClientListClient({ clients, projects = [], tasks = [] }) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = useMemo(() => {
    return clients.filter((client) => {
      if (statusFilter !== "all" && client.status !== statusFilter) return false;
      if (search && !client.name.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [clients, search, statusFilter]);

  const hasFilters = search || statusFilter !== "all";

  return (
    <>
      <div className="dashboard-filter-bar">
        <input
          type="search"
          placeholder="Pretraži klijente..."
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
        <span className="dashboard-filter-count">{filtered.length} klijenata</span>
      </div>

      <div className="dashboard-client-grid">
        {filtered.length === 0 && (
          <DashboardEmpty message={
            hasFilters
              ? "Nema klijenata koji odgovaraju filterima."
              : "Još nema klijenata — dodaj prvog pomoću forme iznad."
          } />
        )}
        {filtered.map((client) => {
          const relatedProjects = projects.filter((p) => p.client === client.name);
          const relatedProjectNames = new Set(relatedProjects.map((p) => p.name));
          const relatedTasks = tasks.filter(
            (t) => !t.archived && relatedProjectNames.has(t.project)
          );
          return (
            <ClientCard
              key={client.id}
              client={client}
              relatedProjects={relatedProjects}
              relatedTasks={relatedTasks}
            />
          );
        })}
      </div>
    </>
  );
}
