const render = () => {
    let questions = [
        { _id: 1, name: 'Vladimir Harkonnen', content: 'Am I the drama?' },
        { _id: 2, name: 'Lady Jessica', content: 'Is Paul the Kwisatz Haderach?' },
        { _id: 3, name: 'Paul Atreides', content: 'Why are my dreams so sandy?' },
    ];
    
    const App = document.createElement('div');
    App.classList.add('App');
    const header = document.createElement('header');
    header.innerHTML = 'RecApp2.0: Frontend + DOM Manipulation'

    App.append(header);

    const submitQuestion = question => {
        questions.push(question);
        generateQuestionsList()
    };

    const deleteQuestion = _id => {
        questions = questions.filter(question => question._id !== _id);
        generateQuestionsList();
    };

    const QuestionForm = document.createElement('form');
    QuestionForm.classList.add('module');
    const h1 = document.createElement('h1')
    h1.innerHTML = 'Ask a Question';
    const name = document.createElement('input');
    name.name = 'name';
    name.type = 'text';
    name.placeholder = 'Name';
    const content = document.createElement('textarea');
    content.rows = 3; 
    content.name = 'content';
    content.type = 'text';
    content.placeholder = 'Ask Away...';
    const submit = document.createElement('button');
    submit.type = 'submit';
    submit.innerHTML = 'Submit';

    QuestionForm.append(h1);
    QuestionForm.append(name);
    QuestionForm.append(content);
    QuestionForm.append(submit);

    QuestionForm.addEventListener('submit', e => {
        e.preventDefault();
        if (content.value === '') return content.placeholder = 'Question required...';

        let data = {
            _id: Math.floor(Math.random() * 1000),
            content: content.value.trim(),
            name: name.value.trim(),
        };

        submitQuestion(data);
        name.value = '';
        content.value = '';
        content.placeholder = 'Ask Away...';
    });

    const Questions = document.createElement('div');

    const generateQuestionsList = () => {
        if (!questions.length) return Questions.innerHTML = 'No Questions Yet';

        Questions.innerHTML = '';

        questions.reverse().map((question, i) => {
            const formattedQuestion = document.createElement('div');
            formattedQuestion.classList.add('module');
            formattedQuestion.key = i;
            const h3 = document.createElement('h3');
            h3.innerHTML = question.content;
            const span = document.createElement('span');
            span.innerHTML = question.name;
            const button = document.createElement('button');
            button.innerHTML = 'Delete';
            button.onclick = () => deleteQuestion(question._id);

            formattedQuestion.append(h3);
            formattedQuestion.append(span);
            formattedQuestion.append(button);
            
            Questions.append(formattedQuestion);
            
        });
    };

    App.append(QuestionForm);
    App.append(Questions);

    const root = document.getElementById('root');
    root.append(App);

    generateQuestionsList();
};

document.addEventListener('DOMContentLoaded', () => {
    render();
});
