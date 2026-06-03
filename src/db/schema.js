import { pgTable, serial, text, jsonb, timestamp } from "drizzle-orm/pg-core";

/* Clients — WordPress / web clients tracked in the dashboard */
export const clients = pgTable("clients", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  website: text("website"),
  type: text("type"),
  status: text("status"),
  priority: text("priority"),
  description: text("description"),
  notes: jsonb("notes").$type().default([]),
  createdAt: timestamp("created_at").defaultNow(),
});

/* Projects — work projects shown in the dashboard */
export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  slug: text("slug"),
  name: text("name").notNull(),
  client: text("client"),
  type: text("type"),
  status: text("status"),
  phase: text("phase"),
  progress: text("progress"),
  description: text("description"),
  nextSteps: jsonb("next_steps").$type().default([]),
  createdAt: timestamp("created_at").defaultNow(),
});

/* Tasks — open / in-progress / done work items */
export const tasks = pgTable("tasks", {
  id: serial("id").primaryKey(),
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
export const notes = pgTable("notes", {
  id: serial("id").primaryKey(),
  slug: text("slug"),
  title: text("title").notNull(),
  project: text("project"),
  type: text("type"),
  date: text("date"),
  status: text("status"),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow(),
});
