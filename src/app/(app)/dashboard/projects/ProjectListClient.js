"use client";

import { useState, useMemo } from "react";
import ProjectCard from "./ProjectCard";
import DashboardEmpty from "@/components/DashboardEmpty";

const STATUS_OPTIONS = [
  { value: "all", label: "Svi statusi" },
  { value: "Active", label: "Aktivan" },
  { value: "In progress", label: "U toku" },
  { value: "Planning", label: "Planiranje" },
  { value: "Paused", label: "Pauziran" },
];

export default function ProjectListClient({ projects }) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = useMemo(() => {
    return projects.filter((project) => {
      if (statusFilter !== "all" && project.status !== statusFilter) return false;
      if (search && !project.name.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [projects, search, statusFilter]);

  const hasFilters = search || statusFilter !== "all";

  return (
    <>
      <div className="dashboard-filter-bar">
        <input
          type="search"
          placeholder="Pretraži projekte..."
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
        <span className="dashboard-filter-count">{filtered.length} projekata</span>
      </div>

      <div className="dashboard-project-grid">
        {filtered.length === 0 && (
          <DashboardEmpty message={
            hasFilters
              ? "Nema projekata koji odgovaraju filterima."
              : "Još nema projekata — dodaj prvi pomoću forme iznad."
          } />
        )}
        {filtered.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </>
  );
}
