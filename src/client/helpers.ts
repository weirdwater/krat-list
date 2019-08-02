import { none, Maybe, isSome, isNone } from "../shared/fun";

export const isNowTrue = <a,b>(p: (_: b) => boolean) => (getProperty: (s: a) => Maybe<b>) => (s1: a, s0?: a) => {
  const p0 = s0 ? getProperty(s0) : none()
  const p1 = getProperty(s1)

  if (isNone(p1) || !p(p1.v) || (isSome(p0) && p(p0.v))) {
    return false
  }

  return true
}
