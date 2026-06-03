import { mysqlTable, int, text, json, timestamp } from "drizzle-orm/mysql-core";

/* Clients — WordPress / web clients tracked in the dashboard */
export const clients = mysqlTable("clients", {
  id: int("id").primaryKey().autoincrement(),
  name: text("name").notNull(),
  website: text("website"),
  type: text("type"),
  status: text("status"),
  priority: text("priority"),
  description: text("description"),
  notes: json("notes").$type(),
  createdAt: timestamp("created_at").defaultNow(),
});

/* Projects — work projects shown in the dashboard */
export const projects = mysqlTable("projects", {
  id: int("id").primaryKey().autoincrement(),
  slug: text("slug"),
  name: text("name").notNull(),
  client: text("client"),
  type: text("type"),
  status: text("status"),
  phase: text("phase"),
  progress: text("progress"),
  description: text("description"),
  nextSteps: json("next_steps").$type(),
  createdAt: timestamp("created_at").defaultNow(),
});

/* Tasks — open / in-progress / done work items */
export const tasks = mysqlTable("tasks", {
  id: int("id").primaryKey().autoincrement(),
  slug: text("slug"),
  title: text("title").notNull(),
  project: text("project"),
  priority: text("priority"),
  status: text("status"),
  focus: text("focus"),
  due: text("due"),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow(),
});

/* Notes — internal work log / notes */
export const notes = mysqlTable("notes", {
  id: int("id").primaryKey().autoincrement(),
  slug: text("slug"),
  title: text("title").notNull(),
  project: text("project"),
  type: text("type"),
  date: text("date"),
  status: text("status"),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow(),
});
