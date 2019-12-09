import React from 'react';
import { connect } from 'react-redux';
import './SearchBar.css';
import * as CONSTANTS from '../constants';
import { requestSearchResults } from '../actions';
import { shouldMakeQuery } from '../utils';
import makeThunkQuery from '../thunks';

const SEARCH_BAR_ID = 'search-bar-input';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.onSearchButtonClick = this.onSearchButtonClick.bind(this);
  }

  onSearchButtonClick(e) {
    const { dispatch, sideEffectLib, sideEffectLibStates } = this.props;
    const query = document.getElementById(SEARCH_BAR_ID).value;
    const libState = sideEffectLibStates[sideEffectLib];
    const params = { stateQuery: libState.query, newQuery: query, queryInProgress: libState.queryInProgress };

    if (!shouldMakeQuery(params)) {
      console.log(`Intentionally skipping ${sideEffectLib} query for ${query}`);
      return;
    }

    if (sideEffectLib === CONSTANTS.SIDE_EFFECT_LIB_THUNK) {
      return dispatch(makeThunkQuery(query));
    }

    dispatch(requestSearchResults(query, sideEffectLib));
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
  const thunkState = state.thunk || {};
  const sagaState = state.saga || {};
  const epicState = state.epic || {};
  const sideEffectLibStates = {
    thunk: { ...thunkState, },
    saga: { ...sagaState, },
    epic: { ...epicState, },
  };

  return {
    sideEffectLibStates,
  };
};

export default connect(mapStateToProps)(SearchBar);
