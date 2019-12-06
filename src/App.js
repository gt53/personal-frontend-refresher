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
    const { resultSets, queryInProgress, queryComplete } = this.props;

    return (
      <div className="App">
        <Tabs>
          <TabList>
            <Tab>Redux Thunk View</Tab>
            <Tab>Redux Saga View</Tab>
            <Tab>Redux Epic View</Tab>
          </TabList>
          {sideEffectLibs.map((sideEffectLib, index) => (
            <TabPanel key={index}>
              <SearchBar sideEffectLib={sideEffectLib} />
              {queryInProgress && resultSets[sideEffectLib].length === 0 && <h2>Getting results...</h2>}
              {queryComplete && resultSets[sideEffectLib].length === 0 && <h2>No results.</h2>}
              {resultSets[sideEffectLib].length > 0 && <AccessionTable accessions={resultSets[sideEffectLib]} />}
            </TabPanel>
          ))}
        </Tabs>
      </div>
    );
  }
}

App.propTypes = {
  resultSets: PropTypes.object.isRequired,
  query: PropTypes.string.isRequired,
  queryInProgress: PropTypes.bool.isRequired,
  queryComplete: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  const { query, queryInProgress, queryComplete } = state; // TODO Move handling of these to lib state object
  const thunkState = state.thunk || {};
  const sagaState = state.saga || {};
  const epicState = state.epic || {};
  const resultSets = {
    thunk: thunkState.results || [],
    saga: sagaState.results || [],
    epic: epicState.results || [],
  };

  return {
    resultSets,
    query,
    queryInProgress,
    queryComplete,
  };
}

export default connect(mapStateToProps)(App)
