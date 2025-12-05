import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/weather';

export const weatherService = {
  // Get current weather by city
  getCurrentWeather: async (city) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/current/${city}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching current weather:', error);
      throw error;
    }
  },

  // Get 5-day forecast
  getForecast: async (city) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/forecast/${city}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching forecast:', error);
      throw error;
    }
  },

  // Get weather by coordinates
  getWeatherByCoords: async (lat, lon) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/coordinates?lat=${lat}&lon=${lon}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching weather by coordinates:', error);
      throw error;
    }
  },

  // Get historical data (bonus)
  getHistoricalWeather: async (lat, lon, timestamp) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/historical?lat=${lat}&lon=${lon}&dt=${timestamp}`
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching historical data:', error);
      throw error;
    }
  }
};

export default weatherService;