document.getElementById("rollButton").addEventListener("click", function () {
    // Play rolling sound
    let rollSound = new Audio("sounds/roll.mp3");
    rollSound.play().catch(error => console.log("Autoplay blocked:", error));

    // Disable button while rolling
    let rollButton = document.getElementById("rollButton");
    rollButton.disabled = true;

    // Rolling animation duration (4 seconds to match roll.mp3)
    setTimeout(() => {
        let result = roll();
        let applePoints = parseInt(localStorage.getItem("applePoints") || "10");

        if (applePoints > 0) {
            applePoints--; // Deduct spin cost

            if (result === 1 || result === 3) {
                applePoints += result;
                let okSound = new Audio("sounds/ok.mp3");
                okSound.play();
            } else if (result === 5) {
                applePoints += result;
                let yaySound = new Audio("sounds/yay.mp3");
                yaySound.play();
            }

            localStorage.setItem("applePoints", applePoints);
            document.getElementById("applePoints").innerText = applePoints;
        }

        // Re-enable button after rolling
        rollButton.disabled = false;
    }, 4000); // Wait for roll.mp3 to finish before showing result
});

// Function to determine the roll result
function roll() {
    let chance = Math.random();
    if (chance < 0.60) return 0; // 60% chance to get nothing
    if (chance < 0.85) return 1; // 25% chance to get 1 apple point
    if (chance < 0.95) return 3; // 10% chance to get 3 apple points
    return 5; // 5% chance for jackpot
}

// Load Apple Points on page load
document.addEventListener("DOMContentLoaded", function () {
    let applePoints = parseInt(localStorage.getItem("applePoints") || "10");
    document.getElementById("applePoints").innerText = applePoints;
});
