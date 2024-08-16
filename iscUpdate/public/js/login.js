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
  if (signupForm) {
    signupForm.addEventListener('submit', function (event) {
      event.preventDefault();
  
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
  
      fetch('https://api.itstrending.in:5000/api/v1/auth/signup', {
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
  
        alert('Signup successful!');
        signupForm.reset();
      })
      .catch(error => {
        console.error('Error:', error.message);
        alert(`Signup failed: ${error.message}`);
      });
    });
  } else {
    console.error('signupForm1 element not found');
  }
  
  const signInForm = document.getElementById('loginForm1');
  const successPopup = document.getElementById('successPopup');
  const doneButton = document.getElementById('doneButton');
  
  signInForm.addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    try {
      const response = await fetch('https://api.itstrending.in:5000/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        // Extract the token
        const token = data.data.token;
  
        // Set expiration time for the cookies (e.g., 1 year from now)
        const expirationTime = new Date();
        expirationTime.setFullYear(expirationTime.getFullYear() + 1);
  
        // Store the token in a cookie with expiration time
        document.cookie = `token=${token}; path=/; Secure; SameSite=Strict; expires=${expirationTime.toUTCString()}`;
  
        // Store the email in a cookie with expiration time
        document.cookie = `email=${encodeURIComponent(email)}; path=/; Secure; SameSite=Strict; expires=${expirationTime.toUTCString()}`;
  
        // Show the success popup
        successPopup.style.display = 'flex';
      } else {
        console.log('Login failed:', data.message);
        alert('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('An error occurred during login. Please try again later.');
    }
  });
  
  doneButton.addEventListener('click', () => {
    // Redirect to button.html on "Done" button click
    window.location.href = 'button.html';
  });
  
  document.getElementById('signupForm1').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission
    
    // Get the email value from the input field
    const email = document.getElementById('forgot-email').value;

    // Prepare the request
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "email": email
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    fetch("https://api.itstrending.in:5000/api/v1/auth/reset-password", requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.error('Error:', error));
});
});


const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

// Middleware setup
app.use(cors()); // Use CORS middleware to allow cross-origin requests
app.use(bodyParser.json()); // Parse JSON bodies

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
