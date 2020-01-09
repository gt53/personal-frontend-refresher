import { ajax } from 'rxjs/ajax';
import { map, mergeMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import * as CONSTANTS from './common/constants';
import { requestSearchResultsType, receiveSearchResults } from './actions';
import { buildSearchUrl } from './common/utils';

const sendQueryEpic = (action$) => action$.pipe(
  ofType(requestSearchResultsType(CONSTANTS.SIDE_EFFECT_LIB_EPIC)),
  mergeMap((action) =>
    ajax.getJSON(buildSearchUrl(action.query)).pipe(
      map((response) => receiveSearchResults(action.query, response, CONSTANTS.SIDE_EFFECT_LIB_EPIC))
    )
  )
);

export default sendQueryEpic;
