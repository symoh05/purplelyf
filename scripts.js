document.addEventListener('DOMContentLoaded', () => {
    // Check if the user is logged in
    const loggedIn = localStorage.getItem('loggedIn');

    // Redirect to login if not logged in (on non-login pages)
    if (!loggedIn && window.location.pathname !== '/login.html') {
        window.location.href = 'login.html';
    }

    // Login form submission
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            if (username === 'user' && password === 'password') {
                localStorage.setItem('loggedIn', true); // Store login state
                alert('Login successful!');
                window.location.href = 'index.html'; // Redirect to home page
            } else {
                alert('Invalid username or password!');
            }
        });
    }
});
