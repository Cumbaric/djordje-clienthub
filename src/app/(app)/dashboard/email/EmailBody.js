"use client";

import { useMemo, useState } from "react";
import DOMPurify from "dompurify";
import { buildEmailSrcdoc, EMAIL_FRAME_SANDBOX, sanitizeEmailHtml } from "@/lib/email/sanitizeHtml";
import styles from "./email.module.css";

/**
 * Renders an untrusted message body:
 *  - HTML  -> sanitized with DOMPurify, shown in a sandboxed iframe with a no-network CSP
 *  - text  -> escaped plain text (React text node, never innerHTML)
 */
export default function EmailBody({ message }) {
  const [forcePlain, setForcePlain] = useState(false);

  const rendered = useMemo(() => {
    if (!message.html) return null;
    const result = sanitizeEmailHtml(message.html, DOMPurify);
    if (!result.supported || !result.html || !result.html.trim()) return null;
    return { srcDoc: buildEmailSrcdoc(result.html), blockedImages: result.blockedImages };
  }, [message.html]);

  const showHtml = rendered && !forcePlain;

  return (
    <>
      {message.htmlTruncated && (
        <p className={styles.notice}>HTML verzija poruke je prevelika, prikazan je običan tekst.</p>
      )}
      {showHtml && rendered.blockedImages > 0 && (
        <p className={`${styles.notice} ${styles.noticeInfo}`}>
          Udaljene slike su blokirane radi privatnosti ({rendered.blockedImages}).
        </p>
      )}
      {showHtml ? (
        <iframe
          className={styles.frame}
          title="Sadržaj poruke"
          sandbox={EMAIL_FRAME_SANDBOX}
          referrerPolicy="no-referrer"
          srcDoc={rendered.srcDoc}
        />
      ) : (
        <pre className={styles.plainBody}>{message.text || "(poruka nema tekstualni sadržaj)"}</pre>
      )}
      {rendered && message.text && (
        <p>
          <button type="button" className={styles.linkButton} onClick={() => setForcePlain((value) => !value)}>
            {forcePlain ? "Prikaži formatiranu poruku" : "Prikaži kao običan tekst"}
          </button>
        </p>
      )}
      {message.textTruncated && <p className={styles.notice}>Tekst poruke je skraćen zbog veličine.</p>}
    </>
  );
}
