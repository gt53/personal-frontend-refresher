import * as CONSTANTS from '../constants';

export function sendSearchQuery(query) {
  return {
    type: CONSTANTS.REQUEST_SEARCH_RESULTS,
    query,
  };
};

export function receiveSearchResults(query, json) {
  return {
    type: CONSTANTS.RECEIVE_SEARCH_RESULTS,
    query,
    data: json,
  };
};

function makeQuery(query) {
  return (dispatch) => {
    dispatch(sendSearchQuery(query));
    return fetch(`${CONSTANTS.CORS_ANYWHERE_LOCAL_URL}/${CONSTANTS.GENE_LAB_API_URL}?type=cgene&api_key=${CONSTANTS.API_KEY}&term=${query}`)
      .then((response) => response.json())
      .then((json) => dispatch(receiveSearchResults(query, json)));
  };
}

export function makeQueryIfNeeded(query) {
  return (dispatch, getState) => {
    // TODO: Make this conditional based on the query being different than what is in the state
    return dispatch(makeQuery(query));
  };
};
