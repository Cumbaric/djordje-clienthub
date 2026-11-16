import { authorizeApiRequest } from "./authz.js";
import { getEmailConfig } from "./config.js";
import { createHandlers } from "./handlers.js";
import { createImapService } from "./imap.js";
import { createIdempotencyStore, createRateLimiter } from "./rateLimit.js";
import { createEmailService } from "./service.js";
import { createSmtpService } from "./smtp.js";

// Process-level state (see rateLimit.js): limits are per Node process.
const limiters = {
  read: createRateLimiter({ windowMs: 60_000, max: 120 }),
  write: createRateLimiter({ windowMs: 60_000, max: 60 }),
  send: createRateLimiter({ windowMs: 10 * 60_000, max: 10 }),
};
const idempotency = createIdempotencyStore();

export const emailHandlers = createHandlers({
  authorize: authorizeApiRequest,
  getConfig: () => getEmailConfig(),
  createService: (config) =>
    createEmailService({
      config,
      imap: createImapService({ config }),
      smtp: createSmtpService({ config }),
      idempotency,
    }),
  limiters,
});
