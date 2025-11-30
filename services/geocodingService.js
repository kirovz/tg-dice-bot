// services/geocodingService.js
const axios = require("axios");

const GEO_URL = "https://geocoding-api.open-meteo.com/v1/search";

/**
 * Получить координаты по названию города
 * @param {string} city - название города (например "Москва")
 * @returns {Object|null} { name, latitude, longitude, country }
 */
async function getCityCoordinates(city) {
  try {
    const response = await axios.get(GEO_URL, {
      params: { name: city, count: 1, language: "ru", format: "json" },
    });

    if (!response.data.results || response.data.results.length === 0) {
      return null;
    }

    const result = response.data.results[0];
    return {
      name: result.name,
      latitude: result.latitude,
      longitude: result.longitude,
      country: result.country,
    };
  } catch (error) {
    console.error("Ошибка при получении координат:", error.message);
    return null;
  }
}

module.exports = {
  getCityCoordinates,
};
