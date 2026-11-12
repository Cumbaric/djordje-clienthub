"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { requireAuth } from "@/lib/auth";
import { db } from "@/db";
import { tasks } from "@/db/schema";

function refresh() {
  revalidatePath("/dashboard/tasks");
  revalidatePath("/dashboard");
}

export async function createTask(formData) {
  await requireAuth();
  const title = formData.get("title")?.toString().trim();
  if (!title) return;

  await db.insert(tasks).values({
    title,
    project: formData.get("project")?.toString().trim() || null,
    priority: formData.get("priority")?.toString() || "Medium",
    status: formData.get("status")?.toString() || "Open",
    focus: formData.get("focus")?.toString().trim() || null,
    due: formData.get("due")?.toString().trim() || null,
    description: formData.get("description")?.toString().trim() || null,
  });

  refresh();
}

export async function updateTaskStatus(formData) {
  await requireAuth();
  const id = Number(formData.get("id"));
  const status = formData.get("status")?.toString();
  if (!id || !status) return;

  await db.update(tasks).set({ status }).where(eq(tasks.id, id));
  refresh();
}

export async function deleteTask(formData) {
  await requireAuth();
  const id = Number(formData.get("id"));
  if (!id) return;

  await db.delete(tasks).where(eq(tasks.id, id));
  refresh();
}

export async function archiveTask(formData) {
  await requireAuth();
  const id = Number(formData.get("id"));
  if (!id) return;

  await db.update(tasks).set({ archived: true }).where(eq(tasks.id, id));
  refresh();
}

export async function unarchiveTask(formData) {
  await requireAuth();
  const id = Number(formData.get("id"));
  if (!id) return;

  await db.update(tasks).set({ archived: false }).where(eq(tasks.id, id));
  refresh();
}

export async function updateTask(formData) {
  await requireAuth();
  const id = Number(formData.get("id"));
  if (!id) return;

  await db.update(tasks).set({
    title: formData.get("title")?.toString().trim() || undefined,
    description: formData.get("description")?.toString().trim() || null,
    project: formData.get("project")?.toString().trim() || null,
    focus: formData.get("focus")?.toString().trim() || null,
    due: formData.get("due")?.toString().trim() || null,
    priority: formData.get("priority")?.toString() || "Medium",
    status: formData.get("status")?.toString() || "Open",
  }).where(eq(tasks.id, id));

  refresh();
}
