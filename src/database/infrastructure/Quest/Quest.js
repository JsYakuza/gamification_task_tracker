export class Quest {
  constructor({ id, title, difficulty, xp_reward, gold_reward, energy_cost, created_date }) {
    this.id = id;
    this.title = title;
    this.difficulty = difficulty;
    this.xp_reward = xp_reward;
    this.gold_reward = gold_reward;
    this.energy_cost = energy_cost;
    this.created_date = created_date;
  }
}
