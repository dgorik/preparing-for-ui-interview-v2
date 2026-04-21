/**
 * 2.17 Key Remapping Practice
 *
 * Practice removing keys by remapping them to `never`.
 *
 * This is the `as ... ? P : never` part of `MyPickByValue`.
 *
 * Implement:
 *
 * - `MyRemoveKey<T, KeyToRemove>`
 *
 * @example
 * interface User {
 *   id: number
 *   name: string
 *   email: string
 * }
 *
 * type WithoutEmail = MyRemoveKey<User, 'email'>
 * // {
 * //   id: number
 * //   name: string
 * // }
 */

import type { Equal, Expect } from 'src/utils/types'

/* _____________ Your Code Here _____________ */

type MyRemoveKey<T, KeyToRemove extends keyof T> = never

/* _____________ Test Cases _____________ */

interface User {
  id: number
  name: string
  email: string
  isAdmin: boolean
}

interface ExpectedWithoutEmail {
  id: number
  name: string
  isAdmin: boolean
}

interface ExpectedWithoutNameOrEmail {
  id: number
  isAdmin: boolean
}

export type cases = [
  Expect<Equal<MyRemoveKey<User, 'email'>, ExpectedWithoutEmail>>,
  Expect<Equal<MyRemoveKey<User, 'name' | 'email'>, ExpectedWithoutNameOrEmail>>,
  Expect<Equal<MyRemoveKey<User, keyof User>, {}>>,
  // @ts-expect-error - invalid key should not be allowed
  MyRemoveKey<User, 'createdAt'>,
]
