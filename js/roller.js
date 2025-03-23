// Check if user is logged in
function getCookie(name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i].trim();
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

let username = getCookie("loggedInUser");
if (!username) {
    window.location.href = "login.html"; // Redirect if not logged in
}

let users = JSON.parse(localStorage.getItem("users")) || {};
let applePoints = users[username]?.applePoints || 0;

// Show Apple Points
document.getElementById("apple-points").innerText = `Apple Points: ${applePoints}`;

// Spin Function
document.getElementById("spin-button").addEventListener("click", function () {
    if (applePoints > 0) {
        applePoints--; // Deduct 1 point for spinning
        let winnings = Math.floor(Math.random() * 10); // Win between 0-10 points
        applePoints += winnings;

        // Update user data
        users[username].applePoints = applePoints;
        localStorage.setItem("users", JSON.stringify(users));

        // Update UI
        document.getElementById("apple-points").innerText = `Apple Points: ${applePoints}`;
        alert(`You won ${winnings} Apple Points!`);
    } else {
        alert("Not enough Apple Points! Earn more to spin.");
    }
});
