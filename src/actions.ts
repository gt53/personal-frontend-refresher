import * as CONSTANTS from './constants';

export const requestSearchResultsType = (sideEffectLib: string): string => `${CONSTANTS.REQUEST_SEARCH_RESULTS}_${sideEffectLib.toUpperCase()}`;
export const receiveSearchResultsType = (sideEffectLib: string): string => `${CONSTANTS.RECEIVE_SEARCH_RESULTS}_${sideEffectLib.toUpperCase()}`;

export interface RequestSearchResultsAction {
  type: string;
  query: string;
  sideEffectLib: string;
}

export function requestSearchResults(query: string, sideEffectLib: string): RequestSearchResultsAction {
  return {
    type: requestSearchResultsType(sideEffectLib),
    query,
    sideEffectLib,
  };
};

export interface ReceiveSearchResultsAction {
  type: string;
  query: string;
  hits: object[];
  sideEffectLib: string;
}

export function receiveSearchResults(query: string, json: { hits: [] }, sideEffectLib: string): ReceiveSearchResultsAction {
  return {
    type: receiveSearchResultsType(sideEffectLib),
    query,
    hits: json.hits,
    sideEffectLib,
  };
};
