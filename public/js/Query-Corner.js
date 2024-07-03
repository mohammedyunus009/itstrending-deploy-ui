document.addEventListener('DOMContentLoaded', () => {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    let questions = JSON.parse(localStorage.getItem('questions')) || [];
    let currentUser = localStorage.getItem('currentUser') || null;

    const userForm = document.getElementById('user-form');
    const questionForm = document.getElementById('question-form');
    const questionsContainer = document.getElementById('questions-container');
    const currentUserElement = document.getElementById('current-user');
    const askQuestionButton = document.getElementById('ask-question-button');
    const allQuestionsButton = document.getElementById('all-questions-button');
    const unansweredQuestionsButton = document.getElementById('unanswered-questions-button');
    const homeSection = document.getElementById('home-section');
    const askQuestionSection = document.getElementById('ask-question-section');
    const answersSection = document.getElementById('answers-section');
    const questionDetail = document.getElementById('question-detail');
    const answersContainer = document.getElementById('answers-container');
    const backToQuestionsButton = document.getElementById('back-to-questions');
    const searchBar = document.getElementById('search-bar');
    const userIcon = document.getElementById('user-icon');
    const userSection = document.getElementById('user-section');
    const submitAnswerButton = document.getElementById('submit-answer');

    // Initialize Quill editor for questions
    const quill = new Quill('#question-body-editor', {
        theme: 'snow',
        modules: {
            toolbar: [
                [{ header: [1, 2, 3, false] }],
                ['bold', 'italic', 'underline', 'strike'],
                ['blockquote', 'code-block'],
                [{ list: 'ordered' }, { list: 'bullet' }],
                [{ script: 'sub' }, { script: 'super' }],
                [{ indent: '-1' }, { indent: '+1' }],
                [{ direction: 'rtl' }],
                ['link', 'image'],
                [{ align: [] }],
                [{ color: [] }, { background: [] }],
                ['clean']
            ]
        }
    });

    // Initialize Quill editor for answers
    const answerQuill = new Quill('#answer-body-editor', {
        theme: 'snow',
        modules: {
            toolbar: [
                [{ header: [1, 2, 3, false] }],
                ['bold', 'italic', 'underline', 'strike'],
                ['blockquote', 'code-block'],
                [{ list: 'ordered' }, { list: 'bullet' }],
                [{ script: 'sub' }, { script: 'super' }],
                [{ indent: '-1' }, { indent: '+1' }],
                [{ direction: 'rtl' }],
                ['link', 'image'],
                [{ align: [] }],
                [{ color: [] }, { background: [] }],
                ['clean']
            ]
        }
    });

    const displayUser = () => {
        if (currentUser) {
            const user = JSON.parse(currentUser);
            currentUserElement.textContent = user.email === "Harshitgowda18801@gmail.com" ? "Harshitgowda18801" : `Logged in as: ${user.username}`;
        } else {
            currentUserElement.textContent = "";
        }
    };

    const displayQuestions = (filter = 'all') => {
        questionsContainer.innerHTML = '';
        const filteredQuestions = filter === 'unanswered' ? questions.filter(q => !q.answers || q.answers.length === 0) : questions;

        filteredQuestions.forEach((question, index) => {
            const questionElement = document.createElement('div');
            questionElement.classList.add('question');
            questionElement.innerHTML = `
                <h3>${question.title}</h3>
                <div>${question.body}</div>
                <button onclick="viewQuestion(${index})">View Details</button>
            `;
            questionsContainer.appendChild(questionElement);
        });
    };

    window.viewQuestion = (index) => {
        const question = questions[index];
        questionDetail.innerHTML = `
            <h3>${question.title}</h3>
            <div>${question.body}</div>
        `;
        answersContainer.innerHTML = '';

        if (question.answers && question.answers.length > 0) {
            question.answers.forEach(answer => {
                const answerElement = document.createElement('div');
                answerElement.classList.add('answer');
                answerElement.innerHTML = `<div>${answer}</div>`;
                answersContainer.appendChild(answerElement);
            });
        }
        localStorage.setItem('currentQuestionIndex', index);
        homeSection.style.display = 'none';
        askQuestionSection.style.display = 'none';
        answersSection.style.display = 'block';
    };

    userForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const newUser = { username, email: `${username}@gmail.com` }; // Assuming email is based on username for simplicity
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        currentUser = JSON.stringify(newUser);
        localStorage.setItem('currentUser', currentUser);
        displayUser();
        userSection.style.display = 'none';
        homeSection.style.display = 'block';
    });

    questionForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById('question-title').value;
        const body = quill.root.innerHTML;
        questions.push({ title, body, answers: [] });
        localStorage.setItem('questions', JSON.stringify(questions));
        displayQuestions();
        askQuestionSection.style.display = 'none';
        homeSection.style.display = 'block';
    });

    submitAnswerButton.addEventListener('click', () => {
        const answerBody = answerQuill.root.innerHTML;
        const currentQuestionIndex = localStorage.getItem('currentQuestionIndex');
        questions[currentQuestionIndex].answers.push(answerBody);
        localStorage.setItem('questions', JSON.stringify(questions));
        viewQuestion(currentQuestionIndex);
    });

    askQuestionButton.addEventListener('click', () => {
        homeSection.style.display = 'none';
        askQuestionSection.style.display = 'block';
    });

    allQuestionsButton.addEventListener('click', () => {
        displayQuestions('all');
    });

    unansweredQuestionsButton.addEventListener('click', () => {
        displayQuestions('unanswered');
    });

    backToQuestionsButton.addEventListener('click', () => {
        answersSection.style.display = 'none';
        homeSection.style.display = 'block';
        displayQuestions();
    });

    searchBar.addEventListener('input', () => {
        const query = searchBar.value.toLowerCase();
        const filteredQuestions = questions.filter(q => q.title.toLowerCase().includes(query) || q.body.toLowerCase().includes(query));
        displayQuestions(filteredQuestions);
    });

    userIcon.addEventListener('click', () => {
        if (currentUser) {
            currentUser = null;
            localStorage.removeItem('currentUser');
            displayUser();
        } else {
            homeSection.style.display = 'none';
            userSection.style.display = 'block';
        }
    });

    displayUser();
    displayQuestions();
});
