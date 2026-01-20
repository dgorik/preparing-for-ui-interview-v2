# Level 6: Recursive Types

**Concepts:** Self-referencing types, base cases, accumulators, depth limitation

> Advanced types often require recursion to process arbitrarily deep data structures like arrays, strings, or object trees.

[← Back to Index](../index.md) | [Previous: Template Literals](../05-template-literals/index.md) | [Next: Distributive Conditionals →](../07-distributive-conditionals/index.md)

---

## Key Concepts

### 1. Basic Recursion and Base Cases

A recursive type is one that references itself. Crucially, it needs a **Base Case** to stop infinite recursion, just like a recursive function needs an exit condition.

```typescript
type LinkedList<T> = T & { next: LinkedList<T> } // Infinite definition (OK for interfaces/types)

// Conditional recursion naturally has a base case (the 'false' branch)
type RecursiveArray<T> = T extends (infer U)[] ? RecursiveArray<U> : T
```

### 2. Recursive Conditional Types (Looping)

Recursion is the primary way to "loop" in the type system. You process one item (head), and recursively call the type with the rest (tail).

```typescript
type Reverse<T extends any[]> = T extends [infer Head, ...infer Tail]
  ? [...Reverse<Tail>, Head]
  : [] // Base case: empty array
```

### 3. Deep Mutability

Recursion allows you to traverse deep object structures, modifying properties at every level (e.g., making everything `readonly`).

```typescript
type DeepReadonly<T> = {
  readonly [P in keyof T]: DeepReadonly<T[P]>
}
```

### 4. Recursion Limits

TypeScript has a recursion depth limit (around 50-100 depending on complexity and version). Exceeding this results in "Type instantiation is excessively deep".

- **Tail Recursion Elimination**: Modern TS versions check for tail recursion to allow deeper limits.
- **Counter**: Sometimes you must manually track depth using an accumulator tuple to stop before the limit.

### 5. Accumulator Pattern

Since we can't do `x = x + 1`, we use an array's `length` as a counter. We pass an accumulator generic parameter to carry state between recursive calls.

```typescript
type Count<N, Acc extends any[] = []> = Acc['length'] extends N ? Acc : Count<N, [...Acc, 1]> // Add 1 to accumulator
```

---

## Problems

Click on a problem to view details and code.

| #   | Problem                                | Description                                            |
| --- | -------------------------------------- | ------------------------------------------------------ |
| 6.1 | [Deep Readonly](./01-deep-readonly.ts) | Make every property of an object readonly recursively. |
| 6.2 | [ReplaceAll](./02-replace-all.ts)      | Replace all occurrences of a string.                   |
| 6.3 | [Reverse](./03-reverse.ts)             | Reverse a tuple type.                                  |
| 6.4 | [Flatten Depth](./04-flatten-depth.ts) | Flatten an array up to a certain depth.                |
| 6.5 | [Fibonacci](./05-fibonacci.ts)         | Calculate the Fibonacci number T.                      |

---

[← Back to Index](../index.md) | [Previous: Template Literals](../05-template-literals/index.md) | [Next: Distributive Conditionals →](../07-distributive-conditionals/index.md)
