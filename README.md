# Wordle

## How to Run

Click the **"Go Live"** button in the bottom-right corner of VS Code. Your browser will open to `localhost:5500`.

## Your Tasks

### 1. `numbers.js` — Fill in the numbers

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

## Make It Yours: Styling

Open `theme.css` and change any value to restyle the game — everything updates automatically. You can change:

- **Colors** — names like `tomato` or hex codes like `#538d4e`
- **Font** — pick from the list of ready-to-use fonts in the file
- **Tile size** — make the tiles bigger or smaller
- **Tile roundness** — square corners or rounded corners

## Bonus Challenge (optional)

**Finished early? Try this!**

So far you've only *set* variables. Now you'll *make your own* variable and *use* it inside another one.

In `messages.js`, add a new variable for your name above the win message:

```js
const PLAYER_NAME = "Alex";
```

Then rebuild `WIN_MESSAGE` so it uses your variable with `+` (this is called string concatenation):

```js
const WIN_MESSAGE = "Great job, " + PLAYER_NAME + "!";
```

Win the game and you should see your personalized message. Try changing `PLAYER_NAME` and watch the message update without touching `WIN_MESSAGE` at all!
