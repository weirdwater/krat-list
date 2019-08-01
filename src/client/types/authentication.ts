import { Maybe, Some } from '../../shared/fun'
import { Async, AsyncLoaded } from '../../shared/async'

export interface User {
  id: string
  name: string
  email: string
  avatar: Maybe<string>
  created: Date
  updated: Date
}

export interface LoginState {
  auth: 'login'
  session: Async<string>
  user: Async<User>
  email: Maybe<string>
  password: Maybe<string>
}

export interface RegisterContactStepState {
  auth: 'register'
  step: 'contact'
  email: Maybe<string>
  name: Maybe<string>
  password: Maybe<string>
  passwordCheck: Maybe<string>
}

export interface RegisterPasswordStepState {
  auth: 'register'
  step: 'password'
  email: Some<string>
  name: Some<string>
  password: Maybe<string>
  passwordCheck: Maybe<string>
}

export interface RegisterCompleteState {
  auth: 'register'
  step: 'complete'
  registered: Async<boolean>
  email: Some<string>
  password: Some<string>
  passwordCheck: Some<string>
  name: Some<string>
}

export type RegisterState = RegisterContactStepState | RegisterPasswordStepState | RegisterCompleteState

export interface AuthenticatedState<a> {
  auth: 'authenticated'
  session: AsyncLoaded<string>
  user: AsyncLoaded<User>
  appState: a
}

export type AuthState<a> = LoginState | RegisterState | AuthenticatedState<a>

export const isAuthenticated = <a>(x: AuthState<a>): x is AuthenticatedState<a> => x.auth === 'authenticated'

export const isLogin = <a>(x: AuthState<a>): x is LoginState => x.auth === 'login'

export const isRegister = <a>(x: AuthState<a>): x is RegisterState => x.auth === 'register'
