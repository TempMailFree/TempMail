// Get elements
const premiumButton = document.getElementById('premiumButton');
const premiumModal = document.getElementById('premiumModal');
const closePremium = document.getElementById('closePremium');
const buyPremium = document.getElementById('buyPremium');
const usernameModal = document.getElementById('usernameModal');
const closeUsername = document.getElementById('closeUsername');
const discordUsernameInput = document.getElementById('discordUsername');
const confirmPurchase = document.getElementById('confirmPurchase');
const confirmationMessage = document.getElementById('confirmationMessage');

// Open and close the Premium modal
premiumButton.onclick = function() {
    premiumModal.style.display = "block";
};

closePremium.onclick = function() {
    premiumModal.style.display = "none";
};

window.onclick = function(event) {
    if (event.target === premiumModal) {
        premiumModal.style.display = "none";
    }
};

// Open username input after buying Premium
buyPremium.onclick = function() {
    premiumModal.style.display = "none";
    usernameModal.style.display = "block";
};

// Close the username input modal
closeUsername.onclick = function() {
    usernameModal.style.display = "none";
};

window.onclick = function(event) {
    if (event.target === usernameModal) {
        usernameModal.style.display = "none";
    }
};

// Confirm purchase and send data to webhook
confirmPurchase.onclick = function() {
    const discordUsername = discordUsernameInput.value.trim();

    if (!discordUsername) {
        alert("Please enter a valid Discord username.");
        return;
    }

    // Send the data to the webhook
    const webhookURL = 'https://discord.com/api/webhooks/1345202066812833844/OSrgaQ_sl_VKxRByn75KMU5QIuCbEEOksSCv2Tomss1XfiYps3HmosbGrtfGVrVxFF9G'; // Replace with your webhook URL
    const payload = {
        username: discordUsername,
        itemPurchased: "Premium Package",
    };

    fetch(webhookURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            embeds: [{
                title: "New Premium Purchase",
                fields: [
                    {
                        name: "Discord Username",
                        value: discordUsername,
                        inline: true
                    },
                    {
                        name: "Item Purchased",
                        value: "Premium Package",
                        inline: true
                    }
                ],
                color: 3447003,  // Blue color
            }]
        })
    })
    .then(() => {
        confirmationMessage.style.display = "block";
        usernameModal.style.display = "none";
    })
    .catch(error => {
        console.error('Error sending:', error);
        alert('Something went wrong. Please try again later.');
    });
};
