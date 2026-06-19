export async function seedOnboardingQuests(db) {
  const onboardData = [
    { title: 'Изучить интерфейс', difficulty: 'small', xp: 20, gold: 10, energy: 1 },
    { title: 'Создать первую привычку', difficulty: 'small', xp: 20, gold: 10, energy: 1 },
    { title: 'Завершить все обучения', difficulty: 'medium', xp: 60, gold: 30, energy: 2 },
  ];

  for (const q of onboardData) {
    await db.runAsync(
      `
      INSERT OR IGNORE INTO quests (title, difficulty, xp_reward, gold_reward, energy_cost, created_date)
      VALUES (?, ?, ?, ?, ?, ?)`,
      [q.title, q.difficulty, q.xp, q.gold, q.energy, '2026-06-19']
    );
  }
}
