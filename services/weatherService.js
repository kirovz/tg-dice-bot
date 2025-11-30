// services/weatherService.js
const axios = require("axios");

const API_URL = "https://api.open-meteo.com/v1/forecast";

/**
 * Получение текущей погоды по координатам
 */
async function getWeather(lat, lon) {
  try {
    const response = await axios.get(API_URL, {
      params: {
        latitude: lat,
        longitude: lon,
        current_weather: true,
      },
    });

    const weather = response.data.current_weather;
    return {
      temperature: weather.temperature,
      wind: weather.windspeed,
      code: weather.weathercode,
    };
  } catch (error) {
    console.error("Ошибка при получении погоды:", error.message);
    return null;
  }
}

module.exports = {
  getWeather,
};
