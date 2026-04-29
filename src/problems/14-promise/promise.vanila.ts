type PromiseStatus = 'pending' | 'fulfilled' | 'rejected'

const PENDING: PromiseStatus = 'pending'
const FULFILLED: PromiseStatus = 'fulfilled'
const REJECTED: PromiseStatus = 'rejected'

type TExecutor <T> = (
  resolve: (value: T | PromiseLike<T>) =>void,
  reject: (reason: any) => any
) => void


type OnFulfilled <T, R> = null | undefined | ((value: T) => R)

type OnRejected <R> = null | undefined | ((reason: any) => R)

type THandler = {
  onFullfiled: (val: any) => void
  onRejected: (reason: any) => void
  resolve:(value: any) => void
  reject: (reason: any) => void
}

export class MyPromise <T> {

  value: T |null  = null
  status: PromiseStatus = 'pending'
  constructor (executor: TExecutor<T>){

  }

  then<R =T>(
    onFulfilled: OnFulfilled<T,R>,
    onRejected?: OnRejected<R>
  ){
    throw Error ('Not implemented')
  }

  catch <R>(
    onRejected: OnRejected<R>
  ){
    return this.then(onFulfilled: null, OnRejected)
  }

  {
    throw new Error(message: "Not implemented")
  }
}
