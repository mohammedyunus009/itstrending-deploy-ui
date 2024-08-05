const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});

document.addEventListener('DOMContentLoaded', function () {
  const signupForm = document.getElementById('signupForm');

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

    fetch('http://35.233.133.10:5000/api/v1/auth/signup', {
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
      alert('Signup successful!');
      signupForm.reset();
    })
    .catch(error => {
      console.error('Error:', error.message);
      alert(`Signup failed: ${error.message}`);
    });
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const signInForm = document.getElementById('loginForm'); // Grabbing the form element

  signInForm.addEventListener('submit', async (event) => { // Adding 'submit' event listener on form
    event.preventDefault(); // Prevent default form submission

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
      const response = await fetch('http://35.233.133.10:5000/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Handle successful login
        console.log('Login successful:', data);
        alert('Login successful!');
        // Optionally, save JWT token in cookies or localStorage
        // Example: document.cookie = `jwtToken=${data.token}`;
        // Redirect or update UI as needed
      } else {
        // Handle login failure
        console.log('Login failed:', data.message);
        alert('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('An error occurred during login. Please try again later.');
    }
  });
});




document.addEventListener('DOMContentLoaded', () => {
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

  document.getElementById('forgotPasswordForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('forgot-email').value;

    try {
      const response = await fetch('http://35.233.133.10:5000/api/v1/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });

      if (response.ok) {
        alert('Password reset link has been sent to ' + email);
      } else {
        const data = await response.json();
        alert('Error: ' + data.message);
      }
    } catch (error) {
      alert('An error occurred. Please try again later.');
    }

    forgotPasswordModal.style.display = 'none';
  });
});



