/**
 * 2.7 Extract (Manual)
 *
 * Implement the built-in `Extract<T, U>` generic without using it.
 * Constructs a type by extracting from T all union members that are 
 * assignable to U.
 *
 * @example
 * type T0 = MyExtract<"a" | "b" | "c", "a" | "f"> 
 * // Result: "a"
 */

import type { Equal, Expect } from 'src/utils/types'

/* _____________ Your Code Here _____________ */

// Hint: Think about what to return when (T extends U) is true vs false.
type MyExtract <T, U> = T extends U? T: never
/* _____________ Test Cases _____________ */

type Status = 'active' | 'inactive' | 'pending' | 'deleted'

type cases = [
  Expect<Equal<MyExtract<Status, 'inactive'>, 'inactive'>>,
  Expect<Equal<MyExtract<Status, 'active' | 'deleted'>, 'active' | 'deleted'>>,
  Expect<Equal<MyExtract<string | number, string>, string>>,
  Expect<Equal<MyExtract<any, any>, any>>,
]
