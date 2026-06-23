"use client";

import { useState, useMemo } from "react";

const DAYS_SR = ["Pon", "Uto", "Sre", "Čet", "Pet", "Sub", "Ned"];
const MONTHS_SR = [
  "Januar", "Februar", "Mart", "April", "Maj", "Jun",
  "Jul", "Avgust", "Septembar", "Oktobar", "Novembar", "Decembar",
];
const PRIORITY_COLOR = { High: "#ef4444", Medium: "#f59e0b", Low: "#22c55e" };

function toISO(due) {
  if (!due) return null;
  if (/^\d{4}-\d{2}-\d{2}$/.test(due)) return due;
  const m = due.match(/^(\d{2})\.(\d{2})\.(\d{4})/);
  if (m) return `${m[3]}-${m[2].padStart(2, "0")}-${m[1].padStart(2, "0")}`;
  return null;
}

function buildGrid(year, month) {
  const first = new Date(year, month, 1);
  const last = new Date(year, month + 1, 0);
  let dow = first.getDay() - 1;
  if (dow < 0) dow = 6;
  const days = [];
  for (let i = dow - 1; i >= 0; i--) days.push({ date: new Date(year, month, -i), cur: false });
  for (let d = 1; d <= last.getDate(); d++) days.push({ date: new Date(year, month, d), cur: true });
  while (days.length < 42) {
    days.push({ date: new Date(year, month + 1, days.length - last.getDate() - dow + 1), cur: false });
  }
  return days;
}

export default function CalendarClient({ tasks }) {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());

  const todayISO = now.toISOString().split("T")[0];

  const tasksByDay = useMemo(() => {
    const map = {};
    tasks.forEach((t) => {
      const iso = toISO(t.due);
      if (!iso) return;
      if (!map[iso]) map[iso] = [];
      map[iso].push(t);
    });
    return map;
  }, [tasks]);

  function prev() {
    if (month === 0) { setYear((y) => y - 1); setMonth(11); }
    else setMonth((m) => m - 1);
  }
  function next() {
    if (month === 11) { setYear((y) => y + 1); setMonth(0); }
    else setMonth((m) => m + 1);
  }
  function goToday() { setYear(now.getFullYear()); setMonth(now.getMonth()); }

  const grid = buildGrid(year, month);
  const noDateTasks = tasks.filter((t) => !toISO(t.due) && t.status !== "Done");

  return (
    <div className="dashboard-calendar-wrapper">
      <div className="dashboard-calendar-header">
        <button onClick={prev} className="dashboard-calendar-nav-btn">‹</button>
        <h2 className="dashboard-calendar-title">{MONTHS_SR[month]} {year}</h2>
        <button onClick={next} className="dashboard-calendar-nav-btn">›</button>
        <button onClick={goToday} className="dashboard-calendar-today-btn">Danas</button>
      </div>

      <div className="dashboard-calendar-legend">
        <span><span className="dashboard-calendar-legend-dot" style={{ background: "#ef4444" }} />Visok</span>
        <span><span className="dashboard-calendar-legend-dot" style={{ background: "#f59e0b" }} />Srednji</span>
        <span><span className="dashboard-calendar-legend-dot" style={{ background: "#22c55e" }} />Nizak</span>
      </div>

      <div className="dashboard-calendar-grid">
        {DAYS_SR.map((d) => (
          <div key={d} className="dashboard-calendar-weekday">{d}</div>
        ))}
        {grid.map(({ date, cur }, i) => {
          const iso = date.toISOString().split("T")[0];
          const dayTasks = tasksByDay[iso] || [];
          const isToday = iso === todayISO;
          return (
            <div
              key={i}
              className={[
                "dashboard-calendar-day",
                !cur && "dashboard-calendar-day-other",
                isToday && "dashboard-calendar-day-today",
              ].filter(Boolean).join(" ")}
            >
              <span className="dashboard-calendar-day-num">{date.getDate()}</span>
              {dayTasks.slice(0, 3).map((t) => (
                <div key={t.id} className="dashboard-calendar-task" title={t.title}>
                  <span
                    className="dashboard-calendar-task-dot"
                    style={{ background: PRIORITY_COLOR[t.priority] ?? "#94a3b8" }}
                  />
                  <span className="dashboard-calendar-task-label">{t.title}</span>
                </div>
              ))}
              {dayTasks.length > 3 && (
                <div className="dashboard-calendar-task-more">+{dayTasks.length - 3} još</div>
              )}
            </div>
          );
        })}
      </div>

      {noDateTasks.length > 0 && (
        <div style={{ marginTop: 32 }}>
          <div className="dashboard-section-header" style={{ marginBottom: 16 }}>
            <div>
              <p className="dashboard-label">Bez roka</p>
              <h2>Zadaci bez datuma</h2>
            </div>
          </div>
          <div className="dashboard-calendar-nodate-list">
            {noDateTasks.map((t) => (
              <div key={t.id} className="dashboard-calendar-nodate-item">
                <span
                  className="dashboard-calendar-task-dot"
                  style={{ background: PRIORITY_COLOR[t.priority] ?? "#94a3b8" }}
                />
                <span className="dashboard-calendar-nodate-title">{t.title}</span>
                {t.project && (
                  <span className="dashboard-calendar-nodate-project">{t.project}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
