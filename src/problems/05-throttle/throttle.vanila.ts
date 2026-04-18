// bun test src/problems/05-throttle/test/throttle.test.ts

export default function throttle<T extends (...args: any) => void>(
  fn: T,
  timewindow: number,
): (...args: Parameters<T>) => void {
  let lastfired: number = 0
  return function (this: unknown, ...args: Parameters<T>) {
    let now = Date.now()
    if (now - timewindow > lastfired) {
      fn.apply(this, args)
      lastfired = now
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
