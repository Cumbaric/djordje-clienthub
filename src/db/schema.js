import { mysqlTable, int, text, json, timestamp, boolean } from "drizzle-orm/mysql-core";

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
  archived: boolean("archived").default(false),
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

/* Invoices — client invoices and revenue tracking */
export const invoices = mysqlTable("invoices", {
  id: int("id").primaryKey().autoincrement(),
  client: text("client"),
  invoiceNumber: text("invoice_number"),
  amount: int("amount").default(0),
  status: text("status").default("Unpaid"),
  issueDate: text("issue_date"),
  dueDate: text("due_date"),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow(),
});

/* Blog posts — bilingual (EN + SR) public blog */
export const blogPosts = mysqlTable("blog_posts", {
  id: int("id").primaryKey().autoincrement(),
  slug: text("slug").notNull(),
  titleEn: text("title_en"),
  titleSr: text("title_sr"),
  excerptEn: text("excerpt_en"),
  excerptSr: text("excerpt_sr"),
  contentEn: text("content_en"),
  contentSr: text("content_sr"),
  coverImage: text("cover_image"),
  status: text("status").default("draft"),
  publishedAt: text("published_at"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});
