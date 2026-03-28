# Wordle Rules & Algorithm

## Game Rules

1. **Objective**: Guess the secret 5-letter word in 6 tries or fewer
2. **Valid Guesses**: Each guess must be a valid English word from the word list
3. **Feedback**: After each guess, tiles change color to show how close you are

## Tile Colors

| Color | Meaning |
|-------|---------|
| 🟩 Green | Correct letter in the correct position |
| 🟨 Yellow | Correct letter but in the wrong position |
| ⬛ Gray | Letter is not in the word |

## Two-Pass Algorithm for Duplicate Letters

The core challenge in building a Wordle engine is correctly handling duplicate letters. You **cannot** simply check each letter in isolation. You must process the guess in two passes to ensure green tiles take priority over yellow tiles.

### Why Two Passes?

Consider: Answer = `DOWRY`, Guess = `WORRY`

**Naive single-pass approach (WRONG):**
- W: Is 'W' in DOWRY? Yes → Yellow ❌
- O: Matches position → Green ✓
- R: Is 'R' in DOWRY? Yes → Yellow ❌
- R: Matches position → Green ✓
- Y: Matches position → Green ✓

This incorrectly marks the first R as yellow, even though there's only ONE 'R' in DOWRY and it's already consumed by the green match at position 3.

**Correct two-pass approach:**
- Pass 1: Find all greens first, mark those letters as "consumed"
- Pass 2: For remaining letters, check against unconsumed letters only

### Algorithm

```
Input: guess G, answer A (both length 5)

# Initialize
result = ["wrong", "wrong", "wrong", "wrong", "wrong"]
remaining = list(A)  // Track which letters are still available

# Pass 1: Find Green (Correct) matches
for i from 0 to 4:
    if G[i] == A[i]:
        result[i] = "correct"
        remaining[i] = null  // Mark as consumed

# Pass 2: Find Yellow (Misplaced) matches
for i from 0 to 4:
    if result[i] == "correct":
        continue  // Skip already matched
    if G[i] in remaining:
        result[i] = "misplaced"
        // Remove first occurrence to prevent double-counting
        remaining[remaining.indexOf(G[i])] = null

return result
```

### Example: Answer = `EERIE`, Guess = `GEESE`

**Pass 1 (Greens):**
| Position | Guess | Answer | Match? | Result |
|----------|-------|--------|--------|--------|
| 0 | G | E | No | wrong |
| 1 | E | E | Yes | **correct** |
| 2 | E | R | No | wrong |
| 3 | S | I | No | wrong |
| 4 | E | E | Yes | **correct** |

Remaining after Pass 1: `[E, null, R, I, null]`

**Pass 2 (Yellows):**
| Position | Guess | In Remaining? | Result |
|----------|-------|---------------|--------|
| 0 | G | No | wrong |
| 2 | E | Yes (position 0) | **misplaced** |
| 3 | S | No | wrong |

Remaining after Pass 2: `[null, null, R, I, null]`

**Final Result:** `[wrong, correct, misplaced, wrong, correct]`
or visually: ⬛🟩🟨⬛🟩

## Dictionary Rules

- **Guess List**: ~13,000+ valid 5-letter words that can be guessed
- **Answer List**: ~2,300 curated words that can be the secret answer
- **Excluded from answers** (but can be guessed):
  - Proper nouns
  - Regular plurals ending in "-s" or "-es" (e.g., BOOKS)
  - Regular past tense verbs ending in "-ed" (e.g., LIKED)

## Win/Loss Conditions

- **Win**: All five tiles in a guess are green
- **Loss**: Six guesses completed without winning
