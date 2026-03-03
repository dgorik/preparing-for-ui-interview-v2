# 19.4 Google Sheet: Cell Evaluation Logic

**Difficulty**: `Hard`

## Goal

We have the graph and the order, but we still aren't calculating any math! In this step, you will implement the evaluation logic that actually executes the compiled RPN tokens to produce a final value.

## Background: Recursive Value Resolution

To evaluate a cell like `A1 = B1 + 10`, you need to:

```text
    evalRpn([B1, 10, +])           TableEngine
   ┌────────────────────┐      ┌─────────────────┐
   │ 1. Encounter B1    │ ───► │ resolveId("B1") │
   │ 2. Wait for value  │ ◄─── │ return 5        │
   │ 3. Compute 5 + 10  │      └─────────────────┘
   │ 4. Return "15"     │
   └────────────────────┘
```

1.  Look up `B1`'s current value.
2.  If `B1` is another formula, its value must already be computed (which is why Topological Sorting is so important).
3.  Ensure that non-numeric values (like text or error messages) are handled correctly during math operations.

## Requirements

### 1. Implementation Details

#### `#parseNumericCellValue(id: CellId)`
-   This helper is the "bridge" between `evalRpn` and your engine state.
-   Get the value from the `#value` map for the cell `id`.
-   If the cell is empty or null, return `{ ok: true, n: 0 }`.
-   Try to parse the string value into a number.
-   If parsing fails or the value is an error (like `#DIV/0!`), return `{ ok: false, err: value }`.

#### `_evalCell(id: CellId): string`
-   Grab the cached `#compiled` object for the cell.
-   If `#compiled` is null (it's a literal), just return the `raw` string.
-   If `#compiled` has an error, return that error string.
-   Otherwise, call `evalRpn` from `google-sheet-parser`.
-   Pass your `#parseNumericCellValue` as the `resolveId` callback. This allows `evalRpn` to "ask" your engine for the value of any cell reference it encounters.

### 2. Update `setRaw`
-   After compilation and graph updates, call `_evalCell(id)`.
-   Update the `#value` map for that cell with the result.
-   For this step, **only evaluate the current cell** being edited to keep things simple. We will add full graph recomputation in the next step.

## Testing

Run tests to ensure that math is accurately calculated and cell references resolve to their numeric values:

```bash
bun test src/problems/components/19.4-google-sheet-eval/test
```
