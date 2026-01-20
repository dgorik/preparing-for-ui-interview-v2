# TypeScript Type Challenges - Learning Path

A progressive learning guide for TypeScript's type system, organized by concepts from basic to advanced.

---

## 🎯 How to Use This Guide

1. **Start from Level 1** - Each level builds on previous concepts
2. **Read the concept explanation** before attempting problems
3. **Try to solve problems yourself** before looking at solutions
4. **Problems marked with 💛** are challenging and worth extra study

---

## 📚 Levels Overview

| Level | Folder                                                                  | Concepts                               | Problems |
| ----- | ----------------------------------------------------------------------- | -------------------------------------- | -------- |
| 1     | [01-basics](./01-basics/index.md)                                       | `keyof`, `typeof`, indexed access      | 3        |
| 2     | [02-mapped-types](./02-mapped-types/index.md)                           | `{ [P in K]: ... }`, modifiers         | 7        |
| 3     | [03-conditional-types](./03-conditional-types/index.md)                 | `T extends U ? X : Y`                  | 5        |
| 4     | [04-infer](./04-infer/index.md)                                         | `infer`, pattern matching              | 6        |
| 5     | [05-template-literals](./05-template-literals/index.md)                 | `` `${A}${B}` ``, string manipulation  | 8        |
| 6     | [06-recursive-types](./06-recursive-types/index.md)                     | Self-referencing types, depth tracking | 7        |
| 7     | [07-distributive-conditionals](./07-distributive-conditionals/index.md) | Union distribution                     | 2        |
| 8     | [08-advanced-patterns](./08-advanced-patterns/index.md)                 | Key remapping, type arithmetic         | 6        |
| 9     | [09-expert-techniques](./09-expert-techniques/index.md)                 | Contravariance, function overloads     | 6        |

---

## 📋 All Problems Reference

### Level 1: Basics

| #   | Problem                                            | Concept             |
| --- | -------------------------------------------------- | ------------------- |
| 1.1 | [Tuple Length](./01-basics/01-tuple-length.ts)     | `T['length']`       |
| 1.2 | [First of Array](./01-basics/02-first-of-array.ts) | `T[0]`, `T[number]` |
| 1.3 | [Tuple to Union](./01-basics/03-tuple-to-union.ts) | `T[number]`         |

### Level 2: Mapped Types

| #   | Problem                                                      | Concept             |
| --- | ------------------------------------------------------------ | ------------------- |
| 2.1 | [Pick](./02-mapped-types/01-pick.ts)                         | `[P in K]: T[P]`    |
| 2.2 | [Readonly](./02-mapped-types/02-readonly.ts)                 | `readonly` modifier |
| 2.3 | [Mutable](./02-mapped-types/03-mutable.ts)                   | `-readonly`         |
| 2.4 | [Tuple to Object](./02-mapped-types/04-tuple-to-object.ts)   | `[P in T[number]]`  |
| 2.5 | [Append to Object](./02-mapped-types/05-append-to-object.ts) | Union keys          |
| 2.6 | [Merge](./02-mapped-types/06-merge.ts)                       | Key priority        |
| 2.7 | [Diff](./02-mapped-types/07-diff.ts)                         | Key subtraction     |

### Level 3: Conditional Types

| #   | Problem                                          | Concept               |
| --- | ------------------------------------------------ | --------------------- |
| 3.1 | [If](./03-conditional-types/01-if.ts)            | Basic conditional     |
| 3.2 | [Exclude](./03-conditional-types/02-exclude.ts)  | Filter with `never`   |
| 3.3 | [IsNever](./03-conditional-types/03-is-never.ts) | `[T] extends [never]` |
| 3.4 | [AnyOf](./03-conditional-types/04-any-of.ts)     | Truthy checking       |
| 3.5 | [Lookup](./03-conditional-types/05-lookup.ts)    | Union filtering       |

### Level 4: Infer

| #   | Problem                                     | Concept             |
| --- | ------------------------------------------- | ------------------- |
| 4.1 | [Return Type](./04-infer/01-return-type.ts) | `infer R`           |
| 4.2 | [Parameters](./04-infer/02-parameters.ts)   | `infer P` in params |
| 4.3 | [Awaited](./04-infer/03-awaited.ts)         | Recursive unwrap    |
| 4.4 | [Last](./04-infer/04-last.ts)               | Array destructure   |
| 4.5 | [Pop](./04-infer/05-pop.ts)                 | Array manipulation  |
| 4.6 | [Flatten](./04-infer/06-flatten.ts)         | Spread with infer   |

