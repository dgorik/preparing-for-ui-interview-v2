/**
 * 6.2 ReplaceAll
 *
 * Implement `ReplaceAll<S, From, To>` which replace all the substring `From` with `To` in the given string `S`.
 *
 * @example
 * type replaced = ReplaceAll<'t y p e s', ' ', ''> // 'types'
 */

import type { Equal, Expect } from '@course/types'

/* _____________ Your Code Here _____________ */

type ReplaceAll<S extends string, From extends string, To extends string> = From extends ''
  ? S
  : S extends `${infer P1}${From}${infer P2}`
    ? `${P1}${To}${ReplaceAll<P2, From, To>}`
    : S

/* _____________ Test Cases _____________ */

type cases = [
  Expect<Equal<ReplaceAll<'foobar', 'bar', 'foo'>, 'foofoo'>>,
  Expect<Equal<ReplaceAll<'foobarbar', 'bar', 'foo'>, 'foofoofoo'>>,
  Expect<Equal<ReplaceAll<'t y p e s', ' ', ''>, 'types'>>,
  Expect<Equal<ReplaceAll<'foobarbar', '', 'foo'>, 'foobarbar'>>,
  Expect<Equal<ReplaceAll<'barfoo', 'bar', 'foo'>, 'foofoo'>>,
  Expect<Equal<ReplaceAll<'foboorfoboar', 'bo', 'b'>, 'foborfobar'>>,
  Expect<Equal<ReplaceAll<'', '', ''>, ''>>,
]
