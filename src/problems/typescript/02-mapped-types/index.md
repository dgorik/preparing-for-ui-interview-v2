# Level 2: Mapped Types

**Concepts:** `{ [P in K]: ... }`, `keyof`, property modifiers (`readonly`, `?`), remapping

> Mapped types allow you to create new types based on old ones by iterating over property keys.

[← Back to Index](../index.md) | [Previous: Basics](../01-basics/index.md) | [Next: Conditional Types →](../03-conditional-types/index.md)

---

## Key Concepts

### 1. Basic Syntax

Mapped types allow you to create new object types by iterating over a union of keys (usually created via `keyof`).

```typescript
type OptionsFlags<Type> = {
  [Property in keyof Type]: boolean
}

type FeatureFlags = {
  darkMode: () => void
  newUserProfile: () => void
}

type FeatureOptions = OptionsFlags<FeatureFlags>
// { darkMode: boolean; newUserProfile: boolean; }
```

### 2. Modifiers (`+`, `-`)

You can control the **mutability** (readonly) and **optionality** (?) of properties during mapping.

- `+` adds a modifier (default if implicit).
- `-` removes a modifier.

```typescript
// Removes 'readonly' attributes from a type's properties
type CreateMutable<Type> = {
  -readonly [Property in keyof Type]: Type[Property]
}

// Removes 'optional' attributes (?) from a type's properties
type Concrete<Type> = {
  [Property in keyof Type]-?: Type[Property]
}
```

### 3. Key Remapping via `as`

You can transform property names using the `as` clause. This can be combined with Template Literal Types.

```typescript
// Capitalize the keys: "name" -> "Name"
type CapitalizeKeys<Type> = {
  [Property in keyof Type as Capitalize<string & Property>]: Type[Property]
}

// Filter out keys: Remove 'kind' property
type RemoveKindField<Type> = {
  [Property in keyof Type as Exclude<Property, 'kind'>]: Type[Property]
}
```

### 4. Homomorphic Mapped Types

When a mapped type iterates over `keyof T` (e.g. `[P in keyof T]`), TypeScript treats it as **homomorphic**. This means it preserves the original modifiers (readonly, optional) of the source type unless explicitly changed. This structure also helps TypeScript preserve the relationship between the input and output types for generic inference.

---

## Problems

Click on a problem to view details and code.

| #   | Problem                                      | Description                                                                   |
| --- | -------------------------------------------- | ----------------------------------------------------------------------------- |
| 2.1 | [Pick](./01-pick.ts)                         | Construct a type by picking the set of properties `K` from `T`.               |
| 2.2 | [Readonly](./02-readonly.ts)                 | Mark all properties of `T` as `readonly`.                                     |
| 2.3 | [Mutable](./03-mutable.ts)                   | Implement a generic that removes `readonly` from attributes.                  |
| 2.4 | [Tuple to Object](./04-tuple-to-object.ts)   | Give an array, transform into an object type.                                 |
| 2.5 | [Append to Object](./05-append-to-object.ts) | Implement a type that appends a new field to the interface.                   |
| 2.6 | [Merge](./06-merge.ts)                       | Merge two types into a new type. Keys of the second type overrides the first. |
| 2.7 | [Diff](./07-diff.ts)                         | Get an `Object` that is the difference between `O` & `O1`.                    |

---

[← Back to Index](../index.md) | [Previous: Basics](../01-basics/index.md) | [Next: Conditional Types →](../03-conditional-types/index.md)
