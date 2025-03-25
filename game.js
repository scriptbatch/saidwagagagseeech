
const webhookURL = "YOUR_WEBHOOK_URL_HERE";
let balance = 100;
let highestMultiplier = 1;
let gameActive = false;

function startCrashGame() {
    if (gameActive) return;
    gameActive = true;
    let multiplier = 1;
    const crashPoint = Math.random() * 10 + 1;

    const gameInterval = setInterval(() => {
        multiplier += 0.1;
        document.getElementById("multiplier").innerText = `Multiplier: ${multiplier.toFixed(2)}x`;

        if (multiplier >= crashPoint) {
            clearInterval(gameInterval);
            document.getElementById("multiplier").innerText = "Crashed!";
            gameActive = false;
            sendScoreToWebhook(highestMultiplier);
        }
    }, 100);
}

function cashOut() {
    if (!gameActive) return;
    let currentMultiplier = parseFloat(document.getElementById("multiplier").innerText.split(" ")[1]);
    balance += balance * (currentMultiplier - 1);
    highestMultiplier = Math.max(highestMultiplier, currentMultiplier);
    gameActive = false;
    document.getElementById("balance").innerText = `Balance: $${balance.toFixed(2)}`;
    sendScoreToWebhook(highestMultiplier);
}

function sendScoreToWebhook(score) {
    fetch(webhookURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: "Player", highestMultiplier: score })
    });
}
