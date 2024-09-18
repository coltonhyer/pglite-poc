import crypto from "crypto-browserify";

export default async function migrate(db, config) {
  const migrations = await readMigrationFiles(config);
  await db.dialect.migrate(migrations, db.session, config);
}

async function readMigrationFiles(config: any) {
  const migrationQueries = [];
  const journalPath = `${config.migrationsFolder}/meta/_journal.json`;
  const journalAsString = await import(journalPath);
  const journal = await journalAsString.json();
  for (const journalEntry of journal.entries) {
    const migrationPath = `${config.migrationsFolder}/${journalEntry.tag}.sql`;
    try {
      const query = await import(migrationPath);
      const result = query.split("--> statement-breakpoint").map((it) => {
        return it;
      });
      migrationQueries.push({
        sql: result,
        bps: journalEntry.breakpoints,
        folderMillis: journalEntry.when,
        hash: crypto.createHash("sha256").update(query).digest("hex"),
      });
    } catch {
      throw new Error(
        `No file ${migrationPath} found in ${config.migrationsFolder} folder`
      );
    }
  }
  return migrationQueries;
}
