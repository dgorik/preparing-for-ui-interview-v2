/**
 * 9.4 Transpose
 *
 * Implement `Transpose<M>` which transposes a matrix `M` (2D array).
 *
 * @example
 * type Matrix = [
 *   [1, 2, 3],
 *   [4, 5, 6]
 * ]
 * type Result = Transpose<Matrix>
 * // [[1, 4], [2, 5], [3, 6]]
 */

import type { Equal, Expect } from '@course/types'

/* _____________ Your Code Here _____________ */

type Transpose<M extends number[][], R = M['length'] extends 0 ? [] : M[0]> = {
  [X in keyof R]: {
    [Y in keyof M]: X extends keyof M[Y] ? M[Y][X] : never
  }
}

/* _____________ Test Cases _____________ */

type cases = [
  Expect<Equal<Transpose<[]>, []>>,
  Expect<Equal<Transpose<[[1]]>, [[1]]>>,
  Expect<Equal<Transpose<[[1, 2]]>, [[1], [2]]>>,
  Expect<Equal<Transpose<[[1, 2], [3, 4]]>, [[1, 3], [2, 4]]>>,
  Expect<Equal<Transpose<[[1, 2, 3], [4, 5, 6]]>, [[1, 4], [2, 5], [3, 6]]>>,
  Expect<Equal<Transpose<[[1, 4], [2, 5], [3, 6]]>, [[1, 2, 3], [4, 5, 6]]>>,
  Expect<Equal<Transpose<[[1, 2, 3], [4, 5, 6], [7, 8, 9]]>, [[1, 4, 7], [2, 5, 8], [3, 6, 9]]>>,
]
