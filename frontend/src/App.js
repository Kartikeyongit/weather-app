import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import Forecast from './components/Forecast';
import FavoritesList from './components/FavoritesList';
import LoadingSpinner from './components/LoadingSpinner';
import ThemeToggle from './components/ThemeToggle';
import UnitToggle from './components/UnitToggle';
import { useWeatherContext } from './context/WeatherContext';
import useGeolocation from './hooks/useGeolocation';
import useWeather from './hooks/useWeather';
import weatherService from './services/weatherService';
import WeatherAlerts from './components/WeatherAlerts';
import RecentSearches from './components/RecentSearches';
import './App.css';

function App() {
  const [currentCity, setCurrentCity] = useState('London');
  const { 
    favorites, 
    toggleFavorite, 
    removeFavorite,
    theme,
    addRecentSearch 
  } = useWeatherContext();

  const { location: userLocation } = useGeolocation();
  const { weatherData, forecastData, loading, error, refetch } = useWeather(currentCity);

  const handleSearch = async (city) => {
    setCurrentCity(city);
  };

  const handleLocationSearch = async () => {
    if (userLocation) {
      try {
        const data = await weatherService.getWeatherByCoords(
          userLocation.lat, 
          userLocation.lon
        );
        setCurrentCity(data.city);
      } catch (err) {
        alert('Unable to get weather for your location');
      }
    } else {
      alert('Please allow location access or try again');
    }
  };

  const isCurrentCityFavorite = favorites.some(
    fav => fav.city === weatherData?.city
  );

  useEffect(() => {
    // Set theme class on body
    document.body.className = theme;
  }, [theme]);

  return (
    <div className={`app-container ${theme}`}>
      <ThemeToggle />
      
      <div className="app-content">
        <header className="app-header">
          <h1>🌤️ Weather Forecast</h1>
          <p>Real-time weather data and 5-day forecast</p>
          <div className="header-controls">
            <UnitToggle />
          </div>
        </header>

        <main className="main-content">
          <SearchBar 
            onSearch={handleSearch}
            onLocationSearch={handleLocationSearch}
          />

          {error && (
            <div className="error-message">
              ⚠️ {error}
            </div>
          )}

          {loading ? (
            <LoadingSpinner />
          ) : (
            <>
              {weatherData && (
                <CurrentWeather 
                  data={weatherData}
                  isFavorite={isCurrentCityFavorite}
                  onToggleFavorite={() => toggleFavorite(weatherData)}
                />
              )}

              {weatherData && (
                <>
                  <CurrentWeather 
                    data={weatherData}
                    isFavorite={isCurrentCityFavorite}
                    onToggleFavorite={() => toggleFavorite(weatherData)}
                  />
                  <WeatherAlerts weatherData={weatherData} />
                </>
              )}

              {forecastData && (
                <Forecast data={forecastData} />
              )}

              <FavoritesList 
                favorites={favorites}
                onSelectFavorite={handleSearch}
                onRemoveFavorite={removeFavorite}
              />
            </>
          )}
        </main>

        <footer className="app-footer">
          <p>Powered by OpenWeatherMap API</p>
          <p>Data updates every 10 minutes</p>
        </footer>
      </div>
    </div>
  );
}

export default App;