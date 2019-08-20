import React, { useEffect } from 'react';
import { Async, isError, isLoading, mkError, mkLoaded, mkLoading, isLoaded, isPristine } from '../../shared/async';
import { none, some, isNone, isSome, ifSome, Unit } from '../../shared/fun';
import { UserSelf } from '../api/types';
import { BeerAppState } from '../beerApp';
import { isNowTrue, createQueryString } from '../helpers';
import { usePrevious } from '../hooks';
import { AuthenticatedState, AuthState, isAuthenticated, isLogin, isRegister, User, RegisterState, RegisterCompleteState, LoginState } from '../types/authentication';
import { StateUpdater } from '../types/state';
import { LoginForm } from './loginForm';
import { RegistrationForm } from './registrationForm';
import * as Api from '../api'

const sessionIsNowLoading = isNowTrue<BeerAppState, Async<string>>(isLoading)(s => isLogin(s) ? some(s.session) : none())
const userIsNowLoading = isNowTrue<BeerAppState, Async<UserSelf>>(isLoading)(s => isLogin(s) ? some(s.user) : none())
const registrationIsNowLoading = isNowTrue<BeerAppState, Async<UserSelf>>(isLoading)(s => isRegister(s) && s.step === 'password' ? some(s.registered) : none())

export function Authentication<a,>(props: {
  state: AuthState<a>
  initialAppState: a
  updateState: StateUpdater<AuthState<a>>
  app: (s: AuthenticatedState<a>) => React.ReactNode
}) {
  const prevState = usePrevious<AuthState<a>>(props.state)

  useEffect(() => {
    if (props.state.auth === 'login' && isPristine(props.state.session)) {
      ifSome<Unit, string>(
        t => props.updateState(s => isLogin(s) ? {...s, session: mkLoaded(t), user: mkLoading() } : s)
      )(Api.loadSessionToken())
    }
  }, [props.state.auth])

  useEffect(() => {
    if (sessionIsNowLoading(props.state, prevState)) {
      const { email, password } = props.state as LoginState
      if (isNone(email) || isNone(password)) {
        return props.updateState(s => isLogin(s) ? { ...s, session: mkError('Om in te kunnen loggen zijn je e-mail en wachtwoord nodig.') } : s)
      }
      Api.authenticateUser({ email, password })
        .then(token => {
          Api.saveSessionToken(token)
          props.updateState(s => isLogin(s) ? { ...s, session: mkLoaded(token), user: mkLoading() } : s)
        })
        .catch(e => props.updateState(s => isLogin(s) ? { ...s, session: mkError('Om in te kunnen loggen zijn je e-mail en wachtwoord nodig.') } : s))
    }
  }, [props.state])

  useEffect(() => {
    if (userIsNowLoading(props.state, prevState)) {
      const { session } = props.state as LoginState
      if (!isLoaded(session)) {
        return props.updateState(s => isLogin(s) ? { ...s, user: mkError('Gebruikersdata kan niet worden opgevraagd zonder authenticatie.') } : s)
      }
      Api.self(session.v)
        .then(u => props.updateState(s => isLogin(s) ? { auth: 'authenticated', user: mkLoaded(u), session, appState: props.initialAppState } : s))
        .catch(e => props.updateState(s => isLogin(s) ? { ...s, user: mkError(e) } : s))
    }
  }, [props.state])

  useEffect(() => {
    if (registrationIsNowLoading(props.state, prevState)) {
      const { email, name, password } = props.state as RegisterState
      if (isNone(email) || isNone(name) || isNone(password)) {
        return props.updateState(s => isRegister(s) && s.step === 'password' ? {...s, registered: mkError('Alle velden moeten voorzien zijn van informatie.')} : s)
      }
      Api.registerUser({ email, name, password })
        .then(u => props.updateState(s => {
          if (!isRegister(s) || s.step !== 'password') {
            return s
          }
          const{ password, passwordCheck } = s
          if (isNone(password) || isNone(passwordCheck)) {
            return s
          }
          return {...s, step: 'complete', registered: mkLoaded(u), password, passwordCheck }
        }))
        .catch(e => props.updateState(s => isRegister(s) && s.step === 'password' ? {...s, registered: mkError(e.toString())} : s))
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

