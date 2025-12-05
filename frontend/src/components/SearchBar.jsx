import React, { useState } from 'react';
import { FaSearch, FaLocationArrow } from 'react-icons/fa';
import './SearchBar.css';

const SearchBar = ({ onSearch, onLocationSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
      setQuery('');
    }
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit} className="search-form">
        <div className="search-input-group">
          <FaSearch className="search-icon" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for a city..."
            className="search-input"
          />
          <button type="submit" className="search-button">
            Search
          </button>
        </div>
      </form>
      <button 
        onClick={onLocationSearch}
        className="location-button"
        title="Use my location"
      >
        <FaLocationArrow />
      </button>
    </div>
  );
};

export default SearchBar;