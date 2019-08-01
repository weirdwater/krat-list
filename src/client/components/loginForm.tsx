import * as React from 'react'
import { TextInput } from './textInput';
import { LoginState, AuthState } from '../types/authentication';
import { StateUpdater } from '../types/state';
import { none } from '../../shared/fun';

export const LoginForm = <a,>(props: {
  state: LoginState,
  updateState: StateUpdater<LoginState, AuthState<a>>
}) => <div>
  <form onSubmit={() => alert('would log in')} >
    <label htmlFor="email">E-mail</label>
    <TextInput
      id="email"
      type="email"
      value={props.state.email}
      autoComplete="username"
      onChange={email => props.updateState(s => ({...s, email }))} />
    <label htmlFor="password">Wachtwoord</label>
    <TextInput
      id="password"
      value={props.state.password}
      type="password"
      autoComplete="current-password"
      onChange={password => props.updateState(s => ({...s, password }))} />
    <input type="submit" value="Log in" />
  </form>
  <a href="#" onClick={e => {
    e.preventDefault()
    props.updateState(s => ({...s, auth: 'register', step: 'contact', passwordCheck: none(), name: none() }))
  }} >Nog geen account?</a>
</div>

