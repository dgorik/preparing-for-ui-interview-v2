import { SquareGame } from './square-game.react'
import { GameOfThree } from './square-game.vanila'
import { useEffect, useRef } from 'react'

export const SquareGameExample = () => {
  return <SquareGame />
}

export const SquareGameVanillaExample = () => {
  const rootRef = useRef<HTMLDivElement>(null)
  const gameRef = useRef<GameOfThree | null>(null)

  useEffect(() => {
    if (!rootRef.current) return

    gameRef.current = new GameOfThree({
      root: rootRef.current,
    })

    gameRef.current.render()

    return () => {
      gameRef.current?.destroy()
      gameRef.current = null
    }
  }, [])

  return <div ref={rootRef} />
}
