/**
 * 9.1 Union to Intersection
 *
 * Implement `UnionToIntersection<U>` which turns a union type `U` into an intersection type.
 *
 * @example
 * type Result = UnionToIntersection<{ a: 1 } | { b: 2 }>
 * // { a: 1 } & { b: 2 }
 */

import type { Equal, Expect } from '@course/types'

/* _____________ Your Code Here _____________ */

type UnionToIntersection<U> = (U extends any ? (arg: U) => any : never) extends (
  arg: infer I,
) => void
  ? I
  : never

/* _____________ Test Cases _____________ */

type cases = [
  Expect<Equal<UnionToIntersection<'foo' | 42 | true>, 'foo' & 42 & true>>,
  Expect<
    Equal<UnionToIntersection<(() => 'foo') | ((i: 42) => true)>, (() => 'foo') & ((i: 42) => true)>
  >,
]
