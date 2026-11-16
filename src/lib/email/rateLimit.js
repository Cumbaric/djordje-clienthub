/*
  Small in-memory protections. State lives in the Node process, so with several
  Passenger workers the limits are per-process (best effort, still useful against
  runaway loops and double clicks).
*/

export function createRateLimiter({ windowMs, max, maxKeys = 500, now = () => Date.now() }) {
  const hits = new Map(); // key -> timestamps

  function prune(time) {
    if (hits.size <= maxKeys) return;
    for (const [key, stamps] of hits) {
      if (stamps.every((t) => time - t >= windowMs)) hits.delete(key);
    }
    while (hits.size > maxKeys) hits.delete(hits.keys().next().value);
  }

  return {
    /** Returns { allowed, retryAfterMs }. Counts the attempt when allowed. */
    consume(key) {
      const time = now();
      prune(time);
      const stamps = (hits.get(key) ?? []).filter((t) => time - t < windowMs);
      if (stamps.length >= max) {
        hits.set(key, stamps);
        return { allowed: false, retryAfterMs: windowMs - (time - stamps[0]) };
      }
      stamps.push(time);
      hits.set(key, stamps);
      return { allowed: true, retryAfterMs: 0 };
    },
  };
}

/** Prevents the same logical "send" from running twice (double click, retry, replay). */
export function createIdempotencyStore({ ttlMs = 15 * 60 * 1000, maxKeys = 200, now = () => Date.now() } = {}) {
  const entries = new Map(); // key -> { state: "pending" | "done", at, result }

  function prune(time) {
    for (const [key, entry] of entries) if (time - entry.at > ttlMs) entries.delete(key);
    while (entries.size > maxKeys) entries.delete(entries.keys().next().value);
  }

  return {
    /** "new" (caller proceeds), "pending" (still running) or { done: result }. */
    begin(key) {
      const time = now();
      prune(time);
      const existing = entries.get(key);
      if (!existing) {
        entries.set(key, { state: "pending", at: time });
        return "new";
      }
      return existing.state === "pending" ? "pending" : { done: existing.result };
    },
    complete(key, result) {
      entries.set(key, { state: "done", at: now(), result });
    },
    /** Definite failure before the message was accepted: the same key may be retried. */
    release(key) {
      entries.delete(key);
    },
  };
}

/** Limits how many IMAP sessions run at once (shared mail servers cap connections per IP). */
export function createSemaphore(max) {
  let active = 0;
  const queue = [];
  return {
    async acquire() {
      if (active < max) {
        active += 1;
        return;
      }
      await new Promise((resolve) => queue.push(resolve));
      active += 1;
    },
    release() {
      active -= 1;
      queue.shift()?.();
    },
  };
}
