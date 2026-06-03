import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error(
    "DATABASE_URL is not set. Add it to .env.local (local) and Vercel env (production).",
  );
}

// Reuse a single postgres client across hot-reloads / serverless invocations.
const globalForDb = globalThis;
const client =
  globalForDb.__clienthubPg ?? postgres(connectionString, { prepare: false });

if (process.env.NODE_ENV !== "production") {
  globalForDb.__clienthubPg = client;
}

export const db = drizzle(client, { schema });
