# 19.5 Google Sheet: Reactive Recomputation Pipeline

**Difficulty**: `Extreme`

## Goal

This is the final logic step. You will tie all the pieces together:

```text
    USER INPUT         COMPILATION        GRAPH UPDATE        TOPOSORT          EVALUATION
  ┌───────────┐      ┌─────────────┐     ┌────────────┐     ┌───────────┐     ┌────────────┐
  │ setRaw A1 │ ───► │ to RPN / AST│ ───►│ sync deps  │ ───►│ find order│ ───►│ eval cells │
  └───────────┘      └─────────────┘     └────────────┘     └───────────┘     └────────────┘
```

-   **Step 19.1**: Data Structures
-   **Step 19.2**: AST Parsing & Dependency Extraction
-   **Step 19.3**: Topological Sorting & Cycle Detection
-   **Step 19.4**: Evaluation Logic

When `A1` is edited, you must now re-evaluate its dependents in the correct order, ensuring that any cells trapped in a cycle are marked with `#CYCLE!`.

## Requirements

### 1. Integration Details

#### `setRaw(id: CellId, raw: string): { changed: CellId[] }`
-   This method should now implement the full engine pipeline:
    1.  Update the cell's `raw` value.
    2.  `#compile` the new `raw` string.
    3.  `#setDeps` to update the graph.
    4.  Call `#recomputeFrom(id)` to calculate the impact.
    5.  Return the array of all cell IDs that were updated during recomputation.

#### `#recomputeFrom(start: CellId): { changed: CellId[] }`
-   Retrieve the `order` (safe sequence) and `cyclic` (broken nodes) from the topological sorter.
-   **Step A: Handle Cycles**: For every cell ID in the `cyclic` set, set its value in the `#value` map to `#CYCLE!`.
-   **Step B: Sequential Evaluation**: For every cell ID in the `order` list:
    -   Call `_evalCell(id)`.
    -   Store the result in the `#value` map.
-   **Combine Results**: Return all affected IDs (both cyclic and ordered) to the caller so the UI knows which cells to refresh.

## Testing

Run tests against the full reactive engine to verify it handles complex dependency trees and cycle recovery correctly:

```bash
bun test src/problems/components/19.5-google-sheet-recompute/test
```
