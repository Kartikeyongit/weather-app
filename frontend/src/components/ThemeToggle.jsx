import React from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useWeatherContext } from '../context/WeatherContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useWeatherContext();

  return (
    <div className="theme-toggle">
      <button className="theme-btn" onClick={toggleTheme}>
        {theme === 'light' ? <FaMoon /> : <FaSun />}
      </button>
    </div>
  );
};

export default ThemeToggle;