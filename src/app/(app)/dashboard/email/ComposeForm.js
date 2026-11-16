"use client";

import { useRef, useState } from "react";
import { EMAIL_LIMITS } from "@/lib/email/limits";
import { formatBytes, newRequestId, sendMessage } from "@/lib/email/client";
import styles from "./email.module.css";

function listToString(list) {
  return (list ?? []).join(", ");
}

/**
 * Compose / reply / forward form. One requestId per compose session: the server uses it
 * to refuse a second send of the same message (double click, retry, replay).
 */
export default function ComposeForm({ draft, context, onClose, onSent, heading }) {
  const [to, setTo] = useState(listToString(draft.to));
  const [cc, setCc] = useState(listToString(draft.cc));
  const [bcc, setBcc] = useState("");
  const [showCopies, setShowCopies] = useState(draft.cc?.length > 0);
  const [subject, setSubject] = useState(draft.subject ?? "");
  const [body, setBody] = useState(draft.body ?? "");
  const [files, setFiles] = useState([]);
  const [includeOriginalFiles, setIncludeOriginalFiles] = useState(Boolean(context?.hasAttachments));
  const [status, setStatus] = useState("idle"); // idle | sending | sent
  const [error, setError] = useState("");
  const [fieldError, setFieldError] = useState("");
  const requestId = useRef(newRequestId());
  const inFlight = useRef(false);

  const sending = status === "sending";
  const sent = status === "sent";

  function addFiles(event) {
    const picked = Array.from(event.target.files ?? []);
    event.target.value = "";
    if (picked.length === 0) return;
    const next = [...files, ...picked];
    const total = next.reduce((sum, file) => sum + file.size, 0);
    if (next.length > EMAIL_LIMITS.maxAttachments) {
      setFieldError(`Najviše ${EMAIL_LIMITS.maxAttachments} priloga po poruci.`);
      return;
    }
    if (picked.some((file) => file.size > EMAIL_LIMITS.maxAttachmentBytes)) {
      setFieldError(`Svaki prilog može imati najviše ${Math.round(EMAIL_LIMITS.maxAttachmentBytes / 1048576)} MB.`);
      return;
    }
    if (total > EMAIL_LIMITS.maxTotalAttachmentBytes) {
      setFieldError(`Ukupna veličina priloga može biti najviše ${Math.round(EMAIL_LIMITS.maxTotalAttachmentBytes / 1048576)} MB.`);
      return;
    }
    setFieldError("");
    setFiles(next);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (inFlight.current || sent) return; // guards against double submit before React re-renders
    inFlight.current = true;
    setStatus("sending");
    setError("");

    try {
      const result = await sendMessage({
        payload: {
          requestId: requestId.current,
          to,
          cc,
          bcc,
          subject,
          body,
          context: context
            ? {
                mode: context.mode,
                folder: context.folder,
                uid: context.uid,
                uidValidity: context.uidValidity,
                includeAttachments: context.mode === "forward" && includeOriginalFiles,
              }
            : undefined,
        },
        files,
      });
      setStatus("sent");
      onSent(result);
    } catch (err) {
      setStatus("idle");
      setError(err?.message || "Slanje nije uspelo.");
      // A definite validation/transport failure may be retried with the same request id;
      // the server refuses a replay of a message it already sent or could not confirm.
    } finally {
      inFlight.current = false;
    }
  }

  return (
    <form className={styles.compose} onSubmit={handleSubmit} aria-busy={sending}>
      <h2 className={styles.composeTitle}>{heading}</h2>

      {error && (
        <p className={styles.alert} role="alert">
          {error}
        </p>
      )}

      <label className={styles.field}>
        <span>Za</span>
        <input type="text" value={to} onChange={(e) => setTo(e.target.value)} placeholder="ime@primer.rs, drugi@primer.rs" autoComplete="off" disabled={sending || sent} required />
      </label>

      {showCopies ? (
        <>
          <label className={styles.field}>
            <span>Cc</span>
            <input type="text" value={cc} onChange={(e) => setCc(e.target.value)} autoComplete="off" disabled={sending || sent} />
          </label>
          <label className={styles.field}>
            <span>Bcc</span>
            <input type="text" value={bcc} onChange={(e) => setBcc(e.target.value)} autoComplete="off" disabled={sending || sent} />
          </label>
        </>
      ) : (
        <p>
          <button type="button" className={styles.linkButton} onClick={() => setShowCopies(true)}>
            Dodaj Cc / Bcc
          </button>
        </p>
      )}

      <label className={styles.field}>
        <span>Naslov</span>
        <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} maxLength={EMAIL_LIMITS.maxSubjectChars} disabled={sending || sent} />
      </label>

      <label className={styles.field}>
        <span>Poruka</span>
        <textarea value={body} onChange={(e) => setBody(e.target.value)} maxLength={EMAIL_LIMITS.maxBodyChars} disabled={sending || sent} />
      </label>

      <div className={styles.field}>
        <span>Prilozi</span>
        <input type="file" multiple onChange={addFiles} disabled={sending || sent} aria-label="Dodaj priloge" />
        {fieldError && <span className={styles.fieldError} role="alert">{fieldError}</span>}
        {files.length > 0 && (
          <ul className={styles.fileList}>
            {files.map((file, index) => (
              <li key={`${file.name}-${index}`} className={styles.fileRow}>
                <span>
                  {file.name} <span className={styles.attachmentSize}>({formatBytes(file.size)})</span>
                </span>
                <button type="button" className={styles.linkButton} onClick={() => setFiles(files.filter((_, i) => i !== index))} disabled={sending || sent}>
                  Ukloni
                </button>
              </li>
            ))}
          </ul>
        )}
        {context?.mode === "forward" && context.hasAttachments && (
          <label>
            <input type="checkbox" checked={includeOriginalFiles} onChange={(e) => setIncludeOriginalFiles(e.target.checked)} disabled={sending || sent} />{" "}
            Priloži i priloge originalne poruke
          </label>
        )}
      </div>

      <div className={styles.composeActions}>
        <button type="submit" className={styles.primaryButton} disabled={sending || sent}>
          {sending ? "Slanje…" : sent ? "Poslato" : "Pošalji"}
        </button>
        <button type="button" className={styles.secondaryButton} onClick={onClose} disabled={sending}>
          {sent ? "Zatvori" : "Odustani"}
        </button>
        {sending && (
          <span role="status" aria-live="polite">
            Poruka se šalje…
          </span>
        )}
      </div>
    </form>
  );
}
