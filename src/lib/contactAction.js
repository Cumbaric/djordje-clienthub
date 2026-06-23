"use server";

import nodemailer from "nodemailer";

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
    return { error: "Failed to send. Please contact me via email." };
  }
}
