import * as React from 'react'
import * as styles from './beerApp.scss'
import { AuthState } from './types/authentication';
import { Authentication } from './components/authentication';
import { none } from '../shared/fun';
import { mkPristine } from '../shared/async';

export interface BeerAppProps {}
export type BeerAppState = AuthState<{}>

export class BeerApp extends React.Component<BeerAppProps, BeerAppState> {

  constructor(props: BeerAppProps) {
    super(props)

    this.state = {
      auth: 'login',
      email: none(),
      password: none(),
      user: mkPristine(),
      session: mkPristine()
    }
  }

  render() {
    return <Authentication
      state={this.state}
      updateState={a => this.setState(s => a(s))}
      app={s => <div className={styles.app} >
        <h1>Hah, Bier!</h1>
      </div>}
    />
  }

}

