# Level 5: Template Literals

**Concepts:** Template literal types, string union manipulation, recursive string processing

> Template literal types build on string literal types, and have the ability to expand into many strings via unions.

[← Back to Index](../index.md) | [Previous: Infer](../04-infer/index.md) | [Next: Recursive Types →](../06-recursive-types/index.md)

---

## Key Concepts

### 1. Basic Template Literals

They have the same syntax as JavaScript template strings, but are used in type positions.

```typescript
type World = 'World'
type Greeting = `Hello ${World}` // "Hello World"
```

### 2. Unions in Templates (Cross-Product)

When used with unions, they cross-multiply (distribute). This effectively creates a Cartesian product of all possible combinations.

```typescript
type Color = 'red' | 'blue'
type Quantity = 'one' | 'two'
type Item = `${Color}-${Quantity}`
// Result: "red-one" | "red-two" | "blue-one" | "blue-two"
```

### 3. String Intrinsic Manipulation Types

TypeScript provides built-in types to manipulate string cases. These are implemented by the compiler for performance.

```typescript
type U = Uppercase<'hello'> // "HELLO"
type L = Lowercase<'HELLO'> // "hello"
type C = Capitalize<'hello'> // "Hello"
type UC = Uncapitalize<'Hello'> // "hello"
```

### 4. Recursive String Processing

Combined with `infer` and conditional types, you can process strings recursively (e.g. implementing `Split` or `ReplaceAll`).

```typescript
type EatFirst<T> = T extends `${infer First}${infer Rest}` ? Rest : ''
type Tail = EatFirst<'Hello'> // "ello"
```

---

## Problems

Click on a problem to view details and code.

| #   | Problem                                         | Description                                                 |
| --- | ----------------------------------------------- | ----------------------------------------------------------- |
| 5.1 | [Capitalize](./01-capitalize.ts)                | Implement `Capitalize<T>`.                                  |
| 5.2 | [TrimLeft](./02-trim-left.ts)                   | Remove whitespace from the beginning of a string.           |
| 5.3 | [Trim](./03-trim.ts)                            | Remove whitespace from both sides of a string.              |
| 5.4 | [Replace](./04-replace.ts)                      | Replace the first occurrence of a string with another.      |
| 5.5 | [KebabCase](./05-kebab-case.ts)                 | Convert a string to kebab-case (fooBar -> foo-bar).         |
| 5.6 | [String to Union](./06-string-to-union.ts)      | Convert a string to a union of its characters.              |
| 5.7 | [Length of String](./07-length-of-string.ts)    | Compute the length of a string literal type.                |
| 5.8 | [StartsWith/EndsWith](./08-starts-ends-with.ts) | Check if a string starts or ends with a specific substring. |

---

[← Back to Index](../index.md) | [Previous: Infer](../04-infer/index.md) | [Next: Recursive Types →](../06-recursive-types/index.md)
