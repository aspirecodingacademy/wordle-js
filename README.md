# Wordle

## How to Run

Click the **"Go Live"** button in the bottom-right corner of VS Code. Your browser will open to `localhost:5500`.

## Your Tasks

### 1. `numbers.js` — Fill in the numbers

- `WORD_LENGTH` — how many letters in the secret word
- `MAX_GUESSES` — how many guesses the player gets

### 2. `my-game.js` — Set up your game

- `GAME_TITLE` — the title at the top of the page
- `SECRET_WORD` — the word your friends will guess (must be 5 letters!)

### 3. `messages.js` — Write your messages

- `READY_MESSAGE` — shown at the start of the game
- `WIN_MESSAGE` — shown when the player wins
- `MESSAGE_SHORT_WORD` — shown when the guess is too short
- `MESSAGE_INVALID_WORD` — shown when the guess isn't a real word
- `NEW_GAME_BUTTON_TEXT` — the label on the new game button

### 4. `is-five-letters.js` — Check guess length

Complete `isFiveLetters(guess)` so it returns `true` if the guess is exactly 5 letters, `false` otherwise.

### 5. `is-winner.js` — Check for a win

Complete `isWinner(guess)` so it returns `true` if the guess matches `SECRET_WORD`, `false` otherwise.
