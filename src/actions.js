import * as CONSTANTS from './constants';

export function requestSearchResults(query, sideEffectLib) {
  return {
    type: CONSTANTS.REQUEST_SEARCH_RESULTS,
    query,
    sideEffectLib,
  };
};

export function receiveSearchResults(query, json, sideEffectLib) {
  return {
    type: CONSTANTS.RECEIVE_SEARCH_RESULTS,
    query,
    hits: json.hits,
    sideEffectLib,
  };
};

export function shouldMakeQuery({stateQuery, newQuery, queryInProgress = false}) {
  if (!newQuery || newQuery === stateQuery) {
    return false;
  }
  if (queryInProgress) {
    return false;
  }

  return true;
}
