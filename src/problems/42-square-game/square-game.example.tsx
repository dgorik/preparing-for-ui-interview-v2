import { SquareGame } from './solution/square-game.react'
import { SquareGame as SquareGameStudent } from './square-game.react'
import { GameOfThree } from './solution/square-game.vanila'
import { useEffect, useRef } from 'react'
import flex from 'src/utils/styles.module.css'
import cx from 'src/utils/utility'

// One move away from winning: just swap 8 and null
const NEAR_WIN_STATE = [
  [1, 2, 3],
  [4, 5, 6],
  [7, null, 8],
]

// React: Near win + Fully random
export const SquareGameExample = () => {
  return (
    <div className={cx(flex.flexColumnGap32)}>
      <div>
        <h3>Near Win (1 move)</h3>
        <SquareGame initState={NEAR_WIN_STATE} />
      </div>
      <div>
        <h3>Fully Random</h3>
        <SquareGame />
      </div>
    </div>
  )
}

// Vanilla helper
const VanillaGame = ({ initState }: { initState?: (number | null)[][] }) => {
  const rootRef = useRef<HTMLDivElement>(null)
  const gameRef = useRef<GameOfThree | null>(null)

  useEffect(() => {
    if (!rootRef.current) return

    gameRef.current = new GameOfThree({
      root: rootRef.current,
      ...(initState ? { initState } : {}),
    })

    gameRef.current.render()

    return () => {
      gameRef.current?.destroy()
      gameRef.current = null
    }
  }, [])

  return <div ref={rootRef} />
}

// Vanilla: Near win + Fully random
export const SquareGameVanillaExample = () => {
  return (
    <div className={cx(flex.flexColumnGap32)}>
      <div>
        <h3>Near Win (1 move)</h3>
        <VanillaGame initState={NEAR_WIN_STATE} />
      </div>
      <div>
        <h3>Fully Random</h3>
        <VanillaGame />
      </div>
    </div>
  )
}

// Student: Near win + Fully random
export const SquareGameStudentExample = () => {
  return (
    <div className={cx(flex.flexColumnGap32)}>
      <div>
        <h3>Near Win (1 move)</h3>
        <SquareGameStudent initState={NEAR_WIN_STATE} />
      </div>
      <div>
        <h3>Fully Random</h3>
        <SquareGameStudent />
      </div>
    </div>
  )
}
