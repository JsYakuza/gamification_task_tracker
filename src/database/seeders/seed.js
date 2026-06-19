import { seedRewards } from './rewards';
import { seedOnboardingQuests } from './quests';
import { seedInitialUser } from './user';

const SEEDERS = [
  { name: 'initial_user', exec: seedInitialUser },
  { name: 'onboarding_quests', exec: seedOnboardingQuests },
  { name: 'rewards', exec: seedRewards },
];

export async function runSeeders(db) {
  await db.execAsync(`CREATE TABLE IF NOT EXISTS seed_history (name TEXT PRIMARY KEY);`);

  for (const s of SEEDERS) {
    const check = await db.getFirstAsync('SELECT 1 FROM seed_history WHERE name = ?', [s.name]);
    if (check) continue;

    console.log(`Запуск сида: ${s.name}`);
    await db.execAsync('BEGIN TRANSACTION;');
    try {
      await s.exec(db);
      await db.runAsync('INSERT INTO seed_history (name) VALUES (?)', [s.name]);
      await db.execAsync('COMMIT;');
    } catch (e) {
      await db.execAsync('ROLLBACK;');
      throw e;
    }
  }
}
