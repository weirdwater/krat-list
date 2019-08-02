import * as React from 'react'
import { TextInput } from './textInput';
import { LoginState, AuthState } from '../types/authentication';
import { StateUpdater } from '../types/state';
import { none } from '../../shared/fun';
import { mkLoading, isLoading } from '../../shared/async';

const submit = <a,>(updateState: StateUpdater<LoginState, AuthState<a>>) => (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault()
  updateState(s => ({...s, session: mkLoading()}))
}

export const LoginForm = <a,>({ state, updateState }: {
  state: LoginState,
  updateState: StateUpdater<LoginState, AuthState<a>>
}) => <div>
  <form onSubmit={submit(updateState)} >
    <label htmlFor="email">E-mail</label>
    <TextInput
      id="email"
      type="email"
      value={state.email}
      autoComplete="username"
      disabled={isLoading(state.session)}
      onChange={email => updateState(s => ({...s, email }))} />
    <label htmlFor="password">Wachtwoord</label>
    <TextInput
      id="password"
      value={state.password}
      type="password"
      autoComplete="current-password"
      disabled={isLoading(state.session)}
      onChange={password => updateState(s => ({...s, password }))} />
    <input type="submit" value="Log in" disabled={isLoading(state.session)} />
  </form>
  <a href="#" onClick={e => {
    e.preventDefault()
    updateState(s => ({...s, auth: 'register', step: 'contact', passwordCheck: none(), name: none() }))
  }} >Nog geen account?</a>
</div>

