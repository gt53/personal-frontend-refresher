import { call, put, select, takeLatest } from 'redux-saga/effects'
import * as CONSTANTS from '../constants';
import { shouldMakeQuery, sendSearchQuery, receiveSearchResults } from 'redux/actions';

export const getStateQuery = (state) => state.query;

export function executeQueryApi(query) {
  // TODO: Abstract URL creation to util function
  return fetch(`${CONSTANTS.CORS_ANYWHERE_LOCAL_URL}/${CONSTANTS.GENE_LAB_API_URL}?type=cgene&api_key=${CONSTANTS.API_KEY}&term=${query}`)
    .then((response) => response.json());
}

function* executeQuery(action) {
  try {
    const { query } = action.payload;
    const stateQuery = yield select(getStateQuery);
    const params = { stateQuery, newQuery: query };
    if (!shouldMakeQuery(params)) {
      console.log('Skipping saga query intentionally');
      return;
    }

    yield put(sendSearchQuery(query));
    const results = yield call(executeQueryApi, query);
    yield put(receiveSearchResults(query, results, 'saga'));
  } catch (e) {
    yield put({type: 'SEARCH_FAILED', message: e.message});
  }
}

function* root() {
  yield takeLatest('SAGA_SEARCH_REQUESTED', executeQuery);
}

export default root;
