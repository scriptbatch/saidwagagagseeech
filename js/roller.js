// Load sounds
let rollSound = new Audio("sounds/roll.mp3");
let okSound = new Audio("sounds/ok.mp3");
let yaySound = new Audio("sounds/yay.mp3");
let ahhSound = new Audio("sounds/ahh.mp3");

// Function to play sound safely
function playSound(sound) {
    sound.currentTime = 0; // Reset to start
    sound.play().catch(error => console.log("Autoplay blocked:", error));
}

// Modify your spin function
function spin() {
    if (applePoints < 1) {
        alert("Not enough Apple Points!");
        return;
    }

    playSound(rollSound); // Play roll sound when spinning starts

    applePoints -= 1;
    updateApplePoints();

    let result;
    let chance = Math.random();
    
    if (chance < 0.6) result = 0;       // 60% chance for 0 (lose)
    else if (chance < 0.85) result = 1; // 25% chance for 1
    else if (chance < 0.95) result = 3; // 10% chance for 3
    else result = 5;                    // 5% chance for jackpot

    // Wait for roll animation before revealing result
    setTimeout(() => {
        alert(`You won ${result} apple points!`);

        if (result === 0) playSound(ahhSound);     // Loss sound
        else if (result === 1 || result === 3) playSound(okSound); // Small win
        else if (result === 5) playSound(yaySound); // Jackpot
       
        applePoints += result;
        updateApplePoints();
    }, 4000); // Delay matches the roll.mp3 (4 sec)
}

// Function to update Apple Points on screen and save them
function updateApplePoints() {
    document.getElementById("applePoints").innerText = applePoints;
    setCookie("applePoints", applePoints, 7);
}
