import { QuestMapper } from './QuestMapper';

export class QuestRepository {
  constructor(db, subquestRepository, userRepository, historyRepository) {
    this.db = db;
    this.subquestRepository = subquestRepository;
    this.userRepository = userRepository;
    this.historyRepository = historyRepository;
  }

  async createQuest(title, xp, gold, energyCost, dueDate) {
    return await this.db.runAsync(
      'INSERT INTO quests (title, xp, gold, energy_cost, due_date) VALUES (?, ?, ?, ?, ?)',
      [title, xp, gold, energyCost, dueDate]
    );
  }

  async getDailyQuests(date) {
    const rows = await this.db.getAllAsync('SELECT * FROM quests WHERE due_date = ?', [date]);
    return rows.map(QuestMapper.toModel);
  }

  async getQuestDetails(questId) {
    const questRow = await this.db.getFirstAsync('SELECT * FROM quests WHERE id = ?', [questId]);
    if (!questRow) return null;

    const subquests = await this.subquestRepository.getByQuest(questId);

    return {
      ...QuestMapper.toModel(questRow),
      subquests,
    };
  }

  async completeQuest(questId) {
    await this.db.withTransactionAsync(async () => {
      const quest = await this.db.getFirstAsync('SELECT * FROM quests WHERE id = ?', [questId]);

      if (!quest) throw new Error('QUEST_NOT_FOUND');

      await this.userRepository.spendEnergy(quest.energy_cost);
      await this.userRepository.addReward(quest.xp, quest.gold);
      await this.historyRepository.addRecord(questId, 'Completed');
      await this.db.runAsync('DELETE FROM quests WHERE id = ?', [questId]);
    });
  }

  async deleteQuest(questId) {
    await this.db.runAsync('DELETE FROM quests WHERE id = ?', [questId]);
  }
}
