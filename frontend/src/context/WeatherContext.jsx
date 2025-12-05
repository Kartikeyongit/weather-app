import React, { createContext, useState, useContext, useEffect } from 'react';

const WeatherContext = createContext();

export const useWeatherContext = () => useContext(WeatherContext);

export const WeatherProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('weatherFavorites');
    return saved ? JSON.parse(saved) : [];
  });
  const [recentSearches, setRecentSearches] = useState(() => {
    const saved = localStorage.getItem('weatherRecentSearches');
    return saved ? JSON.parse(saved) : [];
  });

  const [unit, setUnit] = useState('metric'); // 'metric' or 'imperial'
  const [theme, setTheme] = useState('light');

  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem('weatherFavorites', JSON.stringify(favorites));
    localStorage.setItem('weatherRecentSearches', JSON.stringify(recentSearches));
  }, [favorites, recentSearches]);

  const addFavorite = (city) => {
    if (!favorites.some(fav => fav.city === city.city)) {
      setFavorites(prev => [...prev, city]);
    }
  };

  const removeFavorite = (cityName) => {
    setFavorites(prev => prev.filter(fav => fav.city !== cityName));
  };

  const toggleFavorite = (city) => {
    if (favorites.some(fav => fav.city === city.city)) {
      removeFavorite(city.city);
    } else {
      addFavorite(city);
    }
  };

  const toggleUnit = () => {
    setUnit(prev => prev === 'metric' ? 'imperial' : 'metric');
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const convertTemp = (temp, targetUnit) => {
    if (unit === targetUnit) return temp;
    return targetUnit === 'imperial' 
        ? (temp * 9/5) + 32 
        : (temp - 32) * 5/9;
  };

  const addRecentSearch = (city) => {
    setRecentSearches(prev => {
        const filtered = prev.filter(search => search.city !== city.city);
        const updated = [city, ...filtered].slice(0, 5);
        return updated;
    });
  };

  const value = {
    favorites,
    unit,
    theme,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    convertTemp,
    toggleUnit,
    recentSearches,
    addRecentSearch,
    toggleTheme
  };

  return (
    <WeatherContext.Provider value={value}>
      {children}
    </WeatherContext.Provider>
  );
};