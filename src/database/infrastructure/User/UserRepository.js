import { UserMapper } from './UserMapper';

export class UserRepository {
  constructor(db) {
    this.db = db;
    this.MAX_ENERGY = 10;
    this.REGEN_MINUTES = 60;
  }

  async getProfile() {
    const row = await this.db.getFirstAsync('SELECT * FROM users WHERE id = 1');
    return row ? UserMapper.toModel(row) : null;
  }

  async updateUsername(newUsername) {
    await this.db.runAsync('UPDATE users SET username = ? WHERE id = 1', [newUsername]);
  }

  async addReward(xp, gold) {
    await this.db.runAsync(
      'UPDATE users SET experience = experience + ?, gold = gold + ? WHERE id = 1',
      [xp, gold]
    );
    await this.checkLevelUp();
  }

  async checkLevelUp() {
    await this.db.runAsync(`
            UPDATE users
            SET level = level + 1, experience = experience - (level * 100)
            WHERE id = 1 AND experience >= (level * 100)
        `);
  }

  async updateEnergy() {
    const user = await this.getProfile();
    if (!user) return;

    const now = new Date().getTime();
    const last = new Date(user.last_energy_update).getTime();

    const diffMinutes = Math.floor((now - last) / (1000 * 60));
    const energyToRecover = Math.floor(diffMinutes / this.REGEN_MINUTES);

    if (energyToRecover >= 1) {
      const minutesToAdvance = energyToRecover * this.REGEN_MINUTES;

      await this.db.runAsync(
        `UPDATE users
                 SET current_energy = MIN(current_energy + ?, ?),
                     last_energy_update = DATETIME(last_energy_update, '+' || ? || ' minutes')
                 WHERE id = 1`,
        [energyToRecover, this.MAX_ENERGY, minutesToAdvance]
      );
    }
  }

  async spendEnergy(amount) {
    await this.updateEnergy();

    const result = await this.db.runAsync(
      'UPDATE users SET current_energy = current_energy - ? WHERE id = 1 AND current_energy >= ?',
      [amount, amount]
    );

    if (result.changes === 0) {
      throw new Error('LOW_ENERGY');
    }
  }

  async buyReward(price) {
    await this.db.withTransactionAsync(async () => {
      const user = await this.getProfile();
      if (user.gold < price) throw new Error('LOW_GOLD');

      await this.db.runAsync('UPDATE users SET gold = gold - ? WHERE id = 1', [price]);
    });
  }
}
