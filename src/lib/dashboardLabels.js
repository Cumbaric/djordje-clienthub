// Serbian display labels for status/priority values.
// The stored values stay in English (used for filtering + CSS classes);
// only the visible text is translated.

const STATUS_LABELS = {
  Active: "Aktivan",
  Maintenance: "Održavanje",
  Paused: "Pauziran",
  Planning: "Planiranje",
  Open: "Otvoren",
  "In progress": "U toku",
  Done: "Završen",
  Backlog: "Za kasnije",
  Completed: "Završen",
};

const PRIORITY_LABELS = {
  High: "Visok",
  Medium: "Srednji",
  Low: "Nizak",
};

export function statusLabel(value) {
  return STATUS_LABELS[value] ?? value;
}

export function priorityLabel(value) {
  return PRIORITY_LABELS[value] ?? value;
}

// JSON array columns come back as strings on MariaDB (Hostinger) — normalize
// to a real array so .map() works whether the driver parses it or not.
export function toArray(value) {
  if (Array.isArray(value)) return value;
  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }
  return [];
}
