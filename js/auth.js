function login() {
    let usernameInput = document.getElementById("username");
    let passwordInput = document.getElementById("password");

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

    let savedPassword = getCookie(username);
    
    if (!savedPassword) {
        alert("Account not found!");
    } else if (savedPassword !== password) {
        alert("Invalid password!");
    } else {
        setCookie("loggedInUser", username, 7); // Save login for 7 days
        alert("Login successful!");
        window.location.href = "roller.html"; // Redirect after login
    }
}
