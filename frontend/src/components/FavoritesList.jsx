import React from 'react';
import { FaTrash, FaMapMarkerAlt } from 'react-icons/fa';
import './FavoritesList.css';

const FavoritesList = ({ favorites, onSelectFavorite, onRemoveFavorite }) => {
  if (favorites.length === 0) {
    return (
      <div className="favorites-empty">
        <p>No favorite cities yet. Add some using the star button!</p>
      </div>
    );
  }

  return (
    <div className="favorites-container">
      <h3 className="favorites-title">Favorite Cities</h3>
      <div className="favorites-grid">
        {favorites.map((fav, index) => (
          <div key={index} className="favorite-card">
            <div className="favorite-info">
              <h4 className="favorite-city">
                <FaMapMarkerAlt className="favorite-icon" />
                {fav.city}, {fav.country}
              </h4>
              <p className="favorite-temp">
                {Math.round(fav.temp)}°C
              </p>
              <p className="favorite-desc">
                {fav.description}
              </p>
            </div>
            <div className="favorite-actions">
              <button 
                onClick={() => onSelectFavorite(fav.city)}
                className="favorite-select-btn"
              >
                View
              </button>
              <button 
                onClick={() => onRemoveFavorite(fav.city)}
                className="favorite-remove-btn"
                title="Remove from favorites"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritesList;