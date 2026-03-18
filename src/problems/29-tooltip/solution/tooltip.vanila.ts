import { AbstractComponent, type TComponentConfig } from 'src/utils/utils'
import css from './tooltip.module.css'

type TTooltipProps = {
  position?: 'top' | 'bottom' | 'left' | 'right' | 'auto'
  children: HTMLElement
  content: string
  boundary?: HTMLElement
}

const positions = {
  top: css.top,
  bottom: css.bottom,
  left: css.left,
  right: css.right,
} as const

let id = 0

type TCandidate = { position: 'top' | 'bottom' | 'left' | 'right'; x: number; y: number }

function getAutoPosition(
  tooltip: HTMLElement,
  container: HTMLElement,
  boundaryRect: { left: number; top: number; right: number; bottom: number },
) {
  const t = tooltip.getBoundingClientRect()
  const c = container.getBoundingClientRect()

  const fits = (x: number, y: number) =>
    x >= boundaryRect.left &&
    y >= boundaryRect.top &&
    Math.ceil(x + t.width) <= boundaryRect.right &&
    Math.ceil(y + t.height) <= boundaryRect.bottom

  const candidates: TCandidate[] = [
    { position: 'top', x: c.left, y: c.top - t.height },
    { position: 'right', x: c.right, y: c.top },
    { position: 'bottom', x: c.left, y: c.bottom },
    { position: 'left', x: c.left - t.width, y: c.top },
  ]

  return candidates.find(({ x, y }) => fits(x, y))?.position ?? 'top'
}

export class Tooltip extends AbstractComponent<TTooltipProps> {
  id = id++
  tooltipElement: HTMLElement | null = null

  constructor(config: TComponentConfig<TTooltipProps>) {
    super({
      ...config,
      className: [css.container],
      listeners: ['mouseenter', 'mouseleave', 'focusin', 'focusout', 'keydown'],
    })
  }

  toHTML(): string {
    const position = this.config.position ?? 'top'
    return `<div id="tooltip-${this.id}" style="display: none;" role="tooltip" class="${css.tooltip} ${positions[position as keyof typeof positions]}">${this.config.content}</div>`
  }

  afterRender(): void {
    this.container!.appendChild(this.config.children)
    this.tooltipElement = this.container!.querySelector(`#tooltip-${this.id}`)
  }

  onMouseenter() {
    this.showTooltip()
  }

  onMouseleave() {
    this.tooltipElement!.style.display = 'none'
  }

  onFocusin() {
    this.showTooltip()
  }

  onFocusout() {
    this.tooltipElement!.style.display = 'none'
  }

  onKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      this.tooltipElement!.style.display = 'none'
    }
  }

  showTooltip() {
    this.tooltipElement!.style.display = 'block'
    if (this.config.position === 'auto') {
      const boundaryRect = this.config.boundary
        ? this.config.boundary.getBoundingClientRect()
        : { left: 0, top: 0, right: window.innerWidth, bottom: window.innerHeight }

      const position =
        positions[getAutoPosition(this.tooltipElement!, this.container!, boundaryRect)]
      for (const classname of Object.values(positions)) {
        this.tooltipElement!.classList.remove(classname)
      }
      this.tooltipElement!.classList.add(position)
    }
  }
}
