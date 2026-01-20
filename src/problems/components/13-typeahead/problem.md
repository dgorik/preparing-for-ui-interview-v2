# Typeahead (Autocomplete)

**Difficulty**: `Medium`

## Goal

Implement a robust Typeahead (Autocomplete) component that efficiently filters a large dataset and handles asynchronous API interactions. The component should support both client-side filtering (using a Trie) and server-side fetching.

## Requirements

### Core Functionality

1.  **Efficient Filtering**: Implement a **Trie (Prefix Tree)** data structure to perform efficient client-side prefix searches.
2.  **Async Data Fetching**: Fetch suggestions from a backend API (`/api/typeahead`) as the user types.
3.  **Debouncing**: Debounce user input to avoid spamming the API with requests for every keystroke.
4.  **Race Condition Handling**: Ensure that results from older, slower network requests do not overwrite results from newer, faster requests (ignore stale promises).
5.  **Loading State**: Display a loading indicator while fetching data.
6.  **Results Limit**: Limit the number of displayed suggestions (e.g., top 10).

### API Integration

- **Endpoint**: `GET /api/typeahead`
- **Parameters**: `?query={string}`
- **Behavior**: Returns a JSON array of matching entries, with a simulated network delay.

### Accessibility (A11y)

1.  **ARIA Roles**: Use the `combobox` design pattern.
    - Input: `role="combobox"`, `aria-autocomplete="list"`, `aria-expanded`, `aria-controls`.
    - List: `role="listbox"`.
    - Option: `role="option"`.
2.  **Live Region**: Use a visually hidden `div` with `role="status"` and `aria-live="polite"` to announce the number of results to screen readers.
3.  **Visual Feedback**: Ensure focus states and hover effects are clear.

## Solution Approach

### 1. Trie Data Structure

Use a Trie (Prefix Tree) for $O(L)$ insertion and search complexity, where $L$ is the key length. This is significantly faster than filtering an array ($O(N \cdot L)$) for large datasets.

### 2. React Implementation

- **Hooks**: `useState`, `useEffect`, `useRef`.
- **Concurrency**: Use `useDeferredValue` for input responsiveness.
- **Race Conditions**: Use a boolean flag (`ignore`) in the `useEffect` cleanup function to discard stale API responses.

### 3. Vanilla Implementation

- **Class-based Component**: Extend a base `Component` class.
- **Event Handling**: Register `input` listeners via the constructor configuration.
- **DOM Manipulation**: Manually manage the DOM nodes for the list and live region updates.

## Verification

1.  **Typing**: Type "ap" -> expect "apple", "apricot", etc.
2.  **Debounce**: Rapidly type "apple" -> expect only one final network request.
3.  **Race Condition**: Type "a" (slow response) then "ab" (fast response) -> ensure results for "ab" are shown, not "a".
4.  **Accessiblity**: Use a screen reader (or inspect DOM) to verify `aria-live` announces result counts.
