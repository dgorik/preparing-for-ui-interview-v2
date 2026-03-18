/**
 * 6.3 Reverse
 *
 * Implement the type version of `Array.reverse`.
 *
 * @example
 * type a = Reverse<['a', 'b']> // ['b', 'a']
 * type b = Reverse<['a', 'b', 'c']> // ['c', 'b', 'a']
 */

import type { Equal, Expect } from 'src/utils/types'

/* _____________ Your Code Here _____________ */

type Reverse<T extends any[]> = T extends [infer First, ...infer Rest]
  ? [...Reverse<Rest>, First]
  : []

/* _____________ Test Cases _____________ */

type cases = [
  Expect<Equal<Reverse<[]>, []>>,
  Expect<Equal<Reverse<['a', 'b']>, ['b', 'a']>>,
  Expect<Equal<Reverse<['a', 'b', 'c']>, ['c', 'b', 'a']>>,
]

type errors = [
  // @ts-expect-error strings are not valid arrays
  Reverse<'string'>,
  // @ts-expect-error objects are not valid arrays
  Reverse<{ key: 'value' }>,
]
