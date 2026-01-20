import { AbstractComponent } from '../00-abstract-component/component'
import { getEmptyPosition, getGameState, isWin, validate } from './square-game.utility'
import css from './square-game.module.css'

const GAME_SIZE = 3

export type TSquareGameProps = {}

export class GameOfThree extends AbstractComponent<TSquareGameProps> {
  state: Array<Array<number | null>>

  constructor(config: { root: HTMLElement }) {
    super({ ...config, listeners: ['click'] })
    this.state = getGameState(GAME_SIZE)
  }

  toHTML() {
    const cells = this.state
      .map((row, rowIndex) => {
        return row
          .map((col, colIndex) => {
            const cellClass = col === null ? css.cell__empty : css.cell__filled
            return `
                        <div 
                            class="${css.cell} ${cellClass}"
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
            <section class="${css.container}">
                <div>Game status: ${isWin(this.state) ? 'win' : 'not yet'}</div>
                <div class="${css.board}">
                    ${cells}
                </div>
            </section>
        `
  }

  onClick(e: Event) {
    const target = e.target as HTMLElement
    const rowStr = target.dataset.row
    const colStr = target.dataset.col

    if (rowStr === undefined || colStr === undefined) return

    const row = parseInt(rowStr, 10)
    const col = parseInt(colStr, 10)

    if (isNaN(row) || isNaN(col)) return

    const [emptyRow, emptyCol] = getEmptyPosition(this.state)
    if (validate([row, col], [emptyRow, emptyCol])) {
      const newState = this.state.map((r) => [...r])
      ;[newState[row][col], newState[emptyRow][emptyCol]] = [
        newState[emptyRow][emptyCol],
        newState[row][col],
      ]
      this.state = newState
      this.render()
    }
  }
}
