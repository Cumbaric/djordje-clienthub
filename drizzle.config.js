import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

config({ path: ".env.local" });

export default defineConfig({
  schema: "./src/db/schema.js",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    // Migrations use the session pooler (DIRECT_URL); fall back to DATABASE_URL.
    url: process.env.DIRECT_URL ?? process.env.DATABASE_URL,
  },
});
