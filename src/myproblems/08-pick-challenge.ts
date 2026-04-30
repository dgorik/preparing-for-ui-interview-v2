/**
 * 2.9 Pick (Manual)
 *
 * Implement the built-in `Pick<T, K>` generic without using it.
 * Constructs a type by picking the set of properties `K` from `T`.
 * It is the opposite of Omit.
 *
 * @example
 * interface Todo {
 *   title: string
 *   description: string
 *   completed: boolean
 * }
 *
 * type TodoPreview = MyPick<Todo, 'title' | 'completed'>
 * // { title: string; completed: boolean }
 */

import type { Equal, Expect } from 'src/utils/types'

/* _____________ Your Code Here _____________ */

type MyPick<T, K extends keyof T> = {
  [P in K]: T[P]
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
}

interface Expected2 {
  title: string
  completed: boolean
}

type cases = [
  Expect<Equal<MyPick<Todo, 'title'>, Expected1>>,
  Expect<Equal<MyPick<Todo, 'title' | 'completed'>, Expected2>>,
  // @ts-expect-error - invalid key should not be allowed
  MyPick<Todo, 'invalid'>,
]
