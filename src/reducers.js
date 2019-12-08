//import { combineReducers } from 'redux';
import * as CONSTANTS from './constants';

function query(state, action) {
  state = state || {};

  if (action.type === CONSTANTS.REQUEST_SEARCH_RESULTS) {
    const newState = { ...state };
    newState[action.sideEffectLib] = {
      query: action.query,
      queryInProgress: true,
      queryComplete: false,
    };
    return newState;
  }

  if (action.type === CONSTANTS.RECEIVE_SEARCH_RESULTS) {
    const newState = { ...state };
    newState[action.sideEffectLib] = {
      resultsCount: action.hits.total,
      results: action.hits.hits,
      query: action.query,
      queryInProgress: false,
      queryComplete: true,
    };
    return newState;
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
