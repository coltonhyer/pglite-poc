import { PGlite } from "@electric-sql/pglite";
import { drizzle } from "drizzle-orm/pglite";

import * as schema from "./schema";
import migrations from "./migrations/migrations.json";
import migrator from "../../migrator.ts";

let db: ReturnType<typeof drizzle> | null = null;

export const initDB = async () => {
  const client = await PGlite.create("idb://test-database");

  db = drizzle(client, { schema });

  await db.dialect.migrate(migrations, db.session, {
    migrationsFolder: "./drizzle",
  });
};

export default db;
