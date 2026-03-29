import { pgTable, text} from "drizzle-orm/pg-core";
import { uuidv7 } from "uuidv7";

export const links = pgTable("links", {
  id: text('id').primaryKey().$defaultFn(() => uuidv7()),
  linkOriginal: text('linkOriginal').notNull(),
<<<<<<< HEAD
  linkEncurtado: text('linkEncurtado').notNull().unique()
=======
  linkEncutado: text('linkEncutado').notNull().unique()
>>>>>>> ba074f5269a2861d027e02ff2235604f75c87064
});