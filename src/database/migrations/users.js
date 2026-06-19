export const USERS = `
 CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL,
  level INTEGER DEFAULT 1,
  experience INTEGER DEFAULT 0,
  gold INTEGER DEFAULT 0,
  current_energy INTEGER DEFAULT 10,
  max_energy INTEGER DEFAULT 10                                                                          ,
  last_energy_refill TEXT                                       
 );
`;
