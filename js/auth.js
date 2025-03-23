// This function will be triggered when the user clicks the login button
function login() {
    // Retrieve username and password values from the input fields
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // For testing purposes, let's use hardcoded credentials (for example)
    const validUsername = "user";
    const validPassword = "password123";

    // If credentials match, display a success message
    if (username === validUsername && password === validPassword) {
        alert("Login Successful!");
        // Optionally, you could redirect to another page after successful login
        window.location.href = "roller.html"; // This would redirect to roller page (if needed)
    } else {
        // If credentials are incorrect, display an error message
        alert("Invalid Username or Password!");
    }
}

