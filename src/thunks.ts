import * as CONSTANTS from './constants';
import { requestSearchResults, receiveSearchResults, ReceiveSearchResultsAction } from './actions';
import { buildSearchUrl } from './utils';
import { Dispatch } from 'redux';

async function makeThunkQuery(dispatch: Dispatch, query: string) {
  dispatch(requestSearchResults(query, CONSTANTS.SIDE_EFFECT_LIB_THUNK));

  const response = await fetch(buildSearchUrl(query));
  const json = await response.json();

  const action: ReceiveSearchResultsAction = receiveSearchResults(query, json, CONSTANTS.SIDE_EFFECT_LIB_THUNK);

  dispatch(action);
}

export default makeThunkQuery;
