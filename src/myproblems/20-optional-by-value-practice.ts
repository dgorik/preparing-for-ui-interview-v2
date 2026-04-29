/**
 * 2.21 Optional By Value Practice
 *
 * Practice making only matching value types optional.
 *
 * This exercise keeps every key. Matching value types become optional, and
 * non-matching value types stay required.
 *
 * Implement:
 *
 * - `MyOptionalByValue<T, ValueType>`
 *
 * @example
 * interface User {
 *   id: number
 *   name: string
 *   email: string
 *   isAdmin: boolean
 *   createdAt: Date
 * }
 *
 * type StringOptional = MyOptionalByValue<User, string>
 * // {
 * //   id: number
 * //   name?: string
 * //   email?: string
 * //   isAdmin: boolean
 * //   createdAt: Date
 * // }
 */

import type { Equal, Expect } from 'src/utils/types'

/* _____________ Your Code Here _____________ */

type MyOptionalByValue<T, ValueType> = Pretty<
  {
    [Key in keyof T as T[Key] extends ValueType ? Key : never]?: T[Key]
  } & {
    [Key in keyof T as T[Key] extends ValueType ? never : Key]: T[Key]
  }
>

type Pretty<T> = {
  [Key in keyof T]: T[Key]
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

interface ExpectedUserStringOptional {
  id: number
  name?: string
  email?: string
  isAdmin: boolean
  createdAt: Date
}

interface ExpectedUserBooleanOptional {
  id: number
  name: string
  email: string
  isAdmin?: boolean
  createdAt: Date
}

interface ExpectedProductNumberOptional {
  id?: number
  title: string
  price?: number
  tags: string[]
  inStock: boolean
}

interface ExpectedProductArrayOptional {
  id: number
  title: string
  price: number
  tags?: string[]
  inStock: boolean
}

export type cases = [
  Expect<Equal<MyOptionalByValue<User, string>, ExpectedUserStringOptional>>,
  Expect<Equal<MyOptionalByValue<User, boolean>, ExpectedUserBooleanOptional>>,
  Expect<Equal<MyOptionalByValue<Product, number>, ExpectedProductNumberOptional>>,
  Expect<Equal<MyOptionalByValue<Product, string[]>, ExpectedProductArrayOptional>>,
  Expect<Equal<MyOptionalByValue<Product, Date>, Product>>,
]
