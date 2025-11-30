// Подключение залеп
require('dotenv').config();
const { Telegraf, Markup } = require('telegraf');
const OpenAI = require('openai');
const { cryptoCommand, customCryptoCommand } = require("./commands/crypto");
const { weatherCommand } = require("./commands/weather");
const { compliment } = require("./commands/compliment");
const { registerGameCommands } = require("./commands/games");
const axios = require('axios');
const iphones = require('./iphones.json');
import registerRps from './games/rps/index.js';


// Подключение ключиков из .env
const bot = new Telegraf(process.env.TELEGRAM_TOKEN);
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const WEATHER_KEY = process.env.YANDEX_WEATHER_KEY;


// Глобальные команды (поп ап)
bot.telegram.setMyCommands([
  { command: 'help', description: 'Список команд' },
])

// /start
// bot.start((ctx) => {
//   ctx.reply("Привет! Я бот со всякими приколами. \n Начинался как кубик 🎲")
// })

// /help
bot.help((ctx) => {
  ctx.reply("Kоманды:\n/compliment - пишет комплимент\n/d20 - бросок одного 20-гранного куба\n/8ball - задать вопрос магическому шару\nСервисы:\n/crypto название монеты (например: /crypto ethereum)\n/weather город (например: /weather ейск)")
})

  // Погода: /weather Москва
  bot.command("weather", weatherCommand);

  // Крипта: /crypto coinName (например /crypto ethereum
  bot.command("crypto", (ctx) => {
    const parts = ctx.message.text.split(" ");
    if (parts.length < 2) {
      return ctx.reply("❓ Используй: /crypto coinName (например /crypto ethereum)");
    }

    const coinName = parts[1].toLowerCase();
    return customCryptoCommand(ctx, coinName);
  });

  // Команда для биткоина
  bot.command("btc", cryptoCommand);

  // Игры: /8ball
  registerGameCommands(bot);


  registerRps(bot);
  

  // Запуск
  bot.launch()
