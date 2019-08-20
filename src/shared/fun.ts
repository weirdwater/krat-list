// tslint:disable-next-line:no-empty-interface
export interface Unit {}

const u: Unit = {}

export const unit = (): Unit => u

export interface Left<a> {
  k: 'l',
  v: a
}

export interface Right<a> {
  k: 'r',
  v: a
}

export type Either<a, b> = Left<a> | Right<b>

export type Maybe<a> = Either<Unit, a>

export interface None extends Left<Unit> {}

export interface Some<a> extends Right<a> {}

export type Fun<a, b> = (_: a) => b

export interface Action<a> extends Fun<a, a> {}

export const left = <a>(_: a): Left<a> => ({ k: 'l', v: _ })

export const right = <a>(_: a): Right<a> => ({ k: 'r', v: _ })

export const isLeft = <a, b>(_: Either<a, b>): _ is Left<a> => _.k === 'l'

export const isRight = <a, b>(_: Either<a, b>): _ is Right<b> => _.k === 'r'

export const none = (): None => left(unit())

export const some = <a>(_: a): Some<a> => right<a>(_)

export const mkMaybe = <a>(_: a | undefined | null): Maybe<a> => _ === undefined || _ === null ? none() : some(_)

export const isSome = isRight

export const isNone = isLeft

export const ifEither = <a, b>(f: (_: a) => void, g: (_: b) => void) => (x: Either<a, b>) => isLeft(x) ? f(x.v) : g(x.v)

export const ifLeft = <a, b>(f: (_: a) => void) => ifEither<a, b>(f, () => {})

export const ifRight = <a, b>(f: (_: b) => void) => ifEither<a, b>(_ => {}, f)

// TODO: Find a way to predefine only part of the types.
export const ifNone = ifLeft

export const ifSome = ifRight
