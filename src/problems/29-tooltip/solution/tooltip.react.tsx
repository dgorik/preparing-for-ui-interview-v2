import React, { useEffect } from 'react'
import css from './tooltip.module.css'
import cx from 'src/utils/utility'

type TooltipProps = {
  position?: 'top' | 'bottom' | 'left' | 'right' | 'auto'
  children: React.ReactNode
  content: React.ReactNode
  boundary?: React.RefObject<HTMLElement | null> | HTMLElement
}

const positions = {
  top: css.top,
  bottom: css.bottom,
  left: css.left,
  right: css.right,
} as const

type TCandidate = { position: 'top' | 'bottom' | 'left' | 'right'; x: number; y: number }

const getAutoPosition = (
  tooltipRect: DOMRect,
  triggerRect: DOMRect,
  boundaryRect: { left: number; top: number; right: number; bottom: number },
): 'top' | 'bottom' | 'left' | 'right' => {
  const { width: tw, height: th } = tooltipRect
  const { left: trL, top: trT, width: trW, height: trH, right: trR, bottom: trB } = triggerRect

  const fits = (x: number, y: number) =>
    x >= boundaryRect.left &&
    y >= boundaryRect.top &&
    Math.ceil(x + tw) <= boundaryRect.right &&
    Math.ceil(y + th) <= boundaryRect.bottom

  const candidates: TCandidate[] = [
    { position: 'top', x: trL, y: trT - th },
    { position: 'right', x: trR, y: trT },
    { position: 'bottom', x: trL, y: trB },
    { position: 'left', x: trL - tw, y: trT },
  ]

  return candidates.find(({ x, y }) => fits(x, y))?.position ?? 'top'
}

export function Tooltip({ children, content, position = 'top', boundary }: TooltipProps) {
  const [isVisible, setIsVisible] = React.useState(false)
  const [tooltipPosition, setTooltipPosition] = React.useState<'top' | 'bottom' | 'left' | 'right'>(
    position === 'auto' ? 'top' : position,
  )
  const tooltipRef = React.useRef<HTMLDivElement>(null)
  const containerRef = React.useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isVisible && position === 'auto' && tooltipRef.current && containerRef.current) {
      const tooltipRect = tooltipRef.current.getBoundingClientRect()
      const triggerRect = containerRef.current.getBoundingClientRect()

      const boundaryElement = boundary instanceof HTMLElement ? boundary : boundary?.current
      const boundaryRect = boundaryElement
        ? boundaryElement.getBoundingClientRect()
        : { left: 0, top: 0, right: window.innerWidth, bottom: window.innerHeight }

      const newPosition = getAutoPosition(tooltipRect, triggerRect, boundaryRect)

      if (newPosition !== tooltipPosition) {
        setTooltipPosition(newPosition)
      }
    }
  }, [isVisible, position, tooltipPosition, boundary])

  const tooltipId = React.useId()

  const show = () => setIsVisible(true)
  const hide = () => {
    setIsVisible(false)
    if (position === 'auto') setTooltipPosition('top')
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      hide()
    }
  }

  return (
    <div
      ref={containerRef}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
      onKeyDown={handleKeyDown}
      className={css.container}
      aria-describedby={isVisible ? tooltipId : undefined}
    >
      {children}
      {isVisible && (
        <div
          id={tooltipId}
          role="tooltip"
          ref={tooltipRef}
          className={cx(css.tooltip, positions[tooltipPosition])}
        >
          {content}
        </div>
      )}
    </div>
  )
}
