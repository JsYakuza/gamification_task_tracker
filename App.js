import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import * as SQLite from 'expo-sqlite';
import { runMigrations } from './src/database/migrations/migrate';
import { runSeeders } from './src/database/seeders/seed';
import { dbAdapter } from './src/database/infrastructure/DatabaseAdapter';
import { log } from './src/utils/logger/logger';

export default function App() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const setupDatabase = async () => {
      try {
        log.info('App: Запуск инициализации базы данных...');

        const db = await SQLite.openDatabaseAsync('game_db');

        await runMigrations(db);
        log.debug('App: Миграции завершены');

        await runSeeders(db);
        log.debug('App: Сиды завершены');

        dbAdapter.init(db);
        log.info('App: База данных и адаптер успешно готовы');

        setIsReady(true);
      } catch (error) {
        log.error('App: Критическая ошибка при инициализации БД', error);
      }
    };

    void setupDatabase();
  }, []);

  if (!isReady) return null;

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
