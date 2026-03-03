# 19.2 Google Sheet: AST Compilation & Dependency Analysis

**Difficulty**: `Medium`

## Goal

Now that we have the basic data structures, we need to understand the relationship between cells. If `A1` is `"=B1 + 5"`, `A1` depends on `B1`. In this step, you will implement the compilation logic that converts a raw string into an Abstract Syntax Tree (specifically, Reverse Polish Notation) and extracts these dependencies.

## Background: RPN and Tokenization

We provide a `google-sheet-parser` utility with three key functions:

```text
  INPUT RAW         TOKENIZE            TO RPN           DEPS EXTRACT
 ┌─────────┐      ┌──────────┐      ┌───────────┐      ┌─────────────┐
 │ "=B1+5" │ ───► │ [REF,+,5]│ ───► │ [B1, 5, +]│ ───► │  Set { B1 } │
 └─────────┘      └──────────┘      └───────────┘      └─────────────┘
```

- `tokenize(expr)`: Converts a string like `"=A1+10"` into a list of tokens (`ref(A1)`, `op(+)`, `num(10)`).
- `toRpn(tokens)`: Converts tokens into **Reverse Polish Notation** (Postfix). For example, `A1 + 10` becomes `[A1, 10, +]`. Postfix is much easier to evaluate without recursion.
- `evalRpn(rpn, resolver)`: Evaluates a list of RPN tokens.

## Requirements

### 1. Extended State
Add a `#compiled` Map to store the result of the compilation for each cell. This should store either the RPN token array or an error message if compilation fails.

### 2. Private Implementation

#### `#compile(id: CellId, raw: string): Set<CellId>`
- If the `raw` string doesn't start with `=`, it's a literal. Set `#compiled` to `null` and return an empty `Set`.
- If it starts with `=`, call `tokenize` and then `toRpn`.
- If either fails, store the error in `#compiled`.
- If successful, store the RPN tokens in `#compiled`.
- **Dependency Extraction**: Iterate through the tokens. If a token is of type `ref`, add its `id` to the returned `Set<CellId>`.

#### `#setDeps(id: CellId, nextDeps: Set<CellId>)`
- This is the most critical logic in this step. You must synchronize the `deps` and `rev` maps.
- **Old Deps**: Get the current set of dependencies for this cell.
- **Cleanup**: For any dependency in `Old Deps` that is *not* in `nextDeps`, remove the current cell from that dependency's `rev` set.
- **Update**: For any dependency in `nextDeps` that is *not* in `Old Deps`, add the current cell to that dependency's `rev` set.
- Replace the set in the `deps` map for this cell with `nextDeps`.

### 3. Update `setRaw`
- Call `#compile` when a cell is updated.
- Pass the resulting dependency set to `#setDeps`.
- For now, still return `{ changed: [id] }`.

## Testing

Run tests to verify that AST tokens are correctly extracted and the bidirectional graph (`deps` <-> `rev`) is maintained accurately:

```bash
bun test src/problems/components/19.2-google-sheet-compile/test
```
