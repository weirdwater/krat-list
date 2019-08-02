import React, { useState, useEffect } from 'react'
import * as styles from './beerApp.scss'
import { AuthState } from './types/authentication';
import { Authentication } from './components/authentication';
import { none } from '../shared/fun';
import { mkPristine } from '../shared/async';

export type BeerAppState = AuthState<{}>

export function BeerApp(props: {}) {

  const [appState, setAppState] = useState<BeerAppState>({
    auth: 'login',
    email: none(),
    password: none(),
    user: mkPristine(),
    session: mkPristine()
  })

  return <Authentication
    state={appState}
    updateState={a => setAppState(s => a(s))}
    app={s => <div className={styles.app} >
      <h1>Hah, Bier!</h1>
    </div>}
  />
}