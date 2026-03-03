# 19.3 Google Sheet: Topological Sorting & Cycle Detection

**Difficulty**: `Hard`

## Goal

When you edit cell `A1`, you need to know which other cells are affected by this change and in what order they should be recomputed. If `B1 = A1 + 5` and `C1 = B1 * 2`, then updating `A1` requires updating `B1` first, and then `C1`. This is a classic **Topological Sorting** problem. Additionally, you must detect circular dependencies (e.g., `A1 = B1` and `B1 = A1`).

## Background: Kahn's Algorithm

To find the safe evaluation order, we use Kahn's Algorithm on the affected sub-graph:

```text
    GRAPH           IN-DEGREES         QUEUE         RESULT (ORDER)
 ┌─────────┐      ┌───────────┐      ┌───────┐      ┌─────────────┐
 │ A1──►B1 │      │ A1: 0     │      │ [A1]  │      │ [A1, B1, C1]│
 │ B1──►C1 │      │ B1: 1     │      └───────┘      └─────────────┘
 └─────────┘      │ C1: 1     │
                  └───────────┘
```

1.  **Identify the Affected Set**: Use Breadth-First-Search (BFS) following reverse dependencies (`rev`) to find all cells that depend on the edited cell.
2.  **Calculate In-Degrees**: For each cell in the affected set, count how many of its direct dependencies (`deps`) are also within the affected set.
3.  **Find Entry Points**: Any cell with an in-degree of 0 is "ready" to be evaluated. Push these into a Queue.
4.  **Process Queue**: 
    -   While the queue is not empty:
        -   Pop a cell `u`. 
        -   Add `u` to the result `order`.
        -   For each neighbor `v` that depends on `u` (using `rev`):
            -   Decrement `v`'s in-degree.
            -   If `v`'s in-degree reaches 0, push `v` to the queue.
5.  **Detect Cycles**: Any cell in the affected set that never reached an in-degree of 0 is part of a cycle.

## Requirements

### 1. Implementation Details

#### `#affectedFrom(start: CellId): Set<CellId>`
-   Standard BFS traversal starting from `start` using the `rev` (reverse dependencies) map.
-   Collect all discovered cells into a flat `Set`. This is the sub-graph we will sort.

#### `#topoSort(affected: Set<CellId>): { order: CellId[], cyclic: Set<CellId> }`
-   Implement Kahn's algorithm specifically within the scope of the `affected` set.
-   `order`: An array of cells in a safe computation order.
-   `cyclic`: A set of cells that cannot be sorted due to a cycle.

#### `#recomputeFrom(start: CellId): { changed: CellId[] }`
-   Chain `#affectedFrom` and `#topoSort`.
-   For now, just return the combined list of `order` and `cyclic` as the `changed` array. We will implement evaluation in the next step.

### 2. Update `setRaw`
-   After updating the state and dependencies in `setRaw`, call `#recomputeFrom(id)`.
-   Return the resulting `{ changed }` IDs.

## Testing

Run tests to verify that your topological sorter provides the correct sequence and correctly identifies cycles:

```bash
bun test src/problems/components/19.3-google-sheet-topo/test
```
