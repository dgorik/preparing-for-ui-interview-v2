/**
 * 2.15 Indexed Access Practice
 *
 * Practice reading property value types from object types.
 *
 * This is the `T[P]` part of `MyPickByValue`.
 *
 * Implement:
 *
 * - `MyValueAt<T, Key>`
 * - `MyAllValues<T>`
 *
 * @example
 * interface User {
 *   id: number
 *   name: string
 *   isAdmin: boolean
 * }
 *
 * type A = MyValueAt<User, 'name'>
 * // string
 *
 * type B = MyAllValues<User>
 * // number | string | boolean
 */

import type { Equal, Expect } from 'src/utils/types'

/* _____________ Your Code Here _____________ */

type MyValueAt<T, Key extends keyof T> = never

type MyAllValues<T> = never

/* _____________ Test Cases _____________ */

interface User {
  id: number
  name: string
  isAdmin: boolean
}

interface Product {
  title: string
  price: number
  tags: string[]
}

export type cases = [
  Expect<Equal<MyValueAt<User, 'id'>, number>>,
  Expect<Equal<MyValueAt<User, 'name'>, string>>,
  Expect<Equal<MyValueAt<User, 'isAdmin'>, boolean>>,
  Expect<Equal<MyAllValues<User>, number | string | boolean>>,
  Expect<Equal<MyAllValues<Product>, string | number | string[]>>,
  // @ts-expect-error - invalid key should not be allowed
  MyValueAt<User, 'email'>,
]
