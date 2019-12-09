import { ajax } from 'rxjs/ajax';
import { map, mergeMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import * as CONSTANTS from './constants';
import { requestSearchResultsType, receiveSearchResults } from './actions';

const sendQueryEpic = (action$) => action$.pipe(
  ofType(requestSearchResultsType(CONSTANTS.SIDE_EFFECT_LIB_EPIC)),
  mergeMap((action) => 
    // TODO: Abstract URL creation to util function
    ajax.getJSON(`${CONSTANTS.CORS_ANYWHERE_LOCAL_URL}/${CONSTANTS.GENE_LAB_API_URL}?type=cgene&api_key=${CONSTANTS.API_KEY}&term=${action.query}`).pipe(
      map((response) => receiveSearchResults(action.query, response, CONSTANTS.SIDE_EFFECT_LIB_EPIC))
    )
  )
);

export default sendQueryEpic;
