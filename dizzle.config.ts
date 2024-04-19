import {defineConfig} from "drizzle-kit";
import * as dotenv from "dotenv";
import {sql} from "@vercel/postgres";
import {drizzle} from 'drizzle-orm/vercel-postgres';

dotenv.config({path: ".env"});
export default defineConfig({
    dbCredentials: {
        connectionString: process.env.POSTGRES_URL ||""
    },
    driver: 'pg',
    out: "./db/drizzle",
    schema: "./db/schema/*"
});
export const db = drizzle(sql);

// drizzle-kit introspect:pg --config=dizzle.config.ts