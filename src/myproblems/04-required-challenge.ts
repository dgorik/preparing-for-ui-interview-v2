/**
 * 2.5 Required (Manual)
 *
 * Implement the built-in `Required<T>` generic without using it.
 * Constructs a type with all properties of `T` set to required.
 * It is the opposite of Partial.
 *
 * @example
 * interface Todo {
 *   title?: string
 *   description?: string
 *   completed?: boolean
 * }
 *
 * type RequiredTodo = MyRequired<Todo>
 * // { title: string; description: string; completed: boolean }
 */

import type { Equal, Expect } from 'src/utils/types'

/* _____________ Your Code Here _____________ */

type MyRequired<T> = {
  [P in keyof T]-?: T[P]
} // your implementation here

/* _____________ Test Cases _____________ */

interface Todo {
  title?: string
  description?: string
  completed?: boolean
}

interface Expected {
  title: string
  description: string
  completed: boolean
}

interface MixedTodo {
  title: string // already required
  description?: string // optional
}

interface ExpectedMixed {
  title: string
  description: string
}

type cases = [
  Expect<Equal<MyRequired<Todo>, Expected>>,
  Expect<Equal<MyRequired<MixedTodo>, ExpectedMixed>>,
  Expect<Equal<MyRequired<{}>, {}>>,
]
