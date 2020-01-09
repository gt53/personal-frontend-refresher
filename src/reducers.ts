import * as CONSTANTS from './common/constants';
import Accession from './data-models/accession';
import { RequestSearchResultsAction, ReceiveSearchResultsAction } from './actions';
import { State } from './common/types';

function setLibState(state: State, libName: string, libState: {}) {
  if (libName === CONSTANTS.SIDE_EFFECT_LIB_THUNK) {
    state.thunk = libState;
  } else if (libName === CONSTANTS.SIDE_EFFECT_LIB_SAGA) {
    state.saga = libState;
  } else if (libName === CONSTANTS.SIDE_EFFECT_LIB_EPIC) {
    state.epic = libState;
  } else {
    throw new Error(`Unrecognized side effect lib: ${libName}`);
  }
}

function query(state: State, action: RequestSearchResultsAction | ReceiveSearchResultsAction): State {
  state = state || {};

  if (action.type.startsWith(CONSTANTS.REQUEST_SEARCH_RESULTS)) {
    const requestSearchResultsAction: RequestSearchResultsAction = (action as RequestSearchResultsAction);
    const newState: State = { ...state };
    const libState = {
      query: requestSearchResultsAction.query,
      queryInProgress: true,
      queryComplete: false,
    };
    setLibState(newState, action.sideEffectLib, libState);
    return newState;
  }

  if (action.type.startsWith(CONSTANTS.RECEIVE_SEARCH_RESULTS)) {
    const receiveSearchResultsAction: ReceiveSearchResultsAction = (action as ReceiveSearchResultsAction);
    const newState: State = { ...state };
    const libState = {
      resultsCount: receiveSearchResultsAction.hits.total,
      results: receiveSearchResultsAction.hits.hits.map((hit: any) => Accession.create(hit)),
      query: action.query,
      queryInProgress: false,
      queryComplete: true,
    };
    setLibState(newState, action.sideEffectLib, libState);
    return newState;
  }

  return state;
}

export default query;
