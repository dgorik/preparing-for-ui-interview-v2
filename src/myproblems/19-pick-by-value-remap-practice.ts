/**
 * 2.20 Pick By Value Remap Practice
 *
 * Practice keeping only the keys whose values match a target type.
 *
 * This exercise removes keys by remapping non-matches to `never`.
 *
 * Implement:
 *
 * - `MyPickByValue<T, ValueType>`
 *
 * @example
 * interface User {
 *   id: number
 *   name: string
 *   email: string
 *   isAdmin: boolean
 * }
 *
 * type StringFields = MyPickByValue<User, string>
 * // {
 * //   name: string
 * //   email: string
 * // }
 */

import type { Equal, Expect } from 'src/utils/types'

/* _____________ Your Code Here _____________ */

type MyPickByValue<T, ValueType> = {
  [Key in keyof T as T[Key] extends ValueType ? Key : never]: T[Key]
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
  id: number
  title: string
  price: number
  tags: string[]
  inStock: boolean
}

interface ExpectedUserStrings {
  name: string
  email: string
}

interface ExpectedUserBooleans {
  isAdmin: boolean
}

interface ExpectedProductNumbers {
  id: number
  price: number
}

interface ExpectedProductArrays {
  tags: string[]
}

export type cases = [
  Expect<Equal<MyPickByValue<User, string>, ExpectedUserStrings>>,
  Expect<Equal<MyPickByValue<User, boolean>, ExpectedUserBooleans>>,
  Expect<Equal<MyPickByValue<User, Date>, { createdAt: Date }>>,
  Expect<Equal<MyPickByValue<Product, number>, ExpectedProductNumbers>>,
  Expect<Equal<MyPickByValue<Product, string[]>, ExpectedProductArrays>>,
  Expect<Equal<MyPickByValue<Product, Date>, {}>>,
]
