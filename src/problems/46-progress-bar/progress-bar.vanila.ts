import { AbstractComponent, type TComponentConfig } from 'src/utils/utils'
import styles from './progress-bar.module.css'
import flex from 'src/utils/styles.module.css'
import cx from 'src/utils/utility'

type TProgressBarProps = {
  value: number
  max?: number
  label?: string
}

/**
 * Expected usage:
 * new ProgressBar({ root: el, value: 50 })
 * new ProgressBar({ root: el, value: 75, label: 'Loading...' })
 */

export class ProgressBar extends AbstractComponent<TProgressBarProps> {
  private progressEl: HTMLElement | null = null
  private labelOverlayEl: HTMLElement | null = null

  // Step 1: Constructor — call super(config), default max to 100
  // Step 2: percentage getter — Math.min(100, Math.max(0, (value / max) * 100))
  // Step 3: toHTML — render progressbar container with:
  //   - role="progressbar" + aria attributes
  //   - Inner progress div with transform: translateX(-${100-pct}%)
  //   - Optional label + labelOverlay divs (overlay uses clipPath for color contrast)
  // Step 4: afterRender — cache progressEl and labelOverlayEl references
  // Step 5: setValue(value) — update config.value, then update:
  //   - progressEl.style.transform
  //   - labelOverlayEl.style.clipPath
  //   - aria-valuenow and aria-label attributes

  constructor(config: TComponentConfig<TProgressBarProps>) {
    super(config)
    this.config.max = this.config.max ?? 100
  }
  toHTML(): string {
    return '<div>TODO: Implement</div>'
  }
}
