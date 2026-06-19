export class User {
  constructor({ id, username, level, experience, gold, current_energy, last_energy_update }) {
    this.id = id;
    this.username = username;
    this.level = level;
    this.experience = experience;
    this.gold = gold;
    this.current_energy = current_energy;
    this.last_energy_update = last_energy_update;
  }
}
