import Accession from '../data-models/accession';

export interface State {
  resultsCount?: number;
  results?: Accession[];
  thunk?: {};
  saga?: {};
  epic?: {};
}

export interface SideEffectLibStates {
  thunk: State;
  saga: State;
  epic: State;
}
