"use client";

import { formatListDate, shortPerson } from "@/lib/email/client";
import styles from "./email.module.css";

function PaperclipIcon() {
  return (
    <svg className={styles.clip} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
    </svg>
  );
}

/** Message rows + loading / empty / error states. Purely presentational. */
export default function MessageList({ state, folder, selectedUid, onSelect, onRetry }) {
  if (state.status === "loading" && !state.data) {
    return (
      <div className={styles.state} role="status" aria-live="polite">
        <span className={styles.spinner} aria-hidden="true" />
        <p className={styles.stateText}>Učitavanje poruka…</p>
      </div>
    );
  }

  if (state.status === "error" && !state.data) {
    return (
      <div className={styles.state} role="alert">
        <p className={styles.stateTitle}>Poruke nisu učitane</p>
        <p className={styles.stateText}>{state.error}</p>
        <button type="button" className={styles.secondaryButton} onClick={onRetry}>
          Pokušaj ponovo
        </button>
      </div>
    );
  }

  const data = state.data;
  if (!data || data.items.length === 0) {
    return (
      <div className={styles.state}>
        <p className={styles.stateTitle}>
          {data?.query ? "Nema rezultata" : folder === "sent" ? "Nema poslatih poruka" : "Inbox je prazan"}
        </p>
        <p className={styles.stateText}>
          {data?.query ? `Nijedna poruka ne odgovara pretrazi „${data.query}”.` : "Nema poruka za prikaz u ovom folderu."}
        </p>
      </div>
    );
  }

  return (
    <ul className={styles.items} aria-label={folder === "sent" ? "Poslate poruke" : "Primljene poruke"} aria-busy={state.status === "loading"}>
      {data.items.map((item) => {
        const unread = !item.seen && folder === "inbox";
        const party = folder === "sent" ? `Za: ${(item.to.map(shortPerson).join(", ") || "(nepoznato)")}` : shortPerson(item.from[0]);
        return (
          <li key={item.uid}>
            <button
              type="button"
              className={`${styles.item} ${unread ? styles.unread : ""} ${selectedUid === item.uid ? styles.itemSelected : ""}`}
              onClick={() => onSelect(item)}
              aria-current={selectedUid === item.uid ? "true" : undefined}
            >
              <span className={styles.itemTop}>
                {unread ? <span className={styles.unreadDot} aria-hidden="true" /> : <span className={styles.readDotSpace} aria-hidden="true" />}
                <span className={styles.from}>{party}</span>
                <span className={styles.date}>{formatListDate(item.date)}</span>
              </span>
              <span className={styles.subject}>
                <span className={styles.subjectText}>{item.subject || "(bez naslova)"}</span>
                {item.hasAttachments && <PaperclipIcon />}
              </span>
              {unread && <span className={styles.srOnly}>Nepročitana poruka</span>}
              {item.hasAttachments && <span className={styles.srOnly}>Ima prilog</span>}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
