import { User } from './User';

export class UserMapper {
  static toModel(row) {
    return new User({
      id: row.id,
      username: row.username,
      level: Number(row.level),
      experience: Number(row.experience),
      gold: Number(row.gold),
      current_energy: Number(row.current_energy),
      last_energy_update: row.last_energy_update,
    });
  }
}
