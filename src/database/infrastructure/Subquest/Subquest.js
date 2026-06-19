export class Subquest {
  constructor({ id, quest_id, title, is_completed }) {
    this.id = id;
    this.quest_id = quest_id;
    this.title = title;
    this.is_completed = !!is_completed;
  }
}
