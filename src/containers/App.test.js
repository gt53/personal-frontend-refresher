import React from 'react';
import ReactDOM from 'react-dom';
import { expect } from 'chai';
import { App } from './App';
import { shallow } from 'enzyme';

import SearchBar from 'containers/SearchBar';

describe('<App />', () => {
  let props;

  beforeEach(() => {
    props = {
      sideEffectLibStates: {
        thunk: {
          accessions: [],
        },
        saga: {
          accessions: [],
        },
        epic: {
          accessions: [],
        },
      },
    };
  });

  it('renders three <SearchBar /> components', () => {
    const wrapper = shallow(<App {...props} />);
    expect(wrapper.find(SearchBar)).to.have.lengthOf(3);
  });
});
