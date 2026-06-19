import { QuestMapper } from './QuestMapper';

export class QuestRepository {
  constructor(db, subquestRepository, userRepository, historyRepository) {
    this.db = db;
    this.subquestRepository = subquestRepository;
    this.userRepository = userRepository;
    this.historyRepository = historyRepository;
  }

  async createQuest(title, xp, gold, energyCost, dueDate) {
    await this.validateQuestCreation(energyCost);

    return await this.db.runAsync(
      'INSERT INTO quests (title, xp, gold, energy_cost, due_date) VALUES (?, ?, ?, ?, ?)',
      [title, xp, gold, energyCost, dueDate]
    );
  }

  async validateQuestCreation(energyCost) {
    const today = new Date().toISOString().split('T')[0];
    const dailyQuests = await this.getDailyQuests(today);
    const currentUser = await this.userRepository.getCurrentUser();

    if (currentUser.energy < energyCost) throw new Error('NOT_ENOUGH_ENERGY');

    const complexCount = dailyQuests.filter((q) => q.energy_cost === 5).length;
    const mediumCount = dailyQuests.filter((q) => q.energy_cost === 2).length;

    if (energyCost === 5 && complexCount >= 1) throw new Error('COMPLEX_QUEST_LIMIT_REACHED');
    if (energyCost === 2 && mediumCount >= 3) throw new Error('MEDIUM_QUEST_LIMIT_REACHED');

    return true;
  }

  async getDailyQuests(date) {
    const rows = await this.db.getAllAsync('SELECT * FROM quests WHERE created_date = ?', [date]);

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
