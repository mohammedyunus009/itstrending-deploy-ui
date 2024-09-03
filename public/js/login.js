document.addEventListener('DOMContentLoaded', function () {
  const container = document.querySelector('.container1');
  const buttons = document.querySelectorAll('[id *= "-toggle"]');

  buttons.forEach((btn) => {
    btn.addEventListener('click', function(event) {
      event.preventDefault();
      container.classList.toggle('flipped');
    });
  });

  const signupForm = document.getElementById('signupForm1');
const messageArea = document.getElementById('message-area');
const loadingSpinner = document.getElementById('loading-spinner');

if (signupForm) {
    signupForm.addEventListener('submit', function (event) {
        event.preventDefault();
    
        // Show loading spinner
        loadingSpinner.style.display = 'block';
    
        const email = document.getElementById('signup-email').value;
        const firstname = document.getElementById('signup-firstname').value;
        const lastname = document.getElementById('signup-lastname').value;
        const password = document.getElementById('signup-password').value;
    
        const formData = {
            email: email,
            firstname: firstname,
            lastname: lastname,
            password: password
        };
    
        fetch('https://api.itstrending.in:5001/api/v1/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(errorData => {
                    throw new Error(`Error: ${errorData.message || response.statusText}`);
                });
            }
            return response.json();
        })
        .then(data => {
            console.log('Success:', data);

            // Store email in cookies
            document.cookie = `email=${encodeURIComponent(email)}; path=/`;

            // Show success message
            messageArea.textContent = 'Signup successful!';
            messageArea.className = 'message-area success';
            
            // Hide loading spinner after 5 seconds
            setTimeout(() => {
                loadingSpinner.style.display = 'none';
            }, 5000); // 5 seconds delay

            // Reset form
            signupForm.reset();

            // Redirect to login page after 5 seconds
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 5000); // 5 seconds delay
        })
        .catch(error => {
            console.error('Error:', error.message);

            // Show error message
            messageArea.textContent = `Signup failed: ${error.message}`;
            messageArea.className = 'message-area error';
            
            // Hide loading spinner after 5 seconds
            setTimeout(() => {
                loadingSpinner.style.display = 'none';
            }, 5000); // 5 seconds delay
        });
    });
} else {
    console.error('signupForm1 element not found');
}


// Get references to DOM elements
const signInForm = document.getElementById('loginForm1');
const messageContainer = document.getElementById('messageContainer');
const loadingContainer = document.getElementById('loadingContainer');

// Event listener for form submission
signInForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    // Retrieve form values
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    // Show loading animation
    loadingContainer.style.display = 'flex';
    messageContainer.style.display = 'none';

    try {
        // Authenticate user
        const authResponse = await fetch('https://api.itstrending.in:5001/api/v1/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const authData = await authResponse.json();

        if (!authResponse.ok) {
            // Handle authentication errors
            handleAuthError(authData);
            return;
        }

        // Extract token
        const token = authData.data.token;

        // Set expiration time for cookies (1 year)
        const expirationTime = new Date();
        expirationTime.setFullYear(expirationTime.getFullYear() + 1);
        const expires = `expires=${expirationTime.toUTCString()}`;

        // Set cookies securely
        document.cookie = `token=${encodeURIComponent(token)}; ${expires}; path=/; Secure; SameSite=Strict`;
        document.cookie = `email=${email}; ${expires}; path=/; Secure; SameSite=Strict`;
        document.cookie = `field5=${email}; ${expires}; path=/; Secure; SameSite=Strict`;
        
        // Fetch user profiles
        const profiles = await fetchUserProfiles(token, email);

        if (profiles && profiles.length > 0) {
            const profileId = profiles[0].profile_id;
        
            // Log the profileId in the console
            console.log('Profile ID:', profileId);
        
            showMessage('Login successful. Redirecting to your profile...', 'success');
            setTimeout(() => {
                window.location.href = `loginpreview.html?profile_id=${encodeURIComponent(profileId)}`;
            }, 2000);
        } else {
            showMessage('Login successful. Redirecting to profile creation...', 'success');
            setTimeout(() => {
                window.location.href = 'male.html';
            }, 2000);
        }
        
    } catch (error) {
        console.error('Unexpected error during login process:', error);
        showMessage('An unexpected error occurred. Please try again later.', 'error');
    } finally {
        // Hide loading animation
        loadingContainer.style.display = 'none';
    }
});

