export default function enhanced_debouncer<T extends (...args: any[]) => void>(
  fn: T,
  delay: number,
  options?: { immediate?: boolean },
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null

  return function (this: unknown, ...args: Parameters<T>) {
    if (options?.immediate && !timeoutId) {
      fn.apply(this, args)
    }
    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    timeoutId = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}

const log = enhanced_debouncer((msg: string) => console.log('LOG:', msg), 500, { immediate: true })

log('a')
log('b')
log('c')
