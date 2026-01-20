import { useState } from 'react'
import css from './calculator.module.css'
import styles from '@course/styles'
import cx from '@course/cx'

import { BUTTONS, INVALID_VALUE } from './calculator.utils'

export const Calculator = () => {
  const [state, setState] = useState<string>('0')

  const handleButtonClick = ({ target }: React.MouseEvent<HTMLButtonElement>) => {
    if (target instanceof HTMLElement && target.dataset.label?.length) {
      const label = target.dataset.label
      const button = BUTTONS.get(label)
      if (button) {
        setState((state) => button.action(state, label))
      }
    }
  }

  return (
    <div className={cx(styles.flexColumnCenter, css.calculator)}>
      <output className={css.output}>{state}</output>
      <section className={css.keypad} onClick={handleButtonClick}>
        {Array.from(BUTTONS.values()).map((button) => (
          <button
            disabled={state === INVALID_VALUE && button.label !== 'AC'}
            key={button.label}
            className={css.button}
            data-label={button.label}
          >
            {button.label}
          </button>
        ))}
      </section>
    </div>
  )
}
