import { useState, useEffect } from 'react';
import weatherService from '../services/weatherService';

const useWeather = (city = null, useLocation = false) => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = async (cityName) => {
    if (!cityName) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const [current, forecast] = await Promise.all([
        weatherService.getCurrentWeather(cityName),
        weatherService.getForecast(cityName)
      ]);
      
      setWeatherData(current);
      setForecastData(forecast);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (city) {
      fetchWeather(city);
    }
  }, [city]);

  return {
    weatherData,
    forecastData,
    loading,
    error,
    refetch: fetchWeather
  };
};

export default useWeather;