"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { notes } from "@/db/schema";

function refresh() {
  revalidatePath("/dashboard/notes");
  revalidatePath("/dashboard");
}

export async function createNote(formData) {
  const title = formData.get("title")?.toString().trim();
  if (!title) return;

  await db.insert(notes).values({
    title,
    project: formData.get("project")?.toString().trim() || null,
    type: formData.get("type")?.toString().trim() || null,
    date: formData.get("date")?.toString().trim() || null,
    status: formData.get("status")?.toString() || "Open",
    description: formData.get("description")?.toString().trim() || null,
  });

  refresh();
}

export async function updateNoteStatus(formData) {
  const id = Number(formData.get("id"));
  const status = formData.get("status")?.toString();
  if (!id || !status) return;

  await db.update(notes).set({ status }).where(eq(notes.id, id));
  refresh();
}

export async function deleteNote(formData) {
  const id = Number(formData.get("id"));
  if (!id) return;

  await db.delete(notes).where(eq(notes.id, id));
  refresh();
}

export async function updateNote(formData) {
  const id = Number(formData.get("id"));
  if (!id) return;

  await db.update(notes).set({
    title: formData.get("title")?.toString().trim() || undefined,
    description: formData.get("description")?.toString().trim() || null,
    project: formData.get("project")?.toString().trim() || null,
    type: formData.get("type")?.toString().trim() || null,
    date: formData.get("date")?.toString().trim() || null,
    status: formData.get("status")?.toString() || "Open",
  }).where(eq(notes.id, id));

  refresh();
}
