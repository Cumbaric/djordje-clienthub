"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { projects } from "@/db/schema";

function refresh() {
  revalidatePath("/dashboard/projects");
  revalidatePath("/dashboard");
}

function toList(value) {
  return (value?.toString() ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

// "50" -> "50%", "50%" -> "50%", "" -> "0%"
function normalizeProgress(value) {
  const raw = (value?.toString() ?? "").trim();
  if (!raw) return "0%";
  return /^\d+$/.test(raw) ? `${raw}%` : raw;
}

export async function createProject(formData) {
  const name = formData.get("name")?.toString().trim();
  if (!name) return;

  await db.insert(projects).values({
    name,
    client: formData.get("client")?.toString().trim() || null,
    type: formData.get("type")?.toString().trim() || null,
    status: formData.get("status")?.toString() || "Planning",
    phase: formData.get("phase")?.toString().trim() || null,
    progress: normalizeProgress(formData.get("progress")),
    description: formData.get("description")?.toString().trim() || null,
    nextSteps: toList(formData.get("nextSteps")),
  });

  refresh();
}

export async function updateProjectStatus(formData) {
  const id = Number(formData.get("id"));
  const status = formData.get("status")?.toString();
  if (!id || !status) return;

  await db.update(projects).set({ status }).where(eq(projects.id, id));
  refresh();
}

export async function updateProjectProgress(formData) {
  const id = Number(formData.get("id"));
  const progress = normalizeProgress(formData.get("progress"));
  if (!id) return;

  await db.update(projects).set({ progress }).where(eq(projects.id, id));
  refresh();
}

export async function deleteProject(formData) {
  const id = Number(formData.get("id"));
  if (!id) return;

  await db.delete(projects).where(eq(projects.id, id));
  refresh();
}
