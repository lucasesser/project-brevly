import { drizzle } from "drizzle-orm/postgres-js"
import { env } from "../../env";
import postgres from "postgres";
import {schema} from './schemas'

const pg = postgres(env.DATABASE_URL)
export const db = drizzle(pg, {schema});
