# Level 8: Advanced Patterns

**Concepts:** `as` remapping, mapped type modifiers, filtering keys by value type

> Combining mapped types with conditional types allows for complex transformations like filtering keys or renaming properties.

[← Back to Index](../index.md) | [Previous: Distributive Conditionals](../07-distributive-conditionals/index.md) | [Next: Expert Techniques →](../09-expert-techniques/index.md)

---

## Key Concepts

### 1. Key Remapping with `as`

Introduced in TS 4.1, this allows you to transform keys in a mapped type using a clause `as NewKey`. If `NewKey` results in `never`, the key is filtered out.

```typescript
type Getters<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K]
}

type Person = { name: string; age: number }
type PersonGetters = Getters<Person>
// { getName: () => string; getAge: () => number; }
```

### 2. Filtering Keys (Omit by Type)

By combining Key Remapping with Conditional Types, you can filter keys based on their **values**.

```typescript
type RemoveStringFields<T> = {
  [K in keyof T as T[K] extends string ? never : K]: T[K]
}

// If T[K] is string, the key becomes 'never' (removed).
// Otherwise, it stays as K.
```

### 3. Modifying Modifiers Selectively

You can apply modifiers like `?` or `readonly` only to specific keys.

```typescript
type RequiredKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? never : K
}[keyof T]
// Returns a union of keys that are required.
```

### 4. Advanced Array Transformations

Using recursive conditional types (from Level 6) on arrays allows for operations like `Chunk`, `Zip`, or `Join`.

```typescript
type Join<T extends string[], U extends string> = T extends [
  infer F extends string,
  ...infer R extends string[],
]
  ? R['length'] extends 0
    ? F
    : `${F}${U}${Join<R, U>}`
  : ''
```

---

## Problems

Click on a problem to view details and code.

| #   | Problem                                  | Description                                                              |
| --- | ---------------------------------------- | ------------------------------------------------------------------------ |
| 8.1 | [PickByType](./01-pick-by-type.ts)       | From `T`, pick a set of properties whose type are assignable to `U`.     |
| 8.2 | [OmitByType](./02-omit-by-type.ts)       | From `T`, pick a set of properties whose type are not assignable to `U`. |
| 8.3 | [PartialByKeys](./03-partial-by-keys.ts) | Make properties specified in `K` optional.                               |
| 8.4 | [Chunk](./04-chunk.ts)                   | Bundle elements of array `T` into subarrays of size `U`.                 |

---

[← Back to Index](../index.md) | [Previous: Distributive Conditionals](../07-distributive-conditionals/index.md) | [Next: Expert Techniques →](../09-expert-techniques/index.md)
