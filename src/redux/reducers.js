import { combineReducers } from 'redux';

function placeHolder(state = {}, action) {
  return state;
}

const rootReducer = combineReducers({
  placeHolder
});

export default rootReducer;
