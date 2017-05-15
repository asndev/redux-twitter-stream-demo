import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import {createStore} from 'redux'
import {Provider} from 'react-redux'

import tweetReducer from './reducers/tweet';
import './index.css';

const store = createStore(tweetReducer)
const rootEl = document.getElementById('root')


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootEl
);
