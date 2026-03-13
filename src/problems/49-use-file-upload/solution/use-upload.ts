import { useState, useRef, useCallback, useMemo } from 'react'

/** Represents the current lifecycle status of the file upload */
export type TUploadStatus = 'idle' | 'uploading' | 'paused' | 'completed' | 'cancelled' | 'error'

/** The state of the file upload exposed to the consumer */
export type TUploadState = {
  /** The current status. 'idle' means no upload has started. */
  status: TUploadStatus
  /** The percentage of completion, ranging from 0 to 100 */
  progress: number
  /** The current upload speed in KB/s */
  speed: number // KB/s
  /** The absolute number of bytes successfully uploaded so far */
  bytes: number
  /** The estimated time remaining in milliseconds. Null if unknown or not uploading. */
  remainingTimeMs: number | null
  /** If the status is 'error', contains the error message */
  error: string | null
}

/** The functions available to imperatively control the upload process */
export type TUploadControls = {
  /**
   * Starts an upload for a given File, optionally starting from a specific byte offset.
   * @param file The file object from the browser to upload
   * @param from The byte offset to start slice from (default 0)
   */
  start: (file: File, from?: number) => void
  /**
   * Pauses the active upload, severing the network connection but maintaining state.
   */
  pause: () => void
  /**
   * Resumes a paused upload by finding the last known byte offset and starting again.
   * @param file The exact same file object previously paused.
   */
  resume: (file: File) => void
  /**
   * Hard aborts the upload and completely resets the state back to 'idle'.
   */
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
  // Step 1: State & Refs — single metricsRef merges lastLoaded, lastTime, and offset
  // No useCallback/useMemo needed — hook is used once per component
  const [state, setState] = useState<TUploadState>(DEFAULT_STATE)
  const xhrRef = useRef<XMLHttpRequest | null>(null)
  const metricsRef = useRef<{
    lastLoaded: number
    lastTime: number
    offset: number
  }>({
    ...DEFAULT_METRICS,
  })

  // Step 2: Cleanup helper — abort active XHR, reset metrics, null out ref
  const cleanup = () => {
    xhrRef.current?.abort()
    metricsRef.current = {
      ...DEFAULT_METRICS,
    }
    xhrRef.current = null
  }

  // Step 3: start(file, from=0) — cleanup, create XHR, track progress, send sliced file
  //   - onprogress: compute speed (bytes/ms → KB/s), progress as (from+loaded)/(from+total)*100
  //   - onload: set completed or error based on status code
  //   - onerror: set error state for network failures
  const start = (file: File, from: number = 0) => {
    cleanup()
    metricsRef.current.offset += from
    xhrRef.current = new XMLHttpRequest()
    xhrRef.current.upload.onprogress = ({ loaded, total }: ProgressEvent) => {
      const now = Date.now()
      const delta = now - metricsRef.current.lastTime
      const bytesSinceLast = loaded - metricsRef.current.lastLoaded
      const bytesInMs = bytesSinceLast / delta
      const speed = (bytesInMs / 1024) * 1000
      metricsRef.current.lastTime = now
      metricsRef.current.lastLoaded = loaded
      metricsRef.current.offset = loaded
      setState((state) => ({
        ...state,
        status: 'uploading',
        progress: Math.round(((from + loaded) / (from + total)) * 100),
        speed,
        bytes: loaded,
        remainingTimeMs: (total - loaded) / bytesInMs,
      }))
    }

    xhrRef.current.onload = () => {
      const status = xhrRef!.current!.status
      if (status >= 200 && status < 300) {
        setState((s) => ({
          ...s,
          progress: 100,
          status: 'completed',
          error: null,
          remainingTimeMs: 0,
        }))
      } else {
        setState((s) => ({
          ...s,
          progress: 100,
          status: 'error',
          error: 'Upload failed',
          remainingTimeMs: 0,
        }))
      }
    }
    xhrRef.current.onerror = () =>
      setState((prev) => ({
        ...prev,
        status: 'error',
        error: 'Network error',
        remainingTimeMs: null,
      }))

    xhrRef.current.open('POST', UPLOAD_API_URL)
    xhrRef.current.setRequestHeader('X-File-Name', file.name)
    xhrRef.current.send(file.slice(from))
    metricsRef.current.lastTime = Date.now()
    setState((state) => ({
      ...state,
      status: 'uploading',
    }))
  }

  // Step 4: pause — save offset before cleanup (cleanup resets it), then set status 'paused'
  const pause = () => {
    const offset = metricsRef.current.offset
    cleanup()
    metricsRef.current.offset = offset
    setState((state) => ({
      ...state,
      status: 'paused',
    }))
  }

  // Step 5: resume — restart from saved offset
  const resume = (file: File) => {
    start(file, metricsRef.current.offset)
  }

  // Step 6: cancel — cleanup and reset state to cancelled
  const cancel = () => {
    cleanup()
    setState({
      ...DEFAULT_STATE,
      status: 'cancelled',
    })
  }

  // Step 7: Return [state, controls] — no useMemo needed for single-use hook
  return [state, { start, pause, resume, cancel }]
}
