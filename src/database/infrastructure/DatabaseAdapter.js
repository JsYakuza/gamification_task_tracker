import { UserRepository } from './User/UserRepository';
import { QuestRepository } from './Quest/QuestRepository';
import { QuestHistoryRepository } from './QuestHistory/QuestHistoryRepository';
import { StoreRepository } from './Store/StoreRepository';
import { SubquestRepository } from './Subquest/SubquestRepository';

class DatabaseAdapter {
  constructor() {
    this.users = null;
    this.quests = null;
    this.questHistory = null;
    this.store = null;
    this.subquest = null;
  }

  init(db) {
    this.users = new UserRepository(db);
    this.quests = new QuestRepository(db);
    this.questHistory = new QuestHistoryRepository(db);
    this.store = new StoreRepository(db);
    this.subquest = new SubquestRepository(db);
  }
}

export const dbAdapter = new DatabaseAdapter();
