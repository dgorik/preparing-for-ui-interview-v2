/**
 * 2.2 Omit (Manual)
 *
 * Implement the built-in `Omit<T, K>` generic without using it.
 * Constructs a type by removing the set of properties `K` from `T`.
 * It is the opposite of Pick.
 *
 * @example
 * interface Todo {
 *   title: string
 *   description: string
 *   completed: boolean
 *   createdAt: number
 * }
 *
 * type TodoPreview = MyOmit<Todo, 'description'>
 * // { title: string; completed: boolean; createdAt: number }
 *
 * type TodoInfo = MyOmit<Todo, 'completed' | 'createdAt'>
 * // { title: string; description: string }
 */

import type { Equal, Expect } from 'src/utils/types'

/* _____________ Your Code Here _____________ */

type MyOmit<T, K extends keyof T> = {
  [P in Exclude<keyof T, K>]: T[P]
  //go through the list (a union of keys) one by one. For each item call it P
  //on the right side, we are using that P to look up the original value (string, number etc)
}

/* _____________ Test Cases _____________ */

interface Todo {
  title: string
  description: string
  completed: boolean
  createdAt: number
}

interface Expected1 {
  title: string
  completed: boolean
  createdAt: number
}

interface Expected2 {
  title: string
  description: string
}

type cases = [
  Expect<Equal<MyOmit<Todo, 'description'>, Expected1>>,
  Expect<Equal<MyOmit<Todo, 'completed' | 'createdAt'>, Expected2>>,
  // @ts-expect-error - invalid key
  MyOmit<Todo, 'invalid'>,
]
