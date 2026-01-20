# Level 9: Expert Techniques

**Concepts:** Contravariance, intersection to union, `any` hacks, matrix operations

> These techniques often exploit specific behaviors of the TypeScript compiler to achieve results that seem impossible.

[← Back to Index](../index.md) | [Previous: Advanced Patterns](../08-advanced-patterns/index.md)

---

## Key Concepts

### 1. Union to Intersection (Contravariance)

TypeScript functions arguments are **contravariant** (they accept supertypes, but when comparing functions, it's inverted). We exploit this to flip a union `A | B` into an intersection `A & B`.

**Mechanism:**

1. Transform union `U` into a union of functions: `(arg: A) => void | (arg: B) => void`.
2. Use conditional types to infer the argument of a _single_ function that matches that union.
3. Due to contravariance, TypeScript infers the intersection `A & B` for the argument.

```typescript
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void
  ? I
  : never
```

### 2. Detecting `any`

The `any` type is notorious for being both a supertype and a subtype of everything. It breaks normal conditional checks.
The hack relies on `any`'s ability to intersect with anything to produce `any`.

```typescript
// 1 & any  -> any
// 1 & string -> never (or just fails)

type IsAny<T> = 0 extends 1 & T ? true : false
```

If `T` is `any`, `1 & T` is `any`. Then `0 extends any` is true.
If `T` is `string`, `1 & T` is `never` (or distinct), so `0 extends ...` is false.

### 3. Tuples as Counters (Math)

Since TypeScript typings are Turing-complete, we can perform arithmetic. We usually use the length of a tuple to represent numbers.

```typescript
// Add two numbers A + B
type Add<A extends number, B extends number> = [...BuildTuple<A>, ...BuildTuple<B>]['length']
```

### 4. Matrix Operations

By combining array inference and recursion, we can manipulate 2D arrays (matrices). This often involves:

- Using `[number]` to access column types.
- Mapping over keys to transpose rows/cols.
- Recursive processing of rows.

---

## Problems

Click on a problem to view details and code.

| #   | Problem                                                | Description                                      |
| --- | ------------------------------------------------------ | ------------------------------------------------ |
| 9.1 | [Union to Intersection](./01-union-to-intersection.ts) | Implement the advanced `UnionToIntersection<U>`. |
| 9.2 | [IsAny](./02-is-any.ts)                                | Detect if a type is explicitly `any`.            |
| 9.3 | [Greater Than](./03-greater-than.ts)                   | Compare two numbers.                             |
| 9.4 | [Transpose](./04-transpose.ts)                         | Transpose a matrix (array of arrays).            |

---

[← Back to Index](../index.md) | [Previous: Advanced Patterns](../08-advanced-patterns/index.md)
