# Level 7: Distributive Conditional Types

**Concepts:** Union distribution, preventing distribution, checking for unions

> A unique feature where conditional types distribute over union constituents.

[← Back to Index](../index.md) | [Previous: Recursive Types](../06-recursive-types/index.md) | [Next: Advanced Patterns →](../08-advanced-patterns/index.md)

---

## Key Concepts

### 1. Default Distribution (Naked Generics)

Distributivity is triggered when:

1. The type being checked is a **naked generic parameter** (e.g. `T`).
2. The checked type is a **Union**.

If both types are true, the condition applies to _each member_ of the union individually.

```typescript
type ToArray<T> = T extends any ? T[] : never
type StrArrOrNumArr = ToArray<string | number>
// Becomes: ToArray<string> | ToArray<number>
// Result: string[] | number[]
```

### 2. Preventing Distribution

To stop this behavior (and treat the union as a single block), wrap the generic in a tuple `[]` on both sides of the `extends`.

```typescript
type ToArray<T> = [T] extends [any] ? T[] : never
type StrOrNumArr = ToArray<string | number>
// Becomes: (string | number)[]
```

### 3. Checking for Unions

We can exploit distributivity to check if a type is a union. The trick is:

1. Let `T` distribute.
2. Inside the true branch, compare the distributed `T` (which is now a single member) against the original `T` (which is still the full union).
3. If they are different, it was a union (because a member is not equal to the whole group).

```typescript
type IsUnion<T, U = T> = U extends any ? ([T] extends [U] ? false : true) : never
```

---

## Problems

Click on a problem to view details and code.

| #   | Problem                            | Description                                                                                                 |
| --- | ---------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| 7.1 | [IsUnion](./01-is-union.ts)        | Implement a type that checks if a type is a union (and not a single type).                                  |
| 7.2 | [Permutation](./02-permutation.ts) | Implement permutation type that transforms union types into the array that includes permutations of unions. |

---

[← Back to Index](../index.md) | [Previous: Recursive Types](../06-recursive-types/index.md) | [Next: Advanced Patterns →](../08-advanced-patterns/index.md)
