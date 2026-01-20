# Video Player

**Difficulty**: `medium`

## Goal

Build a custom video player with controls for play/pause, seeking, time display, and quality switching (without using native browser controls).

## Requirements

### Core Functionality

1.  **Play/Pause**: Toggle playback via a button or by clicking the video.
2.  **Progress Bar**: Display current progress as a range slider; allow seeking by dragging.
3.  **Time Display**: Show current time and total duration in `M:SS` format.
4.  **Quality Switching**: Allow switching between video resolutions (e.g., 1080p, 720p, 360p) while preserving playback position.
5.  **State Sync**: Keep UI in sync with actual video state (handle external play/pause events).

### Accessibility (A11y)

1.  Play button should have `aria-label` indicating current action ("Play" or "Pause").
2.  Controls should be keyboard accessible.

## API Design

### Props (Vanilla)

- `defaultQuality`: `string` (optional) - Initial quality setting.

### Video Sources

```typescript
const VIDEO_SOURCES: Record<string, string> = {
  '1080p': 'https://example.com/video_1080p.mp4',
  '720p': 'https://example.com/video_720p.mp4',
  '360p': 'https://example.com/video_360p.mp4',
}
```

## Solution Approach

### React

1.  Use `useRef` for the video element and saved state during quality switch.
2.  Use `useState` for `isPlaying`, `progress`, `currentTime`, `duration`, `quality`.
3.  Attach `onTimeUpdate`, `onLoadedMetadata`, `onPlay`, `onPause` handlers.
4.  On quality change, save position, update state, let `onLoadedMetadata` restore.

### Vanilla

1.  Extend `AbstractComponent` with internal state for playback.
2.  In `afterRender`, attach native video event listeners (`timeupdate`, `loadedmetadata`, `play`, `pause`).
3.  Use `onClick`, `onInput`, `onChange` for user interactions.
4.  On quality change, save position, update `src`, call `load()`, restore in `loadedmetadata`.

## Verification

1.  Click play → video plays, button shows pause icon.
2.  Drag progress bar → video seeks to new position.
3.  Change quality → video continues from same position.
4.  Time display updates as video plays.
