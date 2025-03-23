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

// Get user data from localStorage
let users = JSON.parse(localStorage.getItem("users")) || {};
if (!users[username]) {
    users[username] = { password: "", applePoints: 10 }; // Default 10 Apple Points
    localStorage.setItem("users", JSON.stringify(users));
}

let applePoints = users[username].applePoints;

// Get elements
const applePointsDisplay = document.getElementById("apple-points");
const resultMessage = document.getElementById("result-message");
const slotMachine = document.getElementById("slot-machine");
const spinButton = document.getElementById("spin-button");

// Audio Elements
const loseSound = document.getElementById("lose-sound"); // ahh.mp3
const winSound = document.getElementById("win-sound"); // yay.mp3
const okSound = document.getElementById("ok-sound"); // ok.mp3
const rollSound = document.getElementById("roll-sound"); // roll.mp3

// Update Apple Points Display
function updateApplePoints() {
    applePointsDisplay.innerText = `Apple Points: ${applePoints}`;
}

// Set initial Apple Points display
updateApplePoints();

// Prize Distribution (Fixed)
const prizes = [
    { text: "0 Apple Points", value: 0, chance: 0.60 }, // 60%
    { text: "1 Apple Point", value: 1, chance: 0.25 },  // 25%
    { text: "3 Apple Points", value: 3, chance: 0.14 }, // 14%
    { text: "🎉 JACKPOT! 5 Apple Points 🎉", value: 5, chance: 0.01 } // 1%
];

// Function to pick a prize based on probability
function getRandomPrize() {
    let random = Math.random();
    let cumulative = 0;

    for (let prize of prizes) {
        cumulative += prize.chance;
        if (random <= cumulative) {
            return prize;
        }
    }
    return prizes[0]; // Default to 0 Apple Points
}

// Spin Button Logic
spinButton.addEventListener("click", function () {
    if (applePoints > 0) {
        applePoints--; // Deduct 1 point for spinning
        updateApplePoints();

        // Play rolling sound (force it to stop after 4 seconds)
        rollSound.currentTime = 0;
        rollSound.play();
        setTimeout(() => rollSound.pause(), 4000);

        // Fake rolling text animation
        let rollingTexts = ["1 Apple Point", "0 Apple Points", "🎉 JACKPOT! 5 Apple Points 🎉", "3 Apple Points"];
        let rollIndex = 0;

        resultMessage.innerText = "Spinning... 🎰";
        slotMachine.style.minHeight = "50px"; // Prevents page jumping
        slotMachine.innerText = rollingTexts[rollIndex];

        let rollInterval = setInterval(() => {
            rollIndex = (rollIndex + 1) % rollingTexts.length;
            slotMachine.innerText = rollingTexts[rollIndex];
        }, 100); // Fast cycle animation

        setTimeout(() => {
            clearInterval(rollInterval); // Stop the rolling animation

            // Get actual prize
            let prize = getRandomPrize();

            // **🔧 FIX: If broke, guarantee at least 1 Apple Point**
            if (applePoints === 0 && prize.value === 0) {
                prize = { text: "1 Apple Point (Safety Net)", value: 1 }; // Always give 1 point
            }

            slotMachine.innerText = prize.text;
            resultMessage.innerText = `You won ${prize.text}!`;

            applePoints += prize.value;
            updateApplePoints();

            // Play Sounds Based on Result
            if (prize.value === 0) {
                loseSound.play(); // "Ahh" sound when losing
            } else if (prize.value === 1 || prize.value === 3) {
                okSound.play(); // "OK" sound for winning 1 or 3 Apple Points
            } else if (prize.value === 5) {
                winSound.play(); // "Yay" sound for jackpot
            }

            // Save new apple points to localStorage
            users[username].applePoints = applePoints;
            localStorage.setItem("users", JSON.stringify(users));

        }, 4000); // Delay for 4 sec (same as roll.mp3)
    } else {
        resultMessage.innerText = "Not enough Apple Points!";
    }
});
