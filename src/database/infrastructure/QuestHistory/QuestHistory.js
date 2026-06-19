export class QuestHistory {
  constructor({ id, quest_id, completion_date, note }) {
    this.id = id;
    this.quest_id = quest_id;
    this.completion_date = completion_date;
    this.note = note;
  }
}
