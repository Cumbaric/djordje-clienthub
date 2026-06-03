import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

/*
  postgres-js connects lazily — creating the client does NOT open a connection,
  so importing this module during `next build` (while Next collects page data)
  is safe even if DATABASE_URL is momentarily unavailable. The real connection
  happens on the first query, at request time, where DATABASE_URL must be set
  (Vercel env in production, .env.local locally).
*/
const globalForDb = globalThis;

const client =
  globalForDb.__clienthubPg ??
  postgres(process.env.DATABASE_URL, { prepare: false });

if (process.env.NODE_ENV !== "production") {
  globalForDb.__clienthubPg = client;
}

export const db = drizzle(client, { schema });
