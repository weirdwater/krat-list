import React, { useEffect, useRef } from 'react';
import { AuthenticatedState, AuthState, isAuthenticated, isLogin, isRegister, User } from '../types/authentication';
import { StateUpdater } from '../types/state';
import { LoginForm } from './loginForm';
import { mkPristine, isLoading, isError, mkError, Async } from '../../shared/async';
import { usePrevious } from '../hooks';
import { Maybe, some, none, isNone, isSome } from '../../shared/fun';
import { BeerAppState } from '../beerApp';
import { isNowTrue } from '../helpers';

const sessionIsNowLoading = isNowTrue<BeerAppState, Async<string>>(isLoading)(s => isLogin(s) ? some(s.session) : none())
const userIsNowLoading = isNowTrue<BeerAppState, Async<User>>(isLoading)(s => isLogin(s) ? some(s.user) : none())

export function Authentication<a,>(props: {
  state: AuthState<a>
  updateState: StateUpdater<AuthState<a>>
  app: (s: AuthenticatedState<a>) => React.ReactNode
}) {
  const prevState = usePrevious<AuthState<a>>(props.state)

  useEffect(() => {
    if (sessionIsNowLoading(props.state, prevState)) {
      new Promise(r => setTimeout(r, 5000)).then(() => {
        console.log('oops')
        props.updateState(s => isLogin(s) ? {...s, session: mkError('Oops')} : s)
      })
    }
  }, [props.state])

  if (isAuthenticated(props.state)) {
    return <>{props.app(props.state)}</>
  }

  if (isLogin(props.state)) {
    return <div>
      { isError(props.state.session) && <p style={ { color: '#c00' } } >{props.state.session.m}</p> }
      <LoginForm<a> state={props.state} updateState={a => props.updateState(s => isLogin(s) ? a(s) : s)} />
    </div>
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

