import random
import string
import json
import os

KEY_FILE = "cipher_key.json"

def generate_key():
    """Generate a substitution cipher key and save it to a file."""
    chars = " " + string.punctuation + string.digits + string.ascii_letters
    chars = list(chars)
    key = chars.copy()
    random.shuffle(key)

    with open(KEY_FILE, "w") as f:
        json.dump(key, f)

    return chars, key

def load_key():
    """Load the saved key if it exists, otherwise generate a new one."""
    if os.path.exists(KEY_FILE):
        with open(KEY_FILE, "r") as f:
            key = json.load(f)
        chars = " " + string.punctuation + string.digits + string.ascii_letters
        chars = list(chars)
        return chars, key
    else:
        return generate_key()

def encrypt_message(plain_text, chars, key):
    """Encrypts a message using the substitution cipher."""
    try:
        return "".join(key[chars.index(letter)] for letter in plain_text)
    except ValueError:
        print("Error: Unsupported characters in message!")
        return None

def decrypt_message(cipher_text, chars, key):
    """Decrypts a message using the stored substitution cipher key."""
    try:
        return "".join(chars[key.index(letter)] for letter in cipher_text)
    except ValueError:
        print("Error: Unsupported characters in message!")
        return None

def main():
    """User-friendly menu for encryption and decryption."""
    chars, key = load_key()
    
    while True:
        print("\n=== Substitution Cipher ===")
        print("1. Encrypt a Message")
        print("2. Decrypt a Message")
        print("3. Regenerate Key (WARNING: Old messages can't be decrypted!)")
        print("4. Exit")
        
        choice = input("Select an option: ")
        
        if choice == "1":
            plain_text = input("Enter a message to encrypt: ")
            cipher_text = encrypt_message(plain_text, chars, key)
            if cipher_text:
                print(f"Encrypted Message: {cipher_text}")

        elif choice == "2":
            cipher_text = input("Enter a message to decrypt: ")
            plain_text = decrypt_message(cipher_text, chars, key)
            if plain_text:
                print(f"Decrypted Message: {plain_text}")

        elif choice == "3":
            confirm = input("Are you sure? This will make old messages undecipherable! (yes/no): ")
            if confirm.lower() == "yes":
                chars, key = generate_key()
                print("New key generated successfully!")

        elif choice == "4":
            print("Exiting... Stay secure! 🔒")
            break

        else:
            print("Invalid option. Please try again.")

if __name__ == "__main__":
    main()
# The code snippet above is an implementation of a simple substitution cipher. 
# The key is generated randomly and saved to a file, and the user can choose to encrypt or decrypt messages using this key. 
# The key can also be regenerated, but this will render old messages undecipherable. 
# This code snippet demonstrates basic file I/O, string manipulation, and user input handling in Python. 
# It also showcases the use of functions for modularity and code organization. 
# The code snippet provides a user-friendly menu for interacting with the substitution cipher functionality. 
# Overall, this code snippet is a simple yet effective example of encryption and decryption in Python.