function sendGameData() {
    const webhookURL = "https://discord.com/api/webhooks/1354113624779653171/OfYLRJqWClMOH3ibyud_ozp3HdfjhaF4kJRPucLa3JnVSZQtvPOg6r-CldxnxxJXCsJE"; // Replace with your webhook

    const data = {
        username: discordUsername,
        score: highestScore.toFixed(2)
    };

    console.log('Sending data to Discord:', data);

    // Construct the payload for Discord
    const payload = {
        content: `🚀 **Crash Game Score Submission** 🚀\n👤 **User:** ${data.username}\n🔥 **Highest Multiplier:** ${data.score}x`
    };

    // Send data to the Discord webhook
    fetch(webhookURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
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

    // Update the UI
    document.getElementById('user-score').innerText = data.username;
    document.getElementById('score').innerText = data.score + 'x';
}
