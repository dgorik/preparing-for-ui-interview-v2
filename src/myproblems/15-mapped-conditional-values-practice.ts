/**
 * 2.16 Mapped Conditional Values
 *
 * Practice looping over keys and making a conditional decision for each value.
 *
 * This exercise keeps every key. Only the value changes.
 *
 * Implement:
 *
 * - `MyValueMatches<T, ValueType>`
 *
 * @example
 * interface User {
 *   id: number
 *   name: string
 *   isAdmin: boolean
 * }
 *
 * type StringMatches = MyValueMatches<User, string>
 * // {
 * //   id: false
 * //   name: true
 * //   isAdmin: false
 * // }
 */

import type { Equal, Expect } from 'src/utils/types'

/* _____________ Your Code Here _____________ */

type MyValueMatches<T, ValueType> = {
  [Key in keyof T]: T[Key] extends ValueType ? true : false
}

/* _____________ Test Cases _____________ */

interface User {
  id: number
  name: string
  email: string
  isAdmin: boolean
}

interface ExpectedStringMatches {
  id: false
  name: true
  email: true
  isAdmin: false
}

interface ExpectedBooleanMatches {
  id: false
  name: false
  email: false
  isAdmin: true
}

export type cases = [
  Expect<Equal<MyValueMatches<User, string>, ExpectedStringMatches>>,
  Expect<Equal<MyValueMatches<User, boolean>, ExpectedBooleanMatches>>,
  Expect<Equal<MyValueMatches<{}, string>, {}>>,
]
