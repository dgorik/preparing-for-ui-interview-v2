/**
 * 5.3 Trim
 *
 * Implement `Trim<T>` which takes an exact string type and returns a new string with the whitespace from both ends removed.
 *
 * @example
 * type trimed = Trim<'  Hello World  '> // 'Hello World'
 */

import type { Equal, Expect } from '@course/types'

/* _____________ Your Code Here _____________ */

type Space = ' ' | '\t' | '\n'

type Trim<S extends string> = S extends `${Space}${infer T}`
  ? Trim<T>
  : S extends `${infer T}${Space}`
    ? Trim<T>
    : S

/* _____________ Test Cases _____________ */

type cases = [
  Expect<Equal<Trim<'str'>, 'str'>>,
  Expect<Equal<Trim<' str'>, 'str'>>,
  Expect<Equal<Trim<'     str'>, 'str'>>,
  Expect<Equal<Trim<'str   '>, 'str'>>,
  Expect<Equal<Trim<'     str     '>, 'str'>>,
  Expect<Equal<Trim<'   \n\t foo bar \t'>, 'foo bar'>>,
  Expect<Equal<Trim<''>, ''>>,
  Expect<Equal<Trim<' \n\t '>, ''>>,
]
