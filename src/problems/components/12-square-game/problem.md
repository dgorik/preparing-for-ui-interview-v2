# Square Game (8-Puzzle)

**Difficulty**: `medium`

## Goal

Create a 3x3 grid game (also known as the 8-puzzle) containing tiles numbered 1 through 8 and one empty space. The objective is to rearrange the tiles from a random configuration into sequential order (1-8), leaving the last cell empty.

## Requirements

### Core Functionality

1.  **Rendering**:
    - Display a 3x3 grid.
    - Render tiles numbered 1 to 8.
    - Render one empty cell.
    - Initial state should be randomized.
2.  **Interactivity**:
    - Users can click on a tile adjacent to the empty space (horizontally or vertically) to move it into the empty space.
    - If a user clicks a tile not adjacent to the empty space, nothing should happen.
3.  **Win Condition**:
    - Detect when the tiles are ordered 1-8 in the first 8 positions, with the empty space at the end (index 8).
    - Display a "Win" message or status when this condition is met.

### Accessibility (A11y)

1.  Ensure the grid and tiles are keyboard accessible (optional but recommended).
2.  Use standard semantic HTML (buttons or interactive divs with ARIA roles) if possible.
3.  Ensure sufficient color contrast for numbers.

## API Design

The component (React or Vanilla) generally takes configuration for the root element (Vanilla) or standard props (React), though this specific implementation is self-contained.

## Solution Approach

1.  **State Representation**:
    - Use a 1D array of size 9 or a 2D array of 3x3.
    - Values: `1`, `2`, `3`, ..., `8`, `null` (for empty).
2.  **Initialization**:
    - Generate a solved state.
    - Shuffle the array.
3.  **Move Logic**:
    - On click, find the coordinates of the clicked tile `(r, c)` and the empty tile `(emptyR, emptyC)`.
    - Check if `|r - emptyR| + |c - emptyC| === 1`.
    - If yes, swap values in state and re-render.
4.  **Win Logic**:
    - Flatten the grid and compare against `[1, 2, 3, 4, 5, 6, 7, 8, null]`.

## Test Cases

1.  **Initial Render**: Grid displays 3x3 tiles.
2.  **Valid Move**: Click a tile next to empty -> they swap.
3.  **Invalid Move**: Click a tile not next to empty -> no change.
4.  **Win State**: (Can be tested by mocking state) -> "Win" message appears.
