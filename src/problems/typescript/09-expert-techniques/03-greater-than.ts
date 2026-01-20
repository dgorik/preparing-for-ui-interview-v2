/**
 * 9.3 Greater Than
 *
 * Implement `GreaterThan<T, U>` which checks if number `T` is greater than number `U` at the type level.
 *
 * @example
 * type Result = GreaterThan<5, 3>  // true
 * type Result2 = GreaterThan<3, 5> // false
 */

import type { Equal, Expect } from '@course/types'

/* _____________ Your Code Here _____________ */

type GreaterThan<
  T extends number,
  U extends number,
  Acc extends any[] = [],
> = Acc['length'] extends T
  ? false
  : Acc['length'] extends U
    ? true
    : GreaterThan<T, U, [...Acc, any]>

/* _____________ Test Cases _____________ */

type cases = [
  Expect<Equal<GreaterThan<1, 0>, true>>,
  Expect<Equal<GreaterThan<5, 4>, true>>,
  Expect<Equal<GreaterThan<4, 5>, false>>,
  Expect<Equal<GreaterThan<0, 0>, false>>,
  Expect<Equal<GreaterThan<10, 9>, true>>,
  Expect<Equal<GreaterThan<20, 20>, false>>,
]
