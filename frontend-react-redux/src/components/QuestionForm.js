import React, { useState } from 'react';
import { connect } from 'react-redux';
import { submitQuestion } from '../actions/question_actions'

const defaultQuestion = {
  _id: null,
  name: '',
  content: ''
};

export const QuestionForm = ({ submitQuestion }) => {
    const [question, setQuestion] = useState(defaultQuestion);

    const handleInput = e => {
      e.preventDefault();
      setQuestion({...question, [e.target.name]: e.target.value});
    }

    const handleSubmit = e => {
      e.preventDefault();
      // generates a unique _id for each question (not infallible).
      question._id = Math.floor(Math.random() * 1000);
      submitQuestion(question);
      setQuestion(defaultQuestion);
    };

    return (
          <div className="module">
            <h1>Ask a Question:</h1>
            <form onSubmit={handleSubmit}>
              <input
                name="name"
                type="text"
                placeholder="Name"
                value={question.name}
                onChange={handleInput}
              />
              <textarea
                rows='3'
                name="content"
                type="text" 
                placeholder="Ask Away..."
                value={question.content}
                onChange={handleInput}
              />
              <button type='submit'>Submit &rarr;</button>
            </form>
          </div>
    );
};

const mapDispatchToProps = dispatch => ({
  submitQuestion: question => dispatch(submitQuestion(question))
});

export default connect(null, mapDispatchToProps)(QuestionForm)