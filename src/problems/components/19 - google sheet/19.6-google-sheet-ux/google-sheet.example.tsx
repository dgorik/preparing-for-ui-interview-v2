import { GoogleSheet } from './solution/google-sheet.react'
import { GoogleSheet as GoogleSheetStudent } from './google-sheet.react'
import { GoogleSheet as VanillaGoogleSheet } from './solution/google-sheet.vanila'
import { GoogleSheet as StudentVanillaGoogleSheet } from './google-sheet.vanila'
import { useRef, useEffect } from 'react'

export const GoogleSheetExample = () => {
  return <GoogleSheet />
}

export const GoogleSheetVanillaExample = () => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return

    // Create vanilla instance
    const component = new VanillaGoogleSheet({
      root: ref.current,
    })

    component.render()

    return () => {
      component.destroy()
    }
  }, [])

  return <div ref={ref} />
}
export const GoogleSheetStudentExample = () => {
  return <GoogleSheetStudent />
}

export const GoogleSheetStudentVanillaExample = () => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return
    const component = new StudentVanillaGoogleSheet({ root: ref.current })
    if (component.render) component.render()
    return () => {
      component.destroy?.()
    }
  }, [])

  return <div ref={ref} />
}
