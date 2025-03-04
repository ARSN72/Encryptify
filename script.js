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

// Generate a new cipher key
function generateKey() {
    key = chars.split("");
    key.sort(() => Math.random() - 0.5);
    localStorage.setItem("cipherKey", JSON.stringify(key));
    document.getElementById("currentKey").innerText = "Default Key";
}

// Real-time Encrypt Message
function realTimeEncrypt() {
    let plainText = document.getElementById("plainText").value;
    let cipherText = "";

    for (let letter of plainText) {
        let index = chars.indexOf(letter);
        cipherText += index !== -1 ? key[index] : letter;
    }

    document.getElementById("cipherText").value = cipherText;
}

// Real-time Decrypt Message
function realTimeDecrypt() {
    let cipherText = document.getElementById("decryptInput").value;
    let plainText = "";

    for (let letter of cipherText) {
        let index = key.indexOf(letter);
        plainText += index !== -1 ? chars[index] : letter;
    }

    document.getElementById("decryptedText").value = plainText;
}

// Copy text function
function copyToClipboard(id) {
    let text = document.getElementById(id).value;
    navigator.clipboard.writeText(text).then(() => {
        alert("Copied to clipboard!");
    });
}

// Download text function
function downloadText(id, filename) {
    let blob = new Blob([document.getElementById(id).value], { type: "text/plain" });
    let link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
}

// Download Cipher Key
function downloadCipherKey() {
    let blob = new Blob([JSON.stringify(key)], { type: "application/json" });
    let link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "cipher_key.json";
    link.click();
}

// Upload Custom Cipher Key
function uploadCipherKey() {
    let fileInput = document.getElementById("uploadKey");
    let file = fileInput.files[0];

    if (file) {
        let reader = new FileReader();
        reader.onload = function (event) {
            try {
                let uploadedKey = JSON.parse(event.target.result);
                if (Array.isArray(uploadedKey) && uploadedKey.length === chars.length) {
                    key = uploadedKey;
                    localStorage.setItem("cipherKey", JSON.stringify(key));
                    document.getElementById("currentKey").innerText = "Custom Key (Uploaded)";
                    alert("✅ Cipher Key successfully uploaded!");
                } else {
                    alert("⚠️ Invalid cipher key file!");
                }
            } catch (error) {
                alert("❌ Error: Invalid file format!");
            }
        };
        reader.readAsText(file);
    }
}

// Reset Cipher Key
function resetCipherKey() {
    let confirmReset = confirm("⚠️ Are you sure? This will reset the encryption key and old messages can't be decrypted!");
    if (confirmReset) {
        generateKey();
        alert("🔑 Cipher Key has been reset successfully!");
    }
}

// Reset Fields
function resetFields() {
    document.getElementById("plainText").value = "";
    document.getElementById("cipherText").value = "";
    document.getElementById("decryptInput").value = "";
    document.getElementById("decryptedText").value = "";
}

// Attach real-time encryption & decryption
document.getElementById("plainText").addEventListener("input", realTimeEncrypt);
document.getElementById("decryptInput").addEventListener("input", realTimeDecrypt);

// Load Key on Start
loadKey();
