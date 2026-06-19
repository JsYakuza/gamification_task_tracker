import { SubquestMapper } from './SubquestMapper';

export class SubquestRepository {
  constructor(db) {
    this.db = db;
  }

  async create(questId, title) {
    return await this.db.runAsync('INSERT INTO subquests (quest_id, title) VALUES (?, ?)', [
      questId,
      title,
    ]);
  }

  async toggle(subquestId) {
    await this.db.runAsync('UPDATE subquests SET is_completed = NOT is_completed WHERE id = ?', [
      subquestId,
    ]);
  }

  async getByQuest(questId) {
    const rows = await this.db.getAllAsync('SELECT * FROM subquests WHERE quest_id = ?', [questId]);
    return rows.map(SubquestMapper.toModel);
  }

  async delete(subquestId) {
    await this.db.runAsync('DELETE FROM subquests WHERE id = ?', [subquestId]);
  }
}
