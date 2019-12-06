import { call, put, takeLatest } from 'redux-saga/effects'
import * as CONSTANTS from '../constants';
import { sendSearchQuery, receiveSearchResults } from 'redux/actions';

export function executeQueryApi(query) {
  // TODO: Abstract URL creation to util function
  return fetch(`${CONSTANTS.CORS_ANYWHERE_LOCAL_URL}/${CONSTANTS.GENE_LAB_API_URL}?type=cgene&api_key=${CONSTANTS.API_KEY}&term=${query}`)
    .then((response) => response.json());
}

function* executeQuery(action) {
  try {
    const { query } = action.payload;
    yield put(sendSearchQuery(query));
    const results = yield call(executeQueryApi, query);
    yield put(receiveSearchResults(query, results));
  } catch (e) {
    yield put({type: 'SEARCH_FAILED', message: e.message});
  }
}

function* root() {
  yield takeLatest('SAGA_SEARCH_REQUESTED', executeQuery);
}

export default root;
