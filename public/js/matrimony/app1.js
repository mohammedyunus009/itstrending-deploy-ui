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
      const response = await fetch('https://api.itstrending.in:5001/api/v1/auth/login', {
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
  
        // Set expiration time for the cookie (e.g., 1 year from now)
        const expirationTime = new Date();
        expirationTime.setFullYear(expirationTime.getFullYear() + 1);
  
        // Store the token in a cookie with expiration time
        document.cookie = `token=${token}; path=/; Secure; SameSite=Strict; expires=${expirationTime.toUTCString()}`;
        
        // Store email in cookies
        document.cookie = `email=${decodeURIComponent(email)}; path=/; Secure; SameSite=Strict; expires=${expirationTime.toUTCString()}`;
  
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
    window.location.href = 'payment2.html';
  });
  

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
      const response = await fetch('https://35.233.133.10:5000/api/v1/auth/reset-password', {
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
