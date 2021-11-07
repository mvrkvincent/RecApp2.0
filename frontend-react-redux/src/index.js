import React from 'react';
import ReactDOM from 'react-dom';
import {App} from './components/App';
import "regenerator-runtime/runtime.js";

import {configureAppStore} from './store/store.js';

document.addEventListener('DOMContentLoaded', () => {

  let initialState = {
    questions: {
      1: {_id: 1, name: 'Vladimir Harkonnen', content: 'Am I the drama?' },
      2: {_id: 2, name: 'Lady Jessica', content: 'Is Paul the Kwisatz Haderach?' },
      3: {_id: 3, name: 'Paul Atreides', content: 'Why are my dreams so sandy?' },
    },
  };

  let store = configureAppStore(initialState);

  ReactDOM.render(<App store={store}/>, document.getElementById('root'));

});