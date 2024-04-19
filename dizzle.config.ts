import {Config} from "drizzle-kit";
import * as dotenv from "dotenv";
import { sql } from "@vercel/postgres";
import { drizzle } from 'drizzle-orm/vercel-postgres';

dotenv.config({path: ".env"});
export default {
    schema: "./db/schema/*",
    out: "./db/drizzle",
    driver: 'pg',
    dbCredentials: {
        connectionString: process.env.POSTGRES_URL,
    }
} satisfies Config;
export const db = drizzle(sql);

// drizzle-kit introspect:pg --config=dizzle.config.ts