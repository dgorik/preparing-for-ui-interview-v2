// bun test src/problems/05-throttle/test/throttle.test.ts

export function throttle<F extends (...args: any[]) => any>(
  fn: F,
  delay: number,
): (...args: Parameters<F>) => void {
  let lastCall: number = 0
  return function (this: any, ...args: Parameters<F>): void {
    const now: number = Date.now()
    if (now - lastCall >= delay) {
      lastCall = now
      fn.apply(this, args)
    }
  }
}
// --- Examples ---
// Uncomment to test your implementation:

const log = throttle((msg: string) => console.log(msg), 300)
log('a') // fires immediately → "a"
log('b') // ignored (within 300ms)
log('c') // ignored (within 300ms)
setTimeout(() => log('d'), 400) // fires → "d" (300ms passed)
