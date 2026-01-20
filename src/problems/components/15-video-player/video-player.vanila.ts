import { AbstractComponent } from '../00-abstract-component/component'
import css from './video-player.module.css'

const VIDEO_SOURCES: Record<string, string> = {
  '1080p':
    'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_1MB.mp4',
  '720p': 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_1MB.mp4',
  '360p': 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4',
}
const QUALITIES = Object.keys(VIDEO_SOURCES)

const formatTime = (time: number): string => {
  if (!isFinite(time)) return '0:00'
  const minutes = Math.floor(time / 60)
  const seconds = Math.floor(time % 60)
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

type TVideoPlayerProps = {
  defaultQuality?: string
}

export class VideoPlayer extends AbstractComponent<TVideoPlayerProps> {
  private progress: number = 0
  private duration: number = 0
  private currentTime: number = 0
  private quality: string
  private savedState = { time: 0, wasPlaying: false }

  private videoEl: HTMLVideoElement | null = null
  private playBtn: HTMLButtonElement | null = null
  private timeEl: HTMLSpanElement | null = null
  private progressEl: HTMLInputElement | null = null

  constructor(config: TVideoPlayerProps & { root: HTMLElement }) {
    super({ ...config, listeners: ['click', 'input', 'change'] })
    this.quality = this.config.defaultQuality || QUALITIES[0]
  }

  toHTML(): string {
    return `
            <div class="${css.container}">
                <video 
                    class="${css.video}" 
                    src="${VIDEO_SOURCES[this.quality]}"
                    playsinline
                ></video>
                <div class="${css.controls}">
                    <button class="${css.playButton}" aria-label="Play">▶️</button>
                    <span class="${css.time}">0:00 / 0:00</span>
                    <input type="range" min="0" max="100" value="0" class="${css.progressBar}" />
                    <select class="${css.select}" title="Quality">
                        ${QUALITIES.map((q) => `<option value="${q}" ${q === this.quality ? 'selected' : ''}>${q}</option>`).join('')}
                    </select>
                </div>
            </div>
        `
  }

  afterRender() {
    this.videoEl = this.container!.querySelector(`.${css.video}`)
    this.playBtn = this.container!.querySelector(`.${css.playButton}`)
    this.timeEl = this.container!.querySelector(`.${css.time}`)
    this.progressEl = this.container!.querySelector(`.${css.progressBar}`)

    if (this.videoEl) {
      this.videoEl.addEventListener('timeupdate', () => this.handleTimeUpdate())
      this.videoEl.addEventListener('loadedmetadata', () => this.handleLoadedMetadata())
      this.videoEl.addEventListener('play', () => this.setPlaying(true))
      this.videoEl.addEventListener('pause', () => this.setPlaying(false))
    }
  }

  onClick(e: MouseEvent) {
    const target = e.target as HTMLElement

    if (target.matches(`.${css.video}`)) {
      this.togglePlay()
    } else if (target.matches(`.${css.playButton}`)) {
      this.togglePlay()
    }
  }

  onInput(e: Event) {
    const target = e.target as HTMLInputElement
    if (target.matches(`.${css.progressBar}`)) {
      this.handleSeek(Number(target.value))
    }
  }

  onChange(e: Event) {
    const target = e.target as HTMLSelectElement
    if (target.matches(`.${css.select}`)) {
      this.handleQualityChange(target.value)
    }
  }

  private togglePlay() {
    if (this.videoEl) {
      if (this.videoEl.paused) {
        this.videoEl.play()
      } else {
        this.videoEl.pause()
      }
    }
  }

  private setPlaying(playing: boolean) {
    if (this.playBtn) {
      this.playBtn.textContent = playing ? '⏸️' : '▶️'
      this.playBtn.setAttribute('aria-label', playing ? 'Pause' : 'Play')
    }
  }

  private handleTimeUpdate() {
    if (this.videoEl) {
      this.currentTime = this.videoEl.currentTime
      this.duration = this.videoEl.duration
      this.progress = this.duration > 0 ? (this.currentTime / this.duration) * 100 : 0
      this.updateUI()
    }
  }

  private handleLoadedMetadata() {
    if (this.videoEl) {
      this.duration = this.videoEl.duration
      if (this.savedState.time > 0) {
        this.videoEl.currentTime = this.savedState.time
        if (this.savedState.wasPlaying) {
          this.videoEl.play().catch((e) => console.error('Auto-play failed', e))
        }
        this.savedState = { time: 0, wasPlaying: false }
      }
      this.updateUI()
    }
  }

  private handleSeek(value: number) {
    if (this.videoEl && this.duration > 0) {
      const newTime = (value / 100) * this.duration
      this.videoEl.currentTime = newTime
      this.progress = value
      this.currentTime = newTime
      this.updateUI()
    }
  }

  private handleQualityChange(newQuality: string) {
    if (this.videoEl && newQuality !== this.quality) {
      this.savedState = {
        time: this.videoEl.currentTime,
        wasPlaying: !this.videoEl.paused,
      }
      this.quality = newQuality
      this.videoEl.src = VIDEO_SOURCES[newQuality]
      this.videoEl.load()
    }
  }

  private updateUI() {
    if (this.timeEl) {
      this.timeEl.textContent = `${formatTime(this.currentTime)} / ${formatTime(this.duration)}`
    }
    if (this.progressEl) {
      this.progressEl.value = String(this.progress)
    }
  }
}
