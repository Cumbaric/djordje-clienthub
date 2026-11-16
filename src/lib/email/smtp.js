import nodemailer from "nodemailer";
import { EmailError, safeErrorLog } from "./errors.js";

/*
  SMTP sending (nodemailer). Implicit TLS (secure: true) with certificate validation.
  File and URL access are disabled in nodemailer, so attachment objects can only carry
  in-memory buffers: user input can never make the server read a file or fetch a URL.
*/

const SAFE_TRANSPORT_OPTIONS = { disableFileAccess: true, disableUrlAccess: true };

export function createSmtpTransport(config) {
  return nodemailer.createTransport({
    host: config.smtp.host,
    port: config.smtp.port,
    secure: true,
    auth: { user: config.username, pass: config.password },
    connectionTimeout: 15_000,
    greetingTimeout: 10_000,
    socketTimeout: 60_000,
    tls: { minVersion: "TLSv1.2" }, // certificate validation stays ON
    ...SAFE_TRANSPORT_OPTIONS,
  });
}

/** Builds the RFC 822 bytes of a message without sending it (Bcc kept, for the Sent copy). */
export async function buildRawMessage(mail) {
  const transport = nodemailer.createTransport({
    streamTransport: true,
    buffer: true,
    newline: "unix",
    ...SAFE_TRANSPORT_OPTIONS,
  });
  const info = await transport.sendMail(mail);
  return info.message;
}

const BEFORE_DATA = new Set(["CONN", "EHLO", "HELO", "STARTTLS", "AUTH PLAIN", "AUTH LOGIN", "AUTH", "MAIL FROM", "RCPT TO"]);

/**
 * Decides whether a failed send certainly did NOT deliver anything. Anything that
 * failed at or after DATA (or with an unknown command) is treated as "unknown".
 */
export function classifySmtpError(error) {
  const code = String(error?.code ?? "");
  const command = String(error?.command ?? "");
  const certain = BEFORE_DATA.has(command) || code === "EAUTH" || code === "EENVELOPE" || code === "ECONNECTION" && !command;

  if (code === "EAUTH") {
    return { certain: true, mapped: new EmailError("smtp-auth", 502, "Prijava na SMTP server nije uspela. Proveri podešavanja naloga.", { cause: error }) };
  }
  if (/CERT|SELF_SIGNED|UNABLE_TO_VERIFY|ALTNAME/i.test(code)) {
    return { certain: true, mapped: new EmailError("smtp-tls", 502, "TLS sertifikat SMTP servera nije validan.", { cause: error }) };
  }
  if (code === "EENVELOPE" || (error?.responseCode >= 500 && error?.responseCode < 600 && command === "RCPT TO")) {
    return { certain: true, mapped: new EmailError("smtp-rejected", 422, "Server je odbio jednog ili više primalaca.", { cause: error }) };
  }
  if (["ECONNECTION", "ETIMEDOUT", "ESOCKET", "ECONNREFUSED", "ENOTFOUND", "EDNS", "ECONNRESET"].includes(code)) {
    return {
      certain,
      mapped: new EmailError(
        "smtp-connection",
        503,
        certain
          ? "Nije moguće povezati se sa SMTP serverom. Poruka nije poslata."
          : "Veza sa SMTP serverom je prekinuta tokom slanja. Proveri folder „Sent” pre ponovnog slanja.",
        { cause: error },
      ),
    };
  }
  return {
    certain,
    mapped: new EmailError("smtp-error", 502, certain ? "Slanje nije uspelo. Poruka nije poslata." : "Slanje nije potvrđeno. Proveri folder „Sent” pre ponovnog slanja.", { cause: error }),
  };
}

export function createSmtpService({ config, createTransport = createSmtpTransport, buildRaw = buildRawMessage }) {
  return {
    /** Sends once, never retries. Throws { certain, error } shaped EmailError via `sendError`. */
    async send(mail) {
      const transport = createTransport(config);
      try {
        return await transport.sendMail(mail);
      } catch (error) {
        safeErrorLog("smtp send failed", error);
        const { certain, mapped } = classifySmtpError(error);
        mapped.notSent = certain;
        throw mapped;
      } finally {
        try {
          transport.close?.();
        } catch {
          // nothing to clean up
        }
      }
    },
    buildRaw,
  };
}
