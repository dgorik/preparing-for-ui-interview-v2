/**
 * 2.19 Value Matches Practice
 *
 * Practice looping over every key and checking the type of each value.
 *
 * This exercise keeps every key. Only the value changes to `true` or `false`.
 *
 * Implement:
 *
 * - `MyValueMatches<T, ValueType>`
 *
 * @example
 * interface User {
 *   id: number
 *   name: string
 *   email: string
 *   isAdmin: boolean
 * }
 *
 * type StringMatches = MyValueMatches<User, string>
 * // {
 * //   id: false
 * //   name: true
 * //   email: true
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
  createdAt: Date
}

interface Product {
  title: string
  price: number
  tags: string[]
  inStock: boolean
}

interface ExpectedUserStringMatches {
  id: false
  name: true
  email: true
  isAdmin: false
  createdAt: false
}

interface ExpectedUserBooleanMatches {
  id: false
  name: false
  email: false
  isAdmin: true
  createdAt: false
}

interface ExpectedProductArrayMatches {
  title: false
  price: false
  tags: true
  inStock: false
}

export type cases = [
  Expect<Equal<MyValueMatches<User, string>, ExpectedUserStringMatches>>,
  Expect<Equal<MyValueMatches<User, boolean>, ExpectedUserBooleanMatches>>,
  Expect<Equal<MyValueMatches<Product, string[]>, ExpectedProductArrayMatches>>,
  Expect<Equal<MyValueMatches<{}, string>, {}>>,
]
