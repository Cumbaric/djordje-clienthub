"use client";

import { useState, useTransition } from "react";
import { sendContactEmail } from "@/lib/contactAction";

const SUBJECTS_EN = [
  "Custom-coded website",
  "WordPress / Elementor site",
  "WooCommerce / E-commerce",
  "SEO optimization",
  "Website maintenance",
  "AI-assisted workflow",
  "Other",
];

const SUBJECTS_SR = [
  "Sajt kodiran od nule",
  "WordPress / Elementor sajt",
  "WooCommerce / Online prodavnica",
  "SEO optimizacija",
  "Održavanje sajta",
  "AI-assisted workflow",
  "Drugo",
];

const t = {
  en: {
    heading: "Send me a message",
    name: "Your name",
    email: "Your email",
    subject: "Subject (optional)",
    subjectPlaceholder: "Select a topic",
    message: "Message",
    messagePlaceholder:
      "Brief project description — your website URL, what you want to improve or build, any deadline...",
    send: "Send message",
    sending: "Sending...",
    successHeading: "Message sent!",
    successText:
      "Thank you for reaching out. I will review your message and get back to you within 1–2 business days.",
    errorFallback: "Something went wrong. You can also reach me at",
    subjects: SUBJECTS_EN,
  },
  sr: {
    heading: "Pošalji mi poruku",
    name: "Tvoje ime",
    email: "Tvoj email",
    subject: "Tema (opciono)",
    subjectPlaceholder: "Izaberi temu",
    message: "Poruka",
    messagePlaceholder:
      "Kratak opis projekta — URL sajta, šta želiš da unaprediš ili napraviš, rok...",
    send: "Pošalji poruku",
    sending: "Šaljem...",
    successHeading: "Poruka poslata!",
    successText:
      "Hvala ti na poruci. Pregledam je i javljam se u roku od 1–2 radna dana.",
    errorFallback: "Nešto nije prošlo kako treba. Možeš me kontaktirati na",
    subjects: SUBJECTS_SR,
  },
};

export default function ContactForm({ lang = "en", contactEmail }) {
  const labels = t[lang] ?? t.en;
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState("idle"); // idle | success | error
  const [errorMsg, setErrorMsg] = useState("");
  const [fields, setFields] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [fieldErrors, setFieldErrors] = useState({});

  function validate() {
    const errors = {};
    if (!fields.name.trim()) errors.name = true;
    if (!fields.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email))
      errors.email = true;
    if (!fields.message.trim() || fields.message.trim().length < 10)
      errors.message = true;
    return errors;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: false }));
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }
    setFieldErrors({});
    startTransition(async () => {
      const result = await sendContactEmail(fields);
      if (result.success) {
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMsg(result.error ?? "");
      }
    });
  }

  if (status === "success") {
    return (
      <div className="contact-form-success">
        <span className="contact-form-success-icon" aria-hidden="true">✓</span>
        <h3>{labels.successHeading}</h3>
        <p>{labels.successText}</p>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <h2 className="contact-form-heading">{labels.heading}</h2>

      <div className="contact-form-row">
        <div className={`contact-form-field${fieldErrors.name ? " is-error" : ""}`}>
          <label htmlFor="cf-name">{labels.name} *</label>
          <input
            id="cf-name"
            name="name"
            type="text"
            autoComplete="name"
            value={fields.name}
            onChange={handleChange}
            disabled={isPending}
          />
        </div>
        <div className={`contact-form-field${fieldErrors.email ? " is-error" : ""}`}>
          <label htmlFor="cf-email">{labels.email} *</label>
          <input
            id="cf-email"
            name="email"
            type="email"
            autoComplete="email"
            value={fields.email}
            onChange={handleChange}
            disabled={isPending}
          />
        </div>
      </div>

      <div className="contact-form-field">
        <label htmlFor="cf-subject">{labels.subject}</label>
        <select
          id="cf-subject"
          name="subject"
          value={fields.subject}
          onChange={handleChange}
          disabled={isPending}
        >
          <option value="">{labels.subjectPlaceholder}</option>
          {labels.subjects.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      <div className={`contact-form-field${fieldErrors.message ? " is-error" : ""}`}>
        <label htmlFor="cf-message">{labels.message} *</label>
        <textarea
          id="cf-message"
          name="message"
          rows={5}
          placeholder={labels.messagePlaceholder}
          value={fields.message}
          onChange={handleChange}
          disabled={isPending}
        />
      </div>

      {status === "error" && (
        <p className="contact-form-error">
          {errorMsg}{" "}
          {contactEmail && (
            <>
              {labels.errorFallback}{" "}
              <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.
            </>
          )}
        </p>
      )}

      <button
        type="submit"
        className="contact-form-submit"
        disabled={isPending}
      >
        {isPending ? labels.sending : labels.send}
      </button>
    </form>
  );
}
