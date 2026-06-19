export const STORE = `
    CREATE TABLE IF NOT EXISTS store_items (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      price INTEGER NOT NULL,
      min_level INTEGER DEFAULT 1,
      category TEXT NOT NULL,
      item_type TEXT NOT NULL DEFAULT 'permanent',
      icon_key TEXT,
      description TEXT
    );
    CREATE TABLE IF NOT EXISTS user_inventory (
      user_id INTEGER NOT NULL,
      item_id TEXT NOT NULL,
      quantity INTEGER DEFAULT 1,
      purchased_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (user_id, item_id),
      FOREIGN KEY (item_id) REFERENCES store_items(id)
    );
`;
