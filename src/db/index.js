import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "./schema";

/*
  mysql2 createPool connects lazily — creating the pool does NOT open a
  connection, so importing this module during `next build` (while Next collects
  page data) is safe even if DATABASE_URL is momentarily unavailable. The real
  connection happens on the first query, at request time, where DATABASE_URL
  must be set (Hostinger app env in production, .env.local locally).

  DATABASE_URL format: mysql://user:password@host:3306/dbname
*/
const globalForDb = globalThis;

const pool =
  globalForDb.__clienthubMysql ??
  mysql.createPool(process.env.DATABASE_URL || { host: "localhost" });

if (process.env.NODE_ENV !== "production") {
  globalForDb.__clienthubMysql = pool;
}

export const db = drizzle(pool, { schema, mode: "default" });
