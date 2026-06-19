import { Reward } from './Reward';

export class RewardMapper {
  static toModel(row) {
    return new Reward({
      id: row.id,
      name: row.name,
      price: Number(row.price),
      description: row.description,
    });
  }
}
