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

export function Dialog({ open, onConfirm, onCancel, children }: TDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open) {
      dialog.showModal()
    } else {
      dialog.close()
    }
  }, [open])

  return (
    <dialog
      ref={dialogRef}
      className={cx(styles.padding24, styles.bNone, styles.br8, css.container)}
      onClose={onCancel}
    >
      <section className={styles.paddingVer8}>{children}</section>
      <footer className={cx(styles.flexRowBetween, styles.flexGap8, styles.paddingVer8)}>
        <button autoFocus onClick={onConfirm}>
          Confirm
        </button>
        <button onClick={onCancel}>Cancel</button>
      </footer>
    </dialog>
  )
}
