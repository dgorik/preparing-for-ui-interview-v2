import { useState } from 'react'
import flex from 'src/utils/styles.module.css'
import cx from 'src/utils/utility'
import styles from './square-game.module.css'
import { getEmptyPosition, getGameState, isWin, validate } from './square-game.utility'

const GAME_SIZE = 3

type TSquareGameProps = {
  initState?: Array<Array<number | null>>
}

export const SquareGame = ({ initState }: TSquareGameProps = {}) => {
  const [state, setState] = useState(initState ?? getGameState(GAME_SIZE))

  const handleCellClick: React.MouseEventHandler = ({ target }) => {
    if (!(target instanceof HTMLElement)) {
      return
    }
    const [rowIndex, colIndex] = [Number(target.dataset.row), Number(target.dataset.col)]
    if (isNaN(rowIndex) || isNaN(colIndex)) {
      return
    }
    const [emptyRow, emptyCol] = getEmptyPosition(state)
    if (validate([rowIndex, colIndex], [emptyRow, emptyCol])) {
      const newState = structuredClone(state)
      ;[newState[rowIndex][colIndex], newState[emptyRow][emptyCol]] = [
        newState[emptyRow][emptyCol],
        newState[rowIndex][colIndex],
      ]
      setState(newState)
    }
  }

  return (
    <section className={cx(flex.flexColumnCenter, flex.flexGap16)}>
      <div>Game status: {isWin(state) ? 'win' : 'not yet'}</div>
      <div onClickCapture={handleCellClick} className={cx(styles.board, flex.bgBlack8)}>
        {state.map((row, rowIndex) => (
          <>
            {row.map((col, colIndex) => (
              <div
                key={colIndex}
                className={cx(
                  styles.cell,
                  flex.wh200px,
                  flex.flexRowCenter,
                  flex.cWhite10,
                  col == null ? styles.cell__empty : styles.cell__filled,
                  col == null ? flex.bgWhite5 : flex.bgBlack10,
                  flex.fontXL,
                )}
                data-row={rowIndex}
                data-col={colIndex}
              >
                {col}
              </div>
            ))}
          </>
        ))}
      </div>
    </section>
  )
}
