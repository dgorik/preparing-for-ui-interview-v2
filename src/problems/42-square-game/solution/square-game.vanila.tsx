import { AbstractComponent } from 'src/utils/utils'
import { getEmptyPosition, getGameState, isWin, validate } from './square-game.utility'
import css from './square-game.module.css'
import flex from 'src/utils/styles.module.css'
import cx from 'src/utils/utility'

const GAME_SIZE = 3

export type TSquareGameProps = {
  initState?: Array<Array<number | null>>
}

export class GameOfThree extends AbstractComponent<TSquareGameProps> {
  state: Array<Array<number | null>>

  constructor(config: { root: HTMLElement } & TSquareGameProps) {
    super({ ...config, listeners: ['click'] })
    this.state = config.initState ?? getGameState(GAME_SIZE)
  }

  toHTML() {
    const cells = this.state
      .map((row, rowIndex) => {
        return row
          .map((col, colIndex) => {
            const cellClass = col === null ? css.cell__empty : css.cell__filled
            const bgClass = col === null ? flex.bgWhite5 : flex.bgBlack10
            return `
                        <div 
                            class="${cx(css.cell, flex.wh200px, flex.flexRowCenter, flex.cWhite10, cellClass, bgClass, flex.fontXL)}"
                            data-row="${rowIndex}" 
                            data-col="${colIndex}"
                        >
                            ${col == null ? '' : col} 
                        </div>`.trim()
          })
          .join('')
      })
      .join('')

    return `
            <section class="${cx(flex.flexColumnCenter, flex.flexGap16)}">
                <div>Game status: ${isWin(this.state) ? 'win' : 'not yet'}</div>
                <div class="${cx(css.board, flex.bgBlack8)}">
                    ${cells}
                </div>
            </section>
        `
  }

  onClick(e: Event) {
    const target = e.target as HTMLElement
    const row = Number(target.dataset.row)
    const col = Number(target.dataset.col)

    if (isNaN(row) || isNaN(col)) return

    const [emptyRow, emptyCol] = getEmptyPosition(this.state)
    if (validate([row, col], [emptyRow, emptyCol])) {
      const newState = structuredClone(this.state)
      ;[newState[row][col], newState[emptyRow][emptyCol]] = [
        newState[emptyRow][emptyCol],
        newState[row][col],
      ]
      this.state = newState
      this.render()
    }
  }
}
