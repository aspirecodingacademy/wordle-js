/**
 * Wordle Game Logic
 *
 * Complete the functions below to make the game work!
 * Each function has a description of what it should do.
 */

/**
 * Check if the guess is exactly 5 letters long.
 *
 * @param {string} guess - The player's guess
 * @returns {boolean} - true if exactly 5 letters, false otherwise
 *
 * Examples:
 *   isFiveLetters("hello") → true
 *   isFiveLetters("hi") → false
 *   isFiveLetters("toolong") → false
 */
function isFiveLetters(guess) {
    // TODO: Return true if guess has exactly 5 characters
    return true; // Placeholder - change this!
}

/**
 * Check if the guess is a valid English word.
 *
 * @param {string} guess - The player's guess (already lowercase)
 * @param {Set} validWords - Set of valid 5-letter words
 * @returns {boolean} - true if the word is valid, false otherwise
 *
 * Hint: Use the .has() method to check if a Set contains a value
 *
 * Examples:
 *   isValidWord("hello", validWords) → true (if "hello" is in the set)
 *   isValidWord("xyzzy", validWords) → false (if "xyzzy" is not in the set)
 */
function isValidWord(guess, validWords) {
    // TODO: Return true if guess is in the validWords set
    return true; // Placeholder - change this!
}

/**
 * Compare the guess to the secret word and return feedback.
 *
 * Returns an array of 5 strings, one for each letter:
 *   - "correct" if the letter is in the right position
 *   - "misplaced" if the letter is in the word but wrong position
 *   - "wrong" if the letter is not in the word
 *
 * @param {string} guess - The player's guess (lowercase)
 * @param {string} secretWord - The secret word to guess (lowercase)
 * @returns {string[]} - Array of 5 feedback strings
 *
 * Examples:
 *   checkGuess("hello", "hello") → ["correct", "correct", "correct", "correct", "correct"]
 *   checkGuess("brain", "crane") → ["wrong", "correct", "correct", "wrong", "correct"]
 */
function checkGuess(guess, secretWord) {
    // TODO: Build and return the feedback array
    //
    // Create an empty result array, then loop through each position (0 to 4):
    //   - If the letter matches the secret word at that position → "correct"
    //   - Else if the letter exists anywhere in the secret word → "misplaced"
    //     (Hint: use secretWord.includes(letter))
    //   - Else → "wrong"

    // Placeholder - returns all wrong
    return ["wrong", "wrong", "wrong", "wrong", "wrong"];
}

/**
 * Check if the player has won (guessed the word correctly).
 *
 * @param {string} guess - The player's guess (lowercase)
 * @param {string} secretWord - The secret word (lowercase)
 * @returns {boolean} - true if the guess matches the secret word
 *
 * Examples:
 *   isWinner("hello", "hello") → true
 *   isWinner("world", "hello") → false
 */
function isWinner(guess, secretWord) {
    // TODO: Return true if guess equals secretWord
    return false; // Placeholder - change this!
}
