<<<<<<< HEAD
=======
// Query-Corner.js
>>>>>>> origin/release-forum
document.addEventListener('DOMContentLoaded', () => {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    let questions = JSON.parse(localStorage.getItem('questions')) || [];
    let currentUser = localStorage.getItem('currentUser') || null;

    const userForm = document.getElementById('user-form');
    const questionForm = document.getElementById('question-form');
    const questionsContainer = document.getElementById('questions-container');
    const currentUserElement = document.getElementById('current-user');
    const askQuestionButton = document.getElementById('ask-question-button');
<<<<<<< HEAD
    const allQuestionsButton = document.getElementById('all-questions-button');
    const unansweredQuestionsButton = document.getElementById('unanswered-questions-button');
=======
>>>>>>> origin/release-forum
    const homeSection = document.getElementById('home-section');
    const askQuestionSection = document.getElementById('ask-question-section');
    const answersSection = document.getElementById('answers-section');
    const questionDetail = document.getElementById('question-detail');
    const answersContainer = document.getElementById('answers-container');
<<<<<<< HEAD
    const backToQuestionsButton = document.getElementById('back-to-questions');
    const searchBar = document.getElementById('search-bar');
    const userIcon = document.getElementById('user-icon');
    const userSection = document.getElementById('user-section');
    const submitAnswerButton = document.getElementById('submit-answer');

    // Initialize Quill editor for questions
=======
    const answerForm = document.getElementById('answer-form');
    const backToQuestionsButton = document.getElementById('back-to-questions');

    // Initialize Quill editor
>>>>>>> origin/release-forum
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

<<<<<<< HEAD
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
=======
    // Add tooltips to Quill toolbar buttons
    const toolbar = quill.getModule('toolbar');
    const toolbarButtons = toolbar.container.querySelectorAll('button, select');

    const tooltips = {
        'ql-header': 'Heading',
        'ql-bold': 'Bold',
        'ql-italic': 'Italic',
        'ql-underline': 'Underline',
        'ql-strike': 'Strikethrough',
        'ql-blockquote': 'Blockquote',
        'ql-code-block': 'Code Block',
        'ql-list[value="ordered"]': 'Numbered List',
        'ql-list[value="bullet"]': 'Bulleted List',
        'ql-script[value="sub"]': 'Subscript',
        'ql-script[value="super"]': 'Superscript',
        'ql-indent[value="-1"]': 'Outdent',
        'ql-indent[value="+1"]': 'Indent',
        'ql-direction': 'Text Direction',
        'ql-link': 'Link',
        'ql-image': 'Image',
        'ql-align': 'Align',
        'ql-color': 'Text Color',
        'ql-background': 'Background Color',
        'ql-clean': 'Remove Formatting'
    };

    toolbarButtons.forEach(button => {
        const className = button.classList[0];
        const value = button.getAttribute('value');
        const key = value ? `${className}[value="${value}"]` : className;
        if (tooltips[key]) {
            button.setAttribute('title', tooltips[key]);
        }
    });

    function saveData() {
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('questions', JSON.stringify(questions));
        localStorage.setItem('currentUser', currentUser);
    }

    function renderQuestions() {
        questionsContainer.innerHTML = '';
        questions.forEach((question, qIndex) => {
            const questionElement = document.createElement('div');
            questionElement.className = 'question';
            questionElement.innerHTML = `
                <h3>${question.title}</h3>
                <div>${question.body}</div>
                <p>Asked by: ${question.username}</p>
                <div class="vote-buttons">
                    <button onclick="voteQuestion(${qIndex}, 1)">Upvote</button>
                    <button onclick="voteQuestion(${qIndex}, -1)">Downvote</button>
                    <span>Votes: ${question.votes}</span>
                </div>
                <button onclick="viewAnswers(${qIndex})">View Answers</button>
            `;
            questionsContainer.appendChild(questionElement);
        });
    }

    function renderAnswers(qIndex) {
        const question = questions[qIndex];
        questionDetail.innerHTML = `
            <h3>${question.title}</h3>
            <div>${question.body}</div>
            <p>Asked by: ${question.username}</p>
            <div class="vote-buttons">
                <button onclick="voteQuestion(${qIndex}, 1)">Upvote</button>
                <button onclick="voteQuestion(${qIndex}, -1)">Downvote</button>
                <span>Votes: ${question.votes}</span>
            </div>
        `;
        answersContainer.innerHTML = '';
        question.answers.forEach(answer => {
            const answerElement = document.createElement('div');
            answerElement.className = 'answer';
            answerElement.innerHTML = `
                <p>${answer.body}</p>
                <p>Answered by: ${answer.username}</p>
            `;
            answersContainer.appendChild(answerElement);
        });
    }

    function registerUser(event) {
        event.preventDefault();
        const username = document.getElementById('username').value;
        if (!users.includes(username)) {
            users.push(username);
        }
        currentUser = username;
        document.getElementById('username').value = '';
        currentUserElement.textContent = `Current User: ${currentUser}`;
        saveData();
    }

    function askQuestion(event) {
        event.preventDefault();
        if (!currentUser) {
            alert('Please register or login to ask a question.');
            return;
        }
        const title = document.getElementById('question-title').value;
        const body = quill.root.innerHTML;
        questions.push({ title, body, username: currentUser, votes: 0, answers: [] });
        document.getElementById('question-title').value = '';
        quill.setContents([]);
        saveData();
        renderQuestions();
        askQuestionSection.style.display = 'none';
        homeSection.style.display = 'block';
    }

    window.voteQuestion = function(qIndex, vote) {
        questions[qIndex].votes += vote;
        saveData();
        renderQuestions();
    };

    window.viewAnswers = function(qIndex) {
        renderAnswers(qIndex);
        homeSection.style.display = 'none';
        answersSection.style.display = 'block';
    };

    window.submitAnswer = function(event, qIndex) {
        event.preventDefault();
        if (!currentUser) {
            alert('Please register or login to submit an answer.');
            return;
        }
        const answerBody = document.getElementById('answer-body').value;
        questions[qIndex].answers.push({ body: answerBody, username: currentUser });
        document.getElementById('answer-body').value = '';
        saveData();
        renderAnswers(qIndex);
    };
>>>>>>> origin/release-forum

    askQuestionButton.addEventListener('click', () => {
        homeSection.style.display = 'none';
        askQuestionSection.style.display = 'block';
    });

<<<<<<< HEAD
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
=======
    backToQuestionsButton.addEventListener('click', () => {
        answersSection.style.display = 'none';
        homeSection.style.display = 'block';
    });

    userForm.addEventListener('submit', registerUser);
    questionForm.addEventListener('submit', askQuestion);
    answerForm.addEventListener('submit', (event) => submitAnswer(event, window.currentQuestionIndex));
    currentUserElement.textContent = currentUser ? `Current User: ${currentUser}` : 'No user logged in';

    renderQuestions();
>>>>>>> origin/release-forum
});
