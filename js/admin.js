// Dummy Admin Credentials
const ADMIN_USERNAME = "salamiowner";
const ADMIN_PASSWORD = "admin123";  // Change this to a secure password!

// Check if admin is already logged in
if (localStorage.getItem("adminLoggedIn") === "true") {
    showAdminPanel();
}

// Admin Login Function
function adminLogin() {
    const username = document.getElementById("admin-username").value;
    const password = document.getElementById("admin-password").value;

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        localStorage.setItem("adminLoggedIn", "true");
        showAdminPanel();
    } else {
        document.getElementById("login-error").innerText = "Invalid admin credentials!";
    }
}

// Show Admin Panel & Hide Login
function showAdminPanel() {
    document.getElementById("login-section").style.display = "none";
    document.getElementById("admin-panel").style.display = "block";
}

// Give Apple Points Function
function giveApplePoints() {
    const username = document.getElementById("user-select").value;
    const points = parseInt(document.getElementById("points-amount").value);

    if (!username || isNaN(points) || points <= 0) {
        document.getElementById("admin-message").innerText = "Enter a valid username and points!";
        return;
    }

    let userData = JSON.parse(localStorage.getItem("users")) || {};
    
    if (!userData[username]) {
        document.getElementById("admin-message").innerText = "User not found!";
        return;
    }

    // Add points to user
    userData[username].points += points;
    localStorage.setItem("users", JSON.stringify(userData));

    document.getElementById("admin-message").innerText = `${points} apple points given to ${username}!`;
}
