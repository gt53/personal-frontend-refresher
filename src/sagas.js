import { call, put, takeLatest } from 'redux-saga/effects'
import * as CONSTANTS from './common/constants';
import { requestSearchResultsType, receiveSearchResults } from './actions';
import { buildSearchUrl } from './common/utils';

export const getStateQuery = (state) => state.query;

function executeQueryApi(query) {
  return fetch(buildSearchUrl(query))
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
