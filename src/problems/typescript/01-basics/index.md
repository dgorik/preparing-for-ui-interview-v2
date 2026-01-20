# Level 1: Basics

**Concepts:** `keyof`, `typeof`, indexed access types, basic generics, tuple manipulation

> Start here! These are the building blocks of TypeScript's type system.

[← Back to Index](../index.md) | [Next: Mapped Types →](../02-mapped-types/index.md)

---

## Key Concepts

### 1. `keyof` Operator

The `keyof` operator takes an object type and produces a string or numeric literal union of its keys. This is strictly for _types_, not runtime objects.

```typescript
type Person = { name: string; age: number }
type P = keyof Person // 'name' | 'age'

// It's often used with Generics to ensure a key exists on an object
function getProperty<T, K extends keyof T>(obj: T, key: K) {
  return obj[key]
}
```

### 2. Indexed Access Types

You can use indexed access types (also called "lookup types") to retrieve the type of a specific property on another type.

```typescript
type Person = { name: string; age: number; address: { city: string } }
type Age = Person['age'] // number
type City = Person['address']['city'] // string
```

### 3. `typeof` Operator

Refers to the _type_ of a value (variable, object, function). It bridges the gap between value space and type space.

```typescript
const s = 'hello'
type N = typeof s // "hello" (string literal type)

const person = { name: 'Alice', age: 30 }
type Person = typeof person // { name: string; age: number }
```

### 4. `T[number]`

You can use `number` index to get the union of all types in an array or tuple.

```typescript
type Arr = ['a', 'b', 'c']
type T = Arr[number] // 'a' | 'b' | 'c'

type StringArray = string[]
type Item = StringArray[number] // string
```

### 5. `T['length']`

For tuples, accessing `'length'` returns the specific literal length number, not just `number`. This is crucial for counting in type-level programming.

```typescript
type Tesla = ['tesla', 'model 3', 'model X', 'model Y']
type Length = Tesla['length'] // 4

type StringArray = string[]
type Len = StringArray['length'] // number (not specific)
```

### 6. Generic Constraints (`extends`)

You can limit the types that a generic parameter can accept using `extends`.

```typescript
// T must be an object with a 'length' property that is a number
function logLength<T extends { length: number }>(arg: T) {
  console.log(arg.length)
}
```

---

## Problems

Click on a problem to view details and code.

| #   | Problem                                  | Description                                 |
| --- | ---------------------------------------- | ------------------------------------------- |
| 1.1 | [Tuple Length](./01-tuple-length.ts)     | Get the length of a tuple type.             |
| 1.2 | [First of Array](./02-first-of-array.ts) | Implementation of `head` function in types. |
| 1.3 | [Tuple to Union](./03-tuple-to-union.ts) | Convert a tuple to a union of its values.   |

---

[← Back to Index](../index.md) | [Next: Mapped Types →](../02-mapped-types/index.md)
