// Helper function to set a cookie
function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

// Helper function to get a cookie
function getCookie(name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === " ") c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

// Check if user is already logged in
if (getCookie("loggedInUser")) {
    window.location.href = "roller.html"; // Redirect to roller page
}

// Function to handle sign up
document.getElementById("signup-form")?.addEventListener("submit", function (e) {
    e.preventDefault();

    let username = document.getElementById("signup-username").value;
    let password = document.getElementById("signup-password").value;

    let users = JSON.parse(localStorage.getItem("users")) || {}; // Get stored users

    if (users[username]) {
        alert("Username already exists! Choose another one.");
    } else {
        users[username] = { password: password, applePoints: 10 }; // Default 10 Apple Points
        localStorage.setItem("users", JSON.stringify(users)); // Save updated users
        setCookie("loggedInUser", username, 7); // Keep user logged in for 7 days
        window.location.href = "roller.html"; // Redirect to roller
    }
});

// Function to handle login
document.getElementById("login-form")?.addEventListener("submit", function (e) {
    e.preventDefault();

    let username = document.getElementById("login-username").value;
    let password = document.getElementById("login-password").value;

    let users = JSON.parse(localStorage.getItem("users")) || {}; // Get stored users

    if (users[username] && users[username].password === password) {
        setCookie("loggedInUser", username, 7); // Keep user logged in for 7 days
        window.location.href = "roller.html"; // Redirect to roller
    } else {
        alert("Invalid username or password!");
    }
});

