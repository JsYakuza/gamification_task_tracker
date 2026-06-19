import { Quest } from './Quest';

export class QuestMapper {
  static toModel(row) {
    return new Quest({
      id: row.id,
      title: row.title,
      difficulty: row.difficulty,
      xp_reward: Number(row.xp_reward) || 0,
      gold_reward: Number(row.gold_reward) || 0,
      energy_cost: Number(row.energy_cost) || 0,
      created_date: row.created_date,
    });
  }
}
