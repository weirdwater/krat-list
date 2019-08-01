import { Action, Fun } from "../../shared/fun";

export interface StateUpdater<a, b = a> {
  (f: Fun<a, b>): void
}

