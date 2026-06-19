export class QuestHistoryRepository {
  constructor(db) {
    this.db = db;
  }

  async getHistory() {
    return await this.db.getAllAsync('SELECT * FROM quest_history ORDER BY completion_date DESC');
  }

  async addRecord(questId, note = 'Completed') {
    return await this.db.runAsync(
      'INSERT INTO quest_history (quest_id, completion_date, note) VALUES (?, ?, ?)',
      [questId, new Date().toISOString(), note]
    );
  }

  async getHistoryByPeriod(startDate, endDate) {
    return await this.db.getAllAsync(
      'SELECT * FROM quest_history WHERE completion_date BETWEEN ? AND ? ORDER BY completion_date DESC',
      [startDate, endDate]
    );
  }

  async deleteRecord(historyId) {
    return await this.db.runAsync('DELETE FROM quest_history WHERE id = ?', [historyId]);
  }

  async keepLastRecords(limit = 100) {
    return await this.db.runAsync(
      `
            DELETE FROM quest_history 
            WHERE id NOT IN (
                SELECT id FROM quest_history 
                ORDER BY completion_date DESC 
                LIMIT ?
            )
        `,
      [limit]
    );
  }
}
