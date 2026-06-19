import { QuestHistory } from './QuestHistory';

export class QuestHistoryMapper {
  static toModel(row) {
    return new QuestHistory({
      id: row.id,
      quest_id: row.quest_id,
      completion_date: row.completion_date,
      note: row.note,
    });
  }
}
