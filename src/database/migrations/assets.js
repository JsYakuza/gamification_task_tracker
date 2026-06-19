export const APP_THEMES = `
    CREATE TABLE IF NOT EXISTS app_themes (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      required_level INTEGER NOT NULL
    );
`;
export const APP_AVATARS = `
    CREATE TABLE IF NOT EXISTS app_avatars (
      id TEXT PRIMARY KEY,
      image_name TEXT NOT NULL,
      required_level INTEGER NOT NULL
    );
`;
