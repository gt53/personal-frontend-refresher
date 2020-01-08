import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import './SearchBar.css';
import * as CONSTANTS from '../constants';
import { requestSearchResults } from '../actions';
import { shouldMakeQuery } from '../utils';
import makeThunkQuery from '../thunks';
import { State } from '../reducers';

interface SideEffectLibStates {
  thunk: State;
  saga: State;
  epic: State;
}

interface Props {
  dispatch: Dispatch;
  sideEffectLib: string;
  sideEffectLibStates: SideEffectLibStates;
};

export class SearchBar extends React.Component<Props, object> {
  constructor(props: Props) {
    super(props);
    this.onSearchButtonClick = this.onSearchButtonClick.bind(this);
  }

  onSearchButtonClick(e: React.FormEvent<EventTarget>): void {
    const dispatch: Dispatch = this.props.dispatch;
    const sideEffectLib: string = this.props.sideEffectLib;
    const sideEffectLibStates: SideEffectLibStates = this.props.sideEffectLibStates;
    const query: string = (document.getElementById(CONSTANTS.SEARCH_BAR_ID) as HTMLInputElement).value || '';
    const libState = getLibState(sideEffectLibStates, sideEffectLib);

    if (!shouldMakeQuery(libState.query || '', query, libState.queryInProgress)) {
      console.log(`Intentionally skipping ${sideEffectLib} query for ${query}`);
      return;
    }

    if (sideEffectLib === CONSTANTS.SIDE_EFFECT_LIB_THUNK) {
      makeThunkQuery(dispatch, query);
    } else {
      dispatch(requestSearchResults(query, sideEffectLib));
    }
  }

  render() {
    return (
      <div>
        <input id={CONSTANTS.SEARCH_BAR_ID} type="text" size={30} placeholder="Search GeneLab" />
        <button onClick={this.onSearchButtonClick}>Go</button>
      </div>
    );
  }
}

function getLibState(sideEffectLibStates: SideEffectLibStates, sideEffectLib: string): State {
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

const mapStateToProps = (state: SideEffectLibStates) => {
  const thunkState = state.thunk || {};
  const sagaState = state.saga || {};
  const epicState = state.epic || {};
  const sideEffectLibStates: SideEffectLibStates = {
    thunk: { ...thunkState, },
    saga: { ...sagaState, },
    epic: { ...epicState, },
  };

  return {
    sideEffectLibStates,
  };
};

export default connect(mapStateToProps)(SearchBar);
