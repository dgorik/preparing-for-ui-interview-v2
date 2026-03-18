/**
 * 5.4 Replace
 *
 * Implement `Replace<S, From, To>` which replaces the first occurrence of the string `From` with string `To` in the given string `S`.
 *
 * @example
 * type replaced = Replace<'types are fun!', 'fun', 'awesome'> // 'types are awesome!'
 */

import type { Equal, Expect } from 'src/utils/types'

/* _____________ Your Code Here _____________ */

type Replace<S extends string, From extends string, To extends string> = From extends ''
  ? S
  : S extends `${infer P1}${From}${infer P2}`
    ? `${P1}${To}${P2}`
    : S

/* _____________ Test Cases _____________ */

type cases = [
  Expect<Equal<Replace<'foobar', 'bar', 'foo'>, 'foofoo'>>,
  Expect<Equal<Replace<'foobarbar', 'bar', 'foo'>, 'foofoobar'>>,
  Expect<Equal<Replace<'foobarbar', '', 'foo'>, 'foobarbar'>>,
  Expect<Equal<Replace<'foobarbar', 'bar', ''>, 'foobar'>>,
  Expect<Equal<Replace<'foobarbar', 'bra', 'foo'>, 'foobarbar'>>,
  Expect<Equal<Replace<'', '', ''>, ''>>,
]
