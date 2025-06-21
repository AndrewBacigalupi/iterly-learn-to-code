import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { drizzle as drizzlePg } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";
import 'dotenv/config';

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}

const databaseUrl = process.env.DATABASE_URL;

// Use different drivers based on the database URL
// Local PostgreSQL uses pg driver, remote Neon uses neon driver
let db;

if (databaseUrl.includes("localhost") || databaseUrl.includes("127.0.0.1")) {
  // Local PostgreSQL connection using pg driver
  const pool = new Pool({
    connectionString: databaseUrl,
  });
  db = drizzlePg(pool, { schema });
} else {
  // Remote Neon connection using neon driver
  const sql = neon(databaseUrl);
  db = drizzle(sql, { schema });
}

const dbExport = db;

export { dbExport };