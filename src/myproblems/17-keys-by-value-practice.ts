/**
 * 2.18 Keys By Value
 *
 * Practice producing a union of keys based on each key's value type.
 *
 * This is one way to split `MyPickByValue` into two steps:
 *
 * 1. Find the matching keys
 * 2. Build an object from those keys
 *
 * Implement:
 *
 * - `MyKeysByValue<T, ValueType>`
 *
 * @example
 * interface User {
 *   id: number
 *   name: string
 *   email: string
 *   isAdmin: boolean
 * }
 *
 * type StringKeys = MyKeysByValue<User, string>
 * // 'name' | 'email'
 */

import type { Equal, Expect } from 'src/utils/types'

/* _____________ Your Code Here _____________ */

type MyKeysByValue<T, ValueType> = never

/* _____________ Test Cases _____________ */

interface User {
  id: number
  name: string
  email: string
  isAdmin: boolean
  createdAt: Date
}

interface Product {
  id: number
  title: string
  price: number
  inStock: boolean
}

export type cases = [
  Expect<Equal<MyKeysByValue<User, string>, 'name' | 'email'>>,
  Expect<Equal<MyKeysByValue<User, boolean>, 'isAdmin'>>,
  Expect<Equal<MyKeysByValue<User, Date>, 'createdAt'>>,
  Expect<Equal<MyKeysByValue<Product, number>, 'id' | 'price'>>,
  Expect<Equal<MyKeysByValue<Product, string>, 'title'>>,
  Expect<Equal<MyKeysByValue<Product, Date>, never>>,
]
