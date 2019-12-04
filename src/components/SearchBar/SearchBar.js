import React from 'react';
import { connect } from 'react-redux';
import './SearchBar.css';
import {
  makeQueryIfNeeded
} from 'redux/actions';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.onSearchButtonClick = this.onSearchButtonClick.bind(this);
  }

  onSearchButtonClick(e) {
    const { dispatch } = this.props;
    const query = document.getElementById('search-bar-input').value;
    dispatch(makeQueryIfNeeded(query));
  }

  render() {
    return (
      <div>
        <input id="search-bar-input" type="text" size="30" placeholder="Search GeneLab" />
        <button onClick={this.onSearchButtonClick}>Go</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  // TODO: Populate
  return state;
};

export default connect(mapStateToProps)(SearchBar);
