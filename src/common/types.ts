import Accession from '../data-models/accession';

export interface SideEffectLibState {
  query: string;
  queryInProgress: boolean;
  queryComplete: boolean;
  resultsCount?: number;
  results?: Accession[];
}

export interface State {
  thunk?: SideEffectLibState;
  saga?: SideEffectLibState;
  epic?: SideEffectLibState;
}

export interface SideEffectLibStates {
  thunk: SideEffectLibState;
  saga: SideEffectLibState;
  epic: SideEffectLibState;
}
