import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {fetchQuestions, deleteQuestion} from '../actions/question_actions'

const Questions = ({ questions, fetchQuestions, deleteQuestion }) => {
    

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

    useEffect(() => {
        fetchQuestions();
    },[fetchQuestions])

    return(
        <>
            {generateQuestionsList()}
        </>
    );

}


const mapStateToProps = state => ({
    questions: state.questions ? Object.values(state.questions) : []
});

const mapDispatchToProps = dispatch => ({
    fetchQuestions: () => dispatch(fetchQuestions()),
    deleteQuestion: _id => dispatch(deleteQuestion(_id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Questions)