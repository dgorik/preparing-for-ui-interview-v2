import React, { useRef, useEffect } from 'react'
import css from './dialog.module.css'
import styles from 'src/utils/styles.module.css'
import cx from 'src/utils/utility'

type TDialogProps = {
  open: boolean
  onConfirm: () => void
  onCancel: () => void
  children: React.ReactNode
}

/**
 * Expected input:
 * <Dialog open={isOpen} onConfirm={handleConfirm} onCancel={handleCancel}>
 *   <h2>Confirm Action</h2>
 *   <p>Are you sure you want to proceed?</p>
 * </Dialog>
 *
 * Step 1: Implement Dialog component
 * - Create a ref for the <dialog> element
 * - Use useEffect to sync open prop: call showModal() when open, close() when not
 * - Render a <dialog> with:
 *   - onClose handler that calls onCancel (handles native Escape key close)
 *   - A <section> for children content
 *   - A <footer> with Confirm and Cancel buttons
 * - Use cx() and styles utilities for layout (padding24, bNone, br8, flexRowBetween, flexGap8)
 */
export function Dialog({ open, onConfirm, onCancel, children }: TDialogProps) {
  // TODO: implement
  return <div>TODO: Implement</div>
}
