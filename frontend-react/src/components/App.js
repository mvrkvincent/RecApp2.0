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
        1: {_id: 1, name: 'Vladimir Harkonnen', content: 'Am I the drama?' },
        2: {_id: 2, name: 'Lady Jessica', content: 'Is Paul the Kwisatz Haderach?' },
        3: {_id: 3, name: 'Paul Atreides', content: 'Why am I always dreaming of Arrakis?' },
      },
    },
    // ui: {
    //   isDark: false,
    // },
  });
  const submitQuestion = question => {
    const NEW_STATE = {...GLOBAL_STATE};
    NEW_STATE.entities.questions[question._id] = question;
    debugger
    setGlobalState(NEW_STATE);
  };

  const deleteQuestion = _id => {
    const NEW_STATE = {...GLOBAL_STATE};
    delete NEW_STATE.entities.questions[_id];
    setGlobalState(NEW_STATE);
  };

  return (
    <div className="App">
      <header>RecApp2.0</header>
      <QuestionForm 
        submitQuestion={submitQuestion}
      />
      <Questions 
        deleteQuestion={deleteQuestion}
        GLOBAL_STATE={GLOBAL_STATE}
      />
    </div>);
};