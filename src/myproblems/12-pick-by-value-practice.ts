/**
 * 2.13 Pick By Value
 *
 * Implement a type called `MyPickByValue<T, ValueType>`.
 *
 * It should create a new object type by keeping only the properties from `T`
 * whose value types are assignable to `ValueType`.
 *
 * This is a step up from `MyCopy<T>` because you need to loop over object keys
 * and decide whether each key should stay in the resulting object.
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
 *
 * type BooleanFields = MyPickByValue<User, boolean>
 * // {
 * //   isAdmin: boolean
 * // }
 */

import type { Equal, Expect } from 'src/utils/types'

/* _____________ Your Code Here _____________ */

type MyPickByValue<T, ValueType> = {
  [P in keyof T as T[P] extends ValueType ? P : never]: T[P]
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

interface ExpectedProductStrings {
  title: string
}

export type cases = [
  Expect<Equal<MyPickByValue<User, string>, ExpectedUserStrings>>,
  Expect<Equal<MyPickByValue<User, boolean>, ExpectedUserBooleans>>,
  Expect<Equal<MyPickByValue<Product, number>, ExpectedProductNumbers>>,
  Expect<Equal<MyPickByValue<Product, string>, ExpectedProductStrings>>,
  Expect<Equal<MyPickByValue<Product, Date>, {}>>,
]
