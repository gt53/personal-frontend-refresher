import * as CONSTANTS from './common/constants';

export const requestSearchResultsType = (sideEffectLib: string): string => `${CONSTANTS.REQUEST_SEARCH_RESULTS}_${sideEffectLib.toUpperCase()}`;
export const receiveSearchResultsType = (sideEffectLib: string): string => `${CONSTANTS.RECEIVE_SEARCH_RESULTS}_${sideEffectLib.toUpperCase()}`;

interface BaseAction {
  type: string;
}

export interface RequestSearchResultsAction extends BaseAction {
  query: string;
  sideEffectLib: string;
}

export interface ReceiveSearchResultsAction extends BaseAction {
  query: string;
  hits: any;
  sideEffectLib: string;
}

// Workaround for TypeScript + Babel problem resulting in exports not being recognized
export const RequestSearchResultsAction = undefined;
export const ReceiveSearchResultsAction = undefined;

export function requestSearchResults(query: string, sideEffectLib: string): RequestSearchResultsAction {
  return {
    type: requestSearchResultsType(sideEffectLib),
    query,
    sideEffectLib,
  };
};

export function receiveSearchResults(query: string, json: any, sideEffectLib: string): ReceiveSearchResultsAction {
  return {
    type: receiveSearchResultsType(sideEffectLib),
    query,
    hits: json.hits,
    sideEffectLib,
  };
};
