"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { tasks } from "@/db/schema";

function refresh() {
  revalidatePath("/dashboard/tasks");
  revalidatePath("/dashboard");
}

export async function createTask(formData) {
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
  const id = Number(formData.get("id"));
  const status = formData.get("status")?.toString();
  if (!id || !status) return;

  await db.update(tasks).set({ status }).where(eq(tasks.id, id));
  refresh();
}

export async function deleteTask(formData) {
  const id = Number(formData.get("id"));
  if (!id) return;

  await db.delete(tasks).where(eq(tasks.id, id));
  refresh();
}
