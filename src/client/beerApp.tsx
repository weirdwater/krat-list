import * as React from 'react'
import * as styles from './beerApp.scss'

export interface BeerAppProps {}
export interface BeerAppState {}

export class BeerApp extends React.Component<BeerAppProps, BeerAppState> {

  render() {
    return <div className={styles.app} >
      <h1>Hah, Bier!</h1>
    </div>
  }

}

