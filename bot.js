

const TelegramBot = require("node-telegram-bot-api");
const token = "7547619895:AAF9tOmVFKEhgNaR-luBPwJvcmBynPvMEhk"; // Установка токена (token installation)
const bot = new TelegramBot(token, { polling: true });

// /start
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "Привет! Я бот-кубик 🎲 Напиши /d20 или /roll 3d6 (где 3 - количество брошенных кубиков).");
});

// /d20 (один бросок 20-гранного куба)
bot.onText(/\/d20/, (msg) => {
  const roll = Math.floor(Math.random() * 20) + 1;
  bot.sendMessage(msg.chat.id, `🎲 Выпало: ${roll}`);
});

// Универсальная команда: /roll 3d20
bot.onText(/\/roll (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const input = match[1].toLowerCase().trim(); // например "3d20"

  const regex = /^(\d*)d(\d+)$/;
  const parsed = input.match(regex);

  if (!parsed) {
    bot.sendMessage(chatId, "❌ Неверный формат. Используй: /roll 3d20");
    return;
  }

  const count = parseInt(parsed[1] || "1", 10);
  const sides = parseInt(parsed[2], 10);

  if (count > 100) {
    bot.sendMessage(chatId, "❌ Слишком много кубов (макс 100).");
    return;
  }

  const rolls = Array.from({ length: count }, () => Math.floor(Math.random() * sides) + 1);
  const total = rolls.reduce((a, b) => a + b, 0);

  bot.sendMessage(chatId, `🎲 ${count}d${sides} → [${rolls.join(", ")}] = ${total}`);
});
