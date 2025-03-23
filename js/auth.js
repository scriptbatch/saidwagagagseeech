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

// Signup function
function signup() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Validation: Make sure username and password are not empty
    if (username === "" || password === "") {
        alert("Username and Password cannot be empty!");
        return;  // Stop the function if fields are empty
    }

    // Create cookies for username and password, set expiration to 7 days
    createCookie('username', username, 7);
    createCookie('password', password, 7);

    // Show success message
    alert('Signup Successful! You can now login.');

    // Redirect to login page after successful signup
    window.location.href = "login.html"; // Change this to redirect to your login page
}

// Login function (for the login.html page)
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Get saved username and password from cookies
    const savedUsername = getCookie('username');
    const savedPassword = getCookie('password');

    // Check if the entered username and password match the saved values
    if (username === savedUsername && password === savedPassword) {
        alert("Login Successful!");
        // Redirect to another page after login (e.g., the main page)
        window.location.href = "roller.html"; // Change to your main page or another desired page
    } else {
        alert("Invalid username or password!");
    }
}
