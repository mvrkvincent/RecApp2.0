import axios from 'axios';
import {createAction} from '@reduxjs/toolkit';

const receiveQuestions = createAction('RECEIVE_QUESTIONS');
const receiveQuestion = createAction('RECEIVE_QUESTION');
const removeQuestion = createAction('REMOVE_QUESTION');

export const fetchQuestions = () => async dispatch => {
    try {
        const res = await axios.get('http://localhost:5000/api/questions')
        dispatch(receiveQuestions(res.data))
    } catch (err) {
        console.log(`${err} - in fetchQuestions`)
    };
};

export const submitQuestion = question => async dispatch => {
    try {
        const res = await axios.post('http://localhost:5000/api/questions', question)
        dispatch(receiveQuestion(res.data));
    } catch (err) {
        console.log(`${err} - in submitQuestion`)
    };
};

export const deleteQuestion = _id => async dispatch => {
    try {
        const res = await axios.delete(`http://localhost:5000/api/questions/${_id}`)
        dispatch(removeQuestion(res.data));
    } catch (err) {
        console.log(`${err} - in deleteQuestion`)
    };
};
