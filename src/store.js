import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import { createEpicMiddleware } from 'redux-observable';
import { createLogger } from 'redux-logger';
import rootReducer from './reducers';

export default function configureStore() {
  const loggerMiddleware = createLogger();
  const sagaMiddleware = createSagaMiddleware();
  const epicMiddleware = createEpicMiddleware();

  return {
    ...createStore(rootReducer, applyMiddleware(thunkMiddleware, loggerMiddleware, sagaMiddleware, epicMiddleware)),
    runSaga: sagaMiddleware.run,
    runEpic: epicMiddleware.run,
  };
};
