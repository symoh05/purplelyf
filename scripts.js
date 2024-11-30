document.addEventListener('DOMContentLoaded', () => {
    // Login page functionality
    const loginForm = document.getElementById('login-form');

    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            // Simple validation (you can improve this with a backend or a more secure method)
            if (username === 'user' && password === 'password') {
                alert('Login successful!');
                window.location.href = 'index.html'; // Redirect to homepage
            } else {
                alert('Invalid username or password!');
            }
        });
    }
});
