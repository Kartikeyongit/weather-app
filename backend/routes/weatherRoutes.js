const express = require('express');
const router = express.Router();
const axios = require('axios');
const NodeCache = require('node-cache');

const cache = new NodeCache({ stdTTL: 600 }); // Cache for 10 minutes
const API_KEY = process.env.OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// Test route
router.get('/test', (req, res) => {
  res.json({ message: 'Weather API is working!' });
});

// Get current weather by city name
router.get('/current/:city', async (req, res) => {
  try {
    const { city } = req.params;
    const cacheKey = `current_${city}`;
    
    // Check cache first
    const cachedData = cache.get(cacheKey);
    if (cachedData) {
      return res.json(cachedData);
    }

    console.log(`Fetching weather for: ${city}`);
    const response = await axios.get(
      `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    
    const weatherData = {
      city: response.data.name,
      country: response.data.sys.country,
      temp: response.data.main.temp,
      feels_like: response.data.main.feels_like,
      humidity: response.data.main.humidity,
      pressure: response.data.main.pressure,
      wind_speed: response.data.wind.speed,
      wind_deg: response.data.wind.deg,
      description: response.data.weather[0].description,
      icon: response.data.weather[0].icon,
      sunrise: response.data.sys.sunrise,
      sunset: response.data.sys.sunset,
      timestamp: Date.now()
    };

    // Cache the data
    cache.set(cacheKey, weatherData);
    
    console.log(`Weather data fetched for: ${city}`);
    res.json(weatherData);
  } catch (error) {
    console.error('Error fetching current weather:', error.message);
    
    if (error.response) {
      res.status(error.response.status).json({ 
        error: error.response.data.message || 'Failed to fetch weather data' 
      });
    } else {
      res.status(500).json({ error: 'Server error' });
    }
  }
});

// Get 5-day forecast
router.get('/forecast/:city', async (req, res) => {
  try {
    const { city } = req.params;
    const cacheKey = `forecast_${city}`;
    
    const cachedData = cache.get(cacheKey);
    if (cachedData) {
      return res.json(cachedData);
    }

    console.log(`Fetching forecast for: ${city}`);
    const response = await axios.get(
      `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric&cnt=40`
    );

    // Process forecast data - take 8 forecasts per day (3-hour intervals)
    const forecastData = response.data.list.map(item => ({
      dt: item.dt,
      temp: item.main.temp,
      feels_like: item.main.feels_like,
      humidity: item.main.humidity,
      pressure: item.main.pressure,
      wind_speed: item.wind.speed,
      description: item.weather[0].description,
      icon: item.weather[0].icon,
      pop: item.pop, // probability of precipitation
      dt_txt: item.dt_txt
    }));

    const result = {
      city: response.data.city.name,
      country: response.data.city.country,
      forecast: forecastData,
      timestamp: Date.now()
    };

    cache.set(cacheKey, result);
    console.log(`Forecast fetched for: ${city}`);
    res.json(result);
  } catch (error) {
    console.error('Error fetching forecast:', error.message);
    res.status(error.response?.status || 500).json({ 
      error: error.response?.data?.message || 'Failed to fetch forecast' 
    });
  }
});

// Get weather by coordinates
router.get('/coordinates', async (req, res) => {
  try {
    const { lat, lon } = req.query;
    
    if (!lat || !lon) {
      return res.status(400).json({ error: 'Latitude and longitude required' });
    }

    const cacheKey = `coords_${lat}_${lon}`;
    const cachedData = cache.get(cacheKey);
    if (cachedData) {
      return res.json(cachedData);
    }

    console.log(`Fetching weather for coordinates: ${lat}, ${lon}`);
    const response = await axios.get(
      `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );

    const weatherData = {
      city: response.data.name || 'Unknown Location',
      country: response.data.sys?.country || '',
      temp: response.data.main.temp,
      description: response.data.weather[0].description,
      icon: response.data.weather[0].icon,
      timestamp: Date.now()
    };

    cache.set(cacheKey, weatherData);
    res.json(weatherData);
  } catch (error) {
    console.error('Error fetching weather by coordinates:', error.message);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

// Bonus: Historical data
router.get('/historical', async (req, res) => {
  try {
    const { lat, lon, dt } = req.query;
    
    if (!lat || !lon || !dt) {
      return res.status(400).json({ error: 'Latitude, longitude, and timestamp required' });
    }

    // For One Call API 3.0, you need to use the timestamp
    const response = await axios.get(
      `https://api.openweathermap.org/data/3.0/onecall/timemachine?lat=${lat}&lon=${lon}&dt=${dt}&appid=${API_KEY}&units=metric`
    );

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching historical data:', error.message);
    res.status(500).json({ error: 'Failed to fetch historical data. Note: Historical data requires paid OpenWeather subscription.' });
  }
});

module.exports = router;