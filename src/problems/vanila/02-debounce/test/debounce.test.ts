import { describe, it, expect } from 'bun:test'
import { debounce } from '../debounce'

describe('debounce', () => {
  it('should return a function', () => {
    const debounced = debounce(() => {}, 100)
    expect(typeof debounced).toBe('function')
  })

  it('should delay execution', async () => {
    let callCount = 0
    const debounced = debounce(() => {
      callCount++
    }, 50)

    debounced()
    expect(callCount).toBe(0)

    await new Promise((r) => setTimeout(r, 100))
    expect(callCount).toBe(1)
  })

  it('should reset timer on subsequent calls', async () => {
    let callCount = 0
    const debounced = debounce(() => {
      callCount++
    }, 50)

    debounced()
    await new Promise((r) => setTimeout(r, 30))
    debounced() // Reset timer
    await new Promise((r) => setTimeout(r, 30))

    expect(callCount).toBe(0) // Still waiting

    await new Promise((r) => setTimeout(r, 50))
    expect(callCount).toBe(1)
  })

  it('should pass arguments to the function', async () => {
    let result = ''
    const debounced = debounce((msg: string) => {
      result = msg
    }, 50)

    debounced('hello')
    await new Promise((r) => setTimeout(r, 100))

    expect(result).toBe('hello')
  })

  it('should use the last call arguments', async () => {
    let result = ''
    const debounced = debounce((msg: string) => {
      result = msg
    }, 50)

    debounced('a')
    debounced('b')
    debounced('c')

    await new Promise((r) => setTimeout(r, 100))
    expect(result).toBe('c')
  })
})
