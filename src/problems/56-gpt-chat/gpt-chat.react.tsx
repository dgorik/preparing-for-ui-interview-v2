import css from './gpt-chat.module.css'
import flex from 'src/utils/styles.module.css'
import cx from 'src/utils/utility'
import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * Expected behavior:
 * - Textarea + Send button to trigger streaming from /api/stream-markdown
 * - Chunks arrive via ReadableStream, queued and typed out char-by-char with requestAnimationFrame
 * - Rendered through a Markdown component
 * - Stop button to abort in-progress stream
 */

export const GPTComponent = () => {
  // Step 1: useMarkdownStream hook (define above or inline):
  //   - controllerRef for AbortController, inProgress state
  //   - stream(onChunk) — fetch with ReadableStream reader, decode chunks, call onChunk
  //   - abort() — controller.abort(), reset state
  // Step 2: State — chunks[] queue, content string (accumulated typed text), isTyping flag, contentRef for scroll
  // Step 3: handleSend — reset content/chunks, call stream() with onChunk that pushes to chunks queue
  // Step 4: type(chunk) — recursive function using requestAnimationFrame:
  //   - Take 2 chars at a time, append to content
  //   - When chunk exhausted, set isTyping=false to trigger next chunk processing
  //   - Auto-scroll contentRef to bottom
  // Step 5: useEffect on [chunks, isTyping] — if not typing and chunks available, shift next chunk and type it
  // Step 6: Render:
  //   - Content section with <Markdown text={content} />
  //   - Textarea + conditional Send/Stop button based on inProgress
  return <div>TODO: Implement</div>
}
