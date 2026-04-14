import { pgTable, text, integer} from "drizzle-orm/pg-core";
import { uuidv7 } from "uuidv7";

export const links = pgTable("links", {
  id: text('id').primaryKey().$defaultFn(() => uuidv7()),
  linkOriginal: text('linkOriginal').notNull(),
  linkEncurtado: text('linkEncurtado').notNull().unique(),
  accessCount: integer('accessCount').notNull().default(0)
});