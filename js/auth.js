// Sign Up function
function signUp() {
    const username = document.getElementById("signupUsername").value;
    const password = document.getElementById("signupPassword").value;
    
    if (username === "" || password === "") {
        alert("Please fill in both fields!");
        return;
    }

    // Store the user's data in localStorage
    if (localStorage.getItem(username)) {
        alert("Username already taken. Please choose a different one.");
    } else {
        localStorage.setItem(username, password);
        alert("Account created successfully!");
        window.location.href = "login.html";  // Redirect to login page
    }
}

// Login function
function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username === "" || password === "") {
        alert("Please fill in both fields!");
        return;
    }

    const storedPassword = localStorage.getItem(username);

    if (!storedPassword) {
        alert("Account not found!");
    } else if (storedPassword !== password) {
        alert("Invalid password!");
    } else {
        alert("Login successful!");
        window.location.href = "roller.html";  // Redirect to roller game page
    }
}

