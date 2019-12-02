import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
  render() {
    return (
      <div>
        <input type="text" size="30" placeholder="Search GeneLab" />
        <button>Go</button>
      </div>
    );
  }
}

export default SearchBar;
