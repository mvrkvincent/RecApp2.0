import React from 'react'
import { Provider } from 'react-redux';
import QuestionForm from './QuestionForm';
import Questions from './Questions';
import './css_reset.css'
import './app.css'

export const App = ({store}) => {
  return (
    <Provider store={store}>
      <div className="App">
        <header>RecApp2.0: Full Stack</header>
        <QuestionForm />
        <Questions />
      </div>
    </Provider>
  );
};