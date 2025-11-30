// commands/crypto.js
const { getBTCPrice, getCryptoPrices } = require("../services/cryptoServices");

async function cryptoCommand(ctx) {
  const btc = await getBTCPrice();

  if (!btc) {
    return ctx.reply("⚠️ Не удалось получить цену биткоина.");
  }

  ctx.reply(`💰 BTC: ${btc} USD`);
}

async function customCryptoCommand(ctx, coinName) {
  const prices = await getCryptoPrices([coinName]);

  if (!prices || !prices[coinName]) {
    return ctx.reply(`⚠️ Не удалось получить цену для ${coinName}.`);
  }

  ctx.reply(`💰 ${coinName}: ${prices[coinName].usd} USD`);
}

module.exports = {
  cryptoCommand,
  customCryptoCommand,
};
