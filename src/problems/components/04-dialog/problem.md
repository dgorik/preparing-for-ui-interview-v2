# Dialog Component

**Difficulty**: `easy`

## Goal

Implement a modal `Dialog` component using the native HTML `<dialog>` element. The dialog should be accessible, keyboard-friendly, and properly centered with a backdrop.

## Requirements

### Core Functionality

1. **Modal Behavior**: Use `showModal()` to display the dialog as a modal (centered, with backdrop).
2. **Open/Close**: Support open state control via props/methods.
3. **Actions**: Provide Confirm and Cancel buttons that trigger callbacks.
4. **Native Close Handling**: Handle the native `close` event (triggered by Escape key) to sync state.

### HTML `<dialog>` Specifics

1. **`showModal()` vs `open` attribute**:
   - `open` attribute: Renders dialog inline, no backdrop, no centering.
   - `showModal()`: Renders as modal with `::backdrop`, centered by browser.
2. **`::backdrop` pseudo-element**: Style the overlay behind the modal.
3. **`close` event**: Fired when dialog is closed (via `close()` or Escape key).

### Accessibility (A11y)

1. **Focus Management**: First focusable element should receive focus when opened.
2. **Escape Key**: Should close the dialog (native behavior).
3. **Inert Background**: Background content is automatically inert when using `showModal()`.

## API Design

### React

```tsx
type TDialogProps = {
  open: boolean
  onConfirm: () => void
  onCancel: () => void
  children: React.ReactNode
}
```

### Vanilla

```ts
type TDialogProps = {
  content: string
  onConfirm: () => void
  onCancel: () => void
}

// Methods
dialog.open()   // Show the modal
dialog.close()  // Close the modal
```

## Solution Approach

1. **React**: Use `useRef` to get dialog element, `useEffect` to call `showModal()`/`close()` based on `open` prop.
2. **Vanilla**: Extend `AbstractComponent`, expose `open()` and `close()` methods.
3. **State Sync**: Listen to the native `close` event to call `onCancel` and sync parent state.

## Key Implementation Details

```tsx
// React: Sync open state with native dialog
useEffect(() => {
  if (open) {
    dialogRef.current?.showModal()
  } else {
    dialogRef.current?.close()
  }
}, [open])

// Handle native close (Escape key)
<dialog onClose={onCancel}>
```

## Test Cases

1. **Open/Close**: Click button → Dialog opens centered with backdrop. Click Cancel → Dialog closes.
2. **Escape Key**: Open dialog, press Escape → Dialog closes, state syncs.
3. **Confirm Action**: Click Confirm → `onConfirm` callback fires, dialog closes.
4. **Reopen**: Close dialog, reopen → Should work correctly (state sync).
