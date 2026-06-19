export class StoreRepository {
  constructor(db, userRepository) {
    this.db = db;
    this.userRepository = userRepository;
  }

  async getItems() {
    return await this.db.getAllAsync('SELECT * FROM store_items');
  }

  async getItemById(itemId) {
    return await this.db.getFirstAsync('SELECT * FROM store_items WHERE id = ?', [itemId]);
  }

  async getUserInventory(userId) {
    return await this.db.getAllAsync(
      'SELECT i.*, ui.quantity FROM user_inventory ui JOIN store_items i ON ui.item_id = i.id WHERE ui.user_id = ?',
      [userId]
    );
  }

  async purchaseItem(userId, itemId) {
    return await this.db.withTransactionAsync(async () => {
      const item = await this.getItemById(itemId);
      const user = await this.userRepository.getProfile();

      if (!item) throw new Error('ITEM_NOT_FOUND');
      if (user.gold < item.price) throw new Error('LOW_GOLD');
      if (user.level < (item.min_level || 0)) throw new Error('LEVEL_TOO_LOW');

      await this.db.runAsync('UPDATE users SET gold = gold - ? WHERE id = ?', [item.price, userId]);

      await this.db.runAsync(
        `INSERT INTO user_inventory (user_id, item_id, quantity) 
                 VALUES (?, ?, 1) 
                 ON CONFLICT(user_id, item_id) DO UPDATE SET quantity = quantity + 1`,
        [userId, itemId]
      );

      return { success: true };
    });
  }

  async hasItem(userId, itemId) {
    const row = await this.db.getFirstAsync(
      'SELECT quantity FROM user_inventory WHERE user_id = ? AND item_id = ?',
      [userId, itemId]
    );
    return row && row.quantity > 0;
  }

  async consumeItem(userId, itemId) {
    return await this.db.withTransactionAsync(async () => {
      const row = await this.db.getFirstAsync(
        'SELECT quantity FROM user_inventory WHERE user_id = ? AND item_id = ?',
        [userId, itemId]
      );

      if (!row || row.quantity <= 0) throw new Error('ITEM_NOT_FOUND');

      if (row.quantity === 1) {
        await this.db.runAsync('DELETE FROM user_inventory WHERE user_id = ? AND item_id = ?', [
          userId,
          itemId,
        ]);
      } else {
        await this.db.runAsync(
          'UPDATE user_inventory SET quantity = quantity - 1 WHERE user_id = ? AND item_id = ?',
          [userId, itemId]
        );
      }
    });
  }

  async getItemsByCategory(category) {
    return await this.db.getAllAsync('SELECT * FROM store_items WHERE category = ?', [category]);
  }

  async updateItemPrice(itemId, newPrice) {
    await this.db.runAsync('UPDATE store_items SET price = ? WHERE id = ?', [newPrice, itemId]);
  }
}
