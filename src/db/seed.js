import { db } from "./index.js";
import {
  clients as clientsTable,
  projects as projectsTable,
  tasks as tasksTable,
  notes as notesTable,
} from "./schema.js";
import { clients as clientsData } from "../data/clients.js";
import { dashboardProjects } from "../data/dashboardProjects.js";
import { tasks as tasksData } from "../data/tasks.js";
import { notes as notesData } from "../data/notes.js";

async function seed() {
  console.log("Seeding database...");

  // Clear existing rows first so re-running stays idempotent.
  await db.delete(tasksTable);
  await db.delete(notesTable);
  await db.delete(projectsTable);
  await db.delete(clientsTable);

  await db.insert(clientsTable).values(clientsData);
  await db.insert(projectsTable).values(dashboardProjects);
  await db.insert(tasksTable).values(tasksData);
  await db.insert(notesTable).values(notesData);

  console.log(
    `Seeded: ${clientsData.length} clients, ${dashboardProjects.length} projects, ` +
      `${tasksData.length} tasks, ${notesData.length} notes.`,
  );
}

seed()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("Seed failed:", err);
    process.exit(1);
  });
