/**
 * 2.10 NonNullable (Manual)
 *
 * Implement the built-in `NonNullable<T>` generic without using it.
 * Constructs a type by excluding `null` and `undefined` from `T`.
 *
 * @example
 * type T0 = MyNonNullable<string | null>
 * // string
 *
 * type T1 = MyNonNullable<string | number | undefined>
 * // string | number
 *
 * type T2 = MyNonNullable<null | undefined>
 * // never
 */

import type { Equal, Expect } from 'src/utils/types'
import type { MyExclude } from './05-exclude-challenge copy'

/* _____________ Your Code Here _____________ */

type MyNonNullable<T> = MyExclude<T, undefined | null>

/* _____________ Test Cases _____________ */

type cases = [
  Expect<Equal<MyNonNullable<string | null>, string>>,
  Expect<Equal<MyNonNullable<string | number | undefined>, string | number>>,
  Expect<Equal<MyNonNullable<null | undefined>, never>>,
  Expect<Equal<MyNonNullable<string | null | undefined>, string>>,
  Expect<Equal<MyNonNullable<number>, number>>,
]
