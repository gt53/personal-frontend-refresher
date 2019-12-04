import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import './App.css';
import { connect } from 'react-redux'
import AccessionTable from 'components/Accession/AccessionTable';
import SearchBar from 'components/SearchBar/SearchBar';

class App extends React.Component {
  render() {
    const { accessions } = this.props;

    return (
      <div className="App">
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
    );
  }
}

function mapStateToProps(state) {
  const { query } = state;
  const accessions = state.results || [];

  return {
    query,
    accessions,
  };
}

export default connect(mapStateToProps)(App)
