/**
 * 8.1 PickByType
 *
 * Implement `PickByType<T, P>` which picks all properties from `T` whose value matches type `P`.
 *
 * @example
 * type OnlyBooleans = PickByType<{ name: string, active: boolean }, boolean>
 * // { active: boolean }
 */

import type { Equal, Expect } from '@course/types'

/* _____________ Your Code Here _____________ */

type PickByType<T, U> = {
  [P in keyof T as T[P] extends U ? P : never]: T[P]
}

/* _____________ Test Cases _____________ */

interface Model {
  name: string
  count: number
  isReadonly: boolean
  isEnable: boolean
}

type cases = [
  Expect<Equal<PickByType<Model, boolean>, { isReadonly: boolean; isEnable: boolean }>>,
  Expect<Equal<PickByType<Model, string>, { name: string }>>,
  Expect<Equal<PickByType<Model, number>, { count: number }>>,
]
