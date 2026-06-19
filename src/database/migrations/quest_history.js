export const QUEST_HISTORY = `
    CREATE TABLE IF NOT EXISTS quest_history (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      quest_id INTEGER NOT NULL,
      completed_date TEXT NOT NULL,
      FOREIGN KEY (quest_id) REFERENCES quests(id)
    );
`;
