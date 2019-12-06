import * as CONSTANTS from '../constants';

export function sendSearchQuery(query) {
  return {
    type: CONSTANTS.REQUEST_SEARCH_RESULTS,
    query,
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

function makeQuery(query) {
  return (dispatch) => {
    dispatch(sendSearchQuery(query));
    // TODO: Abstract URL creation to util function
    return fetch(`${CONSTANTS.CORS_ANYWHERE_LOCAL_URL}/${CONSTANTS.GENE_LAB_API_URL}?type=cgene&api_key=${CONSTANTS.API_KEY}&term=${query}`)
      .then((response) => response.json())
      .then((json) => dispatch(receiveSearchResults(query, json, 'thunk')));
  };
}

export function shouldMakeQuery({stateQuery, newQuery, queryInProgress = false}) {
  if (!newQuery || newQuery === stateQuery) {
    return false;
  }
  if (queryInProgress) {
    return false;
  }

  return true;
}

export function makeQueryIfNeeded(query) {
  return (dispatch, getState) => {
    const state = getState();
    const params = {
      stateQuery: state.query,
      newQuery: query,
      queryInProgress: state.queryInProgress,
    };

    if (shouldMakeQuery(params)) {
      return dispatch(makeQuery(query));
    }
  };
};
