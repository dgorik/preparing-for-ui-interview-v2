/**
 * 9.2 IsAny
 *
 * Implement `IsAny<T>` which takes an input type `T` and returns `true` if `T` is `any`, otherwise `false`.
 *
 * @example
 * type A = IsAny<any>     // true
 * type B = IsAny<unknown> // false
 * type C = IsAny<string>  // false
 */

import type { Equal, Expect } from '@course/types'

/* _____________ Your Code Here _____________ */

type IsAny<T> = 0 extends 1 & T ? true : false

/* _____________ Test Cases _____________ */

type cases = [
  Expect<Equal<IsAny<any>, true>>,
  Expect<Equal<IsAny<undefined>, false>>,
  Expect<Equal<IsAny<unknown>, false>>,
  Expect<Equal<IsAny<never>, false>>,
  Expect<Equal<IsAny<string>, false>>,
]
