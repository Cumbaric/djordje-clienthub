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
