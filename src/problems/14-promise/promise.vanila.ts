type PromiseStatus = 'pending' | 'fulfilled' | 'rejected'

const PENDING: PromiseStatus = 'pending'
const FULFILLED: PromiseStatus = 'fulfilled'
const REJECTED: PromiseStatus = 'rejected'

type TExecutor<T> = (
  resolve: (value: T | PromiseLike<T>) => void,
  reject: (reason: any) => any,
) => void

type OnFulfilled<T, R> = null | undefined | ((value: T) => R)

type OnRejected<R> = null | undefined | ((reason: any) => R)

type THandler<T> = {
  onFulfilled: (val: T) => any
  onRejected: (reason: any) => any
  resolve: (value: any) => void
  reject: (reason: any) => void
}

export class MyPromise<T> {
  #handlers: THandler<T>[] = []
  #value: T | any
  #status: PromiseStatus = PENDING
  #isResolved: boolean = false

  constructor(executor: TExecutor<T>) {
    try {
      executor(this.resolve, this.reject)
    } catch (e) {
      this.reject(e)
    }
  }

  then<R = T>(onFulfilled: OnFulfilled<T, R>, onRejected?: OnRejected<R>) {
    const handler: THandler<T> = {
      onFulfilled: typeof onFulfilled == 'function' ? onFulfilled : (v: any) => v,
      onRejected:
        typeof onRejected == 'function'
          ? onRejected
          : (v: any) => {
              throw v
            },
      resolve: (value: any) => {},
      reject: (reason: any) => {},
    }

    const promise = new MyPromise<R>((resolve, reject) => {
      handler.resolve = resolve
      handler.reject = reject
    })

    this.#handlers.push(handler)

    if (this.#status != PENDING) {
      this.execute()
    }

    return promise
  }

  execute = () => {
    for (const { onFulfilled, onRejected, resolve, reject } of this.#handlers) {
      const handler = this.#status === FULFILLED ? onFulfilled : onRejected
      queueMicrotask(() => {
        try {
          const value = handler(this.#value)

          if (value instanceof MyPromise) {
            value.then(resolve, reject)
          } else {
            resolve(value)
          }
        } catch (e) {
          reject(e)
        }
      })
    }

    this.#handlers = []
  }

  #settle = (value: T | any, status: PromiseStatus = FULFILLED): void => {
    if (this.#isResolved) {
      return
    }

    this.#isResolved = true
    const update = (value: T) => {
      this.#value = value
      this.#status = status
      this.execute()
    }
    if (value instanceof MyPromise) {
      value.then(update)
    } else {
      update(value as T)
    }
  }

  resolve = (value: T | PromiseLike<T>) => {
    this.#settle(value)
  }

  reject = (reason: any) => {
    this.#settle(reason, REJECTED)
  }

  catch<R>(onRejected: OnRejected<R>) {
    return this.then(undefined, onRejected)
  }

  static resolve<T>(value: T): MyPromise<T> {
    return new MyPromise<T>((res) => res(value))
  }

  static reject<T = never>(value: any): MyPromise<T> {
    return new MyPromise<T>((_, rej) => rej(value))
  }
}

const p1 = new Promise((resolve: any) => resolve(42))

console.log(p1)
