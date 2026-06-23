"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { invoices } from "@/db/schema";

function refresh() {
  revalidatePath("/dashboard/finances");
  revalidatePath("/dashboard");
}

export async function createInvoice(formData) {
  const client = formData.get("client")?.toString().trim();
  if (!client) return;
  await db.insert(invoices).values({
    client,
    invoiceNumber: formData.get("invoiceNumber")?.toString().trim() || null,
    amount: parseInt(formData.get("amount")?.toString() || "0"),
    status: formData.get("status")?.toString() || "Unpaid",
    issueDate: formData.get("issueDate")?.toString() || null,
    dueDate: formData.get("dueDate")?.toString() || null,
    description: formData.get("description")?.toString().trim() || null,
  });
  refresh();
}

export async function updateInvoice(formData) {
  const id = Number(formData.get("id"));
  if (!id) return;
  await db.update(invoices).set({
    client: formData.get("client")?.toString().trim() || undefined,
    invoiceNumber: formData.get("invoiceNumber")?.toString().trim() || null,
    amount: parseInt(formData.get("amount")?.toString() || "0"),
    status: formData.get("status")?.toString() || "Unpaid",
    issueDate: formData.get("issueDate")?.toString() || null,
    dueDate: formData.get("dueDate")?.toString() || null,
    description: formData.get("description")?.toString().trim() || null,
  }).where(eq(invoices.id, id));
  refresh();
}

export async function updateInvoiceStatus(formData) {
  const id = Number(formData.get("id"));
  const status = formData.get("status")?.toString();
  if (!id || !status) return;
  await db.update(invoices).set({ status }).where(eq(invoices.id, id));
  refresh();
}

export async function deleteInvoice(formData) {
  const id = Number(formData.get("id"));
  if (!id) return;
  await db.delete(invoices).where(eq(invoices.id, id));
  refresh();
}