### Level 5: Template Literals

| #   | Problem                                                              | Concept        |
| --- | -------------------------------------------------------------------- | -------------- |
| 5.1 | [Capitalize](./05-template-literals/01-capitalize.ts)                | `Uppercase<C>` |
| 5.2 | [TrimLeft](./05-template-literals/02-trim-left.ts)                   | Recursive trim |
| 5.3 | [Trim](./05-template-literals/03-trim.ts)                            | Both ends      |
| 5.4 | [Replace](./05-template-literals/04-replace.ts)                      | Pattern match  |
| 5.5 | [KebabCase](./05-template-literals/05-kebab-case.ts)                 | Case detection |
| 5.6 | [String to Union](./05-template-literals/06-string-to-union.ts)      | Char iteration |
| 5.7 | [Length of String](./05-template-literals/07-length-of-string.ts)    | Array counting |
| 5.8 | [StartsWith/EndsWith](./05-template-literals/08-starts-ends-with.ts) | Prefix/suffix  |

### Level 6: Recursive Types

| #   | Problem                                                   | Concept          |
| --- | --------------------------------------------------------- | ---------------- |
| 6.1 | [Deep Readonly](./06-recursive-types/01-deep-readonly.ts) | Object recursion |
| 6.2 | [ReplaceAll](./06-recursive-types/02-replace-all.ts)      | String recursion |
| 6.3 | [Reverse](./06-recursive-types/03-reverse.ts)             | Array building   |
| 6.4 | [Flatten Depth](./06-recursive-types/04-flatten-depth.ts) | Depth tracking   |
| 6.5 | [Fibonacci](./06-recursive-types/05-fibonacci.ts)         | Arithmetic       |

### Level 7: Distributive Conditionals

| #   | Problem                                                            | Concept                |
| --- | ------------------------------------------------------------------ | ---------------------- |
| 7.1 | [IsUnion](./07-distributive-conditionals/01-is-union.ts) 💛        | Distribution behavior  |
| 7.2 | [Permutation](./07-distributive-conditionals/02-permutation.ts) 💛 | Distributive recursion |

### Level 8: Advanced Patterns

| #   | Problem                                                          | Concept               |
| --- | ---------------------------------------------------------------- | --------------------- |
| 8.1 | [PickByType](./08-advanced-patterns/01-pick-by-type.ts)          | Key remapping         |
| 8.2 | [OmitByType](./08-advanced-patterns/02-omit-by-type.ts)          | Value filtering       |
| 8.3 | [PartialByKeys](./08-advanced-patterns/03-partial-by-keys.ts) 💛 | Selective modifiers   |
| 8.4 | [Chunk](./08-advanced-patterns/04-chunk.ts)                      | Multiple accumulators |

### Level 9: Expert Techniques

| #   | Problem                                                                     | Concept           |
| --- | --------------------------------------------------------------------------- | ----------------- |
| 9.1 | [Union to Intersection](./09-expert-techniques/01-union-to-intersection.ts) | Contravariance    |
| 9.2 | [IsAny](./09-expert-techniques/02-is-any.ts)                                | `1 & any` trick   |
| 9.3 | [Greater Than](./09-expert-techniques/03-greater-than.ts)                   | Number comparison |
| 9.4 | [Transpose](./09-expert-techniques/04-transpose.ts) 💛                      | Matrix ops        |

---

## 🔧 Common Patterns Cheat Sheet

```typescript
// Check for never
[T] extends [never] ? true : false

// Check for any
0 extends (1 & T) ? true : false

// Prevent distribution
[T] extends [U] ? ... : ...

// Union to intersection
(U extends any ? (arg: U) => any : never) extends (arg: infer I) => void ? I : never

// Count via array length
type Count<N, Acc extends any[] = []> = Acc['length'] extends N ? Acc : Count<N, [...Acc, any]>

// Iterate array
T extends [infer F, ...infer R] ? [Process<F>, ...Iterate<R>] : []

// Iterate string
S extends `${infer C}${infer R}` ? [C, ...Iterate<R>] : []
```

---

## 🔗 Resources

- [Type Challenges](https://github.com/type-challenges/type-challenges) - Original problems
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/) - Official docs
- [TypeScript Playground](https://www.typescriptlang.org/play) - Test solutions

---

## Legend

- 💛 = Challenging problem worth extra study
