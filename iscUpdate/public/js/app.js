const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});

// Function to fetch a new token from the server
async function renewToken(credentials) {
  try {
    const tokenResponse = await fetch('http://api.itstrending.in:5000/api/token', {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${credentials}`
      }
    });

    if (tokenResponse.ok) {
      const tokenData = await tokenResponse.json();
      const token = tokenData.token;
      return token;
    } else {
      throw new Error('Token retrieval failed: An error occurred.');
    }
  } catch (error) {
    throw new Error('Token renewal failed: ' + error.message);
  }
}

document.getElementById('loginForm').addEventListener('submit', async function(event) {
  event.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const credentials = btoa(`${username}:${password}`);

  try {
    const response = await fetch('http://api.itstrending.in:5000/api/resource', {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${credentials}`
      }
    });

    if (response.ok) {
      // Login successful
      alert('Login successful!');

      // Fetch token
      let token = await renewToken(credentials);

      // Store token in cookies
      const expirationTime = new Date();
      expirationTime.setSeconds(expirationTime.getSeconds() + 600); // 600 seconds from now
      document.cookie = `token=${token}; expires=${expirationTime.toUTCString()}; path=/`; // You may want to specify other cookie attributes like secure, etc.

      // Log token to console
      console.log("Token:", token);

      // Route to index.html
      window.location.href = 'index.html';
    } else if (response.status === 401) {
      // Incorrect username or password
      alert('Login failed: Incorrect username or password.');
    } else {
      // Other errors
      alert('Login failed: An error occurred.');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An unexpected error occurred.');
  }
});

document.getElementById('signupForm').addEventListener('submit', async function(event) {
  event.preventDefault();

  const username = document.getElementById('signup-username').value;
  const password = document.getElementById('signup-password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  if (password !== confirmPassword) {
    alert('Error: Passwords do not match');
    return;
  }

  const response = await fetch('http://api.itstrending.in:5000/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  });

  const result = await response.json();
  
  if (response.ok) {
    alert('User created successfully!');
  } else {
    alert('Error: ' + result.message);
  }
});


 // Function to set cookies
 function setCookie(name, value, days) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

// Function to handle form submission
document.getElementById('signup-form').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent the form from submitting normally

  // Get form values
  var email = document.getElementById('signup-email').value;
  var username = document.getElementById('signup-username').value;
  var phone = document.getElementById('signup-phone').value;

  // Example: Storing email, username, and phone in cookies
  setCookie('signup_email', email, 30); // Store email for 30 days
  setCookie('signup_username', username, 30); // Store username for 30 days
  setCookie('signup_phone', phone, 30); // Store phone number for 30 days

  // Optionally, you can clear the form fields after storing the data
  document.getElementById('signup-email').value = '';
  document.getElementById('signup-username').value = '';
  document.getElementById('signup-phone').value = '';

  // Inform the user (optional)
  document.getElementById('message').textContent = 'Data stored in cookies.';

  // Redirect or perform further actions as needed
  // window.location.href = '/success-page'; // Redirect to success page
});