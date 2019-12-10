import React from 'react';
import PropTypes from 'prop-types'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import './App.css';
import { connect } from 'react-redux'
import AccessionTable from 'components/Accession/AccessionTable';
import SearchBar from 'containers/SearchBar';
import * as CONSTANTS from '../constants';

const sideEffectLibs = [CONSTANTS.SIDE_EFFECT_LIB_THUNK, CONSTANTS.SIDE_EFFECT_LIB_SAGA, CONSTANTS.SIDE_EFFECT_LIB_EPIC];

export class App extends React.Component {
  render() {
    const { sideEffectLibStates } = this.props;

    return (
      <div className="App">
        <Tabs>
          <TabList>
            <Tab>Thunk View</Tab>
            <Tab>Saga View</Tab>
            <Tab>Epic View</Tab>
          </TabList>
          {sideEffectLibs.map((lib, index) => {
            const libState = sideEffectLibStates[lib];
            return (
              <TabPanel key={index}>
                <SearchBar sideEffectLib={lib} />
                {libState.queryInProgress && libState.accessions.length === 0 && <h2>{CONSTANTS.GETTING_RESULTS}</h2>}
                {libState.queryComplete && libState.accessions.length === 0 && <h2>{CONSTANTS.NO_RESULTS}</h2>}
                {libState.accessions.length > 0 && <AccessionTable accessions={libState.accessions} />}
              </TabPanel>
            );
          })}
        </Tabs>
      </div>
    );
  }
}

App.propTypes = {
  sideEffectLibStates: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  const thunkState = state.thunk || {};
  const sagaState = state.saga || {};
  const epicState = state.epic || {};
  const sideEffectLibStates = {
    thunk: { ...thunkState, accessions: thunkState.results || [] },
    saga: { ...sagaState, accessions: sagaState.results || [] },
    epic: { ...epicState, accessions: epicState.results || [] },
  };

  return {
    sideEffectLibStates,
  };
}

export default connect(mapStateToProps)(App)
