# Level 4: Infer

**Concepts:** `infer`, pattern matching, conditional type inference

> `infer` is a keyword used in conditional types to extract types from within other types.

[← Back to Index](../index.md) | [Previous: Conditional Types](../03-conditional-types/index.md) | [Next: Template Literals →](../05-template-literals/index.md)

---

## Key Concepts

### 1. The `infer` Keyword

`infer` is akin to declaring a variable during a pattern match. It allows TypeScript to "deduce" a subtype from a complex type structure. It **can only be used** in the `extends` clause of a conditional type.

```typescript
type Unpacked<T> = T extends (infer U)[] ? U : T
type T0 = Unpacked<string[]> // string
type T1 = Unpacked<number> // number
```

### 2. Inferring Return Types

A classic use case involves extracting the return type of a function.

```typescript
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any

type Func = () => number
type Num = ReturnType<Func> // number
```

### 3. Pattern Matching on various structures

`infer` works like regex for types. You can match against Arrays, Functions, Promises, and even Strings (template literals).

**Matching Arrays/Tuples:**

```typescript
type First<T extends any[]> = T extends [infer F, ...any[]] ? F : never
```

**Matching Promises:**

```typescript
type UnwrapPromise<T> = T extends Promise<infer U> ? U : T
```

**Matching Strings (Template Literals):**

```typescript
type GetSurname<T> = T extends `${string} ${infer Last}` ? Last : never
type S = GetSurname<'John Doe'> // "Doe"
```

### 4. Multiple `infer` declarations

You can declare multiple `infer` variables in a single expression.

```typescript
type GetArgsAndReturn<T> = T extends (...args: infer Args) => infer R
  ? { args: Args; return: R }
  : never
```

---

## Problems

Click on a problem to view details and code.

| #   | Problem                            | Description                                                         |
| --- | ---------------------------------- | ------------------------------------------------------------------- |
| 4.1 | [Return Type](./01-return-type.ts) | Implement the built-in `ReturnType<T>`.                             |
| 4.2 | [Parameters](./02-parameters.ts)   | Implement the built-in `Parameters<T>` generic.                     |
| 4.3 | [Awaited](./03-awaited.ts)         | Unwrap a `Promise` type recursively.                                |
| 4.4 | [Last](./04-last.ts)               | Implement a generic that returns the last element of an array.      |
| 4.5 | [Pop](./05-pop.ts)                 | Implement a generic that returns an array without its last element. |
| 4.6 | [Flatten](./06-flatten.ts)         | Flatten an array type up to one level.                              |

---

[← Back to Index](../index.md) | [Previous: Conditional Types](../03-conditional-types/index.md) | [Next: Template Literals →](../05-template-literals/index.md)
