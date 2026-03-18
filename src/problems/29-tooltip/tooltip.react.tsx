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

/**
 * Helper: determine best position when position='auto'
 * - Get bounding rects for tooltip and trigger
 * - Check candidates (top, right, bottom, left) against boundary
 * - Return first position that fits, or 'top' as fallback
 */
const getAutoPosition = (
  tooltipRect: DOMRect,
  triggerRect: DOMRect,
  boundaryRect: { left: number; top: number; right: number; bottom: number },
): 'top' | 'bottom' | 'left' | 'right' => {
  // TODO: implement
  return 'top'
}

/**
 * Expected input:
 * <Tooltip position="top" content="Tooltip text">
 *   <button>Hover me</button>
 * </Tooltip>
 *
 * Optional: position="auto" with boundary={ref} for auto-positioning
 *
 * Step 1: Implement Tooltip component
 * - Track isVisible with useState (default: false)
 * - Track tooltipPosition with useState (default: position or 'top')
 * - Create refs for tooltip element and container element
 * - Use useEffect to compute auto-position when visible and position='auto'
 * - Generate unique id with useId() for aria-describedby
 * - Implement show/hide handlers for mouse enter/leave, focus/blur
 * - Handle Escape key to hide tooltip
 * - Render:
 *   - Container div with mouse/focus/keyboard handlers and css.container
 *   - Children inside the container
 *   - When visible: tooltip div with role="tooltip", id, ref, and position class
 *   - Use aria-describedby on container pointing to tooltip id when visible
 */
export function Tooltip({ children, content, position = 'top', boundary }: TooltipProps) {
  // TODO: implement
  return <div>TODO: Implement</div>
}
