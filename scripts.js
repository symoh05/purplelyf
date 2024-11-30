document.addEventListener('DOMContentLoaded', () => {
    // Check login status
    const loggedIn = localStorage.getItem('loggedIn');
    const currentPage = window.location.pathname.split('/').pop();

    if (!loggedIn && currentPage !== 'login.html') {
        window.location.href = 'login.html';
    }

    // Login Page Logic
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value.trim();

            if (username === 'user' && password === 'password') {
                localStorage.setItem('loggedIn', true);
                alert('Login successful!');
                window.location.href = 'index.html';
            } else {
                alert('Invalid username or password!');
            }
        });
    }

    // Members Page Logic
    const membersList = document.getElementById('members-list');
    const addMemberForm = document.getElementById('add-member-form');
    if (membersList && addMemberForm) {
        // Load members from localStorage or use defaults
        const defaultMembers = ['John Doe', 'Jane Smith', 'Peter Kamau'];
        let members = JSON.parse(localStorage.getItem('members')) || defaultMembers;

        // Render members
        const renderMembers = () => {
            membersList.innerHTML = '';
            members.forEach((member) => {
                const li = document.createElement('li');
                li.textContent = member;
                membersList.appendChild(li);
            });
        };

        // Add member
        addMemberForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const memberName = document.getElementById('member-name').value.trim();

            if (memberName) {
                members.push(memberName);
                localStorage.setItem('members', JSON.stringify(members));
                renderMembers();
                document.getElementById('member-name').value = '';
            } else {
                alert('Please enter a valid name!');
            }
        });

        // Initial render
        renderMembers();
    }
});
