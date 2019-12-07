import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import rootReducer from './reducers';

export default function configureStore() {
  const loggerMiddleware = createLogger();
  const sagaMiddleware = createSagaMiddleware();

  return {
    ...createStore(rootReducer, applyMiddleware(thunkMiddleware, loggerMiddleware, sagaMiddleware)),
    runSaga: sagaMiddleware.run,
  };
};
