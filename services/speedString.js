speedString.js

 // Строка-поток
const TEXT = "📰 Новость 1 | 🚀 Новость 2 | ⚙️ Новость 3 | 🔧 Новость 4 | ";
const WINDOW = 35; // ширина "окна"
const SPEED = 100; // скорость обновления (мс)

bot.start(async (ctx) => {
  const chatId = ctx.chat.id;

  // Первое сообщение
  const msg = await ctx.reply("⏳ Загружаю тикер...");

  // Индекс сдвига
  let i = 1;

  // Основной цикл движения
  setInterval(() => {
    // Окно строки
    const part1 = TEXT.slice(i, i + WINDOW);
    const part2 = TEXT.slice(0, Math.max(0, i + WINDOW - TEXT.length));
    const frame = part1 + part2;

    // Редактирование сообщения
    ctx.telegram.editMessageText(chatId, msg.message_id, null, frame).catch(() => {});

    // Сдвиг
    i = (i + 1) % TEXT.length;

  }, SPEED);
});