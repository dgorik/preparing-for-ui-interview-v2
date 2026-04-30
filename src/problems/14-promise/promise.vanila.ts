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
  status: PromiseStatus = PENDING
  handlers: THandler[] = []
  isResolved: boolean = false

  constructor (executor: TExecutor<T>){

    try {
      executor(this.resolve, this.reject)
    }

    catch(e){
      this.reject(e)
    }

  }

  then<R =T>(
    onFulfilled: OnFulfilled<T,R>,
    onRejected?: OnRejected<R>
  ){
    throw Error ('Not implemented')
  }

  resolve: (value: T | Promise <T>) => void = (value: T | PromiseLike <T>) => {

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
