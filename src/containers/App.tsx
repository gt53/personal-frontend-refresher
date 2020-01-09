import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import './App.css';
import { connect } from 'react-redux'
import AccessionTable from '../components/Accession/AccessionTable';
import SearchBar from './SearchBar';
import { SideEffectLibStates } from '../common/types';
import { getSideEffectLibState } from '../common/utils';
import * as CONSTANTS from '../common/constants';

const sideEffectLibs: string[] = [CONSTANTS.SIDE_EFFECT_LIB_THUNK, CONSTANTS.SIDE_EFFECT_LIB_SAGA, CONSTANTS.SIDE_EFFECT_LIB_EPIC];

interface Props {
  sideEffectLibStates: SideEffectLibStates;
};

export class App extends React.Component<Props, object> {
  render() {
    const { sideEffectLibStates } = this.props;

    return (
      <div className="App">
        <header className="App-header">
          <p>
            NASA GeneLab Data Search
          </p>
        </header>
        <Tabs>
          <TabList>
            <Tab>Thunk View</Tab>
            <Tab>Saga View</Tab>
            <Tab>Epic View</Tab>
          </TabList>
          {sideEffectLibs.map((lib: string, index: number) => {
            const libState = getSideEffectLibState(sideEffectLibStates, lib);
            return (
              <TabPanel key={index}>
                <SearchBar sideEffectLib={lib} />
                {libState.queryInProgress && libState.results && libState.results.length === 0 && <h2>{CONSTANTS.GETTING_RESULTS}</h2>}
                {libState.queryComplete && libState.results && libState.results.length === 0 && <h2>{CONSTANTS.NO_RESULTS}</h2>}
                {libState.results && libState.results.length > 0 && <AccessionTable accessions={libState.results} />}
              </TabPanel>
            );
          })}
        </Tabs>
      </div>
    );
  }
}

function mapStateToProps(state: SideEffectLibStates) {
  const thunkState = state.thunk || {};
  const sagaState = state.saga || {};
  const epicState = state.epic || {};
  const sideEffectLibStates: SideEffectLibStates = {
    thunk: { ...thunkState, results: thunkState.results || [] },
    saga: { ...sagaState, results: sagaState.results || [] },
    epic: { ...epicState, results: epicState.results || [] },
  };

  return {
    sideEffectLibStates,
  };
}

export default connect(mapStateToProps)(App)
