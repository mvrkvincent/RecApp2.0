import {configureStore, createReducer} from '@reduxjs/toolkit';
import logger from 'redux-logger';

const initialState = {
  questions: {},
};

const questionReducer = createReducer(initialState, builder => {
  builder
    .addCase('RECEIVE_QUESTIONS', (state, action) => {
      const questions = {};
      action.payload.map(question => questions[question._id] = question);
      state.questions = questions;
    })
    .addCase('RECEIVE_QUESTION', (state, action) => {
      state.questions[action.payload._id] = action.payload;
    })
    .addCase('REMOVE_QUESTION', (state, action) => {
      debugger
      delete state.questions[action.payload];
    });
});

export const configureAppStore = preloadedState => {
  const store = configureStore({
    reducer: questionReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware()
      .concat(process.env.NODE_ENV !== 'production' ? logger : []),
    preloadedState
  })

  return store;
}