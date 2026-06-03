"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { clients } from "@/db/schema";

function refresh() {
  revalidatePath("/dashboard/clients");
  revalidatePath("/dashboard");
}

// "a, b, c" -> ["a", "b", "c"]
function toList(value) {
  return (value?.toString() ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

export async function createClient(formData) {
  const name = formData.get("name")?.toString().trim();
  if (!name) return;

  await db.insert(clients).values({
    name,
    website: formData.get("website")?.toString().trim() || null,
    type: formData.get("type")?.toString().trim() || null,
    status: formData.get("status")?.toString() || "Active",
    priority: formData.get("priority")?.toString() || "Medium",
    description: formData.get("description")?.toString().trim() || null,
    notes: toList(formData.get("notes")),
  });

  refresh();
}

export async function updateClientStatus(formData) {
  const id = Number(formData.get("id"));
  const status = formData.get("status")?.toString();
  if (!id || !status) return;

  await db.update(clients).set({ status }).where(eq(clients.id, id));
  refresh();
}

export async function deleteClient(formData) {
  const id = Number(formData.get("id"));
  if (!id) return;

  await db.delete(clients).where(eq(clients.id, id));
  refresh();
}
