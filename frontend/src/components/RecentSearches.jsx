import React from 'react';
import { FaHistory, FaTimes } from 'react-icons/fa';
import { useWeatherContext } from '../context/WeatherContext';
import './RecentSearches.css';

const RecentSearches = ({ onSelectSearch }) => {
  const { recentSearches } = useWeatherContext();

  if (recentSearches.length === 0) return null;

  return (
    <div className="recent-searches">
      <h3 className="recent-title">
        <FaHistory /> Recent Searches
      </h3>
      <div className="recent-list">
        {recentSearches.map((search, index) => (
          <button
            key={index}
            className="recent-item"
            onClick={() => onSelectSearch(search.city)}
          >
            <span className="recent-city">
              {search.city}, {search.country}
            </span>
            <span className="recent-temp">
              {Math.round(search.temp)}°C
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default RecentSearches;