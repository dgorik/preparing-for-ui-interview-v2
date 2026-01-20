/**
 * 5.7 Length of String
 *
 * Compute the length of a string literal, which behaves like `String#length`.
 *
 * @example
 * type len = LengthOfString<'Hello'> // 5
 */

import type { Equal, Expect } from '@course/types'

/* _____________ Your Code Here _____________ */

type LengthOfString<
  S extends string,
  Acc extends string[] = [],
> = S extends `${infer Head}${infer Rest}` ? LengthOfString<Rest, [...Acc, Head]> : Acc['length']

/* _____________ Test Cases _____________ */

type cases = [
  Expect<Equal<LengthOfString<''>, 0>>,
  Expect<Equal<LengthOfString<'kumiko'>, 6>>,
  Expect<Equal<LengthOfString<'reina'>, 5>>,
  Expect<Equal<LengthOfString<'Sound! Euphonium'>, 16>>,
]
