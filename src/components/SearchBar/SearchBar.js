import React from 'react';
import { connect } from 'react-redux';
import './SearchBar.css';
import {
  makeQueryIfNeeded
} from 'redux/actions';

const SEARCH_BAR_ID = 'search-bar-input';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.onSearchButtonClick = this.onSearchButtonClick.bind(this);
  }

  onSearchButtonClick(e) {
    const { dispatch, sideEffect } = this.props;
    const query = document.getElementById(SEARCH_BAR_ID).value;
    if (sideEffect === 'thunk') {
      dispatch(makeQueryIfNeeded(query));
    } else {
      console.log(`Side effect type ${sideEffect} not yet implemented`);
    }
  }

  render() {
    return (
      <div>
        <input id={SEARCH_BAR_ID} type="text" size="30" placeholder="Search GeneLab" />
        <button onClick={this.onSearchButtonClick}>Go</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  // TODO: Implement when dealing with state for autocomplete
  return state;
};

export default connect(mapStateToProps)(SearchBar);
