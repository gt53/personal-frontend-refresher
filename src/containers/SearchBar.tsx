import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import './SearchBar.css';
import * as CONSTANTS from '../common/constants';
import { requestSearchResults } from '../actions';
import { shouldMakeQuery } from '../common/utils';
import makeThunkQuery from '../thunks';
import { getSideEffectLibState } from '../common/utils';
import { SideEffectLibStates } from '../common/types';

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
    const libState = getSideEffectLibState(sideEffectLibStates, sideEffectLib);

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
