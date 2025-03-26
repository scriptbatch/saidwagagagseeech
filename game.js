let gameStarted = false;
let currentMultiplier = 1;
let highestScore = 1;
let discordUsername = "";
let gameInterval;
let crashPoint = getRandomCrashPoint(); // Generate first crash point

// Replace this with your actual message link (must match exactly)
const allowedReferrer = "https://discord.com/channels/1353750739717062706/1353762400955924500/1353764997024579659"; 

// Check where the user came from
if (document.referrer !== allowedReferrer) {
    alert("🚫 Access Denied! You must visit from the correct link.");
    window.location.href = "https://google.com"; // Redirect them away (change if needed)
}

// Function to generate a random crash point in the set ranges
function getRandomCrashPoint() {
    let ranges = [
        Math.random() * (5 - 4) + 4, // Crash between 4x and 5x
        Math.random() * (7 - 6) + 6  // Crash between 6x and 7x
    ];
    return ranges[Math.floor(Math.random() * ranges.length)]; // Pick one of the two ranges
}
function increaseMultiplier() {
    if (gameStarted) {
        currentMultiplier += 0.01;
        document.getElementById('multiplier').innerText = currentMultiplier.toFixed(2) + 'x';

        // Crash when reaching the randomly chosen crash point
        if (currentMultiplier >= crashPoint) {
            crashGame();
        }
    }
}

// Start the game after entering Discord username
function startGame() {
    discordUsername = document.getElementById('discord-username').value.trim();

    if (discordUsername === '') {
        alert('Please enter your Discord username.');
        return;
    }

    document.querySelector('h1').style.display = 'none';
    document.querySelector('input').style.display = 'none';
    document.querySelector('button').style.display = 'none';
    document.getElementById('game-container').style.display = 'block';

    currentMultiplier = 1;
    gameStarted = true;

    crashPoint = getRandomCrashPoint(); // Generate a new crash point
    console.log("💥 Next Crash Point:", crashPoint.toFixed(2) + "x");

    // 🎵 Play background music
    let music = document.getElementById('background-music');
    music.volume = 0.5; // Set volume (0.0 to 1.0)
    music.play().catch(error => console.log("🎵 Audio playback error:", error));

    gameInterval = setInterval(increaseMultiplier, 100);
   }

// Cash out before crash
function cashOut() {
    if (!gameStarted) return;

    clearInterval(gameInterval);
    gameStarted = false;
    
    alert("✅ Cashed out at " + currentMultiplier.toFixed(2) + "x!");

    // Save highest score if new record
    if (currentMultiplier > highestScore) {
        highestScore = currentMultiplier;
    }

    document.getElementById('highest-score').innerText = highestScore.toFixed(2) + 'x';
    sendGameData();
}

// Crash logic (lose everything)
function crashGame() {
    clearInterval(gameInterval);
    gameStarted = false;

    alert("💥 CRASHED at " + currentMultiplier.toFixed(2) + "x! You lost everything!");

    // Reset the highest score to 0.00 if the player crashes
    highestScore = 0; 
    document.getElementById('highest-score').innerText = highestScore.toFixed(2) + 'x';

    // Reset multiplier
    currentMultiplier = 0;  
    sendGameData();
}


// Send data to your webhook (modify with your webhook URL)
function sendGameData() {
    let webhookURL = "https://discord.com/api/webhooks/1354113624779653171/OfYLRJqWClMOH3ibyud_ozp3HdfjhaF4kJRPucLa3JnVSZQtvPOg6r-CldxnxxJXCsJE"; // Replace with your webhook

    let data = {
        username: "Crash Game Bot",
        content: `🚀 **${discordUsername}** played Crash!\n🎰 **Highest Multiplier:** ${highestScore.toFixed(2)}x`
    };

    fetch(webhookURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => console.log("✅ Data sent to Discord!"))
    .catch(error => console.error("❌ Error sending data:", error));
}
