/**
 * Type utilities for TypeScript type challenges
 * Based on @type-challenges/utils
 */

// Check if two types are exactly equal
export type Equal<X, Y> =
  (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2 ? true : false

// Expect type to be true (compile-time assertion)
export type Expect<T extends true> = T

// Expect type to be false
export type ExpectFalse<T extends false> = T

// Check if type extends another
export type ExpectExtends<VALUE, EXPECTED> = EXPECTED extends VALUE ? true : false

// Check if type is valid (not never)
export type ExpectValidArgs<FUNC extends (...args: any[]) => any> =
  Parameters<FUNC> extends never ? false : true

// Not equal check
export type NotEqual<X, Y> = true extends Equal<X, Y> ? false : true

// Check if type is any
export type IsAny<T> = 0 extends 1 & T ? true : false

// Not any check
export type NotAny<T> = true extends IsAny<T> ? false : true

// Debug helper - reveals the structure of a type
export type Debug<T> = { [K in keyof T]: T[K] }

// Merge intersection into single object type
export type MergeInsertions<T> = T extends object ? { [K in keyof T]: MergeInsertions<T[K]> } : T

// Prettify complex types for better readability
export type Prettify<T> = {
  [K in keyof T]: T[K]
} & {}
