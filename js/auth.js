// Function to check if the user is logged in
function checkLogin() {
    const username = getCookie('username'); // Get the saved username from the cookie

    if (username) {
        // User is logged in, show their username or proceed to the game
        alert("Welcome back, " + username + "!");
    } else {
        // No username found, prompt them to log in
        alert("Please log in first.");
        window.location.href = "login.html"; // Redirect to login page
    }
}

// Function to create a cookie
function createCookie(name, value, days) {
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));  // Days to milliseconds
        expires = "; expires=" + date.toGMTString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

// Function to get a cookie by name
function getCookie(name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

// Function to delete a cookie by name
function deleteCookie(name) {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
}

// Login function (for login.html)
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Hardcoded login check
    if (username === "user" && password === "password123") {
        // Store the username in cookies if login is successful
        createCookie('username', username, 7);  // Cookie will last for 7 days
        alert("Login successful!");
        window.location.href = "roller.html"; // Redirect to roller page
    } else {
        alert("Invalid username or password!");
    }
}

// Sign-up function (for signup.html)
function signUp() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Hardcoded sign-up logic (just an example)
    if (username && password) {
        // Store the username in cookies
        createCookie('username', username, 7);  // Cookie will last for 7 days
        alert("Sign up successful!");
        window.location.href = "roller.html"; // Redirect to roller page
    } else {
        alert("Please fill out both fields.");
    }
}
