import React, { useEffect } from 'react';
import { Async, isError, isLoading, mkError } from '../../shared/async';
import { none, some } from '../../shared/fun';
import { UserSelf } from '../api/types';
import { BeerAppState } from '../beerApp';
import { isNowTrue } from '../helpers';
import { usePrevious } from '../hooks';
import { AuthenticatedState, AuthState, isAuthenticated, isLogin, isRegister, User } from '../types/authentication';
import { StateUpdater } from '../types/state';
import { LoginForm } from './loginForm';
import { RegistrationForm } from './registrationForm';

const sessionIsNowLoading = isNowTrue<BeerAppState, Async<string>>(isLoading)(s => isLogin(s) ? some(s.session) : none())
const userIsNowLoading = isNowTrue<BeerAppState, Async<User>>(isLoading)(s => isLogin(s) ? some(s.user) : none())
const registrationIsNowLoading = isNowTrue<BeerAppState, Async<UserSelf>>(isLoading)(s => isRegister(s) && s.step === 'password' ? some(s.registered) : none())

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

  useEffect(() => {
    if (registrationIsNowLoading(props.state, prevState)) {
      console.log('Performing registration')
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

  return <RegistrationForm<a> state={props.state} updateState={a => props.updateState(s => isRegister(s) ? a(s) : s)} />

}

