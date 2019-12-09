import * as CONSTANTS from './constants';
import { requestSearchResults, receiveSearchResults } from './actions';

const makeThunkQuery = (query) => {
  return (dispatch) => {
    dispatch(requestSearchResults(query, CONSTANTS.SIDE_EFFECT_LIB_THUNK));
    // TODO: Abstract URL creation to util function
    return fetch(`${CONSTANTS.CORS_ANYWHERE_LOCAL_URL}/${CONSTANTS.GENE_LAB_API_URL}?type=cgene&api_key=${CONSTANTS.API_KEY}&term=${query}`)
      .then((response) => response.json())
      .then((json) => dispatch(receiveSearchResults(query, json, CONSTANTS.SIDE_EFFECT_LIB_THUNK)));
  };
}

export default makeThunkQuery;
