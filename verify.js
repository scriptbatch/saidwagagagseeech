const GAMEPASS_ID = "13600173502";

async function verifyAccess() {
    const userId = document.getElementById("userId").value;
    if (!userId) {
        document.getElementById("message").innerText = "Please enter your Roblox ID.";
        return;
    }

    const response = await fetch(`https://inventory.roblox.com/v1/users/${userId}/items/GamePass/${GAMEPASS_ID}`);
    const data = await response.json();

    if (data.data && data.data.length > 0) {
        window.location.href = "game.html";  // Redirect to the game
    } else {
        document.getElementById("message").innerText = "You do not own the Gamepass.";
    }
}

