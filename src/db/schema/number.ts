import { integer, pgTable, serial } from "drizzle-orm/pg-core";

export const Number = pgTable("Number", {
  id: serial("ID").primaryKey(),
  value: integer("value").default(0),
});
