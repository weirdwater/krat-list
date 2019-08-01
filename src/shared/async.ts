
export interface AsyncPristine { s: 'pristine' }

export interface AsyncLoading { s: 'loading' }

export interface AsyncLoaded<a> { s: 'loaded', v: a }

export interface AsyncError { s: 'error', m: string }

export type Async<a> = AsyncPristine | AsyncLoading | AsyncLoaded<a> | AsyncError

export const mkPristine = (): AsyncPristine => ({ s: 'pristine' })

export const mkLoading = (): AsyncLoading => ({ s: 'loading' })

export const mkLoaded = <a>(v: a): AsyncLoaded<a> => ({ s: 'loaded', v })

export const mkError = (m: string): AsyncError => ({ s: 'error', m })

export const isPristine = <a>(x: Async<a>): x is AsyncPristine => x.s === 'pristine'

export const isLoading = <a>(x: Async<a>): x is AsyncLoading => x.s === 'loading'

export const isLoaded = <a>(x: Async<a>): x is AsyncLoaded<a> => x.s === 'loaded'

export const isError = <a>(x: Async<a>): x is AsyncError => x.s === 'error'
