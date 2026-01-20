/**
 * 5.6 String to Union
 *
 * Implement the String to Union type. Type Emitter which takes an input string and returns a union of its characters.
 *
 * @example
 * type Test = '123';
 * type Result = StringToUnion<Test>; // '1' | '2' | '3'
 */

import type { Equal, Expect } from '@course/types'

/* _____________ Your Code Here _____________ */

type StringToUnion<T extends string> = T extends `${infer Char}${infer Rest}`
  ? Char | StringToUnion<Rest>
  : never

/* _____________ Test Cases _____________ */

type cases = [
  Expect<Equal<StringToUnion<''>, never>>,
  Expect<Equal<StringToUnion<'t'>, 't'>>,
  Expect<Equal<StringToUnion<'hello'>, 'h' | 'e' | 'l' | 'o'>>,
  Expect<Equal<StringToUnion<'coronavirus'>, 'c' | 'o' | 'r' | 'n' | 'a' | 'v' | 'i' | 'u' | 's'>>,
]
