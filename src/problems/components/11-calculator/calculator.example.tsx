import { useEffect, useRef } from 'react'
import { Calculator } from './calculator.react'
import { Calculator as VanillaCalculator } from './calculator.vanila'

export const CalculatorExample = () => {
  return <Calculator />
}

export const CalculatorVanillaExample = () => {
  const rootRef = useRef<HTMLElement>(null)
  const calculatorRef = useRef<VanillaCalculator | null>(null)

  useEffect(() => {
    if (!rootRef.current) return

    calculatorRef.current = new VanillaCalculator({
      root: rootRef.current,
    })

    calculatorRef.current.render()

    return () => {
      calculatorRef.current?.destroy()
      calculatorRef.current = null
    }
  }, [])

  return <section ref={rootRef} />
}
