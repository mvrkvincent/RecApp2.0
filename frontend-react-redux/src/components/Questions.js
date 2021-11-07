import React from 'react';
import {connect} from 'react-redux';
import {deleteQuestion} from '../actions/question_actions'

const Questions = ({ questions, deleteQuestion }) => {
    

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


const mapStateToProps = state => ({
    questions: state.questions ? Object.values(state.questions) : []
});

const mapDispatchToProps = dispatch => ({
    deleteQuestion: _id => dispatch(deleteQuestion(_id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Questions)