/**
 * 2.8 Readonly (Manual)
 *
 * Implement the built-in `Readonly<T>` generic without using it.
 * Constructs a type with all properties of `T` set to readonly,
 * meaning they cannot be reassigned after creation.
 *
 * @example
 * interface Todo {
 *   title: string
 *   completed: boolean
 * }
 *
 * type ReadonlyTodo = MyReadonly<Todo>
 * // { readonly title: string; readonly completed: boolean }
 *
 * const todo: ReadonlyTodo = { title: 'Learn TypeScript', completed: false }
 * todo.title = 'Oops' // ❌ Error: Cannot assign to 'title' because it is a read-only property
 */

import type { Equal, Expect } from 'src/utils/types'

/* _____________ Your Code Here _____________ */

type MyReadonly<T> = {
  // replace with your implementation
  readonly [P in keyof T]: T[P]
}
/* _____________ Test Cases _____________ */

interface Todo {
  title: string
  description: string
  completed: boolean
}

interface Config {
  host: string
  port: number
  debug: boolean
}

type cases = [
  Expect<Equal<MyReadonly<Todo>, Readonly<Todo>>>,
  Expect<Equal<MyReadonly<Config>, Readonly<Config>>>,
  Expect<Equal<MyReadonly<{}>, Readonly<{}>>>,
  Expect<
    Equal<
      MyReadonly<{ a: 1; b: '2'; c: true }>,
      { readonly a: 1; readonly b: '2'; readonly c: true }
    >
  >,
]
