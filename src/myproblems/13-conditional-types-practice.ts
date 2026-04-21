/**
 * 2.14 Conditional Types Practice
 *
 * Practice type-level `extends` checks.
 *
 * These are the smallest pieces of the condition used in `MyPickByValue`.
 *
 * Implement:
 *
 * - `MyIsString<T>`
 * - `MyKeepIfAssignable<T, Target>`
 *
 * @example
 * type A = MyIsString<'hello'>
 * // true
 *
 * type B = MyIsString<123>
 * // false
 *
 * type C = MyKeepIfAssignable<'hello', string>
 * // 'hello'
 *
 * type D = MyKeepIfAssignable<123, string>
 * // never
 */

import type { Equal, Expect } from 'src/utils/types'

/* _____________ Your Code Here _____________ */

type MyIsString<T> = T extends string ? true : false

type MyKeepIfAssignable<T, Target> = T extends Target ? T : never

/* _____________ Test Cases _____________ */

export type cases = [
  Expect<Equal<MyIsString<'hello'>, true>>,
  Expect<Equal<MyIsString<string>, true>>,
  Expect<Equal<MyIsString<123>, false>>,
  Expect<Equal<MyIsString<boolean>, false>>,
  Expect<Equal<MyKeepIfAssignable<'hello', string>, 'hello'>>,
  Expect<Equal<MyKeepIfAssignable<123, string>, never>>,
  Expect<Equal<MyKeepIfAssignable<Date, object>, Date>>,
]
