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

  #handlers: THandler[] = []
  #value: T |null  = null
  #status: PromiseStatus = PENDING
  #isResolved: boolean = false

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

  #settle  = (value: T | any, status: PromiseStatus = FULFILLED ): void => {
    if( this.#isResolved){
      return
    }

    this.#isResolved = true
    const update  = (value: T) => {
      this.#value = value
      this.#status = status
      this.execute()
    }
    if( value instanceof MyPromise){
      value.then(update)
    }
    else{
      update(value as T)
    }
  }

  execute = () => {

  }

  resolve = (value: T | PromiseLike <T>) => {
    this.#settle(value)
  }

  reject = (reason:any) => {
    this.#settle(reason, REJECTED)
  }

  catch <R>(
    onRejected: OnRejected<R>
  ){
    return this.then(onFulfilled: null, OnRejected)
  }
}


const p1 = new Promise ((resolve: any) => resolve(42))

console.log(p1)