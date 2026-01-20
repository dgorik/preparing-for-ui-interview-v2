/**
 * 5.8 StartsWith/EndsWith
 *
 * Implement `StartsWith<T, U>` and `EndsWith<T, U>` which checks if `T` starts or ends with `U`.
 *
 * @example
 * type A = StartsWith<'abc', 'a'> // true
 * type B = EndsWith<'abc', 'c'> // true
 */

import type { Equal, Expect } from '@course/types'

/* _____________ Your Code Here _____________ */

type StartsWith<T extends string, U extends string> = T extends `${U}${infer Rest}` ? true : false

type EndsWith<T extends string, U extends string> = T extends `${infer Rest}${U}` ? true : false

/* _____________ Test Cases _____________ */

type cases = [
  Expect<Equal<StartsWith<'abc', 'ac'>, false>>,
  Expect<Equal<StartsWith<'abc', 'ab'>, true>>,
  Expect<Equal<StartsWith<'abc', 'abc'>, true>>,
  Expect<Equal<StartsWith<'abc', 'abcd'>, false>>,
  Expect<Equal<StartsWith<'abc', ''>, true>>,
  Expect<Equal<StartsWith<'abc', ' '>, false>>,
  Expect<Equal<StartsWith<'', ''>, true>>,

  Expect<Equal<EndsWith<'abc', 'bc'>, true>>,
  Expect<Equal<EndsWith<'abc', 'abc'>, true>>,
  Expect<Equal<EndsWith<'abc', 'd'>, false>>,
  Expect<Equal<EndsWith<'abc', ''>, true>>,
]
