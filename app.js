/**
 * Wordle App - Main Application Logic
 * DO NOT MODIFY THIS FILE
 *
 * This file handles the game UI and user interactions.
 * It uses the variables from numbers.js, my-game.js, and messages.js.
 */

const WORD_LENGTH = 5;

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
    // Set the page title and header from my-game.js
    document.title = GAME_TITLE;
    document.querySelector("h1").textContent = GAME_TITLE;

    // Use the secret word from my-game.js (lowercase so case never matters)
    secretWord = SECRET_WORD.toLowerCase();

    // Make sure the secret word is always guessable, even if it's
    // not in the standard word list (e.g. a name like "kevin")
    VALID_GUESSES.add(secretWord);

    // Get DOM elements
    messageEl = document.getElementById("message");
    messageEl.textContent = READY_MESSAGE;

    // Set new game button text
    const btn = document.getElementById("new-game-btn");
    if (btn) btn.textContent = NEW_GAME_BUTTON_TEXT;

    // Build the board dynamically based on MAX_GUESSES
    const board = document.querySelector(".board");
    board.innerHTML = "";
    tiles = [];
    for (let r = 0; r < MAX_GUESSES; r++) {
        const row = document.createElement("div");
        row.classList.add("row");
        const rowTiles = [];
        for (let c = 0; c < WORD_LENGTH; c++) {
            const tile = document.createElement("div");
            tile.classList.add("tile");
            row.appendChild(tile);
            rowTiles.push(tile);
        }
        board.appendChild(row);
        tiles.push(rowTiles);
    }

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
 * Check if the guess is a valid English word
 */
function isValidWord(guess) {
    return VALID_GUESSES.has(guess);
}

/**
 * Compare the guess to the secret word and return feedback.
 * Returns an array of 5 strings: "correct", "misplaced", or "wrong"
 */
function checkGuess(guess, secret) {
    const result = ["wrong", "wrong", "wrong", "wrong", "wrong"];
    const remaining = secret.split("");

    // Pass 1: find correct (green) matches
    for (let i = 0; i < WORD_LENGTH; i++) {
        if (guess[i] === secret[i]) {
            result[i] = "correct";
            remaining[i] = null;
        }
    }

    // Pass 2: find misplaced (yellow) matches
    for (let i = 0; i < WORD_LENGTH; i++) {
        if (result[i] === "correct") continue;
        const idx = remaining.indexOf(guess[i]);
        if (idx !== -1) {
            result[i] = "misplaced";
            remaining[idx] = null;
        }
    }

    return result;
}

/**
 * Submit the current guess
 */
function submitGuess() {
    if (gameOver) return;

    const guess = getCurrentGuess();

    // Check if guess is long enough
    if (guess.length !== WORD_LENGTH) {
        showMessage(MESSAGE_SHORT_WORD);
        shakeRow();
        return;
    }

    // Check if guess is a valid word
    if (!isValidWord(guess)) {
        showMessage(MESSAGE_INVALID_WORD);
        shakeRow();
        return;
    }

    // Get feedback for the guess
    const feedback = checkGuess(guess, secretWord);

    // Reveal the feedback with animation
    revealFeedback(feedback);

    // Check for win
    if (guess === secretWord) {
        gameOver = true;
        setTimeout(() => {
            showMessage(WIN_MESSAGE);
            bounceRow();
        }, WORD_LENGTH * 300 + 100);
        return;
    }

    // Move to next row
    currentRow++;
    currentCol = 0;

    // Check for loss
    if (currentRow >= MAX_GUESSES) {
        gameOver = true;
        setTimeout(() => {
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

/**
 * Reset the game state and board
 */
function resetGame() {
    currentRow = 0;
    currentCol = 0;
    gameOver = false;
    secretWord = SECRET_WORD.toLowerCase();

    // Rebuild the board
    const board = document.querySelector(".board");
    board.innerHTML = "";
    tiles = [];
    for (let r = 0; r < MAX_GUESSES; r++) {
        const row = document.createElement("div");
        row.classList.add("row");
        const rowTiles = [];
        for (let c = 0; c < WORD_LENGTH; c++) {
            const tile = document.createElement("div");
            tile.classList.add("tile");
            row.appendChild(tile);
            rowTiles.push(tile);
        }
        board.appendChild(row);
        tiles.push(rowTiles);
    }

    // Clear keyboard colors
    Object.values(keys).forEach((key) => {
        key.classList.remove("correct", "misplaced", "wrong");
    });

    // Restore ready message
    if (messageEl) messageEl.textContent = READY_MESSAGE;
}

// Add shake and bounce animation CSS
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
