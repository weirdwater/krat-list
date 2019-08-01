import * as React from 'react';
import { AuthenticatedState, AuthState, isAuthenticated, isLogin, isRegister } from '../types/authentication';
import { StateUpdater } from '../types/state';
import { LoginForm } from './loginForm';
import { none } from '../../shared/fun';
import { mkPristine } from '../../shared/async';

export const Authentication = <a,>(props: {
  state: AuthState<a>
  updateState: StateUpdater<AuthState<a>>
  app: (s: AuthenticatedState<a>) => React.ReactNode
}) => {

  if (isAuthenticated(props.state)) {
    return <>{props.app(props.state)}</>
  }

  if (isLogin(props.state)) {
    return <LoginForm<a> state={props.state} updateState={a => props.updateState(s => isLogin(s) ? a(s) : s)} />
  }

  return <div>
    registration
    <a href="#" onClick={e => {
      e.preventDefault()
      props.updateState(s => isRegister(s) ? {
        auth: 'login',
        email: s.email,
        password: s.password,
        user: mkPristine(),
        session: mkPristine()
      } : s )}}
    >Log in</a>
  </div>

}

