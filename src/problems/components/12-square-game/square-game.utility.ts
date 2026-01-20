/**
 * Randomizes an array in place using the Fisher-Yates shuffle algorithm.
 * @param arr The array to randomize.
 * @param size The dimension size (used for calculation, though not directly in the shuffle logic as written).
 * @returns The randomized array.
 */
export function randomizeArray(arr: Array<number | null>): Array<number | null> {
  for (let i = 0; i < arr.length; i++) {
    const newIndex = Math.floor(Math.random() * arr.length)
    ;[arr[i], arr[newIndex]] = [arr[newIndex], arr[i]]
  }
  return arr
}

/**
 * Splits an array into chunks of a specified size (creating a 2D array).
 * @param arr The 1D array to split.
 * @param n The size of each chunk.
 * @returns A 2D array.
 */
function chunkify(arr: Array<number | null>, n: number): Array<Array<number | null>> {
  return Array.from(Array(n), (_, i) => arr.slice(i * n, (i + 1) * n))
}

/**
 * Generates the initial game state for the square game.
 * Creates a sorted array, randomizes it, and converts it to a 2D grid.
 * @param size The size of the grid (e.g., 3 for a 3x3 grid).
 * @returns A 2D array representing the game board.
 */
export function getGameState(size: number): Array<Array<number | null>> {
  let arr = Array(size * size)
    .fill(null)
    .map((_, i) => (i === size * size - 1 ? null : i + 1))
  arr = randomizeArray(arr)
  return chunkify(arr, size)
}

/**
 * Validates if a move is legal.
 * A move is legal if the target cell is adjacent (horizontally or vertically) to the empty cell.
 * @param param0 [row, col] coordinates of the clicked cell.
 * @param param1 [emptyRow, emptyCol] coordinates of the empty cell.
 * @returns True if the move is valid, false otherwise.
 */
export function validate([row, col]: [number, number], [emptyRow, emptyCol]: [number, number]) {
  const validHorizontally = row === emptyRow && (col === emptyCol + 1 || col === emptyCol - 1)
  const validVertically = col === emptyCol && (row === emptyRow + 1 || row === emptyRow - 1)
  return validHorizontally || validVertically
}

/**
 * Finds the coordinates of the empty cell (null value) in the grid.
 * @param arr The 2D game grid.
 * @returns [row, col] of the empty cell.
 */
export function getEmptyPosition(arr: Array<Array<number | null>>): [number, number] {
  for (let row = 0; row < arr.length; row++) {
    for (let col = 0; col < arr[0].length; col++) {
      if (arr[row][col] === null) {
        return [row, col]
      }
    }
  }
  throw Error('Invalid array')
}

/**
 * Checks if the game is won.
 * The game is won if the flattened array matches the sequence "12345678null".
 * @param arr The 2D game grid.
 * @returns True if the game is won.
 */
export function isWin(arr: Array<Array<number | null>>): boolean {
  return arr.flat(Infinity).join('') === '12345678null'
}
