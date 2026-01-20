import { VideoPlayerComponent } from './video-player.react'
import { VideoPlayer } from './video-player.vanila'
import { useEffect, useRef } from 'react'

export const VideoPlayerExample = () => <VideoPlayerComponent />

export const VideoPlayerVanillaExample = () => {
  const rootRef = useRef<HTMLDivElement>(null)
  const instanceRef = useRef<VideoPlayer | null>(null)

  useEffect(() => {
    if (!rootRef.current) return
    instanceRef.current = new VideoPlayer({ root: rootRef.current })
    instanceRef.current.render()

    return () => {
      instanceRef.current?.destroy()
      instanceRef.current = null
    }
  }, [])

  return <div ref={rootRef} />
}
