"use client";

import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const STATUS_LABELS = {
  Active: "Aktivan",
  "In progress": "U toku",
  Planning: "Planiranje",
  Paused: "Pauziran",
  Done: "Završen",
  Maintenance: "Održavanje",
};

const STATUS_COLORS = {
  Active: "#22c55e",
  "In progress": "#3b82f6",
  Planning: "#a855f7",
  Paused: "#f59e0b",
  Done: "#10b981",
  Maintenance: "#f97316",
};

const PRIORITY_COLORS = {
  High: "#ef4444",
  Medium: "#f59e0b",
  Low: "#22c55e",
};

const PRIORITY_LABELS = {
  High: "Visok",
  Medium: "Srednji",
  Low: "Nizak",
};

function buildProjectStatusData(projects) {
  const counts = {};
  for (const p of projects) {
    counts[p.status] = (counts[p.status] || 0) + 1;
  }
  return Object.entries(counts).map(([key, value]) => ({
    name: STATUS_LABELS[key] ?? key,
    value,
    key,
  }));
}

function buildTaskPriorityData(tasks) {
  const counts = { High: 0, Medium: 0, Low: 0 };
  for (const t of tasks) {
    if (counts[t.priority] !== undefined) counts[t.priority]++;
  }
  return Object.entries(counts).map(([key, value]) => ({
    name: PRIORITY_LABELS[key],
    value,
    key,
  }));
}

export default function DashboardCharts({ projects, tasks }) {
  const projectData = buildProjectStatusData(projects);
  const taskData = buildTaskPriorityData(tasks);

  return (
    <div className="dashboard-charts-grid">
      <div className="dashboard-chart-card">
        <p className="dashboard-label">Distribucija statusa</p>
        <h2 className="dashboard-chart-title">Projekti po statusu</h2>
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie
              data={projectData}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={85}
              paddingAngle={3}
              dataKey="value"
            >
              {projectData.map((entry) => (
                <Cell
                  key={entry.key}
                  fill={STATUS_COLORS[entry.key] ?? "#94a3b8"}
                />
              ))}
            </Pie>
            <Tooltip formatter={(value) => [value, "Projekata"]} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="dashboard-chart-card">
        <p className="dashboard-label">Raspodela prioriteta</p>
        <h2 className="dashboard-chart-title">Zadaci po prioritetu</h2>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={taskData} barSize={48}>
            <XAxis dataKey="name" tick={{ fontSize: 13 }} />
            <YAxis allowDecimals={false} tick={{ fontSize: 13 }} />
            <Tooltip formatter={(value) => [value, "Zadataka"]} />
            <Bar dataKey="value" radius={[6, 6, 0, 0]}>
              {taskData.map((entry) => (
                <Cell
                  key={entry.key}
                  fill={PRIORITY_COLORS[entry.key] ?? "#94a3b8"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
