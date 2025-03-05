const chars = " " + "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~" + "0123456789" + "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
let key = [];

// Load or generate key
function loadKey() {
    const storedKey = localStorage.getItem("cipherKey");
    if (storedKey) {
        key = JSON.parse(storedKey);
        document.getElementById("currentKey").innerText = "Custom Key (Loaded)";
    } else {
        generateKey();
    }
}

// Generate new key
function generateKey() {
    key = chars.split("");
    key.sort(() => Math.random() - 0.5);
    localStorage.setItem("cipherKey", JSON.stringify(key));
    document.getElementById("currentKey").innerText = "Default Key";
}

// Upload Cipher Key
function uploadCipherKey() {
    const file = document.getElementById("uploadKey").files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            try {
                key = JSON.parse(event.target.result);
                localStorage.setItem("cipherKey", JSON.stringify(key));
                document.getElementById("currentKey").innerText = "Custom Key (Uploaded)";
                alert("Cipher Key Uploaded Successfully!");
            } catch (error) {
                alert("Invalid Cipher Key file! Please upload a valid key.");
            }
        };
        reader.readAsText(file);
    }
}

// Download Cipher Key
function downloadCipherKey() {
    let blob = new Blob([JSON.stringify(key)], { type: "application/json" });
    let link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "cipher_key.json";
    link.click();
}

// Reset Cipher Key with Confirmation
function resetCipherKey() {
    if (confirm("⚠️ Are you sure? This will reset the encryption key and old messages can't be decrypted!")) {
        generateKey();
        alert("Cipher Key has been reset successfully & New encryption key generated!!");
    }
}

// Real-time Encrypt
function realTimeEncrypt() {
    let plainText = document.getElementById("plainText").value;
    document.getElementById("cipherText").value = [...plainText].map(letter => key[chars.indexOf(letter)] || letter).join("");
}

// Real-time Decrypt
function realTimeDecrypt() {
    let cipherText = document.getElementById("decryptInput").value;
    document.getElementById("decryptedText").value = [...cipherText].map(letter => chars[key.indexOf(letter)] || letter).join("");
}

// Reset Fields
function resetFields() {
    document.getElementById("plainText").value = "";
    document.getElementById("cipherText").value = "";
    document.getElementById("decryptInput").value = "";
    document.getElementById("decryptedText").value = "";
}

// Copy to Clipboard
function copyToClipboard(id) {
    let text = document.getElementById(id);
    text.select();
    document.execCommand("copy");
    alert("Copied to clipboard!");
}

// Paste from Clipboard
function pasteText(id) {
    navigator.clipboard.readText()
        .then(text => {
            document.getElementById(id).value = text;
        })
        .catch(err => {
            alert("Failed to paste! Clipboard permission required.");
        });
}

// Function to download Encrypted/Decrypted text as a file
function downloadText(id, fileName) {
    let text = document.getElementById(id).value;
    if (text.trim() === "") {
        alert("Nothing to download! Please enter text first.");
        return;
    }
    
    let blob = new Blob([text], { type: "text/plain" });
    let link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
}


// Get IPv4 Address
fetch('https://api.ipify.org?format=json')
    .then(response => response.json())
    .then(data => document.getElementById("user-ip").innerText = "Your IP is: " + data.ip);

loadKey();

// Function to update and display the visit count
function updatePageVisits() {
    let visits = localStorage.getItem("pageVisits");
    if (visits === null) {
        visits = 1;
    } else {
        visits = parseInt(visits) + 1;
    }
    localStorage.setItem("pageVisits", visits);
    document.getElementById("visit-counter").innerText = "Page Visits: " + visits;
}

// Run the function when the page loads
updatePageVisits();

