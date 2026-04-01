/**
 * 2.3 Partial
 *
 * Implement the built-in `Partial<T>` generic without using it.
 * Constructs a type with all properties of `T` set to optional.
 *
 * @example
 * interface Todo {
 *   title: string
 *   description: string
 *   completed: boolean
 * }
 *
 * type PartialTodo = MyPartial<Todo>
 * // { title?: string; description?: string; completed?: boolean }
 */

import type { Equal, Expect } from 'src/utils/types'

/* _____________ Your Code Here _____________ */

type MyPartial<T> = {
  [P in keyof T]?: T[P]
} // your implementation here

/* _____________ Test Cases _____________ */

interface Todo {
  title: string
  description: string
  completed: boolean
}

interface Expected {
  title?: string
  description?: string
  completed?: boolean
}

interface NestedTodo {
  title: string
  settings: {
    darkMode: boolean
    language: string
  }
}

interface ExpectedNested {
  title?: string
  settings?: {
    darkMode: boolean
    language: string
  }
}

type cases = [
  Expect<Equal<MyPartial<Todo>, Expected>>,
  Expect<Equal<MyPartial<NestedTodo>, ExpectedNested>>,
  Expect<Equal<MyPartial<{}>, {}>>,
]
