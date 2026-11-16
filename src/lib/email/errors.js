/**
 * Error with a stable machine code, an HTTP status and a message that is safe to
 * show to the user (never contains credentials, hostnames or message content).
 * The original error, if any, is kept in `cause` for server-side logging only.
 */
export class EmailError extends Error {
  constructor(code, status, message, { cause, details } = {}) {
    super(message);
    this.name = "EmailError";
    this.code = code;
    this.status = status;
    this.details = details;
    if (cause) this.cause = cause;
  }
}

export function isEmailError(error) {
  return error instanceof EmailError;
}

/** Log only non-sensitive metadata about an unexpected error. */
export function safeErrorLog(label, error) {
  console.error(`[email] ${label}`, {
    name: error?.name,
    code: error?.code,
    status: error?.status,
    command: error?.command,
    message: isEmailError(error) ? error.message : undefined,
  });
}
