// services/cryptoServices.js
const axios = require("axios");

const API_URL = "https://api.coingecko.com/api/v3/simple/price";

/**
 * Получение цен криптовалют
 * @param {Array<string>} coins - массив тикеров, например ['bitcoin', 'ethereum']
 * @param {string} currency - валюта (по умолчанию usd)
 * @returns {Object} объект с ценами
 */
async function getCryptoPrices(coins = ["bitcoin"], currency = "usd") {
  try {
    const response = await axios.get(API_URL, {
      params: {
        ids: coins.join(","),
        vs_currencies: currency,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Ошибка при получении цен криптовалют:", error.message);
    return null;
  }
}

/**
 * Получение цены конкретно Биткоина
 * @returns {number|null} цена в USD
 */
async function getBTCPrice() {
  const prices = await getCryptoPrices(["bitcoin"]);
  return prices ? prices.bitcoin.usd : null;
}

module.exports = {
  getCryptoPrices,
  getBTCPrice,
};
