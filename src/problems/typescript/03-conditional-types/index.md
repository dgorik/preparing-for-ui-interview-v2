# Level 3: Conditional Types

**Concepts:** `T extends U ? X : Y`, `infer`, `never` in conditionals

> Conditional types allow for type logic that depends on other types, enabling powerful and dynamic type definitions.

[← Back to Index](../index.md) | [Previous: Mapped Types](../02-mapped-types/index.md) | [Next: Infer →](../04-infer/index.md)

---

## Key Concepts

### 1. Basic Conditional Types

They act like ternary operators in JavaScript (`condition ? trueBranch : falseBranch`).

```typescript
type IsString<T> = T extends string ? true : false

type A = IsString<string> // true
type B = IsString<number> // false
```

### 2. Distributivity

When the checked type is a naked generic parameter and it is instantiated with a union type, the conditional type is distributed over that union.

```typescript
type ToArray<Type> = Type extends any ? Type[] : never
type StrArrOrNumArr = ToArray<string | number>
// Result: string[] | number[]
```

**How it works:**

1. `ToArray<string | number>` distributes.
2. `ToArray<string> | ToArray<number>`
3. `string[] | number[]`

### 3. Filtering with `never`

You can filter unions by returning `never` in one of the branches. `never` is the empty set; extending a union with `never` does nothing (it vanishes).

```typescript
// Exclude null and undefined
type NonNullable<T> = T extends null | undefined ? never : T

type T = NonNullable<string | null | undefined> // string
```

### 4. `inference` within Conditionals

We will cover this deeply in Level 4, but `infer` keyword allows you to extract types from within the condition.

```typescript
type Flatten<T> = T extends any[] ? T[number] : T
```

---

## Problems

Click on a problem to view details and code.

| #   | Problem                     | Description                                                                      |
| --- | --------------------------- | -------------------------------------------------------------------------------- |
| 3.1 | [If](./01-if.ts)            | Implement a type that returns `T` if condition is `true`, `F` otherwise.         |
| 3.2 | [Exclude](./02-exclude.ts)  | Implement the built-in `Exclude<T, U>`.                                          |
| 3.3 | [IsNever](./03-is-never.ts) | Implement a type that checks if a type is `never`.                               |
| 3.4 | [AnyOf](./04-any-of.ts)     | Implement a type that returns `true` if any element in the array is "truthy".    |
| 3.5 | [Lookup](./05-lookup.ts)    | Retrieve the type of a property from a union of types by a discriminative field. |

---

[← Back to Index](../index.md) | [Previous: Mapped Types](../02-mapped-types/index.md) | [Next: Infer →](../04-infer/index.md)
