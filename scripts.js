document.addEventListener('DOMContentLoaded', () => {
    const currentPage = window.location.pathname.split('/').pop();

    // Redirect unauthenticated users to the login page
    const loggedIn = localStorage.getItem('loggedIn');
    if (!loggedIn && currentPage !== 'login.html' && currentPage !== 'register.html') {
        window.location.href = 'login.html';
    }

    // Logout functionality
    const logoutButton = document.getElementById('logout');
    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            localStorage.removeItem('loggedIn');
            alert('You have been logged out.');
            window.location.href = 'login.html';
        });
    }

    // Registration Page Logic
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const username = document.getElementById('reg-username').value.trim();
            const password = document.getElementById('reg-password').value.trim();

            if (username && password) {
                const users = JSON.parse(localStorage.getItem('users')) || {};
                if (users[username]) {
                    alert('Username already exists. Please choose another one.');
                } else {
                    users[username] = password;
                    localStorage.setItem('users', JSON.stringify(users));
                    alert('Registration successful! Please log in.');
                    window.location.href = 'login.html';
                }
            } else {
                alert('Please fill in all fields.');
            }
        });
    }

    // Login Page Logic
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value.trim();

            const users = JSON.parse(localStorage.getItem('users')) || {};
            if (users[username] === password) {
                localStorage.setItem('loggedIn', true);
                alert('Login successful!');
                window.location.href = 'index.html';
            } else {
                alert('Invalid username or password!');
            }
        });
    }

    // Member Addition Logic for Members Page (with table)
    const membersList = document.getElementById('members-list');
    const addMemberForm = document.getElementById('add-member-form');
    const newMemberInput = document.getElementById('new-member');
    const newMemberAdmission = document.getElementById('new-admission');
    const newMemberTable = document.getElementById('new-table');
    const newMemberNickname = document.getElementById('new-nickname');

    if (membersList && addMemberForm) {
        // Load members from localStorage
        const loadMembers = () => {
            const members = JSON.parse(localStorage.getItem('members')) || [];
            membersList.innerHTML = members.map(member => 
                `<tr>
                    <td>${member.name}</td>
                    <td>${member.admission}</td>
                    <td>${member.table}</td>
                    <td>${member.nickname}</td>
                </tr>`
            ).join('');
        };

        loadMembers();

        // Add new member
        addMemberForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const newMemberName = newMemberInput.value.trim();
            const newMemberAdmissionValue = newMemberAdmission.value.trim();
            const newMemberTableValue = newMemberTable.value.trim();
            const newMemberNicknameValue = newMemberNickname.value.trim();

            if (newMemberName && newMemberAdmissionValue && newMemberTableValue && newMemberNicknameValue) {
                const members = JSON.parse(localStorage.getItem('members')) || [];
                members.push({
                    name: newMemberName,
                    admission: newMemberAdmissionValue,
                    table: newMemberTableValue,
                    nickname: newMemberNicknameValue
                });
                localStorage.setItem('members', JSON.stringify(members));
                addMemberForm.reset();
                loadMembers();
            } else {
                alert('Please fill in all fields.');
            }
        });
    }

    // Expandable Images for Gallery (full-screen modal)
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-img');
    const closeModal = document.getElementById('close-modal');

    if (modal) {
        document.querySelectorAll('.expandable').forEach(img => {
            img.addEventListener('click', () => {
                modal.style.display = 'block';
                modalImg.src = img.src;
            });
        });

        closeModal.addEventListener('click', () => {
            modal.style.display = 'none';
            modalImg.src = '';
        });

        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
                modalImg.src = '';
            }
        });
    }
});
