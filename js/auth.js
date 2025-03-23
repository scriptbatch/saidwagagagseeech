// Check if user is logged in, if not send them to login page
function checkAuth() {
    if (!localStorage.getItem("loggedInUser")) {
        window.location.href = "login.html";
    }
}

// Signup function
function signUp() {
    let username = document.getElementById("signupUsername").value;
    let password = document.getElementById("signupPassword").value;

    if (!username || !password) {
        alert("❌ Please fill in all fields!");
        return;
    }

    // Save user in localStorage
    let users = JSON.parse(localStorage.getItem("users")) || {};
    
    if (users[username]) {
        alert("❌ Username already exists!");
        return;
    }

    users[username] = password;
    localStorage.setItem("users", JSON.stringify(users));
    
    alert("✅ Signup successful! Please log in.");
    window.location.href = "login.html";
}

// Login function
function login() {
    let username = document.getElementById("loginUsername").value;
    let password = document.getElementById("loginPassword").value;

    let users = JSON.parse(localStorage.getItem("users")) || {};

    if (users[username] && users[username] === password) {
        localStorage.setItem("loggedInUser", username);
        alert("✅ Login successful!");
        window.location.href = "roller.html"; // Redirect to roller
    } else {
        alert("❌ Invalid username or password!");
    }
}

// Logout function
function logout() {
    localStorage.removeItem("loggedInUser");
    window.location.href = "index.html";
}
