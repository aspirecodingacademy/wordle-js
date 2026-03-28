# Wordle - JavaScript Edition

Build your own Wordle game using HTML, CSS, and JavaScript!

## How to Run

1. Click the **"Go Live"** button in the bottom-right corner of VS Code
2. Your browser will open automatically to `localhost:5500`
3. Changes you make will auto-reload in the browser

## Your Tasks

You'll be editing three files to complete this project:

### 1. HTML (`index.html`) - Build the Game Board

The basic structure is provided. You need to add:

**Game Board** (inside the existing `<div class="board">`):
- Add 6 row divs: `<div class="row">`
- Inside each row: 5 tile divs: `<div class="tile"></div>`

**Keyboard** (inside the existing `<div class="keyboard">`):
- Add 3 row divs: `<div class="keyboard-row">`
- Inside each row: buttons with `<button class="key">LETTER</button>`
- Row 1: Q W E R T Y U I O P
- Row 2: A S D F G H J K L
- Row 3: ENTER Z X C V B N M ⌫
- ENTER and ⌫ buttons need TWO classes: `class="key wide"`

### 2. CSS (`style.css`) - Style with Flexbox

The color variables and base styles are provided. You need to add flexbox:

**Board Layout:**
- `.board` - use flexbox to stack rows vertically (column direction)
- `.row` - use flexbox to arrange tiles horizontally

**Keyboard Layout:**
- `.keyboard` - use flexbox to stack rows vertically
- `.keyboard-row` - use flexbox to arrange keys horizontally

**Tile Colors:**
- `.correct` - green background using `var(--correct)`
- `.misplaced` - yellow background using `var(--misplaced)`
- `.wrong` - dark gray background using `var(--wrong)`
- `.filled` - lighter border color (#565758)

### 3. JavaScript (`game.js`) - Game Logic

Complete these four functions:

**`isFiveLetters(guess)`**
- Return `true` if the guess has exactly 5 characters
- Return `false` otherwise

**`isValidWord(guess, validWords)`**
- Return `true` if the guess is in the validWords Set
- Use the `.has()` method to check
- Return `false` if not found

**`checkGuess(guess, secretWord)`**
- Loop through each letter and check: right position? in the word? or not at all?
- Return an array of 5 strings: "correct", "misplaced", or "wrong"

**`isWinner(guess, secretWord)`**
- Return `true` if guess equals secretWord
- Return `false` otherwise

## Testing Your Code

### HTML Test
- You should see a 6x5 grid of tiles
- You should see a keyboard with all letters

### CSS Test
- The board should be centered on the page
- Tiles should be in rows, not stacked vertically
- Keyboard should look like a real keyboard layout

### JavaScript Test
- Type a 5-letter word and press Enter
- Tiles should turn green, yellow, or gray
- Win the game and see "Excellent! 🎉"

## Game Rules

1. Guess the secret 5-letter word in 6 tries
2. Each guess must be a valid English word
3. After each guess, tiles change color:
   - 🟩 **Green** = Correct letter, correct spot
   - 🟨 **Yellow** = Correct letter, wrong spot
   - ⬛ **Gray** = Letter not in the word

Good luck! 🎯
