
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
        
            loadingSpinner.style.display = 'block';
        
            const email = document.getElementById('signup-email')?.value;
            const firstname = document.getElementById('signup-firstname')?.value;
            const lastname = document.getElementById('signup-lastname')?.value;
            const password = document.getElementById('signup-password')?.value;
        
            if (!email || !firstname || !lastname || !password) {
                alert('Please fill all fields');
                loadingSpinner.style.display = 'none';
                return;
            }

            fetch("https://api2.itstrending.in/api/v1/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, firstname, lastname, password }),
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    document.cookie = `email=${encodeURIComponent(email)}; path=/; Secure; SameSite=Strict; expires=${new Date(Date.now() + 31536000000).toUTCString()}`;
                    messageArea.textContent = 'Signup successful! Redirecting...';
                    setTimeout(() => window.location.href = 'index.html', 5000);
                } else {
                    messageArea.textContent = 'Signup failed: ' + data.message;
                }
            })
            .catch(error => console.error('Signup error:', error))
            .finally(() => loadingSpinner.style.display = 'none');
        });
    }

    const signInForm = document.getElementById('loginForm1');
    const messageContainer = document.getElementById('messageContainer');
    const loadingContainer = document.getElementById('loadingContainer');

    if (signInForm) {
        signInForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const email = document.getElementById('email')?.value;
            const password = document.getElementById('password')?.value;

            if (!email || !password) {
                alert('Please enter both email and password');
                return;
            }

            loadingContainer.style.display = 'flex';

            try {
                const response = await fetch('https://api2.itstrending.in/api/v1/auth/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password }),
                });
                const data = await response.json();

                if (response.ok) {
                    const token = data.data.token;
                    document.cookie = `token=${token}; path=/; Secure; SameSite=Strict; expires=${new Date(Date.now() + 31536000000).toUTCString()}`;
                    document.cookie = `email=${encodeURIComponent(email)}; path=/; Secure; SameSite=Strict; expires=${new Date(Date.now() + 31536000000).toUTCString()}`;
                    messageContainer.textContent = 'Login successful. Redirecting...';
                    setTimeout(() => window.location.href = 'search.html', 5000);
                } else {
                    messageContainer.textContent = `Login failed: ${data.message}`;
                }
            } catch (error) {
                messageContainer.textContent = 'Login error. Please try again.';
            } finally {
                loadingContainer.style.display = 'none';
            }
        });
    }
});
