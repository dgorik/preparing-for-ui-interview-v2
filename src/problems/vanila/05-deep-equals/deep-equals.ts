const getType = (value: any) => {
  if (value == null) {
    return `${value}`
  }
  return (Object.getPrototypeOf(value)?.constructor?.name ?? 'object').toLowerCase()
}

export function deepEquals(a: any, b: any, store = new Map()): boolean {
  if (a === b || (store.has(a) && store.get(a) === b)) {
    return true
  }
  const [typeA, typeB] = [getType(a), getType(b)]
  if (typeA !== typeB) return false
  if (typeA === 'object' || typeA === 'array') {
    const [keysA, keysB] = [Object.keys(a), Object.keys(b)]
    if (keysA.length !== keysB.length) return false
    store.set(a, b)
    for (const key of keysA) {
      if (!Object.prototype.hasOwnProperty.call(b, key) || !deepEquals(a[key], b[key], store)) {
        return false
      }
    }
    return true
  }
  return a === b
}
