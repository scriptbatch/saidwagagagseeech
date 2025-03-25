// Ensure functions are globally available
window.startGame = startGame;
window.cashOut = cashOut;

let discordUsername = '';
let highestScore = 0;
let gameInterval;
let currentMultiplier = 1;
let gameStarted = false;
const webhookURL = "https://discord.com/api/webhooks/1354113624779653171/OfYLRJqWClMOH3ibyud_ozp3HdfjhaF4kJRPucLa3JnVSZQtvPOg6r-CldxnxxJXCsJE"; // Replace with your actual Discord webhook URL

// Start the game
function startGame() {
    discordUsername = document.getElementById('discord-username').value.trim();

    if (discordUsername === '') {
        alert('Please enter your Discord username.');
        return;
    }

    // Hide input fields and show the game
    document.querySelector('h1').style.display = 'none';
    document.querySelector('input').style.display = 'none';
    document.querySelector('button').style.display = 'none';
    
    document.getElementById('game-container').style.display = 'block';
    document.getElementById('highest-score').innerText = highestScore.toFixed(2) + 'x';

    currentMultiplier = 1;
    gameStarted = true;

    // Start the multiplier increase
    gameInterval = setInterval(increaseMultiplier, 100);
}

// Increase the multiplier
function increaseMultiplier() {
    if (gameStarted) {
        currentMultiplier += 0.01;
        document.getElementById('multiplier').innerText = currentMultiplier.toFixed(2) + 'x';
        
        // Randomly crash (1% chance per tick)
        if (Math.random() < 0.01) {
            crashGame();
        }
    }
}

// Cash out the player before crashing
function cashOut() {
    if (!gameStarted) return;
    
    clearInterval(gameInterval);
    gameStarted = false;
    
    if (currentMultiplier > highestScore) {
        highestScore = currentMultiplier;
    }
    
    document.getElementById('highest-score').innerText = highestScore.toFixed(2) + 'x';
    
    sendGameData();
}

// Crash the game
function crashGame() {
    clearInterval(gameInterval);
    gameStarted = false;

    alert("💥 CRASHED at " + currentMultiplier.toFixed(2) + "x! You lost everything!");

    // Do NOT update the highest score if the game crashes before cashing out
    currentMultiplier = 1;

    sendGameData();
}

// Send game data to Discord webhook
function sendGameData() {
    const data = {
        username: discordUsername,
        score: highestScore.toFixed(2)
    };

    console.log('Sending data to Discord:', data);

    const payload = {
        content: `🚀 **Crash Game Score Submission** 🚀\n👤 **User:** ${data.username}\n🔥 **Highest Multiplier:** ${data.score}x`
    };

    fetch(webhookURL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })
    .then(response => {
        if (response.ok) {
            console.log('Score successfully sent to Discord.');
        } else {
            console.error('Failed to send score:', response.statusText);
        }
    })
    .catch(error => console.error('Error sending score:', error));

    // Update UI
    document.getElementById('user-score').innerText = data.username;
    document.getElementById('score').innerText = data.score + 'x';
}

