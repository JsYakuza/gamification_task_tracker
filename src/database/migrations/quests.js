export const QUESTS = `
 CREATE TABLE IF NOT EXISTS quests (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT,
  difficulty TEXT NOT NULL, -- difficulty: 'large', 'medium', 'small'
  xp_reward INTEGER NOT NULL,
  gold_reward INTEGER NOT NULL,
  energy_cost INTEGER NOT NULL,
  created_date TEXT NOT NULL,
  is_archived INTEGER DEFAULT 0
 );
`;
