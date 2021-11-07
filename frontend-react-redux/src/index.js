import React from 'react';
import ReactDOM from 'react-dom';
import {App} from './App';

import {configureAppStore} from './store/store.js';

document.addEventListener('DOMContentLoaded', () => {

  let initialState = {
    questions: null
  };

  let store = configureAppStore(initialState);

  ReactDOM.render(<App store={store}/>, document.getElementById('root'));

});