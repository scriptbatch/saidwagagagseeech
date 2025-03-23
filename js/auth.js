// Login function
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // For demo purposes, hardcoded credentials
    const validUsername = "user";
    const validPassword = "password123";

    if (username === validUsername && password === validPassword) {
        alert("Login Successful!");
        window.location.href = "roller.html";
    } else {
        alert("Invalid Username or Password!");
    }
}

// Sign up function
function signup() {
    const username = document.getElementById('newUsername').value;
    const password = document.getElementById('newPassword').value;

    // Save these values for future login (you could use localStorage here)
    localStorage.setItem("username", username);
    localStorage.setItem("password", password);
    alert("Sign Up Successful!");
    window.location.href = "login.html";
}
