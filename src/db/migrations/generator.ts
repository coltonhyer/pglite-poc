/**
 * Generates a JSON file of necessary migrations for a drizzle-orm dialect migrator.
 *
 * There were a couple of problems with being able to use the integrated drizzle-orm migrator:
 *      - readMigrationFiles uses native node packages that are not available in the browser
 *      - Next does not like delivering sql files to the internal webpack server, making it hard to use a
 *        dynamic path importer in the browser
 *
 * The purpose of this file is to provide a JSON file that can be delivered to the webpack server and utilized in the browser.
 *
 * In order to use the generated migrations file
 *
 * ```
 * import * as migrationsJson from "path/to/migrations/migrations.json"
 *
 * ...
 *
 * await db.dialect.migrate(migrationsJson, db.session, { migrationsFolder: "./drizzle"})
 *
 * ```
 */

import { readMigrationFiles } from "drizzle-orm/migrator";
import { writeFileSync } from "node:fs";
import { join } from "node:path";

try {
  const migrationsFolder = join(__dirname, "../../../drizzle");
  const migrations = readMigrationFiles({ migrationsFolder });
  try {
    const jsonToWrite = JSON.stringify(migrations, null, 2);

    const path = join(__dirname, "migrations.json");

    writeFileSync(path, jsonToWrite, "utf8");
  } catch (error) {
    console.error(
      "Unable to write migrations to JSON file. Received error: ",
      error
    );
  }
} catch (error) {
  console.error("Unable to generate migration json. Received error: ", error);
}
