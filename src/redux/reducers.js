//import { combineReducers } from 'redux';
import * as CONSTANTS from '../constants';

function query(state = {}, action) {
  if (action.type === CONSTANTS.RECEIVE_SEARCH_RESULTS) {
    return Object.assign({}, state, {
      resultsCount: action.hits.total,
      results: action.hits.hits,
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
