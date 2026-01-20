/**
 * 6.4 Flatten Depth
 *
 * Recursively flatten array up to `Depth` times.
 *
 * @example
 * type a = FlattenDepth<[1, 2, [3, 4], [[[5]]]], 2> // [1, 2, 3, 4, [5]]. flattern 2 times
 * type b = FlattenDepth<[1, 2, [3, 4], [[[5]]]]> // [1, 2, 3, 4, [[5]]]. Depth defaults to 1
 */

import type { Equal, Expect } from '@course/types'

/* _____________ Your Code Here _____________ */

type FlattenDepth<
  S extends any[],
  N extends number = 1,
  D extends any[] = [],
> = D['length'] extends N
  ? S
  : S extends [infer First, ...infer Rest]
    ? First extends any[]
      ? [...FlattenDepth<First, N, [...D, any]>, ...FlattenDepth<Rest, N, D>]
      : [First, ...FlattenDepth<Rest, N, D>]
    : []

/* _____________ Test Cases _____________ */

type cases = [
  Expect<Equal<FlattenDepth<[]>, []>>,
  Expect<Equal<FlattenDepth<[1, 2, 3, 4]>, [1, 2, 3, 4]>>,
  Expect<Equal<FlattenDepth<[1, [2]]>, [1, 2]>>,
  Expect<Equal<FlattenDepth<[1, 2, [3, 4], [[[5]]]], 2>, [1, 2, 3, 4, [5]]>>,
  Expect<Equal<FlattenDepth<[1, 2, [3, 4], [[[5]]]]>, [1, 2, 3, 4, [[5]]]>>,
  Expect<Equal<FlattenDepth<[1, [2, [3, [4, [5]]]]], 3>, [1, 2, 3, 4, [5]]>>,
  Expect<Equal<FlattenDepth<[1, [2, [3, [4, [5]]]]], 19260817>, [1, 2, 3, 4, 5]>>,
]
