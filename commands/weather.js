// commands/weather.js
const { getWeather } = require("../services/weatherService");
const { getCityCoordinates } = require("../services/geocodingService");

async function weatherCommand(ctx) {
  const parts = ctx.message.text.split(" ");

  // Если пользователь написал только /weather — берём СПб по умолчанию
  let city = "Санкт-Петербург";
  if (parts.length > 1) {
    city = parts.slice(1).join(" ");
  }

  const coords = await getCityCoordinates(city);

  if (!coords) {
    return ctx.reply(`❌ Город "${city}" не найден.`);
  }

  const weather = await getWeather(coords.latitude, coords.longitude);

  if (!weather) {
    return ctx.reply("⚠️ Не удалось получить погоду.");
  }

  ctx.reply(
    `🌤 Погода в ${coords.name}, ${coords.country}:\n` +
    `🌡 Температура: ${weather.temperature}°C\n` +
    `💨 Ветер: ${weather.wind} км/ч`
  );
}

module.exports = {
  weatherCommand,
};
