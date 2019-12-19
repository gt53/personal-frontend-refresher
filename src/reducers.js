import * as CONSTANTS from './constants';
import Accession from 'data-models/accession';

function query(state, action) {
  state = state || {};

  if (action.type.startsWith(CONSTANTS.REQUEST_SEARCH_RESULTS)) {
    const newState = { ...state };
    newState[action.sideEffectLib] = {
      query: action.query,
      queryInProgress: true,
      queryComplete: false,
    };
    return newState;
  }

  if (action.type.startsWith(CONSTANTS.RECEIVE_SEARCH_RESULTS)) {
    const newState = { ...state };
    newState[action.sideEffectLib] = {
      resultsCount: action.hits.total,
      results: action.hits.hits.map((hit) => Accession.create(hit)),
      query: action.query,
      queryInProgress: false,
      queryComplete: true,
    };
    return newState;
  }

  return state;
}

export default query;
