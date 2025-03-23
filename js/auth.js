function login() {
    let usernameInput = document.getElementById("username");
    let passwordInput = document.getElementById("password");

    // Ensure inputs exist
    if (!usernameInput || !passwordInput) {
        console.error("Login fields not found! Check your HTML IDs.");
        return;
    }

    let username = usernameInput.value.trim();
    let password = passwordInput.value.trim();

    if (username === "" || password === "") {
        alert("Please enter both username and password!");
        return;
    }

    let savedPassword = localStorage.getItem(username);  // Get password from localStorage

    if (!savedPassword) {
        alert("Account not found!");
    } else if (savedPassword !== password) {
        alert("Invalid password!");
    } else {
        localStorage.setItem("loggedInUser", username);  // Set user as logged in
        alert("Login successful!");
        window.location.href = "roller.html";  // Redirect to roller page after login
    }
}
