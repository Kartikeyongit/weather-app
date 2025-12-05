import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';
import './WeatherAlerts.css';

const WeatherAlerts = ({ weatherData }) => {
  if (!weatherData) return null;

  const getAlerts = () => {
    const alerts = [];
    const temp = weatherData.temp;
    const windSpeed = weatherData.wind_speed;
    const humidity = weatherData.humidity;

    // Temperature alerts
    if (temp > 35) {
      alerts.push({
        type: 'high-temp',
        message: 'High temperature warning',
        severity: 'high'
      });
    } else if (temp < 0) {
      alerts.push({
        type: 'low-temp',
        message: 'Freezing temperature warning',
        severity: 'high'
      });
    }

    // Wind alerts
    if (windSpeed > 10) {
      alerts.push({
        type: 'high-wind',
        message: 'Strong winds expected',
        severity: windSpeed > 15 ? 'high' : 'medium'
      });
    }

    // Humidity alerts
    if (humidity > 80) {
      alerts.push({
        type: 'high-humidity',
        message: 'High humidity levels',
        severity: 'low'
      });
    } else if (humidity < 20) {
      alerts.push({
        type: 'low-humidity',
        message: 'Low humidity - stay hydrated',
        severity: 'low'
      });
    }

    return alerts;
  };

  const alerts = getAlerts();

  if (alerts.length === 0) return null;

  return (
    <div className="weather-alerts">
      <h3 className="alerts-title">
        <FaExclamationTriangle /> Weather Alerts
      </h3>
      <div className="alerts-list">
        {alerts.map((alert, index) => (
          <div 
            key={index} 
            className={`alert-item alert-${alert.severity}`}
          >
            <span className="alert-message">{alert.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherAlerts;