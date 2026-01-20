/**
 * 4.5 Pop
 *
 * Implement a generic `Pop<T>` that takes an Array `T` and returns an array without the last element.
 *
 * @example
 * type arr1 = ['a', 'b', 'c', 'd']
 * type arr2 = [3, 2, 1]
 *
 * type re1 = Pop<arr1> // ['a', 'b', 'c']
 * type re2 = Pop<arr2> // [3, 2]
 */

import type { Equal, Expect } from '@course/types'

/* _____________ Your Code Here _____________ */

type Pop<T extends any[]> = T extends [...infer Head, any] ? Head : []

/* _____________ Test Cases _____________ */

type cases = [
  Expect<Equal<Pop<[3, 2, 1]>, [3, 2]>>,
  Expect<Equal<Pop<['a', 'b', 'c', 'd']>, ['a', 'b', 'c']>>,
  Expect<Equal<Pop<[]>, []>>,
]
