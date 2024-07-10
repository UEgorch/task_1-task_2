// src/Search.js
import React from 'react';

const Search = ({ onSearch }) => {
  return (
    <input
      type="text"
      placeholder="Поиск задач"
      onChange={(e) => onSearch(e.target.value)}
    />
  );
};

export default Search;
