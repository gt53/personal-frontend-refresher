import React from 'react';
import PropTypes from 'prop-types'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import './App.css';
import { connect } from 'react-redux'
import AccessionTable from 'components/Accession/AccessionTable';
import SearchBar from 'components/SearchBar/SearchBar';

const sideEffectLibs = ['thunk', 'saga', 'epic'];

class App extends React.Component {
  render() {
    const { sideEffectLibStates } = this.props;

    return (
      <div className="App">
        <Tabs>
          <TabList>
            <Tab>Redux Thunk View</Tab>
            <Tab>Redux Saga View</Tab>
            <Tab>Redux Epic View</Tab>
          </TabList>
          {sideEffectLibs.map((lib, index) => (
            <TabPanel key={index}>
              <SearchBar sideEffectLib={lib} />
              {sideEffectLibStates[lib].queryInProgress && sideEffectLibStates[lib].accessions.length === 0 && <h2>Getting results...</h2>}
              {sideEffectLibStates[lib].queryComplete && sideEffectLibStates[lib].accessions.length === 0 && <h2>No results.</h2>}
              {sideEffectLibStates[lib].accessions.length > 0 && <AccessionTable accessions={sideEffectLibStates[lib].accessions} />}
            </TabPanel>
          ))}
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
