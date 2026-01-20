const getType = (value: any) => {
  if (value == null) {
    return `${value}`
  }
  return (Object.getPrototypeOf(value)?.constructor?.name ?? 'object').toLowerCase()
}

export function stringify<T>(value: T, seen = new WeakSet()): string {
  const type = getType(value)
  switch (type) {
    case 'null':
    case 'number':
    case 'bigint':
    case 'boolean':
      return `${value}`
    case 'symbol':
      return `"${String(value)}"`
    case 'undefined':
    case 'string':
      return `"${value}"`
    case 'map':
    case 'object': {
      if (seen.has(value as object)) {
        return '[Circular]'
      }
      seen.add(value as object)
      const entries = Array.from(
        type === 'map' ? (value as Map<any, any>).entries() : Object.entries(value as {}),
      )
      const content = entries
        .map(([key, val]) => {
          return `${key}: ${stringify(val, seen)}`
        })
        .join(', ')
      return `{ ${content} }`
    }
    case 'set':
    case 'array': {
      if (seen.has(value as object)) {
        return '[Circular]'
      }
      seen.add(value as object)
      const content = Array.from(value as Array<any> | Set<any>)
        .map((val) => stringify(val, seen))
        .join(',')
      return `[${content}]`
    }
    case 'date':
      return (value as Date).toLocaleString()
    case 'regexp':
      return (value as RegExp).toString()
    default:
      return '"Unsupported Type"'
  }
}
