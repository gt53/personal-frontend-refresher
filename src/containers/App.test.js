import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { shallow } from 'enzyme';
import * as CONSTANTS from '../common/constants';

import SearchBar from 'containers/SearchBar';
import AccessionTable from 'components/Accession/AccessionTable';

describe('<App />', () => {
  let props;

  beforeEach(() => {
    props = {
      sideEffectLibStates: {
        thunk: {
          results: [],
        },
        saga: {
          results: [],
        },
        epic: {
          results: [],
        },
      },
    };
  });

  it('renders correct number of <SearchBar /> components', () => {
    const wrapper = shallow(<App {...props} />);
    expect(wrapper.find(SearchBar)).toHaveLength(Object.keys(props.sideEffectLibStates).length);
  });

  it('displays the correct message when a query is in progress', () => {
    props.sideEffectLibStates.thunk = {
      queryInProgress: true,
      results: [],
    };
    const wrapper = shallow(<App {...props} />);
    expect(wrapper.find('h2').text()).toEqual(CONSTANTS.GETTING_RESULTS);
  });

  it('displays the correct message when a query has no results', () => {
    props.sideEffectLibStates.thunk = {
      queryComplete: true,
      results: [],
    };
    const wrapper = shallow(<App {...props} />);
    expect(wrapper.find('h2').text()).toEqual(CONSTANTS.NO_RESULTS);
  });

  it('renders a results table when a query has results', () => {
    props.sideEffectLibStates.thunk = {
      results: [{}],
    };
    const wrapper = shallow(<App {...props} />);
    expect(wrapper.find(AccessionTable)).toHaveLength(1);
  });

  it('renders a results table per tab panel that has query results', () => {
    props.sideEffectLibStates.thunk = {
      results: [{}],
    };
    props.sideEffectLibStates.saga = {
      results: [],
    };
    props.sideEffectLibStates.epic = {
      results: [{}],
    };
    const wrapper = shallow(<App {...props} />);
    expect(wrapper.find(AccessionTable)).toHaveLength(2);
  });
});
