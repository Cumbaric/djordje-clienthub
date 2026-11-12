"use client";

import { useState, useMemo } from "react";
import InvoiceCard from "./InvoiceCard";
import DashboardEmpty from "@/components/DashboardEmpty";

const STATUS_OPTIONS = [
  { value: "all", label: "Svi statusi" },
  { value: "Unpaid", label: "Neplaćeno" },
  { value: "Paid", label: "Plaćeno" },
  { value: "Overdue", label: "Kasni" },
];

function formatAmount(amount) {
  return Number(amount || 0).toLocaleString("de-DE") + " RSD";
}

function exportCSV(data) {
  const headers = ["Klijent", "Broj fakture", "Iznos (RSD)", "Status", "Datum izdavanja", "Rok plaćanja", "Opis"];
  const rows = data.map((i) => [
    i.client, i.invoiceNumber ?? "", i.amount ?? 0, i.status ?? "",
    i.issueDate ?? "", i.dueDate ?? "", i.description ?? "",
  ]);
  const csv = [headers, ...rows]
    .map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(","))
    .join("\n");
  const blob = new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "fakture.csv";
  a.click();
  URL.revokeObjectURL(url);
}

export default function InvoiceListClient({ invoices }) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = useMemo(() => {
    return invoices.filter((inv) => {
      if (statusFilter !== "all" && inv.status !== statusFilter) return false;
      if (search && !inv.client?.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [invoices, search, statusFilter]);

  const filteredTotal = filtered.reduce((sum, i) => sum + (i.amount || 0), 0);
  const hasFilters = search || statusFilter !== "all";

  return (
    <>
      <div className="dashboard-filter-bar">
        <input
          type="search"
          placeholder="Pretraži po klijentu..."
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
        <span className="dashboard-filter-count">
          {filtered.length} faktura · {formatAmount(filteredTotal)}
        </span>
        <button onClick={() => exportCSV(filtered)} className="dashboard-csv-btn">
          Izvezi CSV
        </button>
      </div>

      <div className="dashboard-invoice-list">
        {filtered.length === 0 && (
          <DashboardEmpty message={
            hasFilters
              ? "Nema faktura koje odgovaraju filterima."
              : "Nema faktura — dodaj prvu pomoću forme iznad."
          } />
        )}
        {filtered.map((invoice) => (
          <InvoiceCard key={invoice.id} invoice={invoice} />
        ))}
      </div>
    </>
  );
}
