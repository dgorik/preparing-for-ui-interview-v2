import css from './video-player.module.css'
import { useRef, useState } from 'react'

// Real video sources for different resolutions (10s clips for testing)
const VIDEO_SOURCES: Record<string, string> = {
  '1080p':
    'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_1MB.mp4',
  '720p': 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_1MB.mp4',
  '360p': 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4',
}
const QUALITIES = Object.keys(VIDEO_SOURCES)

type TVideoPlayerState = {
  isPlaying: boolean
  progress: number
  duration: number
  currentTime: number
  quality: string
}

const formatTime = (time: number) => {
  if (!isFinite(time)) return '0:00'
  const minutes = Math.floor(time / 60)
  const seconds = Math.floor(time % 60)
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

export const VideoPlayerComponent = () => {
  const videoRef = useRef<HTMLVideoElement>(null)

  const [state, setState] = useState<TVideoPlayerState>({
    isPlaying: false,
    progress: 0,
    duration: 0,
    currentTime: 0,
    quality: QUALITIES[0],
  })

  const savedState = useRef({ time: 0, wasPlaying: false })

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play()
      } else {
        videoRef.current.pause()
      }
    }
  }

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime
      const dur = videoRef.current.duration
      setState((s) => ({
        ...s,
        currentTime: current,
        duration: dur,
        progress: dur > 0 ? (current / dur) * 100 : 0,
      }))
    }
  }

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setState((s) => ({ ...s, duration: videoRef.current!.duration }))
      if (savedState.current.time > 0) {
        videoRef.current.currentTime = savedState.current.time
        if (savedState.current.wasPlaying) {
          videoRef.current.play().catch((e) => console.error('Auto-play failed after switch', e))
        }
        savedState.current = { time: 0, wasPlaying: false } // Reset
      }
    }
  }

  const handleQualityChange = (newQuality: string) => {
    if (videoRef.current) {
      savedState.current = {
        time: videoRef.current.currentTime,
        wasPlaying: !videoRef.current.paused,
      }
      setState((s) => ({ ...s, quality: newQuality }))
    }
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value)
    if (videoRef.current) {
      const newTime = (newValue / 100) * state.duration
      videoRef.current.currentTime = newTime
      setState((s) => ({ ...s, progress: newValue, currentTime: newTime }))
    }
  }

  return (
    <div className={css.container}>
      <video
        ref={videoRef}
        className={css.video}
        src={VIDEO_SOURCES[state.quality]}
        controls={false}
        playsInline
        onClick={togglePlay}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onPlay={() => setState((s) => ({ ...s, isPlaying: true }))}
        onPause={() => setState((s) => ({ ...s, isPlaying: false }))}
      />

      <div className={css.controls}>
        <button
          onClick={togglePlay}
          className={css.playButton}
          aria-label={state.isPlaying ? 'Pause' : 'Play'}
        >
          {state.isPlaying ? '⏸️' : '▶️'}
        </button>

        <span className={css.time}>
          {formatTime(state.currentTime)} / {formatTime(state.duration)}
        </span>

        <input
          type="range"
          min="0"
          max="100"
          value={state.progress}
          onChange={handleSeek}
          className={css.progressBar}
        />

        <select
          className={css.select}
          value={state.quality}
          onChange={(e) => handleQualityChange(e.target.value)}
          title="Quality"
        >
          {QUALITIES.map((q) => (
            <option key={q} value={q}>
              {q}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
