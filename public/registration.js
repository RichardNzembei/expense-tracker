document.addEventListener('DOMContentLoaded', function() {
    const registrationForm = document.getElementById('registrationForm');
    const registrationMessage = document.getElementById('registrationMessage');
    const loginForm = document.getElementById('loginForm');
    const loginMessage = document.getElementById('loginMessage');

    if (registrationForm && registrationMessage) {
        registrationForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default form submission

            // Get form data
            const username = document.getElementById('username').value.trim();
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;

            // Basic validation
            if (username === '' || email === '' || password === '') {
                registrationMessage.textContent = 'Please fill in all fields.';
                return;
            }

            // Check if user already exists in local storage
            let users = JSON.parse(localStorage.getItem('users')) || [];

            // Check if user already exists
            const existingUser = users.find(user => user.email === email);
            if (existingUser) {
                registrationMessage.textContent = 'User already exists. Please login.';
                return;
            }

            // Create new user object
            const newUser = { username, email, password };

            // Add new user to the array
            users.push(newUser);

            // Store updated users array in local storage
            localStorage.setItem('users', JSON.stringify(users));

            // Display success message
            registrationMessage.textContent = 'User registered successfully.';
        });
    }

    if (loginForm && loginMessage) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default form submission

            // Get form data
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;

            // Basic validation
            if (email === '' || password === '') {
                loginMessage.textContent = 'Please fill in all fields.';
                return;
            }

            // Check if user exists in local storage
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const user = users.find(u => u.email === email && u.password === password);

            if (user) {
                // User found, redirect to profile page or do whatever you need
                window.location.href = 'profile.html'; // Redirect to profile page
            } else {
                loginMessage.textContent = 'Invalid email or password.';
            }
        });
    }

    // Check if the user is logged in and display user details accordingly
    const currentUserJSON = localStorage.getItem('currentUser');

    if (currentUserJSON) {
        // Parse the user data
        const user = JSON.parse(currentUserJSON);

        // Display user details
        const userDetails = document.getElementById('userDetails');
        userDetails.innerHTML = `
            <p>Username: ${user.username}</p>
            <p>Email: ${user.email}</p>
        `;
    } else {
        // If user is not logged in, redirect to login page
        window.location.href = 'login.html'; // Adjust the URL as needed
    }

    // Display expenses, savings, and targets (You can populate these sections with data from local storage)
    // For example:
    // const expenses = JSON.parse(localStorage.getItem('expenses'));
    // const savings = JSON.parse(localStorage.getItem('savings'));
    // const targets = JSON.parse(localStorage.getItem('targets'));
    // Display expenses, savings, and targets accordingly
});

