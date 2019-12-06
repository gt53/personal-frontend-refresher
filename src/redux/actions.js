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
    hits: json.hits,
  };
};

function makeQuery(query) {
  return (dispatch) => {
    dispatch(sendSearchQuery(query));
    // TODO: Abstract URL creation to util function
    return fetch(`${CONSTANTS.CORS_ANYWHERE_LOCAL_URL}/${CONSTANTS.GENE_LAB_API_URL}?type=cgene&api_key=${CONSTANTS.API_KEY}&term=${query}`)
      .then((response) => response.json())
      .then((json) => dispatch(receiveSearchResults(query, json)));
  };
}

function shouldMakeQuery(state, query) {
  if (!query || query === state.query) {
    return false;
  }
  if (state.queryInProgress) {
    return false;
  }

  return true;
}

export function makeQueryIfNeeded(query) {
  return (dispatch, getState) => {
    if (shouldMakeQuery(getState(), query)) {
      return dispatch(makeQuery(query));
    }
  };
};
