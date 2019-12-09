import * as CONSTANTS from './constants';
import { requestSearchResults, receiveSearchResults } from './actions';
import { buildSearchUrl } from './utils';

const makeThunkQuery = (query) => {
  return (dispatch) => {
    dispatch(requestSearchResults(query, CONSTANTS.SIDE_EFFECT_LIB_THUNK));
    return fetch(buildSearchUrl(query))
      .then((response) => response.json())
      .then((json) => dispatch(receiveSearchResults(query, json, CONSTANTS.SIDE_EFFECT_LIB_THUNK)));
  };
}

export default makeThunkQuery;
