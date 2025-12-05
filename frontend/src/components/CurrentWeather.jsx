import React from 'react';
import { FaThermometerHalf, FaTint, FaWind, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { useWeatherContext } from '../context/WeatherContext';
import './CurrentWeather.css';

const CurrentWeather = ({ data, isFavorite, onToggleFavorite }) => {
  const { unit } = useWeatherContext();
  
  if (!data) return null;

  const getTemp = (temp) => {
    if (unit === 'imperial') {
      return Math.round((temp * 9/5) + 32);
    }
    return Math.round(temp);
  };

  const getSpeed = (speed) => {
    if (unit === 'imperial') {
      return Math.round(speed * 2.237); // m/s to mph
    }
    return Math.round(speed);
  };

  const getWeatherIcon = (iconCode) => {
    return `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="current-weather-card">
      <div className="weather-header">
        <div>
          <h2 className="city-name">
            {data.city}, {data.country}
          </h2>
          <p className="weather-description">
            {data.description.charAt(0).toUpperCase() + data.description.slice(1)}
          </p>
        </div>
        <button 
          className={`favorite-button ${isFavorite ? 'active' : ''}`}
          onClick={() => onToggleFavorite(data)}
        >
          {isFavorite ? '★' : '☆'}
        </button>
      </div>

      <div className="weather-main">
        <div className="temperature-section">
          <img 
            src={getWeatherIcon(data.icon)} 
            alt={data.description}
            className="weather-icon"
          />
          <div className="temperature-info">
            <h1 className="temperature">
              {getTemp(data.temp)}°{unit === 'metric' ? 'C' : 'F'}
            </h1>
            <p className="feels-like">
              Feels like {getTemp(data.feels_like)}°{unit === 'metric' ? 'C' : 'F'}
            </p>
          </div>
        </div>

        <div className="weather-details">
          <div className="detail-item">
            <FaThermometerHalf className="detail-icon" />
            <div>
              <span className="detail-label">Pressure</span>
              <span className="detail-value">{data.pressure} hPa</span>
            </div>
          </div>

          <div className="detail-item">
            <FaTint className="detail-icon" />
            <div>
              <span className="detail-label">Humidity</span>
              <span className="detail-value">{data.humidity}%</span>
            </div>
          </div>

          <div className="detail-item">
            <FaWind className="detail-icon" />
            <div>
              <span className="detail-label">Wind</span>
              <span className="detail-value">
                {getSpeed(data.wind_speed)} {unit === 'metric' ? 'm/s' : 'mph'}
              </span>
            </div>
          </div>

          {data.sunrise && data.sunset && (
            <>
              <div className="detail-item">
                <FaArrowUp className="detail-icon sunrise" />
                <div>
                  <span className="detail-label">Sunrise</span>
                  <span className="detail-value">
                    {formatTime(data.sunrise)}
                  </span>
                </div>
              </div>

              <div className="detail-item">
                <FaArrowDown className="detail-icon sunset" />
                <div>
                  <span className="detail-label">Sunset</span>
                  <span className="detail-value">
                    {formatTime(data.sunset)}
                  </span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;