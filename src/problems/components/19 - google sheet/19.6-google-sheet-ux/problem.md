# 19.6 Google Sheet: Virtualized UI & Event Delegation

**Difficulty**: `Extreme`

## Goal

Take your logic engine and turn it into a high-performance spreadsheet UI. The challenge here is performance: you must support thousands of cells while maintaining smooth scrolling and instant updates.

## Background: Advanced UI Techniques

### 1. Fixed-Row Virtualization

Do not render 2,500 individual React components for your grid! This will cause significant memory overhead and lag.

```text
  SCROLLABLE VIEWPORT      VIRTUAL CONTENT (e.g. 5000px)
 ┌───────────────────┐    ┌─────────────────────────┐
 │ [Visible Rows]    │    │ [Hidden Rows Above]     │
 │ row 10 to 25      │    ├─────────────────────────┤
 │                   │    │  [ RENDERED ROWS ]      │
 │                   │    ├─────────────────────────┤
 └───────────────────┘    │ [Hidden Rows Below]     │
                          └─────────────────────────┘
```

Instead:
-   Determine the total height of the grid (e.g., 100 rows * 30px = 3000px).
-   Use a large container with that height and `overflow: auto`.
-   Calculate which rows are currently visible based on the scroll position.
-   Only render the rows that are on the screen.

### 2. Event Delegation & Imperative Updates
In a spreadsheet, you often update many cells at once when a dependency changes. Instead of relying on React's declarative state for every single cell:
-   **Capture Events**: Use `onFocusCapture` and `onBlurCapture` on the grid parent.
-   **Toggle Edit Mode**: When a cell is focused, swap its content from the "Value" (e.g., `15`) to the "Raw" string (e.g., `"=B1+5"`).
-   **Imperative Updates**: When a cell is blurred:
    1.  Call `engine.setRaw(id, newValue)`.
    2.  Use `document.querySelector` to find all the "changed" IDs returned by the engine.
    3.  Directly update their `textContent` using native DOM methods for maximum performance.

## Requirements

### 1. Component Implementation

#### State Management
-   Keep the `TableEngine` instance in a `useRef` or `useMemo`.
-   Use a state variable for `scrollOffset` to trigger re-renders during scrolling for virtualization.

#### Layout
-   Render a header row (A, B, C...) and a column for row numbers.
-   Use a `div[role=grid]` for the main table.

#### Keyboard Interaction
-   Support `Enter` to save and move down.
-   Support `Escape` to cancel editing.
-   Support `Arrow Keys` to move the selection between cells.

## Testing

There are no unit tests for this step. Verification is visual:
-   Open the development server and navigate to the Google Sheet page.
-   Verify you can scroll smoothly through at least 100 rows.
-   Verify that editing a cell updates all dependent cells instantly.
