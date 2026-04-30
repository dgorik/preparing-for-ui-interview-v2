/**
 * 2.11 ReturnType (Manual)
 *
 * Implement the built-in `ReturnType<T>` generic without using it.
 * Constructs a type that is the return type of function type `T`.
 *
 * @example
 * function greet(name: string): string {
 *   return `Hello, ${name}`
 * }
 *
 * type T0 = MyReturnType<typeof greet>
 * // string
 *
 * type T1 = MyReturnType<() => number>
 * // number
 */

import type { Equal, Expect } from 'src/utils/types'

/* _____________ Your Code Here _____________ */

type MyReturnType<T> = T extends (...args: any[]) => infer R ? R : never // replace with your implementation

/* _____________ Test Cases _____________ */

const add = (a: number, b: number): number => a + b
const greet = (name: string): string => `Hello, ${name}`
const getUser = () => ({ id: 1, name: 'Alice' })
const noop = (): void => {}

type cases = [
  Expect<Equal<MyReturnType<typeof add>, number>>,
  Expect<Equal<MyReturnType<typeof greet>, string>>,
  Expect<Equal<MyReturnType<typeof getUser>, { id: number; name: string }>>,
  Expect<Equal<MyReturnType<typeof noop>, void>>,
  Expect<Equal<MyReturnType<() => boolean>, boolean>>,
]
