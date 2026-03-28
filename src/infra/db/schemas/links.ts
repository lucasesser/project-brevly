import { pgTable, text} from "drizzle-orm/pg-core";
import { uuidv7 } from "uuidv7";

export const links = pgTable("links", {
  id: text('id').primaryKey().$defaultFn(() => uuidv7()),
  linkOriginal: text('linkOriginal').notNull(),
  linkEncutado: text('linkEncutado').notNull().unique()
});