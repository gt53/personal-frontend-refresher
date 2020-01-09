import * as CONSTANTS from './constants';
import { State, SideEffectLibStates } from './types';

/**
 * Determine if a query should be made based on the query
 * being populated and different from the previous value.
 *
 * @param  {Object}  params                   - Call params
 * @param  {String}  stateQuery               - The previous query made, if any
 * @param  {String}  newQuery                 - The value for this requested query
 * @param  {Boolean} [params.queryInProgress] - Flag indicating that a query is already in progress. Defaults to false
 * @return {Boolean}                          - True if a query should be made; false otherwise
 */
export function shouldMakeQuery(stateQuery: string, newQuery: string, queryInProgress: boolean = false): boolean {
  if (!newQuery || newQuery === stateQuery) {
    return false;
  }
  if (queryInProgress) {
    return false;
  }

  return true;
}

/**
 * Build a search URL given a query.
 *
 * @param  {String} query - The search term
 * @return {String}       - The search URL
 */
export function buildSearchUrl(query: string): string {
  return `${CONSTANTS.CORS_ANYWHERE_LOCAL_URL}/${CONSTANTS.GENE_LAB_API_URL}?type=cgene&api_key=${CONSTANTS.API_KEY}&term=${query}`;
}

/**
 * Get the state for the thunk/saga/epic app component. The lib state is
 * an arbitrarily populated object stored at the top level of the app state.
 */
export function getSideEffectLibState(sideEffectLibStates: SideEffectLibStates, sideEffectLib: string): State {
    if (sideEffectLib === CONSTANTS.SIDE_EFFECT_LIB_THUNK) {
      return sideEffectLibStates.thunk;
    }
    if (sideEffectLib === CONSTANTS.SIDE_EFFECT_LIB_SAGA) {
      return sideEffectLibStates.saga;
    }
    if (sideEffectLib === CONSTANTS.SIDE_EFFECT_LIB_EPIC) {
      return sideEffectLibStates.epic;
    }
    throw new Error(`Unrecognized side effect lib: ${sideEffectLib}`);
}
