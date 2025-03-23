function checkAdmin() {
    const password = document.getElementById("adminPassword").value;
    if (password === "SlaMMi13#@*SALSa)(") {
        document.getElementById("adminSection").style.display = "block";
    } else {
        alert("❌ Incorrect password!");
    }
}

function givePoints() {
    let user = document.getElementById("username").value;
    let points = parseInt(document.getElementById("points").value);

    if (!user || isNaN(points) || points <= 0) {
        document.getElementById("adminMessage").innerText = "❌ Invalid input!";
        return;
    }

    // Update Apple Points
    let applePoints = parseInt(localStorage.getItem("applePoints")) || 0;
    applePoints += points;
    localStorage.setItem("applePoints", applePoints);
    
    document.getElementById("adminMessage").innerText = `✅ Added ${points} Apple Points to ${user}!`;
}

