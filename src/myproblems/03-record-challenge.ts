/**
 * 2.4 Record (Manual)
 *
 * Implement the built-in `Record<K, V>` generic without using it.
 * Constructs an object type whose keys are `K` and values are `V`.
 *
 * @example
 * type Role = 'admin' | 'user' | 'guest'
 *
 * type RoleMap = MyRecord<Role, boolean>
 * // { admin: boolean; user: boolean; guest: boolean }
 */

import type { Equal, Expect } from 'src/utils/types'

/* _____________ Your Code Here _____________ */

type MyRecord<K extends PropertyKey, V> = {
  [P in K]: V
}
/* _____________ Test Cases _____________ */

type Example = MyRecord<Role, boolean>

type Role = 'admin' | 'user' | 'guest'

interface Expected1 {
  admin: boolean
  user: boolean
  guest: boolean
}

interface Expected2 {
  a: string
  b: string
  c: string
}

type cases = [
  Expect<Equal<MyRecord<Role, boolean>, Expected1>>,
  Expect<Equal<MyRecord<'a' | 'b' | 'c', string>, Expected2>>,
  Expect<Equal<MyRecord<string, number>, Record<string, number>>>,
]
