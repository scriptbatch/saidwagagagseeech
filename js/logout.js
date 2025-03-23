// Logout function
document.getElementById("logout-button").addEventListener("click", function () {
    document.cookie = "loggedInUser=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/"; // Clear cookie
    window.location.href = "login.html"; // Redirect to login page
});
