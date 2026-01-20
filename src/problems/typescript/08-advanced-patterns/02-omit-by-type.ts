/**
 * 8.2 OmitByType
 *
 * Implement `OmitByType<T, P>` which omits all properties from `T` whose value matches type `P`.
 *
 * @example
 * type WithoutBooleans = OmitByType<{ name: string, active: boolean }, boolean>
 * // { name: string }
 */

import type { Equal, Expect } from '@course/types'

/* _____________ Your Code Here _____________ */

type OmitByType<T, U> = {
  [P in keyof T as T[P] extends U ? never : P]: T[P]
}

/* _____________ Test Cases _____________ */

interface Model {
  name: string
  count: number
  isReadonly: boolean
  isEnable: boolean
}

type cases = [
  Expect<Equal<OmitByType<Model, boolean>, { name: string; count: number }>>,
  Expect<
    Equal<OmitByType<Model, string>, { count: number; isReadonly: boolean; isEnable: boolean }>
  >,
  Expect<
    Equal<OmitByType<Model, number>, { name: string; isReadonly: boolean; isEnable: boolean }>
  >,
]
