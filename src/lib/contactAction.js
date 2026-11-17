"use server";

import { headers } from "next/headers";
import nodemailer from "nodemailer";
import { createRateLimiter } from "@/lib/email/rateLimit";

function createTransport() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 465),
    secure: Number(process.env.SMTP_PORT ?? 465) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

// Public form: best-effort protection against bots / floods (per Node process).
const limiter = createRateLimiter({ windowMs: 10 * 60 * 1000, max: 5 });

async function clientKey() {
  const h = await headers();
  return (h.get("x-forwarded-for") || h.get("x-real-ip") || "unknown").split(",")[0].trim();
}

export async function sendContactEmail({ name, email, subject, message, website }) {
  // Honeypot: real visitors never see this field. Pretend success so bots learn nothing.
  if (typeof website === "string" && website.trim() !== "") return { success: true };

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return { error: "Please fill in all required fields." };
  }

  if (name.length > 100 || email.length > 200 || String(subject ?? "").length > 150 || message.length > 5000) {
    return { error: "Message is too long." };
  }

  if (!limiter.consume(await clientKey()).allowed) {
    return { error: "Too many messages. Please try again in a few minutes." };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { error: "Please enter a valid email address." };
  }

  if (message.trim().length < 10) {
    return { error: "Message is too short." };
  }

  try {
    const transporter = createTransport();
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER,
      replyTo: email,
      subject: subject
        ? `[Portfolio] ${subject} — ${name}`
        : `[Portfolio] New inquiry from ${name}`,
      text: [
        `From: ${name}`,
        `Email: ${email}`,
        `Subject: ${subject || "—"}`,
        ``,
        `Message:`,
        message,
      ].join("\n"),
    });

    return { success: true };
  } catch {
    return { error: "Failed to send. Please contact us via email." };
  }
}
