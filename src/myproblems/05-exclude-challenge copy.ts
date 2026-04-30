/**
 * 2.6 Exclude (Manual)
 *
 * Implement the built-in `Exclude<T, U>` generic without using it.
 * Constructs a type by excluding from T all union members that are
 * assignable to U.
 *
 * @example
 * type T0 = MyExclude<"a" | "b" | "c", "a">
 * // Result: "b" | "c"
 */

import type { Equal, Expect } from 'src/utils/types'

/* _____________ Your Code Here _____________ */

export type MyExclude<T, U> = T extends U ? never : T

/* _____________ Test Cases _____________ */

type Status = 'active' | 'inactive' | 'pending' | 'deleted'

type MyExample = MyExclude<Status, 'inactive'>

type cases = [
  Expect<Equal<MyExclude<Status, 'inactive'>, 'active' | 'pending' | 'deleted'>>,
  Expect<Equal<MyExclude<Status, 'inactive' | 'deleted'>, 'active' | 'pending'>>,
  Expect<Equal<MyExclude<string | number, string>, number>>,
  Expect<Equal<MyExclude<any, any>, never>>,
]
