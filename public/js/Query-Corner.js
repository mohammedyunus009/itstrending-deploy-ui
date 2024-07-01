// Query-Corner.js
document.addEventListener('DOMContentLoaded', () => {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    let questions = JSON.parse(localStorage.getItem('questions')) || [];
    let currentUser = localStorage.getItem('currentUser') || null;

    const userForm = document.getElementById('user-form');
    const questionForm = document.getElementById('question-form');
    const questionsContainer = document.getElementById('questions-container');
    const currentUserElement = document.getElementById('current-user');
    const askQuestionButton = document.getElementById('ask-question-button');
    const homeSection = document.getElementById('home-section');
    const askQuestionSection = document.getElementById('ask-question-section');
    const answersSection = document.getElementById('answers-section');
    const questionDetail = document.getElementById('question-detail');
    const answersContainer = document.getElementById('answers-container');
    const answerForm = document.getElementById('answer-form');
    const backToQuestionsButton = document.getElementById('back-to-questions');

    // Initialize Quill editor
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

    askQuestionButton.addEventListener('click', () => {
        homeSection.style.display = 'none';
        askQuestionSection.style.display = 'block';
    });

    backToQuestionsButton.addEventListener('click', () => {
        answersSection.style.display = 'none';
        homeSection.style.display = 'block';
    });

    userForm.addEventListener('submit', registerUser);
    questionForm.addEventListener('submit', askQuestion);
    answerForm.addEventListener('submit', (event) => submitAnswer(event, window.currentQuestionIndex));
    currentUserElement.textContent = currentUser ? `Current User: ${currentUser}` : 'No user logged in';

    renderQuestions();
});
