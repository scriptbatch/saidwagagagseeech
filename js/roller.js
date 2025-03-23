// Function to get cookies
function getCookie(name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i].trim();
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

// Get logged-in username
let username = getCookie("loggedInUser");
if (!username) {
    window.location.href = "login.html"; // Redirect if not logged in
}

let users = JSON.parse(localStorage.getItem("users")) || {};

// Ensure user has an account
if (!users[username]) {
    users[username] = { password: "", applePoints: 10 }; // Default 10 Apple Points
    localStorage.setItem("users", JSON.stringify(users));
}

let applePoints = users[username].applePoints;

// Get elements
const applePointsDisplay = document.getElementById("apple-points");
const resultMessage = document.getElementById("result-message");
const slotMachine = document.getElementById("slot-machine");
const loseSound = document.getElementById("lose-sound");
const winSound = document.getElementById("win-sound");

// Update Apple Points Display
function updateApplePoints() {
    applePointsDisplay.innerText = `Apple Points: ${applePoints}`;
}

// Set initial Apple Points display
updateApplePoints();

// Spin Button Logic
document.getElementById("spin-button").addEventListener("click", function () {
    if (applePoints > 0) {
        applePoints--; // Deduct 1 point for spinning
        
        // Rolling animation
        slotMachine.innerText = "🔄🔄🔄"; // Show spinning effect
        resultMessage.innerText = "Spinning... 🎰";
        
        setTimeout(() => {
            // Random chance for rewards
            let chance = Math.random(); // Generates a number between 0 and 1
            let winnings = 0;

            if (chance < 0.05) {
                winnings = 5; // Jackpot (5%)
                slotMachine.innerText = "🎉🎉🎉"; // Jackpot Animation
                resultMessage.innerText = "JACKPOT! 🎉 You won 5 Apple Points!";
                winSound.play(); // Play "Yay" Sound
            } else if (chance < 0.15) {
                winnings = 3; // Small Bonus (10%)
                slotMachine.innerText = "🍏🍏🍏"; // Apple Points Animation
                resultMessage.innerText = "You won 3 Apple Points!";
            } else if (chance < 0.35) {
                winnings = 1; // Normal Win (20%)
                slotMachine.innerText = "🍏🔄🔄"; 
                resultMessage.innerText = "You won 1 Apple Point!";
            } else {
                winnings = 0; // Most Common Outcome (65%)
                slotMachine.innerText = "❌❌❌"; // Losing Animation
                resultMessage.innerText = "You won 0 Apple Points... 😭";
                loseSound.play(); // Play "Ahh" Sound
            }

            applePoints += winnings;

            // Prevent the user from going broke
            if (applePoints <= 0) {
                applePoints = 1; // Give them 1 free Apple Point
                resultMessage.innerText = "You went broke! Here’s 1 free Apple Point to keep playing.";
            }

            // Update user data
            users[username].applePoints = applePoints;
            localStorage.setItem("users", JSON.stringify(users));

            // Update UI
            updateApplePoints();
        }, 2000); // Delay to simulate rolling effect
    }
});
