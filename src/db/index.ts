import { PGlite } from "@electric-sql/pglite";
import { drizzle } from "drizzle-orm/pglite";

import * as schema from "./schema";

const client = await PGlite.create("idb://test-database");

const db = drizzle(client, { schema });

export default db;
