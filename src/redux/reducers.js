//import { combineReducers } from 'redux';
import * as CONSTANTS from '../constants';

function query(state, action) {
  state = state || {
    query: '',
    queryInProgress: false,
    queryComplete: false,
  };

  if (action.type === CONSTANTS.REQUEST_SEARCH_RESULTS) {
    return Object.assign({}, state, {
      queryInProgress: true,
      queryComplete: false,
    });
  }

  if (action.type === CONSTANTS.RECEIVE_SEARCH_RESULTS) {
    return Object.assign({}, state, {
      resultsCount: action.hits.total,
      results: action.hits.hits,
      query: action.query,
      queryInProgress: false,
      queryComplete: true,
    });
  }

  return state;
}

/*
const rootReducer = combineReducers({
  query
});
*/
const rootReducer = query;

export default rootReducer;
