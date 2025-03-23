let applePoints = 10;  // Starting points

function spin() {
    // Play roll sound
    const rollSound = document.getElementById('rollSound');
    rollSound.play();

    setTimeout(() => {
        // Randomly determine the result of the spin
        let result = 0;
        const random = Math.random();

        if (random < 0.1) {
            result = 5; // Jackpot!
            const yaySound = document.getElementById('yaySound');
            yaySound.play();
        } else if (random < 0.3) {
            result = 3;
            const okSound = document.getElementById('okSound');
            okSound.play();
        } else if (random < 0.6) {
            result = 1;
            const okSound = document.getElementById('okSound');
            okSound.play();
        } else {
            result = 0;
            const ahhSound = document.getElementById('ahhSound');
            ahhSound.play();
        }

        // Check if the user has enough points to spin
        if (applePoints > 0) {
            applePoints -= 1;  // Subtract 1 point for the spin
            applePoints += result;  // Add result of spin
        }

        // Update the points display
        document.getElementById('points').textContent = `Apple Points: ${applePoints}`;

        // If you run out of points, disable the button
        if (applePoints <= 0) {
            alert("You are out of Apple Points!");
        }
    }, 4000); // Roll sound duration
}

