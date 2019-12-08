import React from 'react';
import { connect } from 'react-redux';
import './SearchBar.css';
import { makeQueryIfNeeded } from '../thunk';
import * as CONSTANTS from '../constants';
import { requestSearchResults } from '../actions';

const SEARCH_BAR_ID = 'search-bar-input';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.onSearchButtonClick = this.onSearchButtonClick.bind(this);
  }

  onSearchButtonClick(e) {
    const { dispatch, sideEffectLib } = this.props;
    const query = document.getElementById(SEARCH_BAR_ID).value;

    // TODO: Clean this up to first determine if a query should be made and then dispatch

    if (sideEffectLib === CONSTANTS.SIDE_EFFECT_LIB_THUNK) {
      dispatch(makeQueryIfNeeded(query));
    } else if (sideEffectLib === CONSTANTS.SIDE_EFFECT_LIB_SAGA) {
      dispatch({type: 'SAGA_SEARCH_REQUESTED', payload: {query}}); // TODO: Make type a const
    } else if (sideEffectLib === CONSTANTS.SIDE_EFFECT_LIB_EPIC) {
      dispatch(requestSearchResults(query, CONSTANTS.SIDE_EFFECT_LIB_EPIC));
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
