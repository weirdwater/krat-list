import { none, Maybe, isSome, isNone } from "../shared/fun";

export const isNowTrue = <a,b>(p: (_: b) => boolean) => (getProperty: (s: a) => Maybe<b>) => (s1: a, s0?: a) => {
  const p0 = s0 ? getProperty(s0) : none()
  const p1 = getProperty(s1)

  if (isNone(p1) || !p(p1.v) || (isSome(p0) && p(p0.v))) {
    return false
  }

  return true
}

export interface QueryParameters {
  [parameter: string]: string
}

export const createQueryString = (params: QueryParameters): string => `?${Object.entries(params).map(p => p.map(s => encodeURIComponent(s)).join('=')).join('&')}`

export const getQueryParams = (query: string): QueryParameters => {
  const startQueryString = query.indexOf('?')
  if (startQueryString === -1) {
    return {}
  }

  const queryString = query.substring(startQueryString + 1)
  if (queryString.length === 0) {
    return {}
  }

  return queryString.split('&')
                    .map(p => p.split('='))
                    .reduce((o, p) => ({...o, [p[0]]: p[1]}), {})
}

export const preventDefault = <a extends { preventDefault: () => void }>(f: (e: a) => void) => (e: a) => {
  e.preventDefault()
  f(e)
}

export const toFormattedJSON = (obj: any) => JSON.stringify(obj, null, 2)
