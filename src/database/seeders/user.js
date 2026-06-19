export async function seedInitialUser(db) {
  const user = await db.getFirstAsync('SELECT * FROM users WHERE id = 1');
  if (!user) {
    await db.runAsync(
      'INSERT INTO users (id, username, level, experience, gold, current_energy) VALUES (1, "Странник", 1, 0, 0, 10)'
    );
  }
}
