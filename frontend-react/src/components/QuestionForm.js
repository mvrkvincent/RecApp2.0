import React, { useState } from 'react';

const defaultQuestion = {
  name: '',
  content: ''
};

export const QuestionForm = ({ submitQuestion }) => {
    const [question, setQuestion] = useState(defaultQuestion);

    const handleInput = e => {
      e.preventDefault();
      setQuestion({...question, [e.target.name]: e.target.value})
    }

    const handleSubmit = e => {
      e.preventDefault();
      submitQuestion(question);
      setQuestion(defaultQuestion)
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


