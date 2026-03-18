/**
 * Type utilities for TypeScript type challenges
 * Based on @type-challenges/utils
 */

// Check if two types are exactly equal
export type Equal<X, Y> =
  (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2 ? true : false

// Expect a type to be true
export type Expect<T extends true> = T

// Expect a type to be false
export type ExpectFalse<T extends false> = T

// Check if a type extends another
export type IsTrue<T extends true> = T
export type IsFalse<T extends false> = T

// Prettify complex types for better readability
export type Prettify<T> = {
  [K in keyof T]: T[K]
} & {}

// Merge intersection into single object type
export type MergeInsertions<T> = T extends object ? { [K in keyof T]: MergeInsertions<T[K]> } : T

// Check if a function has parameters
export type HasParams<FUNC extends (...args: any[]) => any> =
  Parameters<FUNC> extends never ? false : true
