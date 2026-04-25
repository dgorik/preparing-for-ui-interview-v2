/**
 * 2.12 Keyof + Mapped Type Practice
 *
 * Practice the building blocks behind `Pick`, `Omit`, `Partial`, and `Readonly`:
 *
 * - `keyof T`
 * - mapped types
 * - indexed access with `T[P]`
 *
 * This one is intentionally easy.
 *
 * Exercise:
 *
 * Implement a type called `MyCopy<T>`.
 *
 * It should take an object type `T` and return a new object type with the exact
 * same keys and value types.
 *
 * You are not changing the shape yet. You are just practicing how to loop over
 * the keys of an object type.
 *
 * @example
 * interface User {
 *   id: number
 *   name: string
 *   isAdmin: boolean
 * }
 *
 * type CopiedUser = MyCopy<User>
 * // {
 * //   id: number
 * //   name: string
 * //   isAdmin: boolean
 * // }
 *
 * Hints:
 *
 * Start by asking: "How do I get all the property names from `T`?"
 *
 * Then ask: "For each property name, how do I look up the original value type?"
 *
 * You will probably need this shape:
 *
 * type Something<T> = {
 *   [P in keyof T]: T[P]
 * }
 *
 * Why this helps:
 *
 * - `Pick<T, K>` loops over only `K`
 * - `Omit<T, K>` loops over `Exclude<keyof T, K>`
 * - `Partial<T>` loops over `keyof T` and adds `?`
 * - `Readonly<T>` loops over `keyof T` and adds `readonly`
 */

import type { Equal, Expect } from 'src/utils/types'

/* _____________ Your Code Here _____________ */

type MyCopy<T> = {
  [P in keyof T]: T[P]
}

/* _____________ Test Cases _____________ */

interface User {
  id: number
  name: string
  isAdmin: boolean
}

interface Todo {
  title: string
  completed: boolean
}

type cases = [
  Expect<Equal<MyCopy<User>, User>>,
  Expect<Equal<MyCopy<Todo>, Todo>>,
  Expect<Equal<MyCopy<{}>, {}>>,
]
