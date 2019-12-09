import * as CONSTANTS from './constants';

export const requestSearchResultsType = (sideEffectLib) => `${CONSTANTS.REQUEST_SEARCH_RESULTS}_${sideEffectLib.toUpperCase()}`;
export const receiveSearchResultsType = (sideEffectLib) => `${CONSTANTS.RECEIVE_SEARCH_RESULTS}_${sideEffectLib.toUpperCase()}`;

export function requestSearchResults(query, sideEffectLib) {
  return {
    type: requestSearchResultsType(sideEffectLib),
    query,
    sideEffectLib,
  };
};

export function receiveSearchResults(query, json, sideEffectLib) {
  return {
    type: receiveSearchResultsType(sideEffectLib),
    query,
    hits: json.hits,
    sideEffectLib,
  };
};
