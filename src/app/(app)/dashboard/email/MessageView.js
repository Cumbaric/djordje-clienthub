"use client";

import { attachmentUrl, formatBytes, formatFullDate, formatPerson } from "@/lib/email/client";
import EmailBody from "./EmailBody";
import styles from "./email.module.css";

function People({ label, list }) {
  if (!list || list.length === 0) return null;
  return (
    <>
      <dt>{label}</dt>
      <dd>{list.map(formatPerson).join(", ")}</dd>
    </>
  );
}

/** Message detail: header, attachments, body and the Reply / Reply All / Forward / Mark actions. */
export default function MessageView({ state, onBack, onReply, onReplyAll, onForward, onToggleSeen, onRetry, busy }) {
  if (state.status === "idle") {
    return (
      <div className={styles.state}>
        <p className={styles.stateTitle}>Izaberi poruku</p>
        <p className={styles.stateText}>Klikni na poruku sa liste da je pročitaš.</p>
      </div>
    );
  }

  if (state.status === "loading") {
    return (
      <div className={styles.viewInner}>
        <button type="button" className={`${styles.secondaryButton} ${styles.backButton}`} onClick={onBack}>
          ← Nazad na listu
        </button>
        <div className={styles.state} role="status" aria-live="polite">
          <span className={styles.spinner} aria-hidden="true" />
          <p className={styles.stateText}>Učitavanje poruke…</p>
        </div>
      </div>
    );
  }

  if (state.status === "error") {
    return (
      <div className={styles.viewInner}>
        <button type="button" className={`${styles.secondaryButton} ${styles.backButton}`} onClick={onBack}>
          ← Nazad na listu
        </button>
        <div className={styles.state} role="alert">
          <p className={styles.stateTitle}>Poruka nije učitana</p>
          <p className={styles.stateText}>{state.error}</p>
          <button type="button" className={styles.secondaryButton} onClick={onRetry}>
            Pokušaj ponovo
          </button>
        </div>
      </div>
    );
  }

  const message = state.message;
  const downloads = message.attachments.filter((attachment) => !attachment.inline);

  return (
    <article className={styles.viewInner} aria-labelledby="email-subject">
      <div className={styles.viewToolbar}>
        <button type="button" className={`${styles.secondaryButton} ${styles.backButton}`} onClick={onBack}>
          ← Nazad na listu
        </button>
        <button type="button" className={styles.secondaryButton} onClick={onReply}>
          Odgovori
        </button>
        <button type="button" className={styles.secondaryButton} onClick={onReplyAll}>
          Odgovori svima
        </button>
        <button type="button" className={styles.secondaryButton} onClick={onForward}>
          Prosledi
        </button>
        <button type="button" className={styles.secondaryButton} onClick={onToggleSeen} disabled={busy}>
          {message.seen ? "Označi kao nepročitano" : "Označi kao pročitano"}
        </button>
      </div>

      <h2 id="email-subject" className={styles.subjectLine}>
        {message.subject || "(bez naslova)"}
      </h2>

      <dl className={styles.meta}>
        <People label="Od" list={message.from} />
        <People label="Za" list={message.to} />
        <People label="Cc" list={message.cc} />
        <dt>Datum</dt>
        <dd>{formatFullDate(message.date) || "—"}</dd>
      </dl>

      {downloads.length > 0 && (
        <ul className={styles.attachments} aria-label="Prilozi">
          {downloads.map((attachment) => (
            <li key={attachment.index}>
              <a
                className={styles.attachment}
                href={attachmentUrl({
                  folder: message.folder,
                  uid: message.uid,
                  uidValidity: message.uidValidity,
                  index: attachment.index,
                })}
                download={attachment.filename}
              >
                {attachment.filename}
                <span className={styles.attachmentSize}>{formatBytes(attachment.size)}</span>
              </a>
            </li>
          ))}
        </ul>
      )}

      <EmailBody message={message} />
    </article>
  );
}
