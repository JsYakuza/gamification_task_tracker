import { SEEDERS_HISTORY } from './seeders';
import { MIGRATIONS_HISTORY } from './migrations';
import { APP_THEMES, APP_AVATARS } from './assets';
import { QUEST_HISTORY } from './quest_history';
import { QUESTS } from './quests';
import { USERS } from './users';
import { STORE } from './store';
import { applyEnergyMigration } from './add_energy_field';
import { ADD_SUBQUEST_TABLE } from './add_subquest_table';

const MIGRATIONS = [
  {
    name: 'v0_init_system_tables',
    exec: async (db) => {
      await db.executeAsync(MIGRATIONS_HISTORY);
      await db.executeAsync(SEEDERS_HISTORY);
    },
  },
  {
    name: 'v1_initial_schema',
    exec: async (db) => {
      await db.execAsync(USERS);
      await db.execAsync(QUESTS);
      await db.execAsync(QUEST_HISTORY);
      await db.execAsync(APP_THEMES);
      await db.execAsync(APP_AVATARS);
      await db.execAsync(STORE);
      await db.execAsync(ADD_SUBQUEST_TABLE);
    },
  },
  { name: 'v2_energy_field', exec: (db) => applyEnergyMigration(db) },
];

export async function runMigrations(db) {
  for (const m of MIGRATIONS) {
    const check = await db.getFirstAsync('SELECT 1 FROM migration_history WHERE name = ?', [
      m.name,
    ]);
    if (check) continue;

    console.log(`Применяю миграцию: ${m.name}`);
    await db.execAsync('BEGIN TRANSACTION;');
    try {
      await m.exec(db);
      await db.runAsync('INSERT INTO migration_history (name) VALUES (?)', [m.name]);
      await db.execAsync('COMMIT;');
    } catch (e) {
      await db.execAsync('ROLLBACK;');
      throw e;
    }
  }
}
