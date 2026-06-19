export const STORE_REWARDS = [
  { id: 'reward_1', name: 'Короткая передышка', price: 20, desc: '15 минут в соцсетях' },
  { id: 'reward_2', name: 'Сладкий перекус', price: 30, desc: 'Любимый десерт' },
  { id: 'reward_3', name: 'Игровой час', price: 50, desc: 'Компьютерные игры' },
  { id: 'reward_4', name: 'Серийный запой', price: 80, desc: 'Просмотр сериала' },
  { id: 'reward_5', name: 'Кофейная пауза', price: 100, desc: 'Поход в кофейню' },
  { id: 'reward_6', name: 'Музыкальный релакс', price: 120, desc: 'Подписка или альбом' },
  { id: 'reward_7', name: 'Заказная еда', price: 250, desc: 'Пицца или бургер' },
  { id: 'reward_8', name: 'Вечерний киносеанс', price: 300, desc: 'Поход в кино' },
  { id: 'reward_9', name: 'Виртуальный лут', price: 400, desc: 'Покупка в Steam' },
  { id: 'reward_10', name: 'Личный выходной', price: 800, desc: 'Вечер ничегонеделания' },
];

export async function seedRewards(db) {
  for (const r of STORE_REWARDS) {
    await db.runAsync(
      `
      INSERT OR IGNORE INTO store_rewards (id, name, price, description) 
      VALUES (?, ?, ?, ?)`,
      [r.id, r.name, r.price, r.desc]
    );
  }
}
