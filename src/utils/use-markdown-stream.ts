import { useRef, useState } from 'react'

type StreamCallback = (chunk: string) => void

type StreamOptions = {
  onComplete?: () => void
  onError?: (error: Error) => void
  delay?: number
}

/**
 * Hook for streaming markdown content from the server.
 * @param options - Optional configuration for completion/error callbacks and delay
 * @returns Object with stream, abort functions and inProgress state
 */
export function useMarkdownStream(options: StreamOptions = {}) {
  const { onComplete, onError, delay = 500 } = options
  const controllerRef = useRef<AbortController | null>(null)
  const [inProgress, setInProgress] = useState(false)

  const stream = (onChunk: StreamCallback) => {
    // Abort any existing stream before starting a new one
    controllerRef.current?.abort()

    const controller = new AbortController()
    controllerRef.current = controller
    setInProgress(true)
    ;(async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/stream-markdown?delay=${delay}`, {
          signal: controller.signal,
        })
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status}`)
        }

        const reader = response.body?.getReader()
        if (!reader) {
          throw new Error('No readable stream available')
        }

        const decoder = new TextDecoder()

        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          const text = decoder.decode(value, { stream: true })
          onChunk(text)
        }

        onComplete?.()
      } catch (error) {
        if ((error as Error).name !== 'AbortError') {
          console.error('Stream error:', error)
          onError?.(error as Error)
        }
      } finally {
        controllerRef.current = null
        setInProgress(false)
      }
    })()
  }

  const abort = () => {
    controllerRef.current?.abort()
    controllerRef.current = null
    setInProgress(false)
  }

  return { stream, abort, inProgress }
}
