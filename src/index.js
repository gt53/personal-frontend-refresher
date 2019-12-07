import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from 'containers/App';
import { Provider } from 'react-redux';
import configureStore from './store';
import rootSaga from './sagas';

const store = configureStore();
store.runSaga(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
