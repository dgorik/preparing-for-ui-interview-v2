/**
 * 3.1 If
 *
 * Implement a conditional type utility `If`, which takes a condition `C` (a boolean),
 * a truthy return type `T`, and a falsy return type `F`.
 *
 * @example
 * type A = If<true, 'a', 'b'>  // 'a'
 * type B = If<false, 'a', 'b'> // 'b'
 */

import type { Equal, Expect } from '@course/types'

/* _____________ Your Code Here _____________ */

type If<C extends boolean, T, F> = C extends true ? T : F

/* _____________ Test Cases _____________ */

type cases = [Expect<Equal<If<true, 'a', 'b'>, 'a'>>, Expect<Equal<If<false, 'a', 2>, 2>>]

// @ts-expect-error null is not a boolean
type error = If<null, 'a', 'b'>
