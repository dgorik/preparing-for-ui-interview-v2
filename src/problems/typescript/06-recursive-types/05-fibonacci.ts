/**
 * 6.5 Fibonacci
 *
 * Implement a generic `Fibonacci<T>` takes an number `T` and returns its corresponding Fibonacci number.
 *
 * The sequence starts: 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, ...
 *
 * @example
 * type Result1 = Fibonacci<3> // 2
 * type Result2 = Fibonacci<8> // 21
 */

import type { Equal, Expect } from '@course/types'

/* _____________ Your Code Here _____________ */

type Fibonacci<
  T extends number,
  Index extends any[] = [1],
  Prev extends any[] = [],
  Curr extends any[] = [1],
> = Index['length'] extends T
  ? Curr['length']
  : Fibonacci<T, [...Index, 1], Curr, [...Prev, ...Curr]>

/* _____________ Test Cases _____________ */

type cases = [
  Expect<Equal<Fibonacci<1>, 1>>,
  Expect<Equal<Fibonacci<2>, 1>>,
  Expect<Equal<Fibonacci<3>, 2>>,
  Expect<Equal<Fibonacci<8>, 21>>,
]
