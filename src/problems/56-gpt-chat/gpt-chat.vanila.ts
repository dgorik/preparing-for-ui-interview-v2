import { AbstractComponent, type TComponentConfig } from 'src/utils/utils'
import css from './gpt-chat.module.css'
import flex from 'src/utils/styles.module.css'
import cx from 'src/utils/utility'

type TGPTChatProps = {
  delay?: number
}

/**
 * Expected behavior:
 * - Textarea + Send/Stop button
 * - Streams markdown from /api/stream-markdown?delay=N
 * - Chunks queued and typed out 2 chars at a time via requestAnimationFrame
 * - Content displayed as escaped HTML with line breaks
 */

export class GptChat extends AbstractComponent<TGPTChatProps> {
  private content: string = ''
  private chunks: string[] = []
  private isTyping: boolean = false
  private inProgress: boolean = false
  private controller: AbortController | null = null
  private contentEl: HTMLElement | null = null
  private buttonEl: HTMLButtonElement | null = null

  // Step 1: Constructor — super with listeners: ['click'], default delay to 500
  // Step 2: toHTML — container with content section, textarea, and Send/Stop button
  // Step 3: afterRender — cache contentEl and buttonEl references
  // Step 4: onClick — if button clicked, toggle between handleSend() and abort()
  // Step 5: stream(onChunk) — async method:
  //   - Create AbortController, fetch with ReadableStream reader
  //   - Decode chunks in while loop, call onChunk for each
  //   - Handle AbortError silently, update inProgress + button text
  // Step 6: handleSend — reset content/chunks, call stream() pushing chunks to queue, trigger processChunks
  // Step 7: processChunks — if not typing and chunks available, shift next chunk and call type()
  // Step 8: type(chunk) — recursive with requestAnimationFrame:
  //   - Take 2 chars, append to content, updateContent()
  //   - When done, isTyping=false, call processChunks() for next chunk
  //   - Auto-scroll contentEl
  // Step 9: updateContent — set contentEl.innerHTML (escaped HTML with <br> for newlines)
  // Step 10: abort — controller.abort(), reset inProgress, update button

  constructor(config: TComponentConfig<TGPTChatProps>) {
    super(config)
  }
  toHTML(): string {
    return '<div>TODO: Implement</div>'
  }
}
