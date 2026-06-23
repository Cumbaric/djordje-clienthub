"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContactEmail({ name, email, subject, message }) {
  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return { error: "Please fill in all required fields." };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { error: "Please enter a valid email address." };
  }

  if (message.trim().length < 10) {
    return { error: "Message is too short." };
  }

  try {
    const { error } = await resend.emails.send({
      from: "Portfolio Contact <contact@djordjepopovic.com>",
      to: "djordjepopovicgm@gmail.com",
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

    if (error) return { error: "Failed to send. Please contact me via email." };
    return { success: true };
  } catch {
    return { error: "Failed to send. Please contact me via email." };
  }
}
