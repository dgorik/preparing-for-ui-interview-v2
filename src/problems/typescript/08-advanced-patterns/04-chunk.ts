/**
 * 8.4 Chunk
 *
 * Implement `Chunk<T, N>` which splits an array `T` into chunks of size `N`.
 *
 * @example
 * type Result = Chunk<[1, 2, 3, 4, 5], 2>
 * // [[1, 2], [3, 4], [5]]
 */

import type { Equal, Expect } from '@course/types'

/* _____________ Your Code Here _____________ */

type Chunk<
  T extends any[],
  N extends number,
  C extends any[] = [],
  A extends any[] = [],
> = C['length'] extends N
  ? Chunk<T, N, [], [...A, C]>
  : T extends [infer F, ...infer R]
    ? Chunk<R, N, [...C, F], A>
    : C['length'] extends 0
      ? A
      : [...A, C]

/* _____________ Test Cases _____________ */

type cases = [
  Expect<Equal<Chunk<[], 1>, []>>,
  Expect<Equal<Chunk<[1, 2, 3], 1>, [[1], [2], [3]]>>,
  Expect<Equal<Chunk<[1, 2, 3], 2>, [[1, 2], [3]]>>,
  Expect<Equal<Chunk<[1, 2, 3, 4], 2>, [[1, 2], [3, 4]]>>,
  Expect<Equal<Chunk<[1, 2, 3, 4], 5>, [[1, 2, 3, 4]]>>,
  Expect<Equal<Chunk<[1, true, 2, false], 2>, [[1, true], [2, false]]>>,
]
