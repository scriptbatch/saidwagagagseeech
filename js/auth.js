function login() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    // Check if it's the admin account
    if (username === "salamiowner" && password === "SlaMMi13#@*SALSa)(") {
        setCookie("loggedInUser", username, 7); // Store for 7 days
        window.location.href = "admin.html"; // Redirect to admin panel
        return;
    }

    // Check if user exists in cookies
    let storedPassword = getCookie(username);
    if (!storedPassword) {
        alert("User does not exist!");
        return;
    }

    if (password !== storedPassword) {
        alert("Invalid password!");
        return;
    }

    // Store login session
    setCookie("loggedInUser", username, 7); // Keep user logged in for 7 days
    window.location.href = "roller.html"; // Redirect to roller page
}

// Function to set a cookie
function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

// Function to get a cookie
function getCookie(name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i].trim();
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

