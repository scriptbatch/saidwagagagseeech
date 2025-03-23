function logout() {
    localStorage.removeItem("loggedInUser");  // Remove login info
    window.location.href = "login.html"; // Redirect to login page
}
