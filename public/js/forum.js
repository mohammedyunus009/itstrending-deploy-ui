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
    const messagesContainer = document.getElementById('messages-container');

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
                <p>Asked by: ${question.user} (${question.userEmail})</p>
                <button class="view-answers-button" data-index="${index}">View Answers (${question.answers.length})</button>
                <button class="delete-question-button" data-index="${index}">Delete Question</button>
            `;
            questionsContainer.appendChild(questionDiv);
        });
        displayMessages();
    };

    const displayAnswers = (questionIndex) => {
        answersContainer.innerHTML = '';
        const question = questions[questionIndex];
        question.answers.forEach((answer, index) => {
            const answerDiv = document.createElement('div');
            answerDiv.classList.add('answer');
            answerDiv.innerHTML = `
                <p>${answer.body}</p>
                <p>Answered by: ${answer.user} (${answer.userEmail})</p>
                <div class="vote-buttons">
                    <button class="upvote-button" data-question-index="${questionIndex}" data-index="${index}">Upvote</button>
                    <span class="vote-count">${answer.upvotes}</span>
                    <button class="downvote-button" data-question-index="${questionIndex}" data-index="${index}">Downvote</button>
                    <span class="vote-count">${answer.downvotes}</span>
                </div>
            `;
            answersContainer.appendChild(answerDiv);
        });
    };

    const displayMessages = () => {
        messagesContainer.innerHTML = '';
        questions.forEach(question => {
            const messageDiv = document.createElement('div');
            messageDiv.classList.add('message');
            messageDiv.innerHTML = `
                <h3>Question: ${question.title}</h3>
                <p>${question.body}</p>
                <p>Asked by: ${question.user} (${question.userEmail})</p>
            `;
            question.answers.forEach(answer => {
                const answerDiv = document.createElement('div');
                answerDiv.classList.add('message');
                answerDiv.innerHTML = `
                    <h4>Answer</h4>
                    <p>${answer.body}</p>
                    <p>Answered by: ${answer.user} (${answer.userEmail})</p>
                `;
                messageDiv.appendChild(answerDiv);
            });
            messagesContainer.appendChild(messageDiv);
        });
    };

    const sendToAPI = (data) => {
        fetch('https://api.itstrending.in/submitForm', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(response => {
            if (response.accepted) {
                // Simulate email notification
                console.log(`Question/Answer accepted: ${data.title || 'Answer'}`);
                // Update UI or reload questions
                displayQuestions();
            } else {
                // Simulate email notification
                console.log(`Question/Answer declined: ${data.title || 'Answer'}`);
                // Optionally, inform the user about the decline
                alert(`Your question/answer "${data.title || 'Answer'}" has been declined.`);
                // Remove the question/answer if needed
                // const index = questions.findIndex(q => q.title === data.title);
                // if (index !== -1) {
                //     questions.splice(index, 1);
                //     saveToLocalStorage();
                //     displayQuestions();
                // }
            }
        })
        .catch(error => {
            console.error('Error sending data to API:', error);
            // Handle error scenarios
        });
    };

    if (userForm) {
        userForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const email = document.getElementById('email').value;
            const user = { username, email };
            users.push(user);
            currentUser = JSON.stringify(user);
            saveToLocalStorage();
            userSection.style.display = 'none';
            homeSection.style.display = 'block';
            displayUser();
        });
    }

    if (questionForm) {
        questionForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const title = document.getElementById('question-title').value;
            const body = quill.root.innerHTML;
            const user = JSON.parse(currentUser);
            const question = {
                title,
                body,
                user: user.username,
                userEmail: user.email,
                upvotes: 0,
                downvotes: 0,
                answers: []
            };
            questions.push(question);
            saveToLocalStorage();
            // Send question to API
            sendToAPI(question);
            questionForm.reset();
            quill.root.innerHTML = '';
            askQuestionSection.style.display = 'none';
            homeSection.style.display = 'block';
            // displayQuestions();
        });
    }

    if (askQuestionButton) {
        askQuestionButton.addEventListener('click', () => {
            homeSection.style.display = 'none';
            askQuestionSection.style.display = 'block';
        });
    }

    if (backToHomeButton) {
        backToHomeButton.addEventListener('click', () => {
            askQuestionSection.style.display = 'none';
            homeSection.style.display = 'block';
        });
    }

    if (backToQuestionsButton) {
        backToQuestionsButton.addEventListener('click', () => {
            answersSection.style.display = 'none';
            homeSection.style.display = 'block';
        });
    }

    if (allQuestionsButton) {
        allQuestionsButton.addEventListener('click', () => {
            displayQuestions();
        });
    }

    if (unansweredQuestionsButton) {
        unansweredQuestionsButton.addEventListener('click', () => {
            displayQuestions(true);
        });
    }

    if (questionsContainer) {
        questionsContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('view-answers-button')) {
                const index = e.target.dataset.index;
                const question = questions[index];
                questionDetail.innerHTML = `
                    <h3>${question.title}</h3>
                    <p>${question.body}</p>
                    <p>Asked by: ${question.user} (${question.userEmail})</p>
                `;
                displayAnswers(index);
                homeSection.style.display = 'none';
                answersSection.style.display = 'block';
                submitAnswerButton.dataset.questionIndex = index;
            } else if (e.target.classList.contains('delete-question-button')) {
                const index = e.target.dataset.index;
                questions.splice(index, 1);
                saveToLocalStorage();
                displayQuestions();
            } else if (e.target.classList.contains('upvote-button')) {
                const index = e.target.dataset.index;
                questions[index].upvotes++;
                saveToLocalStorage();
                displayQuestions();
            } else if (e.target.classList.contains('downvote-button')) {
                const index = e.target.dataset.index;
                questions[index].downvotes++;
                saveToLocalStorage();
                displayQuestions();
            }
        });
    }

    if (answersContainer) {
        answersContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('upvote-button')) {
                const questionIndex = e.target.dataset.questionIndex;
                const index = e.target.dataset.index;
                questions[questionIndex].answers[index].upvotes++;
                saveToLocalStorage();
                displayAnswers(questionIndex);
            } else if (e.target.classList.contains('downvote-button')) {
                const questionIndex = e.target.dataset.questionIndex;
                const index = e.target.dataset.index;
                questions[questionIndex].answers[index].downvotes++;
                saveToLocalStorage();
                displayAnswers(questionIndex);
            }
        });
    }

    if (submitAnswerButton) {
        submitAnswerButton.addEventListener('click', () => {
            const body = answerQuill.root.innerHTML;
            const user = JSON.parse(currentUser);
            const answer = {
                body,
                user: user.username,
                userEmail: user.email,
                upvotes: 0,
                downvotes: 0
            };
            const questionIndex = submitAnswerButton.dataset.questionIndex;
            questions[questionIndex].answers.push(answer);
            saveToLocalStorage();
            // Send answer to API
            sendToAPI(answer);
            answerQuill.root.innerHTML = '';
            displayAnswers(questionIndex);
        });
    }

    if (userIcon) {
        userIcon.addEventListener('click', () => {
            homeSection.style.display = 'none';
            askQuestionSection.style.display = 'none';
            answersSection.style.display = 'none';
            userSection.style.display = 'block';
        });
    }

    if (clearStorageButton) {
        clearStorageButton.addEventListener('click', () => {
            if (confirm('Are you sure you want to clear all data?')) {
                localStorage.clear();
                users = [];
                questions = [];
                currentUser = null;
                displayQuestions();
                displayUser();
            }
        });
    }

    if (searchBar) {
        searchBar.addEventListener('input', () => {
            const query = searchBar.value.toLowerCase();
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
                    <p>Asked by: ${question.user} (${question.userEmail})</p>
                    <button class="view-answers-button" data-index="${index}">View Answers (${question.answers.length})</button>
                    <button class="delete-question-button" data-index="${index}">Delete Question</button>
                `;
                questionsContainer.appendChild(questionDiv);
            });
        });
    }

    displayQuestions();
    displayUser();
});
