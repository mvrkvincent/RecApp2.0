import { createAction } from '@reduxjs/toolkit';

const receiveQuestions = createAction('RECEIVE_QUESTIONS');
const receiveQuestion = createAction('RECEIVE_QUESTION');
const removeQuestion = createAction('REMOVE_QUESTION');

export const fetchQuestions = () => async dispatch => {
    try {
      // some logic will go here eventually.
      dispatch(receiveQuestions())
    } catch (err) {
        console.log(`${err} - in fetchQuestions`)
    };
};

export const submitQuestion = question => async dispatch => {
    try {
        dispatch(receiveQuestion(question));
    } catch (err) {
        console.log(`${err} - in submitQuestion`)
    };
};

export const deleteQuestion = _id => async dispatch => {
    try {
        dispatch(removeQuestion(_id));
    } catch (err) {
        console.log(`${err} - in deleteQuestion`)
    };
};
