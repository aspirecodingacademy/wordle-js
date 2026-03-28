/**
 * Wordle Game Logic - SOLUTION FILE
 *
 * This is the answer key. Don't share with students!
 */

/**
 * Check if the guess is exactly 5 letters long.
 */
function isFiveLetters(guess) {
    return guess.length === 5;
}

/**
 * Check if the guess is a valid English word.
 */
function isValidWord(guess, validWords) {
    return validWords.has(guess);
}

/**
 * Compare the guess to the secret word and return feedback.
 *
 * Uses two-pass algorithm to handle duplicate letters correctly:
 * - Pass 1: Mark all correct (green) matches first
 * - Pass 2: Mark misplaced (yellow) only for remaining unmatched letters
 */
function checkGuess(guess, secretWord) {
    const result = ["wrong", "wrong", "wrong", "wrong", "wrong"];
    const secretRemaining = secretWord.split("");

    // Pass 1: Find all correct (green) matches first
    for (let i = 0; i < 5; i++) {
        if (guess[i] === secretWord[i]) {
            result[i] = "correct";
            secretRemaining[i] = null; // Mark as consumed
        }
    }

    // Pass 2: Find misplaced (yellow) matches from remaining letters
    for (let i = 0; i < 5; i++) {
        if (result[i] === "correct") {
            continue; // Skip already matched positions
        }
        const index = secretRemaining.indexOf(guess[i]);
        if (index !== -1) {
            result[i] = "misplaced";
            // Remove first occurrence to prevent double-counting
            secretRemaining[index] = null;
        }
    }

    return result;
}

/**
 * Check if the player has won (guessed the word correctly).
 */
function isWinner(guess, secretWord) {
    return guess === secretWord;
}
