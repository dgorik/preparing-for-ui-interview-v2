import { useState, useRef, useEffect } from 'react'
import { Dialog } from './dialog.react'
import { Dialog as VanillaDialog } from './dialog.vanila'

export function DialogExample() {
  const [open, setOpen] = useState(false)

  const handleConfirm = () => setOpen(false);
  const handleCancel = () => setOpen(false)
  

  return (
    <div>
      <button onClick={() => setOpen(true)}>Open Dialog</button>
      <Dialog open={open} onConfirm={handleConfirm} onCancel={handleCancel}>
        <h2>Confirm Action</h2>
        <p>Are you sure you want to proceed?</p>
      </Dialog>
    </div>
  )
}

export function DialogVanillaExample() {
  const rootRef = useRef<HTMLDivElement>(null)
  const dialogRef = useRef<VanillaDialog | null>(null)

  useEffect(() => {
    if (!rootRef.current) return
    dialogRef.current = new VanillaDialog({
      root: rootRef.current,
      content: `
        <h2>Confirm Action</h2>
        <p>Are you sure you want to proceed?</p>
      `,
      onConfirm: () => console.log('Confirmed'),
      onCancel: () => console.log('Cancelled'),
    })
    dialogRef.current.render()
    return () => {
      dialogRef.current?.destroy()
      dialogRef.current = null
    }
  }, [])

  const handleOpen = () => {
    dialogRef.current?.open()
  }

  return (
    <div>
      <button onClick={handleOpen}>Open Dialog</button>
      <div ref={rootRef}></div>
    </div>
  )
}
