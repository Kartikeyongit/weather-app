import React from 'react';
import { format } from 'date-fns';
import './Forecast.css';

const Forecast = ({ data }) => {
  if (!data || !data.forecast) return null;

  // Group forecast by day
  const dailyForecast = data.forecast.reduce((acc, item) => {
    const date = format(new Date(item.dt * 1000), 'yyyy-MM-dd');
    if (!acc[date]) {
      acc[date] = {
        date: date,
        items: [],
        maxTemp: -Infinity,
        minTemp: Infinity,
        icons: new Set()
      };
    }
    
    acc[date].items.push(item);
    acc[date].maxTemp = Math.max(acc[date].maxTemp, item.temp);
    acc[date].minTemp = Math.min(acc[date].minTemp, item.temp);
    acc[date].icons.add(item.icon);
    
    return acc;
  }, {});

  const forecastDays = Object.values(dailyForecast).slice(0, 5);

  const getWeatherIcon = (iconCode) => {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, 'EEEE, MMM d');
  };

  return (
    <div className="forecast-container">
      <h3 className="forecast-title">5-Day Forecast for {data.city}</h3>
      <div className="forecast-grid">
        {forecastDays.map((day, index) => {
          const primaryIcon = Array.from(day.icons)[0];
          
          return (
            <div key={index} className="forecast-card">
              <h4 className="forecast-date">
                {index === 0 ? 'Today' : formatDate(day.date)}
              </h4>
              <img 
                src={getWeatherIcon(primaryIcon)} 
                alt="Weather icon"
                className="forecast-icon"
              />
              <div className="forecast-temps">
                <span className="forecast-high">
                  {Math.round(day.maxTemp)}°
                </span>
                <span className="forecast-low">
                  {Math.round(day.minTemp)}°
                </span>
              </div>
              <div className="forecast-details">
                {day.items.slice(0, 3).map((item, idx) => (
                  <div key={idx} className="forecast-time-item">
                    <span className="forecast-time">
                      {format(new Date(item.dt * 1000), 'ha')}
                    </span>
                    <span className="forecast-temp">
                      {Math.round(item.temp)}°
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Forecast;