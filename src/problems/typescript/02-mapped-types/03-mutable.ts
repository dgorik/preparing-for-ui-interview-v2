/**
 * 2.3 Mutable
 *
 * Implement a generic `Mutable<T>` which makes all properties of `T` mutable (removes readonly).
 *
 * @example
 * interface Todo {
 *   readonly title: string
 *   readonly description: string
 * }
 *
 * type MutableTodo = Mutable<Todo>
 * // { title: string; description: string; }
 */

import type { Equal, Expect } from '@course/types'

/* _____________ Your Code Here _____________ */

type Mutable<T extends { [key: string]: any }> = {
  -readonly [P in keyof T]: T[P]
}

/* _____________ Test Cases _____________ */

interface Todo1 {
  title: string
  description: string
  completed: boolean
  meta: {
    author: string
  }
}

type List = [1, 2, 3]

type cases = [
  Expect<Equal<Mutable<Readonly<Todo1>>, Todo1>>,
  Expect<Equal<Mutable<Readonly<List>>, List>>,
]

type errors = [
  // @ts-expect-error strings are not valid objects
  Mutable<'string'>,
  // @ts-expect-error numbers are not valid objects
  Mutable<0>,
]
