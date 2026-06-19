export async function applyEnergyMigration(db) {
  const tableInfo = await db.getAllAsync('PRAGMA table_info(users);');
  const hasColumn = tableInfo.some((col) => col.name === 'last_energy_update');

  if (!hasColumn) {
    await db.execAsync('ALTER TABLE users ADD COLUMN last_energy_update TEXT;');
    await db.execAsync(
      'UPDATE users SET last_energy_update = CURRENT_TIMESTAMP WHERE last_energy_update IS NULL;'
    );
  }
}
