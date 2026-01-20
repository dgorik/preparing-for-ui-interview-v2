# Calculator

**Difficulty**: `Easy`

## Goal

Implement a functional calculator that can perform basic arithmetic operations (addition, subtraction, multiplication, division).

## Requirements

### Core Functionality

1.  **Display**: Show current input and result.
2.  **Input**: Buttons for digits (0-9) and operations (+, -, \*, /).
3.  **Advanced Operations**: Support for Modulo (%) and Negation (+/-).
4.  **Decimals**: Support for decimal point inputs.
5.  **Calculation**: Perform calculation on '=' press.
6.  **Clear**: Button to clear current input ('AC').

### Accessibility (A11y)

1.  Buttons should be focusable and operable via keyboard.
2.  Output should be announced correctly (using `output` tag).

### Implementation Details

- State management should handle sequences of operations (e.g., `2 + 2 * 3` -> `6 * 3` or standard order of operations).
- Handle division by zero and invalid inputs gracefully.
