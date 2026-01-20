/**
 * 8.3 PartialByKeys
 *
 * Implement `PartialByKeys<T, K>` which takes an object type `T` and a property key type `K` (defaulting to all keys),
 * and returns a new type where the properties specified in `K` are optional.
 *
 * @example
 * interface User { name: string, age: number }
 * type Result = PartialByKeys<User, 'name'>
 * // { name?: string, age: number }
 */

import type { Equal, Expect } from '@course/types'

/* _____________ Your Code Here _____________ */

type PartialByKeys<T, K extends keyof T = keyof T> = Omit<Partial<Pick<T, K>> & Omit<T, K>, never>

/* _____________ Test Cases _____________ */

interface User {
  name: string
  age: number
  address: string
}

interface UserPartialName {
  name?: string
  age: number
  address: string
}

interface UserPartialNameAndAge {
  name?: string
  age?: number
  address: string
}

type cases = [
  Expect<Equal<PartialByKeys<User, 'name'>, UserPartialName>>,
  Expect<Equal<PartialByKeys<User, 'name' | 'age'>, UserPartialNameAndAge>>,
  Expect<Equal<PartialByKeys<User>, Partial<User>>>,
]