// Function to handle authentication errors
function handleAuthError(authData) {
    if (authData.message && authData.message.includes('email not registered')) {
        showMessage('Email not registered. Redirecting to sign-up...', 'error');
        setTimeout(() => {
            window.location.href = 'signup.html';
        }, 2000);
    } else if (authData.message && authData.message.includes('Invalid credentials')) {
        showMessage('Invalid email or password. Please try again.', 'error');
    } else {
        showMessage('Authentication failed. Please try again later.', 'error');
    }
    loadingContainer.style.display = 'none';
}

// Function to fetch user profiles
async function fetchUserProfiles(token, email) {
    try {
        const response = await fetch('https://api.itstrending.in:5001/api/v1/profiles/search_multiple', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token,
            },
            body: JSON.stringify({ field5: email }),
        });

        const data = await response.json();

        if (!response.ok || !data.data || !data.data.profile) {
            console.warn('No profiles found for the user.');
            return null;
        }

        return data.data.profile;
    } catch (error) {
        console.error('Error fetching user profiles:', error);
        showMessage('Failed to retrieve profile information. Please try again later.', 'error');
        return null;
    }
}

// Function to display messages to the user
function showMessage(message, type) {
    messageContainer.textContent = message;
    messageContainer.className = `message-container ${type}`;
    messageContainer.style.display = 'block';
}




  const forgotPasswordLink = document.getElementById('forgotPasswordLink');
  const forgotPasswordModal = document.getElementById('forgotPasswordModal');
  const closeModal = document.getElementById('closeModal');

  forgotPasswordLink.addEventListener('click', (e) => {
    e.preventDefault();
    forgotPasswordModal.style.display = 'block';
  });

  closeModal.addEventListener('click', () => {
    forgotPasswordModal.style.display = 'none';
  });

  window.addEventListener('click', (e) => {
    if (e.target == forgotPasswordModal) {
      forgotPasswordModal.style.display = 'none';
    }
  });

  document.addEventListener('DOMContentLoaded', function() {
    const forgotPasswordForm = document.getElementById('forgotPasswordForm');
    const backToLogin = document.getElementById('back-to-login');

    if (forgotPasswordForm) {
        forgotPasswordForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('forgot-email').value;
            
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            const raw = JSON.stringify({
                email: email // Use the email from the form input
            });

            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: raw,
                redirect: "follow"
            };

            try {
                const response = await fetch("https://api.itstrending.in:5001/api/v1/auth/reset-password", requestOptions);
                
                if (response.ok) {
                    const result = await response.text();
                    alert('Password reset link has been sent to ' + email);
                    console.log(result); // Log the result to the console
                } else {
                    const data = await response.json();
                    alert('Error: ' + data.message);
                }
            } catch (error) {
                console.error('An error occurred:', error);
                alert('An error occurred. Please try again later.');
            }
        });
    }

    if (backToLogin) {
        backToLogin.addEventListener('click', function() {
            window.location.href = 'login.html';
        });
    }
});

});


document.addEventListener('DOMContentLoaded', function() {
    const signupPopup = document.getElementById('signup-popup');
    const signupToggle = document.getElementById('signup-toggle');
    const loginToggle = document.getElementById('login-toggle');
    const doneButton = document.getElementById('done-button');
    
    if (signupToggle) {
        signupToggle.addEventListener('click', function() {
            window.location.href = 'signup.html';
        });
    }
    
    if (loginToggle) {
        loginToggle.addEventListener('click', function() {
            window.location.href = 'login.html';
        });
    }
    
    if (doneButton) {
        doneButton.addEventListener('click', function() {
            window.location.href = 'login.html';
        });
    }

    // Show the signup popup when needed (e.g., on successful signup)
    const showPopup = () => {
        signupPopup.style.display = 'block';
    };

    // Example: call showPopup() when signup is successful
});


const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

// Middleware setup
app.use(cors()); // Use CORS middleware
app.use(bodyParser.json()); // Parse JSON bodies

// CORS middleware (optional, if you want to customize CORS)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Replace * with your domain if possible
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Define API endpoints
app.post('/api/v1/auth/signup', (req, res) => {
  const { email, firstname, lastname, password } = req.body;
  
  // Implement signup logic here
  // For example, save user details to the database and respond with success or error
  
  res.json({ success: true, message: 'Signup successful' });
});

app.post('/api/v1/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  // Implement login logic here
  // For example, verify user credentials and issue a token if successful
  
  const token = 'example-token'; // Replace with actual token generation logic
  res.json({ success: true, data: { token } });
});

app.post('/api/v1/auth/reset-password', (req, res) => {
  const { email } = req.body;
  
  // Implement password reset logic here
  // For example, generate a password reset link and send it to the email address
  
  res.json({ success: true, message: 'Password reset link sent' });
});

// Start your server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});






