import { useState, useRef, useCallback, useMemo } from 'react'

export type TUploadStatus = 'idle' | 'uploading' | 'paused' | 'completed' | 'cancelled' | 'error'

export type TUploadState = {
  status: TUploadStatus
  progress: number
  speed: number // KB/s
  bytes: number
  remainingTimeMs: number | null
  error: string | null
}

export type TUploadControls = {
  start: (file: File, from?: number) => void
  pause: () => void
  resume: (file: File) => void
  cancel: () => void
}

const DEFAULT_STATE: TUploadState = {
  status: 'idle',
  progress: 0,
  speed: 0,
  bytes: 0,
  remainingTimeMs: null,
  error: null,
}

const UPLOAD_API_URL = 'http://localhost:3000/api/upload'
const DEFAULT_METRICS = {
  lastLoaded: 0,
  lastTime: 0,
  offset: 0,
}

/**
 * Expected usage:
 * const [state, controls] = useFileUpload()
 * controls.start(file)       // begin upload
 * controls.pause()           // pause (aborts XHR, keeps offset)
 * controls.resume(file)      // resume from last offset
 * controls.cancel()          // hard abort + reset to idle
 * state = { status, progress, speed, bytes, remainingTimeMs, error }
 */

export function useFileUpload(): [TUploadState, TUploadControls] {
  // Step 1: State & Refs:
  //   - useState<TUploadState>(DEFAULT_STATE) for public state
  //   - xhrRef for active XMLHttpRequest (to abort on pause/cancel)
  //   - metricsRef { lastLoaded, lastTime } for speed calculation deltas
  //   - offsetRef for tracking uploaded bytes (used for resume slicing)
  // Step 2: cleanup helper — abort xhrRef if active, set to null
  // Step 3: start(file, from=0) — useCallback:
  //   - cleanup(), reset offsetRef and metricsRef
  //   - Create new XMLHttpRequest, store in xhrRef
  //   - xhr.upload.onprogress: calculate totalLoaded, throttle speed calc every 500ms,
  //     compute progress % and remainingTimeMs
  //   - xhr.onload: if 2xx → completed, else → error
  //   - xhr.onerror: → error state
  //   - xhr.open('POST', UPLOAD_API_URL), set X-File-Name header, send file.slice(from)
  // Step 4: pause — cleanup(), set status to 'paused'
  // Step 5: resume(file) — call start(file, offsetRef.current)
  // Step 6: cancel — cleanup(), reset offsetRef to 0, setState(DEFAULT_STATE)
  // Step 7: Return [state, { start, pause, resume, cancel }] — memoize controls with useMemo

  return [DEFAULT_STATE, { start: () => {}, pause: () => {}, resume: () => {}, cancel: () => {} }]
}
