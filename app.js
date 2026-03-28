/**
 * Wordle App - Main Application Logic
 * DO NOT MODIFY THIS FILE
 *
 * This file handles the game UI and user interactions.
 * It uses the functions from game.js to check guesses.
 */

// Game constants
const WORD_LENGTH = 5;
const MAX_GUESSES = 6;

// Game state
let currentRow = 0;
let currentCol = 0;
let gameOver = false;
let secretWord = "";

// DOM Elements (will be set after page loads)
let tiles = [];
let keys = {};
let messageEl = null;

/**
 * Initialize the game when the page loads
 */
function initGame() {
    // Pick a random secret word
    secretWord = SOLUTIONS[Math.floor(Math.random() * SOLUTIONS.length)];
    console.log("Secret word:", secretWord); // For debugging

    // Get DOM elements
    messageEl = document.getElementById("message");

    // Get all tiles (6 rows x 5 tiles)
    const rows = document.querySelectorAll(".row");
    tiles = [];
    rows.forEach((row) => {
        const rowTiles = row.querySelectorAll(".tile");
        tiles.push(Array.from(rowTiles));
    });

    // Get keyboard keys
    const keyButtons = document.querySelectorAll(".key");
    keys = {};
    keyButtons.forEach((key) => {
        const letter = key.textContent.trim().toLowerCase();
        if (letter) {
            keys[letter] = key;
        }
    });

    // Set up keyboard listeners
    document.addEventListener("keydown", handleKeyPress);

    // Set up virtual keyboard clicks
    keyButtons.forEach((key) => {
        key.addEventListener("click", () => {
            const letter = key.textContent.trim();
            if (letter === "ENTER") {
                submitGuess();
            } else if (letter === "⌫") {
                deleteLetter();
            } else {
                addLetter(letter.toLowerCase());
            }
        });
    });
}

/**
 * Handle physical keyboard input
 */
function handleKeyPress(event) {
    if (gameOver) return;

    const key = event.key;

    if (key === "Enter") {
        submitGuess();
    } else if (key === "Backspace") {
        deleteLetter();
    } else if (/^[a-zA-Z]$/.test(key)) {
        addLetter(key.toLowerCase());
    }
}

/**
 * Add a letter to the current position
 */
function addLetter(letter) {
    if (gameOver) return;
    if (currentCol >= WORD_LENGTH) return;
    if (!tiles[currentRow] || !tiles[currentRow][currentCol]) return;

    const tile = tiles[currentRow][currentCol];
    tile.textContent = letter.toUpperCase();
    tile.classList.add("filled");
    currentCol++;
}

/**
 * Delete the last letter
 */
function deleteLetter() {
    if (gameOver) return;
    if (currentCol <= 0) return;

    currentCol--;
    const tile = tiles[currentRow][currentCol];
    tile.textContent = "";
    tile.classList.remove("filled");
}

/**
 * Get the current guess from the tiles
 */
function getCurrentGuess() {
    if (!tiles[currentRow]) return "";

    let guess = "";
    for (let i = 0; i < WORD_LENGTH; i++) {
        const tile = tiles[currentRow][i];
        guess += (tile.textContent || "").toLowerCase();
    }
    return guess;
}

/**
 * Submit the current guess
 */
function submitGuess() {
    if (gameOver) return;

    const guess = getCurrentGuess();

    // Check if guess is 5 letters
    if (!isFiveLetters(guess)) {
        showMessage("Not enough letters");
        shakeRow();
        return;
    }

    // Check if guess is a valid word
    if (!isValidWord(guess, VALID_GUESSES)) {
        showMessage("Not in word list");
        shakeRow();
        return;
    }

    // Get feedback for the guess
    const feedback = checkGuess(guess, secretWord);

    // Reveal the feedback with animation
    revealFeedback(feedback);

    // Check for win
    if (isWinner(guess, secretWord)) {
        setTimeout(() => {
            gameOver = true;
            showMessage("Excellent! 🎉");
            bounceRow();
        }, WORD_LENGTH * 300 + 100);
        return;
    }

    // Move to next row
    currentRow++;
    currentCol = 0;

    // Check for loss
    if (currentRow >= MAX_GUESSES) {
        setTimeout(() => {
            gameOver = true;
            showMessage(`The word was: ${secretWord.toUpperCase()}`);
        }, WORD_LENGTH * 300 + 100);
    }
}

/**
 * Reveal the feedback with flip animation
 */
function revealFeedback(feedback) {
    const row = tiles[currentRow];

    feedback.forEach((result, i) => {
        setTimeout(() => {
            const tile = row[i];
            tile.classList.add(result);

            // Also update keyboard key color
            const letter = tile.textContent.toLowerCase();
            const key = keys[letter];
            if (key) {
                // Only upgrade colors: wrong -> misplaced -> correct
                if (result === "correct") {
                    key.classList.remove("misplaced", "wrong");
                    key.classList.add("correct");
                } else if (result === "misplaced" && !key.classList.contains("correct")) {
                    key.classList.remove("wrong");
                    key.classList.add("misplaced");
                } else if (result === "wrong" && !key.classList.contains("correct") && !key.classList.contains("misplaced")) {
                    key.classList.add("wrong");
                }
            }
        }, i * 300);
    });
}

/**
 * Show a message to the user
 */
function showMessage(text) {
    if (!messageEl) return;
    messageEl.textContent = text;
    setTimeout(() => {
        if (messageEl.textContent === text) {
            messageEl.textContent = "";
        }
    }, 2000);
}

/**
 * Shake the current row (invalid guess)
 */
function shakeRow() {
    const row = tiles[currentRow];
    if (!row) return;

    row.forEach((tile) => {
        tile.style.animation = "shake 0.5s";
        setTimeout(() => {
            tile.style.animation = "";
        }, 500);
    });
}

/**
 * Bounce the current row (winning animation)
 */
function bounceRow() {
    const row = tiles[currentRow];
    if (!row) return;

    row.forEach((tile, i) => {
        setTimeout(() => {
            tile.style.animation = "bounce 0.5s";
        }, i * 100);
    });
}

// Add shake animation CSS
const style = document.createElement("style");
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        20%, 60% { transform: translateX(-5px); }
        40%, 80% { transform: translateX(5px); }
    }
    @keyframes bounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-20px); }
    }
`;
document.head.appendChild(style);

// Start the game when the page loads
document.addEventListener("DOMContentLoaded", initGame);
