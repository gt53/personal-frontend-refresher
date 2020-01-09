import React from 'react';
import ReactDOM from 'react-dom';
import { SearchBar } from './SearchBar';
import { shallow } from 'enzyme';
import * as CONSTANTS from '../common/constants';

describe('<SearchBar />', () => {
  const SOME_QUERY = 'some query';
  let props;
  let dispatchMock;

  beforeEach(() => {
    dispatchMock = jest.fn();
    props = {
      sideEffectLibStates: {
        thunk: {},
        saga: {},
        epic: {},
      },
      sideEffectLib: 'thunk',
      dispatch: dispatchMock,
    };

    const searchInput = global.document.createElement('input');
    searchInput.id = CONSTANTS.SEARCH_BAR_ID;
    global.document.body.appendChild(searchInput);
  });

  it('calls the search event handler when the button is clicked', () => {
    jest.spyOn(SearchBar.prototype, 'onSearchButtonClick');

    const wrapper = shallow(<SearchBar {...props} />);
    wrapper.find('button').simulate('click');
    expect(SearchBar.prototype.onSearchButtonClick).toHaveBeenCalled();
  });

  it('does not dispatch an action when no query value is set', () => {
    const wrapper = shallow(<SearchBar {...props} />);
    wrapper.find('button').simulate('click');

    expect(dispatchMock.mock.calls.length).toEqual(0);
  });

  it('does not dispatch an action when the query value matches the previous value', () => {
    global.document.getElementById(CONSTANTS.SEARCH_BAR_ID).value = SOME_QUERY;
    props.sideEffectLibStates.thunk = {
      query: SOME_QUERY,
    };
    const wrapper = shallow(<SearchBar {...props} />);
    wrapper.find('button').simulate('click');

    expect(dispatchMock.mock.calls.length).toEqual(0);
  });

  it('dispatches an action for a valid query', () => {
    global.document.getElementById(CONSTANTS.SEARCH_BAR_ID).value = SOME_QUERY;

    const wrapper = shallow(<SearchBar {...props} />);
    wrapper.find('button').simulate('click');

    expect(dispatchMock.mock.calls.length).toEqual(1);
  });

  it('dispatches an action for a valid saga query', () => {
    props.sideEffectLib = CONSTANTS.SIDE_EFFECT_LIB_SAGA;
    global.document.getElementById(CONSTANTS.SEARCH_BAR_ID).value = SOME_QUERY;

    const wrapper = shallow(<SearchBar {...props} />);
    wrapper.find('button').simulate('click');

    expect(dispatchMock.mock.calls.length).toEqual(1);
    expect(dispatchMock.mock.calls[0][0].sideEffectLib).toEqual(CONSTANTS.SIDE_EFFECT_LIB_SAGA);
  });

  it('dispatches an action for a valid epic query', () => {
    props.sideEffectLib = CONSTANTS.SIDE_EFFECT_LIB_EPIC;
    global.document.getElementById(CONSTANTS.SEARCH_BAR_ID).value = SOME_QUERY;

    const wrapper = shallow(<SearchBar {...props} />);
    wrapper.find('button').simulate('click');

    expect(dispatchMock.mock.calls.length).toEqual(1);
    expect(dispatchMock.mock.calls[0][0].sideEffectLib).toEqual(CONSTANTS.SIDE_EFFECT_LIB_EPIC);
  });
});
