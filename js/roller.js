document.addEventListener("DOMContentLoaded", function () {
    let user = localStorage.getItem("loggedInUser");
    if (!user) {
        window.location.href = "login.html"; // Redirect if not logged in
    }

    let applePoints = parseInt(localStorage.getItem(`applePoints_${user}`)) || 10;
    document.getElementById("applePoints").innerText = applePoints;

    const rollButton = document.getElementById("rollButton");
    const rollingText = document.getElementById("rollingText");
    const resultMessage = document.getElementById("resultMessage");

    // Sounds
    const rollingSound = document.getElementById("rollingSound");
    const okSound = document.getElementById("okSound");
    const yaySound = document.getElementById("yaySound");

    rollButton.addEventListener("click", function () {
        if (applePoints < 1) {
            resultMessage.innerText = "❌ Not enough Apple Points!";
            return;
        }

        applePoints--; // Deduct 1 Apple Point
        document.getElementById("applePoints").innerText = applePoints;
        localStorage.setItem(`applePoints_${user}`, applePoints);

        rollingSound.play();

        const results = ["0 Apple Points", "1 Apple Point", "JACKPOT (5 Apple Points)", "3 Apple Points"];
        let count = 0;

        const interval = setInterval(() => {
            rollingText.innerText = results[Math.floor(Math.random() * results.length)];
            count++;
            if (count > 10) {
                clearInterval(interval);
                finishRoll();
            }
        }, 300);

        function finishRoll() {
            let random = Math.random();
            let wonPoints = 0;

            if (random < 0.6) {
                wonPoints = 0;
            } else if (random < 0.85) {
                wonPoints = 1;
                okSound.play();
            } else if (random < 0.95) {
                wonPoints = 3;
                okSound.play();
            } else {
                wonPoints = 5;
                yaySound.play();
            }

            applePoints += wonPoints;
            document.getElementById("applePoints").innerText = applePoints;
            rollingText.innerText = `🎉 You won ${wonPoints} Apple Points!`;
            localStorage.setItem(`applePoints_${user}`, applePoints);
        }
    });
});
