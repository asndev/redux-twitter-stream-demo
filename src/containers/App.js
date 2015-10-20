import React, { Component } from 'react';
import { combineReducers } from 'redux';
import { Provider } from 'react-redux';

import { createStore, renderDevTools } from '../store_enhancers/devTools';

import TweetsApp from './MainApp';
import * as reducers from '../reducers';

const reducer = combineReducers(reducers);
const store = createStore(reducer);

export default class App extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <div>
        <Provider store={store}>
          {() => <TweetsApp /> }
        </Provider>

        {renderDevTools(store)}
      </div>
    );
  }
}
