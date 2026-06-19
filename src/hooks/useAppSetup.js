import { useEffect, useState } from 'react';
import * as SQLite from 'expo-sqlite';
import * as Font from 'expo-font';
import { runMigrations } from '../database/migrations/migrate';
import { runSeeders } from '../database/seeders/seed';
import { Adapter } from '../database/infrastructure/DatabaseAdapter';
import { log } from '../utils/logger/logger';

export const useAppSetup = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          'Cyber-Bold': require('../../assets/fonts/SpaceMono-Bold.ttf'),
          'Cyber-Regular': require('../../assets/fonts/SpaceMono-Regular.ttf'),
        });

        const db = await SQLite.openDatabaseAsync('game_db');
        await runMigrations(db);
        await runSeeders(db);
        Adapter.init(db);
      } catch (e) {
        log.error('Setup failed', e);
      } finally {
        setIsReady(true);
      }
    }
    void prepare();
  }, []);

  return { isReady };
};
