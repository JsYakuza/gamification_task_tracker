import { Subquest } from './Subquest';

export class SubquestMapper {
  static toModel(row) {
    return new Subquest({
      id: row.id,
      quest_id: row.quest_id,
      title: row.title,
      is_completed: row.is_completed,
    });
  }
}
