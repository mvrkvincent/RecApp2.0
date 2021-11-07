import React from 'react'
import { Provider } from 'react-redux';
import QuestionForm from './components/QuestionForm';
import Questions from './components/Questions';
import './css_reset.css'
import './app.css'

const App = ({store}) => {
  return (
    <Provider store={store}>
      <div className="App">
        <header>RecApp2.0</header>
        <QuestionForm />
        <Questions />
      </div>
    </Provider>
  );
}

export default App;