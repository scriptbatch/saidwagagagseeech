// Set cookie for login (store username in cookie)
function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));  // Cookie expires in X days
    document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/`;
}

// Get cookie value by name
function getCookie(name) {
    const nameEq = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);  // Trim the space
        if (c.indexOf(nameEq) == 0) return c.substring(nameEq.length, c.length);
    }
    return null;  // Return null if cookie is not found
}

// In auth.js file
function signup() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Perform the signup action here (e.g., storing in localStorage or sending data to a server)
    alert("Signed up successfully!");
    // You can redirect or display success messages after successful signup
    window.location.href = "login.html";  // Redirect to login page
}


// Login function
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const validUsername = "user";    // Expected username
    const validPassword = "password123";  // Expected password

    if (username === validUsername && password === validPassword) {
        // Set cookie for the user
        setCookie("username", username, 7);  // Cookie expires in 7 days
        alert("Login Successful!");
        window.location.href = "roller.html";  // Redirect to the roller page after successful login
    } else {
        alert("Invalid Username or Password!");  // Alert for incorrect login
    }
}

// Check if the user is already logged in
function checkLogin() {
    const username = getCookie("username");
    if (username) {
        document.getElementById("login-status").innerText = `Welcome, ${username}!`;
    } else {
        document.getElementById("login-status").innerText = "Not logged in";
    }
}

// Logout function (to clear the cookie)
function logout() {
    document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";  // Delete the cookie
    alert("You have been logged out.");
    window.location.href = "login.html";  // Redirect to login page after logout
}
