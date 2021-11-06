import React from 'react';

export const Questions = ({ questions, deleteQuestion }) => {

    const generateQuestionsList = () => {
        if (!questions.length) return <h1>No Questions Yet</h1>

        return questions.map((question, i) => 
        <div key={i} className="module">
            <h3>{question.content}</h3>
            <span>- {question.name}</span>
            <button onClick={() => deleteQuestion(question._id)}>Delete</button>
        </div>
        ).reverse();
    }

    return(
        <>
            {generateQuestionsList()}
        </>
    );

}