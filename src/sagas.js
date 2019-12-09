import { call, put, takeLatest } from 'redux-saga/effects'
import * as CONSTANTS from './constants';
import { requestSearchResultsType, receiveSearchResults } from './actions';

export const getStateQuery = (state) => state.query;

function executeQueryApi(query) {
  // TODO: Abstract URL creation to util function
  return fetch(`${CONSTANTS.CORS_ANYWHERE_LOCAL_URL}/${CONSTANTS.GENE_LAB_API_URL}?type=cgene&api_key=${CONSTANTS.API_KEY}&term=${query}`)
    .then((response) => response.json());
}

function* executeQuery(action) {
  try {
    const { query } = action;
    const results = yield call(executeQueryApi, query);
    yield put(receiveSearchResults(query, results, CONSTANTS.SIDE_EFFECT_LIB_SAGA));
  } catch (e) {
    yield put({type: 'SEARCH_FAILED', message: e.message});
  }
}

function* root() {
  yield takeLatest(requestSearchResultsType(CONSTANTS.SIDE_EFFECT_LIB_SAGA), executeQuery);
}

export default root;
