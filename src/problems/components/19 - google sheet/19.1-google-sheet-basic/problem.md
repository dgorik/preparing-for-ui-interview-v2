# 19.1 Google Sheet: Basic Engine Data Structures

**Difficulty**: `Medium`

## Goal

The core of a spreadsheet is its **Reactive Engine**. Before handling complex math or UI, we must establish a robust data model to track the state of every cell. In this first step, you will implement the `TableEngine` class with foundational data structures and basic accessor methods.

The goal is to store what the user types (the "raw" input) and what the cell actually displays (the "value"), while also preparing for dependency tracking.

## Background: The Quad-Map Architecture

A performant spreadsheet engine typically uses four primary mappings to manage its state:

```text
       ┌──────────┐      ┌──────────┐
       │   raw    │      │  value   │
       │ (String) │      │ (Result) │
       └────┬─────┘      └────▲─────┘
            │                 │
      (Compilation)      (Evaluation)
            │                 │
       ┌────▼─────┐      ┌────┴─────┐
       │   deps   │      │   rev    │
       │ (Direct) │      │(Inverse) │
       └──────────┘      └──────────┘
```

1.  **`raw`**: Maps `CellId` (e.g., `"A1"`) to the literal string entered by the user (e.g., `"=B1+5"`).
2.  **`value`**: Maps `CellId` to the final computed result (e.g., `"15"`).
3.  **`deps`**: Maps `CellId` to a `Set` of other cells it *depends on* (Direct Dependencies). If `A1` is `"=B1+C1"`, then `deps("A1") = {B1, C1}`.
4.  **`rev`**: Maps `CellId` to a `Set` of cells that *depend on it* (Reverse Dependencies/Affected Cells). If `A1` is `"=B1+C1"`, then `rev("B1") = {A1}` and `rev("C1") = {A1}`.

## Requirements

### 1. State Management
Implement the `TableEngine` class using private `Map` structures for the four categories mentioned above.
- Use `CellId` (from `google-sheet-parser`) as the key.
- For this step, simply store the `raw` string into the `value` map as well, as we aren't evaluating math yet.

### 2. Implementation Details

#### `setRaw(id: CellId, raw: string): { changed: CellId[] }`
- Updates the internal state for the given cell.
- For now, just set the `raw` and `value` maps.
- Returns an object containing an array of IDs that were modified. In this step, it's just `[id]`.

#### `getRaw(id: CellId): string`
- Returns the raw input string. Should return an empty string `''` if the cell has never been set.

#### `getValue(id: CellId): string`
- Returns the computed value string. Should return `''` if empty.

#### `getDeps(id: CellId): ReadonlySet<CellId>`
- Returns a `ReadonlySet` of cells this cell depends on.
- **Tip**: If the map entry is missing, initialize it with an empty `Set` and return that to avoid `undefined` checks in consumers.

#### `getRevDeps(id: CellId): ReadonlySet<CellId>`
- Returns a `ReadonlySet` of cells that depend on this cell.
- Use the same "lazy initialization" pattern as `getDeps`.

## Testing

Run the following command to verify your data structures:

```bash
bun test src/problems/components/19.1-google-sheet-basic/test
```
