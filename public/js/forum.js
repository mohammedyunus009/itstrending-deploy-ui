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
    const backToHomeButton = document.getElementById('back-to-home');
    const clearStorageButton = document.getElementById('clear-storage-button');

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
            currentUserElement.textContent = user.email === 'Harshitgowda18801@gmail.com' ? 'Harshitgowda18801' : user.username;
        }
    };

    const saveToLocalStorage = () => {
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('questions', JSON.stringify(questions));
        localStorage.setItem('currentUser', currentUser);
    };

    const displayQuestions = (filterUnanswered = false) => {
        questionsContainer.innerHTML = '';
        let filteredQuestions = questions;
        if (filterUnanswered) {
            filteredQuestions = questions.filter(q => q.answers.length === 0);
        }
        filteredQuestions.forEach((question, index) => {
            const questionDiv = document.createElement('div');
            questionDiv.classList.add('question');
            questionDiv.innerHTML = `
                <h3>${question.title}</h3>
                <p>${question.body}</p>
                <div class="vote-buttons">
                    <button class="upvote-button" data-index="${index}">Upvote</button>
                    <span class="vote-count">${question.upvotes}</span>
                    <button class="downvote-button" data-index="${index}">Downvote</button>
                    <span class="vote-count">${question.downvotes}</span>
                </div>
                <p>Asked by: ${question.user}</p>
                <button class="view-answers-button" data-index="${index}">View Answers (${question.answers.length})</button>
                <button class="delete-question-button" data-index="${index}">Delete Question</button>
            `;
            questionsContainer.appendChild(questionDiv);
        });
    };

    const displayAnswers = (questionIndex) => {
        answersContainer.innerHTML = '';
        const question = questions[questionIndex];
        question.answers.forEach((answer, index) => {
            const answerDiv = document.createElement('div');
            answerDiv.classList.add('answer');
            answerDiv.innerHTML = `
                <p>${answer.body}</p>
                <div class="vote-buttons">
                    <button class="upvote-answer-button" data-question-index="${questionIndex}" data-answer-index="${index}">Upvote</button>
                    <span class="vote-count">${answer.upvotes}</span>
                    <button class="downvote-answer-button" data-question-index="${questionIndex}" data-answer-index="${index}">Downvote</button>
                    <span class="vote-count">${answer.downvotes}</span>
                </div>
                <p>Answered by: ${answer.user}</p>
            `;
            answersContainer.appendChild(answerDiv);
        });
    };

    userForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const newUser = { username, email };
        users.push(newUser);
        currentUser = JSON.stringify(newUser);
        saveToLocalStorage();
        displayUser();
        userSection.style.display = 'none';
        homeSection.style.display = 'block';
    });

    questionForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById('question-title').value;
        const body = quill.root.innerHTML;
        const user = currentUser ? JSON.parse(currentUser).username : 'Anonymous';
        const newQuestion = { title, body, upvotes: 0, downvotes: 0, answers: [], user };
        questions.push(newQuestion);
        saveToLocalStorage();
        displayQuestions();
        askQuestionSection.style.display = 'none';
        homeSection.style.display = 'block';
    });

    questionsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('view-answers-button')) {
            const index = e.target.dataset.index;
            questionDetail.innerHTML = `
                <h3>${questions[index].title}</h3>
                <p>${questions[index].body}</p>
                <p>Asked by: ${questions[index].user}</p>
            `;
            displayAnswers(index);
            answersSection.style.display = 'block';
            homeSection.style.display = 'none';
        } else if (e.target.classList.contains('upvote-button')) {
            const index = e.target.dataset.index;
            questions[index].upvotes++;
            saveToLocalStorage();
            displayQuestions();
        } else if (e.target.classList.contains('downvote-button')) {
            const index = e.target.dataset.index;
            questions[index].downvotes--;
            saveToLocalStorage();
            displayQuestions();
        } else if (e.target.classList.contains('delete-question-button')) {
            const index = e.target.dataset.index;
            questions.splice(index, 1);
            saveToLocalStorage();
            displayQuestions();
        }
    });

    answersContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('upvote-answer-button')) {
            const questionIndex = e.target.dataset.questionIndex;
            const answerIndex = e.target.dataset.answerIndex;
            questions[questionIndex].answers[answerIndex].upvotes++;
            saveToLocalStorage();
            displayAnswers(questionIndex);
        } else if (e.target.classList.contains('downvote-answer-button')) {
            const questionIndex = e.target.dataset.questionIndex;
            const answerIndex = e.target.dataset.answerIndex;
            questions[questionIndex].answers[answerIndex].downvotes--;
            saveToLocalStorage();
            displayAnswers(questionIndex);
        }
    });

    submitAnswerButton.addEventListener('click', () => {
        const answerBody = answerQuill.root.innerHTML;
        const questionIndex = questions.findIndex(q => q.title === questionDetail.querySelector('h3').innerText);
        if (currentUser) {
            const user = JSON.parse(currentUser);
            const newAnswer = { body: answerBody, upvotes: 0, downvotes: 0, user: user.username };
            questions[questionIndex].answers.push(newAnswer);
            saveToLocalStorage();
            displayAnswers(questionIndex);
        } else {
            alert('Please register or log in to submit an answer.');
        }
    });

    backToQuestionsButton.addEventListener('click', () => {
        answersSection.style.display = 'none';
        homeSection.style.display = 'block';
    });

    backToHomeButton.addEventListener('click', () => {
        askQuestionSection.style.display = 'none';
        homeSection.style.display = 'block';
    });

    searchBar.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        const filteredQuestions = questions.filter(q => q.title.toLowerCase().includes(query) || q.body.toLowerCase().includes(query));
        questionsContainer.innerHTML = '';
        filteredQuestions.forEach((question, index) => {
            const questionDiv = document.createElement('div');
            questionDiv.classList.add('question');
            questionDiv.innerHTML = `
                <h3>${question.title}</h3>
                <p>${question.body}</p>
                <div class="vote-buttons">
                    <button class="upvote-button" data-index="${index}">Upvote</button>
                    <span class="vote-count">${question.upvotes}</span>
                    <button class="downvote-button" data-index="${index}">Downvote</button>
                    <span class="vote-count">${question.downvotes}</span>
                </div>
                <p>Asked by: ${question.user}</p>
                <button class="view-answers-button" data-index="${index}">View Answers (${question.answers.length})</button>
                <button class="delete-question-button" data-index="${index}">Delete Question</button>
            `;
            questionsContainer.appendChild(questionDiv);
        });
    });

    askQuestionButton.addEventListener('click', () => {
        askQuestionSection.style.display = 'block';
        homeSection.style.display = 'none';
    });

    allQuestionsButton.addEventListener('click', () => {
        displayQuestions();
    });

    unansweredQuestionsButton.addEventListener('click', () => {
        displayQuestions(true);
    });

    userIcon.addEventListener('click', () => {
        userSection.style.display = 'block';
        homeSection.style.display = 'none';
    });

    clearStorageButton.addEventListener('click', () => {
        localStorage.clear();
        users = [];
        questions = [];
        currentUser = null;
        saveToLocalStorage();
        displayQuestions();
        displayUser();
        alert('All data has been cleared.');
    });

    displayUser();
    displayQuestions();
});
