// bun test src/problems/02-debounce/test/debounce.test.ts

// export function debounce<F extends (...args: any[]) => void>(
//   fn: F,
//   delay: number,
// ): (...args: Parameters<F>) => void {
//   let timeoutId: ReturnType<typeof setTimeout> | null = null
//   return function debounced(this: unknown, ...args: Parameters<F>): void {
//     if (timeoutId) {
//       clearTimeout(timeoutId)
//     }
//     timeoutId = setTimeout((): void => {
//       fn.apply(this, args)
//       timeoutId = null
//     }, delay)
//   }
// }

export function debounce<T extends (...args: any) => void>(
  fn: T,
  delay: number,
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null

  return function (this: any, ...args: Parameters<T>) {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(() => {
      fn.apply(this, args)
      timeoutId = null
    }, delay)
  }
}

const log = debounce((msg: string) => console.log(msg), 3000)

log('a')
log('b')
log('c')
