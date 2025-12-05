import React from 'react';
import { useWeatherContext } from '../context/WeatherContext';
import './UnitToggle.css';

const UnitToggle = () => {
  const { unit, toggleUnit } = useWeatherContext();

  return (
    <div className="unit-toggle">
      <button 
        className={`unit-btn ${unit === 'metric' ? 'active' : ''}`}
        onClick={() => unit !== 'metric' && toggleUnit()}
      >
        °C
      </button>
      <span className="toggle-slash">/</span>
      <button 
        className={`unit-btn ${unit === 'imperial' ? 'active' : ''}`}
        onClick={() => unit !== 'imperial' && toggleUnit()}
      >
        °F
      </button>
    </div>
  );
};

export default UnitToggle;