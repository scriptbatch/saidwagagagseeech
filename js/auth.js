// Login function
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Hardcoded credentials
    const validUsername = "user";     // This is the expected username
    const validPassword = "password123";  // This is the expected password

    // Check if the entered username and password match the hardcoded values
    if (username === validUsername && password === validPassword) {
        alert("Login Successful!");
        window.location.href = "roller.html";  // Redirect to the roller page
    } else {
        alert("Invalid Username or Password!");  // Show an alert if login is incorrect
    }
}

// Sign up function (using localStorage for demo purposes)
function signup() {
    const username = document.getElementById('newUsername').value;
    const password = document.getElementById('newPassword').value;

    // Save these values to localStorage for future login (you could implement a real DB in a more advanced version)
    localStorage.setItem("username", username);
    localStorage.setItem("password", password);
    alert("Sign Up Successful!");
    window.location.href = "login.html";  // Redirect to login page after signup
}
