// bun test src/problems/14-promise/test/promise.test.ts

type PromiseStatus = 'pending' | 'fulfilled' | 'rejected'

const PENDING: PromiseStatus = 'pending'
const FULFILLED: PromiseStatus = 'fulfilled'
const REJECTED: PromiseStatus = 'rejected'

// Step 0: Define types and constants
// Step 1: Define class fields
// Step 2: Implement settle, resolve, reject
// Step 3: Implement execute
// Step 4: Implement constructor
// Step 5: Implement then<R>
// Step 6: Implement catch, static resolve, static reject
export class MyPromise {
  constructor(executor: any) {}

  then() {
    throw new Error('Not implemented')
  }
  catch() {
    throw new Error('Not implemented')
  }
  static resolve() {
    throw new Error('Not implemented')
  }
  static reject() {
    throw new Error('Not implemented')
  }
}

// --- Examples ---
// Uncomment to test your implementation:

// const p1 = new MyPromise((resolve: any) => resolve(42))
// p1.then((v: any) => console.log(v))  // Expected: 42
//
// const p2 = new MyPromise((resolve: any) => resolve(1))
//   .then((v: any) => v + 1)
//   .then((v: any) => console.log(v))   // Expected: 2
//
// const p3 = new MyPromise((_: any, reject: any) => reject('error'))
// p3.catch((e: any) => console.log(e))  // Expected: "error"
//
// MyPromise.resolve(99).then((v: any) => console.log(v))  // Expected: 99
