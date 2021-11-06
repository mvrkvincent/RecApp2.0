import React, { useState } from 'react';
import { QuestionForm } from './QuestionForm';
import { Questions } from './Questions';
import './css_reset.css'
import './app.css'

export const App = () => {

  const [GLOBAL_STATE, setGlobalState] = useState({
    // session: {
    //   user: {
    //     username: 'Gaius Helen Mohiam',
    //     isAdmin: true,
    //   }
    // },
    entities: {
      questions: {
        123: {_id: 123, name: 'Vladimir Harkonnen', content: 'Am I the drama?' },
        124: {_id: 124, name: 'Lady Jessica', content: 'Is Paul the Kwisatz Haderach?' },
        125: {_id: 125, name: 'Paul Atreides', content: 'Why am I always dreaming of Arrakis?' },
      },
    },
    // ui: {
    //   isDark: false,
    // },
  });

  const submitQuestion = question => {
    const NEW_STATE = {...GLOBAL_STATE};
    NEW_STATE.entities.questions[question._id] = question;
    setGlobalState(NEW_STATE);
  };

  const deleteQuestion = _id => {
    const NEW_STATE = {...GLOBAL_STATE};
    delete NEW_STATE.entities.questions[_id];
    setGlobalState(NEW_STATE);
  };

  return (
    <div className="App">
      <QuestionForm 
        submitQuestion={submitQuestion}
      />
      <Questions 
        deleteQuestion={deleteQuestion}
        GLOBAL_STATE={GLOBAL_STATE}
      />
    </div>);
};