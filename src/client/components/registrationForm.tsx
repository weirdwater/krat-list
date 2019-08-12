import React from 'react'
import { isRegister, AuthState, RegisterState } from '../types/authentication';
import { mkPristine, mkLoading } from '../../shared/async';
import { StateUpdater } from '../types/state';
import { TextInput } from './textInput';
import { isSome, some, isNone } from '../../shared/fun';
import { preventDefault } from '../helpers';

export const RegistrationForm = <a,>({ state, updateState }: {
  state: RegisterState,
  updateState: StateUpdater<RegisterState, AuthState<a>>
}): JSX.Element => (<div>

  { state.step === 'contact' ?

    <form onSubmit={preventDefault(() => updateState(s => s.step === 'contact' && isSome(s.email) && isSome(s.name) ? {...s, step: 'password', email: s.email, name: s.name, registered: mkPristine() } : s))} >
      <label htmlFor="name">Naam</label>
      <TextInput
        id="name"
        value={state.name}
        type="text"
        onChange={name => updateState(s => s.step === 'contact' ? {...s, name } : s)} />
      <label htmlFor="email">E-mail</label>
      <TextInput
        id="email"
        type="email"
        value={state.email}
        autoComplete="username"
        onChange={email => updateState(s => s.step === 'contact' ? {...s, email } : s)} />
      <input type="submit" value="Volgende" />
    </form>

  : state.step === 'password' ?

    <form onSubmit={preventDefault(() => updateState(s => s.step === 'password' && isSome(s.password) && s.password.v === s.passwordCheck.v ? {...s, registered: mkLoading() } : s))} >
      <label htmlFor="password">Wachtwoord</label>
      <TextInput
        id="password"
        value={state.password}
        type="password"
        autoComplete="new-password"
        onChange={password => updateState(s => s.step === 'password' ? {...s, password } : s)} />
      <label htmlFor="passwordCheck">Herhaal wachtwoord</label>
      <TextInput
        id="passwordCheck"
        type="password"
        value={state.passwordCheck}
        autoComplete="new-password"
        onChange={passwordCheck => updateState(s => s.step === 'password' ? {...s, passwordCheck } : s)} />
      <input type="submit" value="Opslaan" disabled={isNone(state.password) || state.password.v !== state.passwordCheck.v} />
    </form>

  :
    <div>
      <h2>Bijna klaar...</h2>
      <p>Instructies</p>
    </div>
  }


  <a href="#" onClick={e => {
    e.preventDefault()
    updateState(s => isRegister(s) ? {
      auth: 'login',
      email: s.email,
      password: s.password,
      user: mkPristine(),
      session: mkPristine()
    } : s )}}
  >Heb je al wel een account?</a>
</div>)
