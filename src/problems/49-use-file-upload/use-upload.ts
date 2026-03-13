import {useState, useRef} from 'react'

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
    // Step 1: State & Refs (no useCallback/useMemo needed — hook is used once per component):
    //   - useState<TUploadState>(DEFAULT_STATE) for public state
    //   - useRef<XMLHttpRequest | null>(null) for active XHR (to abort on pause/cancel)
    //   - useRef<{ lastLoaded, lastTime, offset }>({...DEFAULT_METRICS}) for speed calc and resume tracking

    // Step 2: Cleanup helper — abort xhrRef if active, reset metricsRef, null out xhrRef

    // Step 3: start(file, from=0):
    //   - cleanup(), accumulate offset, create new XMLHttpRequest
    //   - xhr.upload.onprogress — use functional setState to avoid stale state:
    //     - speed: bytes transferred since last event divided by time elapsed, converted to KB/s
    //     - progress: account for the resume offset — (from + loaded) relative to (from + total), as a percentage
    //     - remainingTimeMs: remaining bytes divided by current transfer rate in bytes/ms
    //     - update metricsRef with current time, loaded bytes, and offset
    //   - xhr.onload: check status code — 2xx means completed, otherwise set error state
    //   - xhr.onerror: set error state with a fixed string (ProgressEvent.toString() is not useful)
    //   - xhr.open('POST', UPLOAD_API_URL), set X-File-Name header, send file.slice(from)
    //   - Initialize metricsRef.lastTime, setState status 'uploading'

    // Step 4: pause — save offset before cleanup (cleanup resets it), then set status 'paused'

    // Step 5: resume(file) — call start(file, metricsRef.current.offset)

    // Step 6: cancel — cleanup(), setState with DEFAULT_STATE + status 'cancelled'

    // Step 7: Return [state, { start, pause, resume, cancel }]

    return [DEFAULT_STATE, {start: () => {}, pause: () => {}, resume: () => {}, cancel: () => {}}]
}
