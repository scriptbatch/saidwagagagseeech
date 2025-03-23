// Check if user is logged in, if not, send them to login page
function checkAuth() {
    if (!localStorage.getItem("loggedInUser")) {
        window.location.href = "login.html";
    }
}

// Display messages on the page
function showMessage(id, message) {
    document.getElementById(id).innerText = message;
}

// Signup function
function signUp() {
    let username = document.getElementById("signupUsername").value.trim();
    let password = document.getElementById("signupPassword").value.trim();
    let messageBox = document.getElementById("signupMessage");

    if (!username || !password) {
        showMessage("signupMessage", "❌ Please fill in all fields!");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || {};
    
    if (users[username]) {
        showMessage("signupMessage", "❌ Username already exists!");
        return;
    }

    users[username] = password;
    localStorage.setItem("users", JSON.stringify(users));
    
    showMessage("signupMessage", "✅ Signup successful! Redirecting to login...");
    setTimeout(() => {
        window.location.href = "login.html";
    }, 1500);
}

// Login function
function login() {
    let username = document.getElementById("loginUsername").value.trim();
    let password = document.getElementById("loginPassword").value.trim();
    let messageBox = document.getElementById("loginMessage");

    let users = JSON.parse(localStorage.getItem("users")) || {};

    if (users[username] && users[username] === password) {
        localStorage.setItem("loggedInUser", username);
        showMessage("loginMessage", "✅ Login successful! Redirecting...");
        setTimeout(() => {
            window.location.href = "roller.html";
        }, 1500);
    } else {
        showMessage("loginMessage", "❌ Invalid username or password!");
    }
}

// Logout function
function logout() {
    localStorage.removeItem("loggedInUser");
    window.location.href = "index.html";
}
