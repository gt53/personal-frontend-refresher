import React from 'react';
import PropTypes from 'prop-types'
//import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import './App.css';
import { connect } from 'react-redux'
import AccessionTable from 'components/Accession/AccessionTable';
import SearchBar from 'components/SearchBar/SearchBar';

/*
 * TODO
 *  + Store query in state
 *  + Don't execute search if query is empty or didn't change
 *  + Add search status message
 *  - Define propTypes
 *  - Organize files into components/containers dirs
 *  - Store thunk/saga/epic view in state and only render results in proper tab panel
 */

class App extends React.Component {
  render() {
    const { accessions, queryInProgress, queryComplete } = this.props;

    return (
      <div className="App">
        <SearchBar />
        {queryInProgress && accessions.length === 0 && <h2>Getting results...</h2>}
        {queryComplete && accessions.length === 0 && <h2>No results.</h2>}
        {accessions.length > 0 && (
        <AccessionTable
          accessions={accessions}
        />
        )}
      </div>
    /*
        <Tabs>
          <TabList>
            <Tab>Redux Saga View</Tab>
            <Tab>Redux Epic View</Tab>
          </TabList>
          <TabPanel>
            <SearchBar />
            {accessions.length > 0 && (
            <AccessionTable
              accessions={accessions}
            />
            )}
          </TabPanel>
          <TabPanel>
            <SearchBar />
            {accessions.length > 0 && (
            <AccessionTable
              accessions={accessions}
            />
            )}
          </TabPanel>
        </Tabs>
      </div>
      */
    );
  }
}

/* TODO: Complete this
App.propTypes = {
  accessions: PropTypes.array.isRequired,
  query: PropTypes.string.isRequired,
  queryInProgress: PropTypes.bool.isRequired,
  queryComplete: PropTypes.bool.isRequired,
};
*/

function mapStateToProps(state) {
  const { query, queryInProgress, queryComplete } = state;
  const accessions = state.results || [];

  return {
    accessions,
    query,
    queryInProgress,
    queryComplete,
  };
}

export default connect(mapStateToProps)(App)
